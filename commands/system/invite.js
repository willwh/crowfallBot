const Discord = require('discord.js');
const moment = require('moment');
const os = require('os');

exports.run = (bot, msg, params, perms, r = []) => {
  let msgarr = [];
  msgarr.push("Server Owners can invite CrowfallBot to their server by visiting this link: https://discordapp.com/oauth2/authorize?permissions=523329&scope=bot&client_id=205105226380869632");
  return msg.channel.sendMessage(msgarr).catch(console.log);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "invite",
  description: "Invites CrowfallBot to your server!",
  usage: "invite"
};
