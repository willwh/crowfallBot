exports.power = {
  name: "Wild Charge", //name of power (REQUIRED)
  archetype: "Legionnaire", //if belongs by an archetype enter discipline name, otherwise false
  discipline: false, //if belongs by a discipline enter discipline name, otherwise false
  bar: "Primary", //Primary, Secondary, Primary, etc
  type: "Attack", //Buff, Attack, Passive, Ultimate, etc
  cast_time: "Hold Channeled", //time to cast, can also be "instant"
  duration: false, //duration of power, false if not specified
  lifetime: false, //this is the travel time on ranged powers (fireballs), false if not specified
  target: "Rectangle", //impact design for the power (sphere/reticle,etc), false if nothing listed.
  velocity: false, //how fast some ranged powers travel, false if not specified
  range: "12 Meters", //how far it travels, this is a string ("3 meters" or "3M/S) (false if not specified)
  cost: "7 Rage", //localized cost to archetype (energy, rage, mana, etc), false if not listed.
  tooltip: "Charge forward while the input key is depressed, dealing 1103 - 1348 + 123% Weapon Damage up to 3 times to anything in your way.", //full description of power (REQUIRED)
  icon: false, //we'll grab these later on. leave false for now.
};
