const Discord = require('discord.js');
exports.run = (bot, msg, params, perms, r = []) => {
  if (msg.mentions.roles.size === 1) {
    let serverModeratorRole = msg.mentions.roles.first();
    r.table("crowfallSettings")
      .get(msg.guild.id)
      .update({
        serverModeratorRole: serverModeratorRole.id
      }, {
        returnChanges: true
      })
      .run()
      .then(function(updatedRole) {
        if (updatedRole.changes == []) return console.log("No changes were made");
        bot.settings.set(msg.guild.id, updatedRole.changes[0].new_val);
        msg.channel.sendMessage(`Moderator permissions were granted to ${serverModeratorRole.toString()} and above.`);
      })
      .error(function(err) {
        console.log(err);
      })
  } else {
    return msg.channel.sendMessage("Correct Usage: set.mod.role @role");
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 3
};

exports.help = {
  name: "set.mod.role",
  description: "Sets the lowest role that should have Moderator level permissions",
  usage: "set.mod.role"
};
