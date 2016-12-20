const Discord = require('discord.js');

exports.run = (bot, msg, params, perms, r = []) => {
  let researchPower = params.join(" ").trim().toLowerCase();

  let referencePower = bot.powers.get(researchPower);
  //lets check if this might be an archetype instead
  if (referencePower) {
    let theEmbed = new Discord.RichEmbed();
    theEmbed.setColor(11141396);
    theEmbed.setTitle(referencePower.power.name);
    if (referencePower.power.tooltip) theEmbed.setDescription(referencePower.power.tooltip);
    if (referencePower.power.icon) theEmbed.setThumbnail(referencePower.power.icon);
    if (referencePower.power.archetype) theEmbed.addField("Archetype", referencePower.power.archetype, true);
    if (referencePower.power.discipline) theEmbed.addField("Discipline", referencePower.power.discipline, true);
    if (referencePower.power.bar) theEmbed.addField("Power Bar", referencePower.power.bar, true);
    if (referencePower.power.type) theEmbed.addField("Power Type", referencePower.power.type, true);
    if (referencePower.power.cost) theEmbed.addField("Power Cost", referencePower.power.cost, true);
    if (referencePower.power.cast_time) theEmbed.addField("Cast Time", referencePower.power.cast_time, true);
    if (referencePower.power.target) theEmbed.addField("Targeting Type", referencePower.power.target, true);
    if (referencePower.power.duration) theEmbed.addField("Power Duration", referencePower.power.duration, true);
    if (referencePower.power.lifetime) theEmbed.addField("Power Lifetime", referencePower.power.lifetime, true);
    if (referencePower.power.range) theEmbed.addField("Power Range", referencePower.power.range, true);
    if (referencePower.power.velocity) theEmbed.addField("Power Velocity", referencePower.power.velocity, true);
    theEmbed.addField('\u200b', '\u200b', false);
    theEmbed.setFooter("https://crowfall.wiki", bot.user.avatarURL);
    //send out the specific power!
    return msg.channel.sendEmbed(theEmbed).catch(console.log);
  } else {

    let archetypePowers = bot.powers.filter(function(s) {
      if (s.power.archetype && s.power.archetype.toLowerCase() === params[0].toLowerCase()) {
        return true;
      }
      return false;
    })

    let disciplinePowers = bot.powers.filter(function(s) {
      if (s.power.discipline && s.power.discipline.toLowerCase() === params[0].toLowerCase()) {
        return true;
      }
      return false;
    })

    //begin archetype results printout
    if (archetypePowers.size > 0) {
      let powersList = [];
      let archetypeName = "";
      archetypePowers.forEach(function(onePower) {
        powersList.push(onePower.power.name);
        archetypeName = onePower.power.archetype;
      })
      let archetypeDetails = bot.archetypes.get(archetypeName.toLowerCase());
      let archetypeResearch = new Discord.RichEmbed();
      if (archetypeDetails.archetype.promotion === true) {
        archetypeResearch.setTitle(`The ${archetypeName} Promotion`);
      } else {
        archetypeResearch.setTitle(`The ${archetypeName}`);
      }
      if (archetypeDetails.archetype.icon) archetypeResearch.setThumbnail(archetypeDetails.archetype.icon);
      archetypeResearch.setColor(11141396);
      archetypeResearch.setFooter("https://crowfall.wiki", bot.user.avatarURL);
      if (archetypeDetails.archetype.description === false) archetypeResearch.setDescription("TBD");
      if (archetypeDetails.archetype.description) archetypeResearch.setDescription(archetypeDetails.archetype.description);
      archetypeResearch.addField("Role", archetypeDetails.archetype.role, true);
      archetypeResearch.addField("Race", archetypeDetails.archetype.race, true);
      if (archetypeDetails && archetypeDetails.length > 0) archetypeResearch.addField("Available Promotions", archetypeDetails.archetype.promotions.join(", "), false);
      archetypeResearch.addField("Researchable Powers", powersList.join(", "), false);
      archetypeResearch.addField('\u200b', '\u200b', false);
      return msg.channel.sendEmbed(archetypeResearch).catch(console.log);
    }
    //end archetype results printout
    //begin discipline results printout
    /*    if (disciplinePowers.size > 0) {
          let powersList = [];
          let archetypeName = "";
          disciplinePowers.forEach(function(onePower) {
            powersList.push(onePower.power.name);
            disciplineName = onePower.power.archetype;
          })
          let disciplineDetails = bot.archetypes.get(archetypeName.toLowerCase());
          let disciplineResearch = new Discord.RichEmbed();
          if (archetypeDetails.archetype.promotion === true) {
            archetypeResearch.setTitle(`The ${archetypeName} Promotion`);
          } else {
            archetypeResearch.setTitle(`The ${archetypeName}`);
          }
          if (archetypeDetails.archetype.icon) archetypeResearch.setThumbnail(archetypeDetails.archetype.icon);
          archetypeResearch.setColor(11141396);
          archetypeResearch.setFooter("https://crowfall.wiki", bot.user.avatarURL);
          if (archetypeDetails.archetype.description === false) archetypeResearch.setDescription("TBD");
          if (archetypeDetails.archetype.description) archetypeResearch.setDescription(archetypeDetails.archetype.description);
          archetypeResearch.addField("Role", archetypeDetails.archetype.role, true);
          archetypeResearch.addField("Race", archetypeDetails.archetype.race, true);
          if (archetypeDetails && archetypeDetails.length > 0) archetypeResearch.addField("Available Promotions", archetypeDetails.archetype.promotions.join(", "), false);
          archetypeResearch.addField("Researchable Powers", powersList.join(", "), false);
          archetypeResearch.addField('\u200b', '\u200b', false);
          return msg.channel.sendEmbed(archetypeResearch).catch(console.log);
       }*/
    //end discipline results printout
    //couldn't find anything. return error message
    return msg.channel.sendMessage("Could not find any Powers, Archetypes or Disciplines associated with that research request!");
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [''],
  permLevel: 0
};

exports.help = {
  name: "research",
  description: "Provides information about a Crowfall power (by name)",
  usage: "research power name"
};
