exports.power = {
  name: "Block", //name of power
  archetype: "Knight", //archetype/discipline
  discipline: false,
  bar: "Primary", //primary, secondary, stealth, etc
  type: "Buff", //buff, attack, c-power
  cast_time: "Instant", //time to cast
  duration: false, //duration of power
  lifetime: false, //lifetime?
  target: "Self", //impact design (sphere/reticle,etc)
  velocity: false, //how fast it travels
  range: false, //how far it travels
  cost: "3 Stamina Per Second", //localized cost to archetype (energy, rage, mana, etc)
  tooltip: "Raise your shield and Block attacks, reducing all incoming damage by 90% and preventing crowd control effects. Also has a chance to punish attackers who strike you while blocking. Allies behind you benefit from increased damage reduction", //description of power
  icon: false
};
