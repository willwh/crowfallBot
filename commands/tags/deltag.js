const Discord = require('discord.js');
const moment = require('moment');
const log = (msg) => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${msg}`);
};

exports.run = (bot, msg, params, perms, r = []) => {
  let searchRequest = params.join(" ");
  //search request was blank, send a list of available tags.
  if (searchRequest !== "") {
    r.table("crowfallTags")
      .filter({
        guildID: msg.guild.id
      })
      .filter(function(subject) {
        return subject('tagSubject').match(`(?i)^${searchRequest}`);
      })
      .run()
      .then(function(results) {
        if (results.length === 1 && results[0].tagSubject.toLowerCase() === searchRequest.toLowerCase()) {
          r.table("crowfallTags")
            .get(results[0].id)
            .delete()
            .run()
            .then(function(results) {
              msg.channel.sendMessage(`Succesfully removed ${searchRequest} from available tags!`);
            })
            .error(function(err) {
              console.log(err);
            })
        } else {
          msg.channel.sendMessage(`No tags were found matching ${searchRequest} (or too many were!).`)
        }
      })
  } else {
    return msg.channel.sendMessage("Need a tag name to try to delete it!");
  }
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['removetag', 'deletetag'],
  permLevel: 1
};

exports.help = {
  name: "deltag",
  description: "Deletes information previously set by a Discord guild (server) staff member.",
  group: 'Tags',
  usage: "deltag"
};
