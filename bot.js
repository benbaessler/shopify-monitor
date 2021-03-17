const { Client, MessageEmbed } = require('discord.js');
const { Monitor } = require('./monitor');

const myDiscordID = '735148946841927682';

// Discord Bot
const bot = new Client();

// Monitor
const channelID = '817566327111548978';
const url = 'bdgastore.com';
const client = new Monitor(url);

const messageTemplate = (item) => {
  return new MessageEmbed()
    .setColor(0x5e34eb)
    .setImage(item.images[0].src)
    .setAuthor('Ben\'s Monitor - v0.0.1')
    .setTitle(`New product on ${url}!`)
    
};  

bot.on('ready', () => {
  console.log('Bot running...');

  const request = client.getPage();
    request.then((response) => {
      const latestItem = client.getLatestItem(response);
      bot.channels.fetch(channelID)
      .then(channel => {
          channel.send(messageTemplate(latestItem));
      })
    });
});

/* bot.on('message', message => {
  if (message.author.id === myDiscordID) {
    // Execute test
    const request = client.getPage();
    request.then((response) => {
      const latestItem = client.getLatestItem(response);
      message.channel.send(messageTemplate(latestItem));
    });
  } 
}); */

bot.login('ODE3NDg5ODI3OTY3NjY0MTU4.YEKQuw.oqeB5-XoBFk6p4yOQGraBJhJ8Og');

setTimeout(() => {
  bot.destroy();
}, 3000);