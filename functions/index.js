const functions = require('firebase-functions');
const admin = require('firebase-admin');
const moment = require('moment');
const Discord = require('discord.js');

const { REASONS, DURATIONS } = require('./constants');
const SECTION_SEPARATOR = '\n---------------------------------------\n';

const client = new Discord.Client();
admin.initializeApp();
const firestore = admin.firestore();

const nextOnCall = (state, group) => {
  const devIndex = state[group].indexOf(state.current[group]);
  return state[group][(devIndex + 1) % state[group].length];
};

exports.notifyDiscord = functions.pubsub
  .schedule('every day 08:00')
  .timeZone('America/Chicago')
  .onRun(async () => {
    const { token, channel } = functions.config().discord;
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
      client.login(token),
    ]);

    console.log(`Logged in as ${client.user.tag}`);

    const textChannel = client.channels.find(
      obj => obj.name === channel && obj.type === 'text',
    );
    if (!textChannel) {
      throw new Error(`Text channel not found by the name "${channel}"`);
    }

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
          `**${title.trim()}**`,
          ' is ',
          REASONS[reason],
          ` ${DURATIONS[duration || 'allDay']}`,
          description ? ` - *${description.trim()}*` : '',
        ].join(''),
      );

    if (formattedEvents.length) {
      sections.push(`*General*\n${formattedEvents.join('\n')}`);
    }

    /* On Call */
    if (onCallDoc.exists) {
      let current = { developer: null, qa: null, support: null };
      const onCallState = onCallDoc.data();
      if (onCallState.developer.length || onCallState.qa.length) {
        const nextDev = nextOnCall(onCallState, 'developer');
        const nextQA = nextOnCall(onCallState, 'qa');
        current = { ...current, developer: nextDev, qa: nextQA };
        sections.push(
          `*Product*\n${nextDev ? `**${nextDev}**` : ''}${
            nextDev && nextQA ? ' & ' : ''
          }${nextQA ? `**${nextQA}**` : ''} are on-call today`,
        );
      }

      if (onCallState.support.length) {
        const nextSupport = nextOnCall(onCallState, 'support');
        current = { ...current, support: nextSupport };
        sections.push(`*Support*\n**${nextSupport}** is on-call today`);
      }

      await firestore
        .collection('state')
        .doc('on-call')
        .set({ current }, { merge: true });
    }

    if (sections.length > 1) {
      await textChannel.send(sections.join(SECTION_SEPARATOR));
    }
  });
