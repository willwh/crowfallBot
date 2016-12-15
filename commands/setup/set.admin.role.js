const Discord = require('discord.js');
exports.run = (bot, msg, params, perms, r = []) => {
  if (msg.mentions.roles.size === 1) {
    let serverAdminRole = msg.mentions.roles.first();
    r.table("crowfallSettings")
      .get(msg.guild.id)
      .update({
        serverAdminRole: serverAdminRole.id
      }, {
        returnChanges: true
      })
      .run()
      .then(function(updatedRole) {
        if (updatedRole.changes == []) return console.log("No changes were made");
        bot.settings.set(msg.guild.id, updatedRole.changes[0].new_val);
        msg.channel.sendMessage(`Administrator permissions were granted to ${serverAdminRole.toString()} and above.`);
      })
      .error(function(err) {
        console.log(err);
      })
  } else {
    return msg.channel.sendMessage("Correct Usage: set.admin.role @role");
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 3
};

exports.help = {
  name: "set.admin.role",
  description: "Sets the lowest role that should have Administrator level permissions",
  usage: "set.admin.role"
};
