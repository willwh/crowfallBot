const Discord = require('discord.js');
exports.run = (bot, msg, params, perms, r = []) => {
  console.log(bot.settings.get(msg.guild.id));
  if (msg.mentions.channels.size === 1 || msg.channel.type === "text") {
    let customChannel = msg.mentions.channels.size > 0 ? msg.mentions.channels.first() : msg.channel;
    console.log("Custom Channel:" + customChannel.name);
    r.table("crowfallSettings")
      .get(msg.guild.id)
      .update({
        botDefaultChannel: customChannel.id
      }, {
        returnChanges: "always"
      })
      .run()
      .then(function(updatedSettings) {
        if (updatedSettings && !updatedSettings.changes) return msg.channel.sendMessage("No changes to the default bot channel were made!");
        bot.settings.set(msg.guild.id, updatedSettings.changes[0].new_val);
        customChannel.sendMessage(`Default bot output channel has been updated to #${customChannel.name}`);
        console.log("Actual Channel:" + msg.channel.name);
      })
      .error(function(err) {
        console.log(err);
      })
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 3
};

exports.help = {
  name: "set.default.channel",
  description: "Sets the default channel for bot messages",
  usage: "set.default.channel"
};
