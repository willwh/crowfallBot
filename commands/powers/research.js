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
    console.div(bot.powers.filter(p => p.power.archetype.toLowerCase() === params[0].toLowerCase()));
    let archetypePowers = bot.powers.filter(p => p.power.archetype.toLowerCase() === params[0].toLowerCase());
    let disciplinePowers = bot.powers.filter(p => p.power.discipline.toLowerCase() === params[0].toLowerCase());
    //begin archetype results printout
    if (archetypePowers > 0) {
      let powersList = [];
      archetypePowers.forEach(function(onePower) {
        powersList.push(onePower.powers.name);
      })
      let archetypeResearch = new Discord.RichEmbed();
      archetypeResearch.setTitle(`${params.trim().join(" ")} Archetype Powers List`);
      archetypeResearch.setColor(11141396);
      archetypeResearch.setFooter("https://crowfall.wiki", bot.user.avatarURL);
      archetypeResearch.setDescription(powersList.join(", "));
      return msg.channel.sendEmbed(archetypeResearch).catch(console.log);
    }
    //end archetype results printout
    //begin discipline results printout
    if (disciplinePowers.size > 0) {
      let powersList = [];
      archetypePowers.forEach(function(onePower) {
        powersList.push(onePower.powers.name);
      })
      let disciplineResearch = new Discord.RichEmbed();
      disciplineResearch.setTitle(`${params.trim().join(" ")} Archetype Powers List`);
      disciplineResearch.setColor(11141396);
      disciplineResearch.setFooter("https://crowfall.wiki", bot.user.avatarURL);
      disciplineResearch.setDescription(powersList.join(", "));
      return msg.channel.sendEmbed(disciplineResearch).catch(console.log);
    }
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
