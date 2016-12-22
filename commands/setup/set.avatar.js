const Discord = require('discord.js');
exports.run = (bot, msg, params, perms, r = []) => {
  bot.user.setAvatar(params[0]);
};

exports.conf = {
  enabled: false,
  guildOnly: false,
  aliases: [],
  permLevel: 4
};

exports.help = {
  name: "set.avatar",
  description: "Sets Avatar (One Time Use)",
  usage: "set.avatar https://avatarurladdress.com"
};
