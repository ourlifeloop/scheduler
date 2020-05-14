const functions = require('firebase-functions');
const admin = require('firebase-admin');
const moment = require('moment');
const Discord = require('discord.js');

const { REASONS, DURATIONS } = require('./constants');

const client = new Discord.Client();
admin.initializeApp();
const firestore = admin.firestore();

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
    const [events] = await Promise.all([
      firestore
        .collection('events')
        .where('months', 'array-contains', monthKey)
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

    if (!formattedEvents.length) {
      return;
    }

    await textChannel.send(
      `Today is ${today.format('dddd, MMMM Do')}!\n\n${formattedEvents.join(
        '\n',
      )}`,
    );
  });
