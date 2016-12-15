const Discord = require('discord.js');
exports.run = (bot, msg, params, perms, r = []) => {

  r.table("crowfallUsers")
    .filter({
      guildID: msg.guild.id,
    })
    .run()
    .then(function(results) {
      console.log(results);
    })

  let settings = bot.settings.get(msg.guild.id);
  console.log(settings);

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 3
};

exports.help = {
  name: "test",
  description: "Sets a custom welcome message for your server",
  usage: "test"
};
