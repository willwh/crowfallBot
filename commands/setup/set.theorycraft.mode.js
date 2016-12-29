const Discord = require('discord.js');
exports.run = (bot, msg, params, perms, r = []) => {
  let guildSettings = bot.settings.get(msg.guild.id);
  let theorycraftMode = guildSettings.theorycraftMode ? guildSettings.theorycraftMode : false;
  if (theorycraftMode === true) {
    theorycraftMode = false;
  } else {
    theorycraftMode = true;
  }
  r.table("crowfallSettings")
    .get(msg.guild.id)
    .update({
      theorycraftMode: theorycraftMode
    }, {
      returnChanges: "always"
    })
    .run()
    .then(function(updatedSettings) {
      if (updatedSettings && !updatedSettings.changes) return msg.channel.sendMessage("No changes to the default bot channel were made!");
      bot.settings.set(msg.guild.id, updatedSettings.changes[0].new_val);
      if (theorycraftMode === true) {
        theorycraftMode = "enabled"
      } else {
        theorycraftMode = "disabled"
      }
      msg.channel.sendMessage(`Theorycraft Mode has been changed to: ${theorycraftMode}`);
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
  name: "set.theorycraft.mode",
  description: "Sets Theorycraft Mode for research based commands (shows more specific details). Acts as an on/off switch.",
  usage: "set.theorycraft.mode"
};
