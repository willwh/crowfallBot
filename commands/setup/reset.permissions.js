const Discord = require('discord.js');
exports.run = (bot, msg, params, perms, r = []) => {
  r.table("crowfallSettings")
    .get(msg.guild.id)
    .update({
      serverModeratorRole: false,
      serverAdminRole: false,
    }, {
      returnChanges: true
    })
    .run()
    .then(function(results) {
      if (results.changes == []) return console.log("No changes were made");
      bot.settings.set(msg.guild.id, results.changes[0].new_val);
    })
    .then(function(next) {
      console.log(bot.settings);
      msg.channel.sendMessage("All permissions have been reset!");
    })
    .error(function(err) {
      console.log(err);
    })
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 3
};

exports.help = {
  name: "reset.permissions",
  description: "Resets all permissions stored for the server",
  usage: "reset.permissions"
};
