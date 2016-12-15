const Discord = require('discord.js');
exports.run = (bot, msg, params, perms, r = []) => {
  r.table("crowfallSettings")
    .get(msg.guild.id)
    .run()
    .then(function(results) {
      let msgArray = [];
      msgArray.push(`Current Permissions for **${msg.guild.name}**`);
      if (results.serverAdminRole) msgArray.push(`Administrator Role : ${msg.guild.roles.get(results.serverAdminRole).toString()}`);
      if (results.serverModeratorRole) msgArray.push(`Moderator Role : ${msg.guild.roles.get(results.serverModeratorRole).toString()}`);
      if (msgArray.length === 1) msgArray.push('No Permissions are currently setup');
      msg.channel.sendMessage(msgArray);
    })
    .error(function(err) {
      console.log(err);
    })
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 1
};

exports.help = {
  name: "get.permissions",
  description: "Displays all current permissions setup for this server",
  usage: "get.permissions"
};
