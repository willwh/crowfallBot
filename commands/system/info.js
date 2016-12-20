const Discord = require('discord.js');
const moment = require('moment');

exports.run = (bot, msg, params, perms, r = []) => {
  let creator = bot.users.get("68877298090119168");
  let date = new Date(bot.uptime);
  let uptimeString = '';
  if ((date.getUTCDate() - 1) > 0)
    uptimeStr += date.getUTCDate() - 1 + " Days, ";
  if (date.getUTCHours() > 0)
    uptimeStr += date.getUTCHours() + " Hours, ";
  if (date.getUTCMinutes() > 0)
    uptimeString += date.getUTCMinutes() + " Minutes, ";
  uptimeString += date.getUTCSeconds() + " Seconds ";

  theEmbed = {
    embed: {
      color: 11141396,
      title: `Crowfall Community Bot Statistics`,
      description: `Powered by Discord.js v${Discord.version}`,
      thumbnail: {
        url: bot.user.avatarURL,
        height: 150,
        width: 150
      },
      fields: [{
        name: `Memory Usage`,
        value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`,
        inline: true
      },
        {
          name: `Swap Size`,
          value: `${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB`,
          inline: true
        },
        {
          name: `Bot Uptime`,
          value: uptimeString,
          inline: true
        },
        {
          name: `Total Guilds Served`,
          value: `${bot.guilds.size}`,
          inline: true
        },
        {
          name: `Total Channels Served`,
          value: `${bot.channels.size}`,
          inline: true
        },
        {
          name: `Total Users Served`,
          value: `${bot.users.size}`,
          inline: true
        },
        {
          name: `Crowfall Bot Source`,
          value: `[https://github.com/TheObsidian/crowfallBot](https://github.com/TheObsidian/crowfallBot)`,
          inline: false
        },
        {
          name: `CrowfallBot`,
          value: "Want it on your server? Learn more and invite it at [https://crowfall.wiki](https://crowfall.wiki)​\n\u200b",
          inline: false
        },
        {
          name: '\u200b',
          value: '\u200b',
          inline: false
        }
      ],
      footer: {
        icon_url: bot.user.avatarURL,
        text: `https://crowfall.wiki`
      }
    }
  }
  msg.channel.sendMessage("", theEmbed).catch(console.log);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['about'],
  permLevel: 0
};

exports.help = {
  name: "info",
  description: "Provides some information about this bot.",
  usage: "info"
};
