exports.power = {
  name: "Eternal Rage", //name of power (REQUIRED)
  archetype: "Legionnaire", //if belongs by an archetype enter discipline name, otherwise false
  discipline: false, //if belongs by a discipline enter discipline name, otherwise false
  bar: "Primary", //Primary, Secondary, Primary, etc
  type: "Buff", //Buff, Attack, Passive, Ultimate, etc
  cast_time: "Instant", //time to cast, can also be "instant"
  duration: "5", //duration of power, false if not specified
  lifetime: "2", //this is the travel time on ranged powers (fireballs), false if not specified
  target: "Group", //impact design for the power (sphere/reticle,etc), false if nothing listed.
  velocity: false, //how fast some ranged powers travel, false if not specified
  range: false, //how far it travels, this is a string ("3 meters" or "3M/S) (false if not specified)
  cost: false, //localized cost to archetype (energy, rage, mana, etc), false if not listed.
  restores: "35 Rage" // added for spells with negative costs
  tooltip: "Instantly generates 35 Rage while allies recover their native resource over time. Allies and you also heal for 1890 - 2310 + 210% Weapon Damage 2 times over 5 seconds.", //full description of power (REQUIRED)
  icon: false, //we'll grab these later on. leave false for now.
};
