const functions = require('firebase-functions');
const admin = require('firebase-admin');
const moment = require('moment');
const axios = require('axios');
const Discord = require('discord.js');

const { REASONS, DURATIONS } = require('./constants');
const SECTION_SEPARATOR = '\n---------------------------------------\n';
const SATURDAY = 6;
const SUNDAY = 0;
const MONDAY = 1;

const discordClient = new Discord.Client();
admin.initializeApp();
const firestore = admin.firestore();

const nextOnCall = (state, group) => {
  const devIndex = state[group].indexOf(state.current[group]);
  return state[group][(devIndex + 1) % state[group].length];
};

const BOLD_ANCHOR = '{bold}';
const ITALIC_ANCHOR = '{italic}';

const BOLD_REGEX = new RegExp(BOLD_ANCHOR, 'g');
const ITALIC_REGEX = new RegExp(ITALIC_ANCHOR, 'g');

const notifyDiscord = async message => {
  const { discord } = functions.config();
  const { token, channel } = discord || {};
  if (!token || !channel) {
    console.log('Discord disabled - no token or channel');
    return;
  }

  await discordClient.login(token);
  console.log(`Logged into Discord as ${discordClient.user.tag}`);

  const textChannel = discordClient.channels.find(
    obj => obj.name === channel && obj.type === 'text',
  );

  if (!textChannel) {
    console.log('Discord disabled - channel not found');
    return;
  }

  await textChannel.send(
    message.replace(BOLD_REGEX, '**').replace(ITALIC_REGEX, '*'),
  );
};

const notifySlack = async message => {
  const { slack } = functions.config();
  const { token, channel } = slack || {};
  if (!token || !channel) {
    console.log('Slack disabled - no token or channel');
    return;
  }

  await axios.post(
    'https://slack.com/api/chat.postMessage',
    {
      channel,
      text: message.replace(BOLD_REGEX, '*').replace(ITALIC_REGEX, '_'),
      username: 'Daily Schedule Notifier',
      icon_emoji: ':calendar:',
    },
    { headers: { authorization: `Bearer ${token}` } },
  );
};

exports.dailyNotification = functions.pubsub
  .schedule('every day 08:00')
  .timeZone('America/Chicago')
  .onRun(async () => {
    const today = moment()
      .utc()
      .hour(12)
      .minute(0)
      .second(0)
      .millisecond(0);

    const monthKey = `${today.year()}-${today.month()}`;
    const [events, onCallDoc] = await Promise.all([
      firestore
        .collection('events')
        .where('months', 'array-contains', monthKey)
        .get(),
      firestore
        .collection('state')
        .doc('on-call')
        .get(),
    ]);

    const sections = [`Today is ${today.format('dddd, MMMM Do')}!`];

    /* Calendar Events */
    let eventData = [];
    events.forEach(evt => {
      eventData = [...eventData, evt.data()];
    });
    const formattedEvents = eventData
      .filter(
        ({ start, end }) =>
          today.isSameOrAfter(moment.utc(start.toDate())) &&
          today.isSameOrBefore(moment.utc(end.toDate())),
      )
      .map(({ title, reason, duration, description }) =>
        [
          `${BOLD_ANCHOR}${title.trim()}${BOLD_ANCHOR}`,
          ' is ',
          REASONS[reason],
          ` ${DURATIONS[duration || 'allDay']}`,
          description
            ? ` - ${ITALIC_ANCHOR}${description.trim()}${ITALIC_ANCHOR}`
            : '',
        ].join(''),
      );

    if (formattedEvents.length) {
      sections.push(
        `${ITALIC_ANCHOR}General${ITALIC_ANCHOR}\n${formattedEvents.join(
          '\n',
        )}`,
      );
    }

    /* On Call */
    const isWeekend = today.day() === SATURDAY || today.day() === SUNDAY;
    if (onCallDoc.exists && !isWeekend) {
      let current = { developer: null, qa: null, support: null };
      const onCallState = onCallDoc.data();
      if (onCallState.developer.length || onCallState.qa.length) {
        const nextDev = nextOnCall(onCallState, 'developer');
        const nextQA = nextOnCall(onCallState, 'qa');
        current = { ...current, developer: nextDev, qa: nextQA };
        sections.push(
          `${ITALIC_ANCHOR}Product${ITALIC_ANCHOR}\n${
            nextDev ? `${BOLD_ANCHOR}${nextDev}${BOLD_ANCHOR}` : ''
          }${nextDev && nextQA ? ' & ' : ''}${
            nextQA ? `${BOLD_ANCHOR}${nextQA}${BOLD_ANCHOR}` : ''
          } are on-call today`,
        );
      }

      if (onCallState.support.length) {
        let support = onCallState.current.support;
        // Loop weekly on Monday
        if (!support || today.day() === MONDAY) {
          support = nextOnCall(onCallState, 'support');
          current = { ...current, support };
        }
        sections.push(
          `${ITALIC_ANCHOR}Support${ITALIC_ANCHOR}\n${BOLD_ANCHOR}${support}${BOLD_ANCHOR} is on-call today`,
        );
      }

      await firestore
        .collection('state')
        .doc('on-call')
        .set({ current }, { merge: true });
    }

    if (sections.length > 1) {
      const message = sections.join(SECTION_SEPARATOR);
      await Promise.all([notifyDiscord(message), notifySlack(message)]);
    } else {
      console.log('Messaging disabled - no events today');
    }
  });
