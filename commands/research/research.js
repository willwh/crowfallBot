const Discord = require('discord.js');

exports.run = (bot, msg, params, perms, r = []) => {
  //let researchPower = params.join(" ").trim().toLowerCase();
  let searchRequest = params.join(" ").trim().toLowerCase();

  let powerSearch = bot.powers.get(searchRequest);
  let archetypeSearch = bot.archetypes.get(searchRequest);
  //let disciplineSearch = bot.disciplines.get(searchRequest);
  //let craftingSearch = bot.crafting.get(searchRequest);

  //lets check if this might be an archetype instead
  if (powerSearch) {
    let theEmbed = new Discord.RichEmbed();
    theEmbed.setColor(11141396);
    theEmbed.setTitle(powerSearch.power.name);
    if (powerSearch.power.tooltip) theEmbed.setDescription(powerSearch.power.tooltip);
    if (powerSearch.power.icon) theEmbed.setThumbnail(powerSearch.power.icon);
    if (powerSearch.power.archetype) theEmbed.addField("Archetype", powerSearch.power.archetype, true);
    if (powerSearch.power.discipline) theEmbed.addField("Discipline", powerSearch.power.discipline, true);
    if (powerSearch.power.bar) theEmbed.addField("Power Bar", powerSearch.power.bar, true);
    if (powerSearch.power.type) theEmbed.addField("Power Type", powerSearch.power.type, true);
    if (powerSearch.power.cost) theEmbed.addField("Power Cost", powerSearch.power.cost, true);
    if (powerSearch.power.cast_time) theEmbed.addField("Cast Time", powerSearch.power.cast_time, true);
    if (powerSearch.power.target) theEmbed.addField("Targeting Type", powerSearch.power.target, true);
    if (powerSearch.power.duration) theEmbed.addField("Power Duration", powerSearch.power.duration, true);
    if (powerSearch.power.lifetime) theEmbed.addField("Power Lifetime", powerSearch.power.lifetime, true);
    if (powerSearch.power.range) theEmbed.addField("Power Range", powerSearch.power.range, true);
    if (powerSearch.power.velocity) theEmbed.addField("Power Velocity", powerSearch.power.velocity, true);
    theEmbed.addField('\u200b', '\u200b', false);
    theEmbed.setFooter("https://crowfall.wiki", bot.user.avatarURL);
    //send out the specific power!
    return msg.channel.sendEmbed(theEmbed).catch(console.log);
  }

  //proceed if search request was an archetype.
  if (archetypeSearch) {
    let archetypePowers = bot.powers.filter(function(s) {
      if (s.power.archetype && s.power.archetype.toLowerCase() === searchRequest) {
        return true;
      }
      return false;
    })
    let powersList = [];
    archetypePowers.forEach(function(onePower) {
      powersList.push(onePower.power.name);
    })

    let archetypeResearch = new Discord.RichEmbed();
    archetypeResearch.setTitle(`${archetypeSearch.archetype.name}`);
    if (archetypeSearch.archetype.icon) archetypeResearch.setThumbnail(archetypeSearch.archetype.icon);
    archetypeResearch.setColor(11141396);
    archetypeResearch.setFooter("https://crowfall.wiki | * marked fields can be found with cf!research", bot.user.avatarURL);
    if (archetypeSearch.archetype.description === false) archetypeResearch.setDescription("Coming Soon.");
    if (archetypeSearch.archetype.description) archetypeResearch.setDescription(archetypeSearch.archetype.description);
    archetypeResearch.addField("Role", archetypeSearch.archetype.role, true);
    archetypeResearch.addField("Race", archetypeSearch.archetype.race, true);
    if (archetypeSearch && archetypeSearch.archetype.promotions && archetypeSearch.archetype.promotions.length > 0) archetypeResearch.addField("Available Promotions*", archetypeSearch.archetype.promotions.join(", "), false);
    if (powersList.length > 0) archetypeResearch.addField("Powers List*", powersList.join(", "), false);
    archetypeResearch.addField('\u200b', '\u200b', false);
    return msg.channel.sendEmbed(archetypeResearch).catch(console.log);
  }
  //end archetype results printout

  //begin discipline results printout
  /*
      let disciplinePowers = bot.powers.filter(function(s) {
        if (s.power.discipline && s.power.discipline.toLowerCase() === params[0].toLowerCase()) {
          return true;
        }
        return false;
      })
          if (disciplinePowers.size > 0) {
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

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "research",
  description: "Provides information about a Crowfall power (by name)",
  group: 'Research',
  usage: "research power name"
};
