const Discord = require('discord.js');
const moment = require('moment');
const log = (msg) => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${msg}`);
};

exports.run = (bot, msg, params, perms, r = []) => {
  let searchRequest = params.join(" ");
  //search request was blank, send a list of available tags.
  if (searchRequest === "") {
    r.table("crowfallTags")
      .filter({
        guildID: msg.guild.id
      })
      .orderBy('tagSubject')
      .run()
      .then(function(results) {
        if (results.length > 0) {
          let msgArr = [];
          results.forEach(function(aTag) {
            msgArr.push(aTag.tagSubject)
          })
          let tagList = msgArr.join(', ');
          let theEmbed = new Discord.RichEmbed();
          theEmbed.setColor(11141396);
          theEmbed.setTitle(`Available Tags on ${msg.guild.name}:`);
          theEmbed.setDescription(tagList);
          theEmbed.addField('\u200b', '\u200b', false);
          if (msg.guild.iconURL) theEmbed.setFooter(`${msg.guild.name}`, msg.guild.iconURL);
          return msg.channel.sendEmbed(theEmbed)
            .catch(function(err) {
              log(err)
            });
        } else {
          return msg.channel.sendMessage(`There are no tags yet for ${msg.guild.name}!`);
        }
      })
  } else {
    //search results wasn't blank, lets try to find a match.
    r.table("crowfallTags")
      .filter({
        guildID: msg.guild.id
      })
      .filter(function(subject) {
        return subject('tagSubject').match(`(?i)${searchRequest}`);
      })
      .run()
      .then(function(results) {
        if (results && results.length > 0) {
          if (results.length > 1) console.log(`Multiple Results found: ${results}`)
          //we found a match! send an embed to channel with the existing tag.
          let theEmbed = new Discord.RichEmbed();
          theEmbed.setColor(11141396);
          theEmbed.setTitle(results[0].tagSubject);
          theEmbed.setAuthor(msg.guild.name, msg.guild.iconURL);
          theEmbed.setDescription(results[0].tagContent);
          theEmbed.addField('\u200b', '\u200b', false);
          theEmbed.setFooter(`Last Updated`);
          if (results[0].timestamp) theEmbed.setTimestamp(results[0].timestamp);
          return msg.channel.sendEmbed(theEmbed)
            .catch(function(err) {
              log(err)
            });
        }
        //no matching tag found: if the user has the correct permissions, ask if they want to create a new tag.
        if (perms > 0) {
          const filter = m => {
            return m.author.id === msg.author.id
          };
          msg.channel.sendMessage(`No Matching Tag Found. Do you want to create an entry for this tag '${searchRequest}'?`);
          msg.channel.awaitMessages(filter, {
            max: 1
          })
            .then(yesorno => {
              console.log(yesorno.first().content);
              if (yesorno.first().content.trim() !== 'yes') return msg.channel.sendMessage("Aborting: New Tag Creation!");
              if (yesorno.first().content.trim() === 'yes') {
                const filter = m => {
                  return m.author.id === msg.author.id
                };
                msg.channel.sendMessage(`Creating entry for **${searchRequest}**, please provide content for this tag: `);
                msg.channel.awaitMessages(filter, {
                  max: 1
                })
                  .then(collected => {
                    r.table("crowfallTags")
                      .insert({
                        guildID: msg.guild.id,
                        tagSubject: searchRequest,
                        tagContent: collected.first().content.trim(),
                        timestamp: new Date()
                      })
                      .run()
                      .then(function(results) {
                        let theEmbed = new Discord.RichEmbed();
                        theEmbed.setColor(11141396);
                        theEmbed.setTitle("Tag Added: " + searchRequest);
                        theEmbed.setDescription(collected.first().content.trim());
                        theEmbed.addField('\u200b', '\u200b', false);
                        if (msg.guild.iconURL) theEmbed.setFooter(`${msg.guild.name}`, msg.guild.iconURL);
                        theEmbed.setTimestamp(new Date());
                        return msg.channel.sendEmbed(theEmbed)
                          .catch(function(err) {
                            log(err)
                          });
                      })
                      .error(function(err) {
                        console.log(err);
                      })
                  })
                  .catch(function(err) {
                    log(err);
                  })
              }
            })
            .catch(function(err) {
              console.log(err);
            })
        } else {
          //user didnt have permissions to create a new tag. We need to let user know we didnt find a match.
          return msg.channel.sendMessage(`No Matching Tag Found.`)
        }
      })
  }
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "tag",
  description: "Provides pre-set information set by a Discord guild (server) staff.",
  group: 'Tags',
  usage: "tag"
};
