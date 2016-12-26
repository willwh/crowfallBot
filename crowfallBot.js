const Discord = require("discord.js");
const moment = require('moment');
const r = require('rethinkdbdash')({
  host: 'localhost',
  db: 'crowfallBot'
});

const config = require('./config');
const crowfallBot = new Discord.Client();
const fs = require("fs");
const log = (msg) => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${msg}`);
};

crowfallBot.commands = new Discord.Collection();
crowfallBot.aliases = new Discord.Collection();
crowfallBot.settings = new Discord.Collection();
crowfallBot.powers = new Discord.Collection();
crowfallBot.archetypes = new Discord.Collection();

//Loads ALL Bot Commands
let commandLoader = function(currentPath) {
  log("Searching for Commands... " + currentPath);
  let files = fs.readdirSync(currentPath);
  for (let i in files) {
    let currentFile = currentPath + '/' + files[i];
    let stats = fs.statSync(currentFile);
    if (stats.isFile()) {
      let loader = require(`${currentFile}`);
      log(`Loading Command: ${config.prefix}${loader.help.name} ...`);
      crowfallBot.commands.set(loader.help.name.toLowerCase(), loader);
      loader.conf.aliases.forEach(alias => {
        crowfallBot.aliases.set(alias, loader.help.name);
      });
    } else if (stats.isDirectory()) {
      commandLoader(currentFile);
    }
  }
};
commandLoader('./commands');

//Loads All Powers For All Disciplines and Archetypes
let powersLoader = function(currentPath) {
  log("Researching Powers... " + currentPath);
  let files = fs.readdirSync(currentPath);
  for (let i in files) {
    let currentFile = currentPath + '/' + files[i];
    let stats = fs.statSync(currentFile);
    if (stats.isFile()) {
      let loader = require(`${currentFile}`);
      log(`Loading Power: ${loader.power.name} ...`);
      crowfallBot.powers.set(loader.power.name.toLowerCase(), loader);
    } else if (stats.isDirectory()) {
      powersLoader(currentFile);
    }
  }
};
powersLoader('./powers');

//Loads All Archetype & Promotion Archetype General Information
let archetypesLoader = function(currentPath) {
  log("Researching Archetypes... " + currentPath);
  let files = fs.readdirSync(currentPath);
  for (let i in files) {
    let currentFile = currentPath + '/' + files[i];
    let stats = fs.statSync(currentFile);
    if (stats.isFile()) {
      let loader = require(`${currentFile}`);
      log(`Loading Archetype: ${loader.archetype.name} ...`);
      crowfallBot.archetypes.set(loader.archetype.name.toLowerCase(), loader);
    } else if (stats.isDirectory()) {
      archetypesLoader(currentFile);
    }
  }
};
archetypesLoader('./archetypes');

crowfallBot.on("message", msg => {
  let currentPermissions = msg.channel.permissionsFor(crowfallBot.user);
  if (msg.channel.type === "dm" || currentPermissions.hasPermissions(["SEND_MESSAGES", "EMBED_LINKS"])) {
    if (!msg.content.toLowerCase().startsWith(config.prefix.toLowerCase())) return;
    let command = msg.content.split(" ")[0].slice(config.prefix.length).toLowerCase();
    let params = msg.content.split(" ").slice(1);
    let perms = crowfallBot.elevation(msg);
    log(`"${config.prefix}${command} ${params.join(" ")}" executed with permission level ${perms} by ${msg.author.username}`);
    let cmd;
    if (crowfallBot.commands.has(command)) {
      cmd = crowfallBot.commands.get(command);
    } else if (crowfallBot.aliases.has(command)) {
      cmd = crowfallBot.commands.get(crowfallBot.aliases.get(command));
    }
    if (cmd) {
      if (perms < cmd.conf.permLevel) return msg.channel.sendMessage(`${msg.author.toString()} you are not authorized to run ${config.prefix}${command}`);
      cmd.run(crowfallBot, msg, params, perms, r);
      //make sure bot has permissiosn to delete stuff.
      if (currentPermissions.hasPermission("MANAGE_MESSAGES")) {
        msg.delete(5000);
      }
    }
  } else {
    msg.author.sendMessage("CrowfallBot requires Send Messages and Embed Links permissions to work properly. Contact your server owner and grant it these to use this function!");
  }

});

crowfallBot.on("ready", () => {
  crowfallBot.guilds.forEach(function(aGuild) {
    r.table("crowfallSettings")
      .get(aGuild.id)
      .run()
      .then(function(guildSettings) {
        if (guildSettings) {
          crowfallBot.settings.set(aGuild.id, guildSettings);
        } else {
          let defaultSettings = {
            serverModeratorRole: false,
            serverAdminRole: false,
            botDefaultChannel: aGuild.defaultChannel.id,
            welcomeMessage: false,
            tweetService: false,
            tweetChannel: aGuild.defaultChannel.id
          }
          r.table("crowfallSettings")
            .insert({
              id: aGuild.id,
              serverModeratorRole: false,
              serverAdminRole: false,
              botDefaultChannel: aGuild.defaultChannel.id,
              welcomeMessage: false,
              tweetService: false,
              tweetChannel: aGuild.defaultChannel.id
            })
            .run()
            .then(function(next) {
              crowfallBot.settings.set(aGuild.id, defaultSettings);
            })
            .error(function(err) {
              log(err);
            })
        }
      })
      .error(function(err) {
        log(err);
      })
  })
  log("crowfallBot is ready to recieve commands!");
});

crowfallBot.on("guildMemberAdd", (member) => {
  log(`${member.user.username} joined ${member.guild.name}`);
  let crowfallUser = member.nickname ? member.nickname : member.user.username;
  let guildSettings = crowfallBot.settings.get(member.guild.id);
  if (!guildSettings) return log("Error with getting guildSettings");
  let defaultChannel = member.guild.channels.get(guildSettings.botDefaultChannel) ? member.guild.channels.get(guildSettings.botDefaultChannel) : member.guild.defaultChannel;

  r.table("crowfallUsers")
    .filter({
      guildID: member.guild.id,
      userID: member.id
    })
    .run()
    .then(function(aUser) {
      //if user has previously joined server, ignore them rejoining it.
      if (aUser && aUser.length === 0) {
        r.table("crowfallUsers")
          .insert({
            userID: member.id,
            guildID: member.guild.id,
            created: member.user.creationDate,
            joined: moment().unix()
          })
          .run()
          .then(function(newUser) {
            log(`${member.user.username} confirmed as New Member`);
          }).then(function(next) {
          //use custom welcome message if it exists.
          defaultChannel.sendMessage("Welcome to " + member.guild.name + ", " + member.toString() + "!");
        })
      } else {
        return false;
      }
    })

});

crowfallBot.on('guildMemberRemove', (member) => {
  log(`${member.user.username} left ${member.guild.name}`);
})

crowfallBot.on("error", (err) => {
  log(error)
});

crowfallBot.on("warn", (warn) => {
  log(warn)
});

crowfallBot.on("disconnect", (disconnect) => {
  log(disconnect);
  process.exit();
});

crowfallBot.on("reconnecting", (restart) => {
  log(restart);
  process.exit();
});

crowfallBot.login(config.botToken);

//functions library
crowfallBot.elevation = function(msg) {
  if (msg.author.id === config.botCreator) return 4;
  if (msg.guild && msg.guild.ownerID === msg.author.id) return 3; //server owner will always have highest perms
  if (!msg.guild) return 0 //this is a direct message, no permissions
  let serverSettings = crowfallBot.settings.get(msg.guild.id) ? crowfallBot.settings.get(msg.guild.id) : false;
  if (!serverSettings || !msg.member) return 0; //settings didnt exist for this (dms)
  let serverAdminRole = serverSettings.serverAdminRole ? msg.guild.roles.get(serverSettings.serverAdminRole) : false;
  let serverModeratorRole = serverSettings.serverModeratorRole ? msg.guild.roles.get(serverSettings.serverModeratorRole) : false;
  if (serverAdminRole && msg.member.highestRole.position >= serverAdminRole.position)
    return 2;
  if (serverModeratorRole && msg.member.highestRole.position >= serverModeratorRole.position)
    return 1;
  //Still here? No perms for you!
  return 0;
};
