const Discord = require('discord.js');
exports.run = (bot, msg, params, perms, r = []) => {
  bot.user.setAvatar(params[0]);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 4
};

exports.help = {
  name: "set.avatar",
  description: "Displays all current permissions setup for this server",
  usage: "set.avatar https://avatarurladdress.com"
};
