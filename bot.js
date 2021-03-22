const { Client, MessageEmbed } = require('discord.js');
const { Monitor } = require('./monitor.js');
const config = require('./config.json');

// Discord Bot
const bot = new Client();

// Monitor
const channelID = '817566327111548978';
const url = 'bdgastore.com';
let monitor = new Monitor(url);

const messageTemplate = (item) => {
  function getATC () {
    const variants = item.variants;
    let result = '';
    for (let i = 0; i < variants.length; i++) {
      if (variants[i].available === true) {
        result += `[${variants[i].option2}](https://${url}/cart/${variants[i].id}:1) | `;
      }
    }
    return result.slice(0, -3);
  }

  return new MessageEmbed()
    .setColor(0x5e34eb)
    .setThumbnail(item.images[0].src)
    .setAuthor(url)
    .setTitle(item.title)
    .setURL(`https://${url}/products/${item.handle}`)
    .addFields(
      { name: 'Price', value: '$' + item.variants[0].price, inline: true },
      { name: 'Color', value: item.options[0].values[0], inline: true },
      { name: 'ATC', value: getATC() },
    )
    .setFooter('Ben\'s Monitor v0.0.1')
    .setTimestamp()
};

function send(item) {
  bot.channels.fetch(channelID)
  .then(channel => {
    channel.send(messageTemplate(item));
  });
}

bot.on('ready', () => {
  console.log('Bot running...');

  // Edit request interval here (in ms).
  monitor.start(interval = 10000, send);
});

bot.on('message', message => {
});

bot.login(config.token);

module.exports = { send };