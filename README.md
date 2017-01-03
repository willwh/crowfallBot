# crowfallBot
A Node.js & Discord.js powered Crowfall Community Discord Bot

## Invite CrowfallBot to your server

Discord Server Owners can invite CrowfalllBot by heading here; https://discordapp.com/oauth2/authorize?permissions=93184&scope=bot&client_id=205105226380869632

## A Quick Warning...

While this bot is intended for the Crowfall community to use, I make available an existing running bot which gets these updates as they are pushed to this repository. As a result, I offer no support for running your own version of this bot. Do not ask, I will not respond. If you'd like to fork this bot and use the foundation for something else, feel free to. I'd only request some mention somewhere within your work.

## What the Crowfall Bot Does

CrowfallBot is designed to provide tools to your Discord server. It is not designed to replace administrative bots, and it actively avoids features that would overlap with those types of bots. With that said, CrowfallBot is meant to assist guilds in researching the various facets of the Crowfall universe with easy to grab data relating to the games Archetypes, Powers, Skills, Crafting and more. 

Additionally we wanted to help connect the larger Crowfall community to itself and so another major feature offering is a live stream of the various Blogs, Twitter feeds, Reddit and even the Dev comments on the forums right to your doorstep. All of these can be disabled, so if you prefer only some of them, minor customization is available. The sources are selected by myself, but are designed to represent official accounts from the ACE or Crowfall teams, as well as the official destinations on the internet that represent them. 

## Required Permissions for CrowfallBot

This bot requests the following permissions, failure to grant these permissions may cause some commands to fail.;
* Create Instant Invite (features pending)
* Send Messages (pretty obvious)
* Read Messages / Read Message History (can't know to execute commands without being able to see them)
* Manage Messages (crowfallBot likes to clean up commands after they've been completed, your server will be messy if this is disabled)
* Embed Links (this is essential, almost all of the bots commands are formatted using this mechanic)
 
## Current Implemented Features

* Welcomes New People To Your Server (configurable as to where the invite goes with cf!set.default.channel)
* *cf!invite* provides a link where a Discord server owner can invite this bot to their server

__Research Tools__
* *cf!set.theorycraft.mode* This is a toggle which makes all research commands show all of the available details for any given requested data. Please bear in mind the requested data will take up more room in your Discord server with this enabled. 
* *cf!research* will grab Powers and Archetype data for easy reference and theorycrafting work and post it directly in the room requested. Some examples of using this command; "cf!research duelist" or "cf!research recon".

__General Tools__
* *cf!tag* is a frequently used information system. Using the command "cf!tag subject" will grab the pre-set information from it and display it in the channel where the command was used. If no information was set yet, it allows the server staff to set one if they have permissions (it will ask "yes/no" do you want to create this.) If they respond yes, the next thing typed in will be stored for later recall. Useful for storing urls and other misc text based data!  If you use "cf!tag" with no parameter, itll list all currently stored tags.
* *cf!deltag* will give server staff ability to remove unused tags.

__System Commands__
* *cf!info* gives details about the bot, useful stats, and info on the server its running on currently.

__Setup Commands__
These commands can only be executed by the server owner.
* *cf!set.theorycraft.mode* toggles an extra-detailed research results screen when using research based commands.
* *cf!set.default.channel* should be used in the room you want bot messages to go to by default. Any commands will be responded to in the room they are activated from. Right now this is only used for "Welcoming" new server visitors to your Discord server. 
* *cf!set.admin.role @rolemention* grants admin rights to a specific role. Only one role can hold admin privledges.
* *cf!set.mod.role @rolemention* grants moderator rights to a specific role. Only one role can hold moderator privledges.
* *cf!get.permissions* lists who currently has these roles.
* *cf!reset.permissions* deletes all current permissions (server owner always retains access to all commands).

## Planned and Upcoming Features

* Extending the *cf!research* command to include Discipline data when that system comes online.
* Extending the *cf!research* command to include Skill-Tree data once that system gets finalized more.
* Implementing *cf!craft* command, which will help you figure out the raw materials needed to craft any item in the game (including al sub components and providing optional material counts as well).
* Implementing Social Stream tools to let you see up-to-date Twitter, Reddit and Official Forum posts from the developers and community.
* Implementing a *cf!flag* command which can notify us when some of the data we host is out of date or incorrect.
* Tracking Crowfall version changes down to the Power-level and showing you comprehensive patch notes.
* Implementing a Crafters directory where players can connect with experts on their Campaign or Eternal Kingdom.
* Connecting to any game provided API when and **if** it ever becomes available, directly into your Discord server. 
* Anything the community thinks would be useful. Let us know! We hang out on the official Crowfall Discord Server (https://tinyurl.com/CFDiscord)

## Contributors (in no certain order)

* The Obsidian Guild; particularly Wisp, LeBler, and Kraege 
* [Caldera] and its public pre-alpha testing source materials
* [CAL] Tinnis
* [Sugoi] Coolster
* Nytewytch
* [ACE] Pann
* The Entire Crowfall Team for making this title.
