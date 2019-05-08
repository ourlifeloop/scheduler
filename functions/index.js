const functions = require('firebase-functions');
const admin = require('firebase-admin');
const Discord = require('discord.js');

const client = new Discord.Client();
admin.initializeApp();

exports.notifyDiscord = functions.pubsub
  .schedule('every day 09:00')
  .timeZone('America/Chicago')
  .onRun(async () => {
    const { token, channel } = functions.config().discord;
    await client.login(token);
    console.log(`Logged in as ${client.user.tag}`);

    const textChannel = client.channels.find(
      obj => obj.name === channel && obj.type === 'text',
    );
    if (!textChannel) {
      throw new Error(`Text channel not found by the name "${channel}"`);
    }
    // await textChannel.send("Bleep Blorp, I'm a robot");
  });
