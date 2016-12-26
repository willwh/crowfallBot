const Discord = require('discord.js');
const moment = require('moment');
const os = require('os');

exports.run = (bot, msg, params, perms, r = []) => {
  let creator = bot.users.get("68877298090119168");
  let date = new Date(bot.uptime);
  let uptimeString = '';
  if ((date.getUTCDate() - 1) > 0)
    uptimeString += date.getUTCDate() - 1 + " Days, ";
  if (date.getUTCHours() > 0)
    uptimeString += date.getUTCHours() + " Hours, ";
  if (date.getUTCMinutes() > 0)
    uptimeString += date.getUTCMinutes() + " Minutes, ";
  uptimeString += date.getUTCSeconds() + " Seconds ";
  let systemStats = [];
  let connectedTo = [];
  let poweredBy = [];
  let botStats = [];
  let memUsed = Math.round(process.memoryUsage().heapUsed / 1024 / 1024);
  let totalMem = Math.round(os.totalmem() / 1024 / 1024);
  let percentUsed = Math.round((memUsed / totalMem) * 100);
  let cpu = os.cpus();
  let cpuArray = cpu[0].model.replace(/\s+/g, " ").trim().split(" ");
  let cpuCores = cpu.length;
  let cpuSpeed = (cpu[0].speed / 1000) + "MHZ";
  let theEmbed = new Discord.RichEmbed();
  theEmbed.setColor(11141396);
  theEmbed.setTitle(`__**CrowfallBot**__`);
  theEmbed.setDescription('To add CrowfallBot to your Discord Server use the cf!invite command.')
  theEmbed.setThumbnail(bot.user.avatarURL);
  //System Stats
  systemStats.push(`Platform: **${os.platform()}**`);
  systemStats.push(`CPU: **${cpuArray[0]} ${cpuArray[1]}**`);
  systemStats.push(`CPU Specs:** ${cpuCores} @ ${cpuSpeed}**`);
  systemStats.push(`Memory Usage: **${percentUsed}% (${memUsed}MB)**`);
  theEmbed.addField('__**Server Stats:**__', systemStats, true);
  let totalTextChannels = bot.channels.filter(function(s) {
    if (s.type && s.type === 'text') {
      return true;
    }
    return false;
  })
  let totalDMs = bot.channels.filter(function(s) {
    if (s.type && s.type === 'dm') {
      return true;
    }
    return false;
  })
  //Connected To Stats8
  connectedTo.push(`Guilds: **${bot.guilds.size}**`);
  connectedTo.push(`Channels: **${totalTextChannels.size}**`);
  connectedTo.push(`Private Conversations: **${totalDMs.size}**`);
  connectedTo.push(`Users: **${bot.users.size}**`);
  theEmbed.addField('__**Connected to:**__', connectedTo, true);
  //Bot Statistics
  botStats.push(`Uptime: **${uptimeString}**`);
  botStats.push(`Available Bot Commands: **${bot.commands.size}**`);
  botStats.push(`Researchable Archetypes: **${bot.archetypes.size}**`);
  botStats.push(`Researchable Powers: **${bot.powers.size}**`);
  theEmbed.addField('__**crowfallBot Stats:**__', botStats, true);
  //Powered By
  poweredBy.push(`Discord.js: **v${Discord.version}**`);
  poweredBy.push(`Moment.js: **v2.17.1**`);
  poweredBy.push(`RethinkDB: **v2.3.27**`);
  poweredBy.push(`Twit.js: **v2.2.4**`);
  theEmbed.addField(`__**Powered By:**__`, poweredBy, true);
  //Source Details
  theEmbed.addField(`__**CrowfallBot Source:**__`, `[https://github.com/TheObsidian/crowfallBot](https://github.com/TheObsidian/crowfallBot)`);
  theEmbed.setFooter(`Brought to you by https://crowfall.wiki ​`, bot.user.avatarURL);
  return msg.channel.sendEmbed(theEmbed).catch(console.log);
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
