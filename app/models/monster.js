const mongoose = require("mongoose");

const MonsterSchema = new mongoose.Schema({
  index: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  subtype: String,
  alignment: {
    type: String,
    required: true,
  },
  armor_class: {
    type: Number,
    required: true,
  },
  hit_points: {
    type: Number,
    required: true,
  },
  hit_dice: {
    type: String,
    required: true,
  },
  speed: {
    type: Object,
    required: true,
  },
  strength: {
    type: Number,
    required: true,
  },
  dexterity: {
    type: Number,
    required: true,
  },
  constitution: {
    type: Number,
    required: true,
  },
  intelligence: {
    type: Number,
    required: true,
  },
  wisdom: {
    type: Number,
    required: true,
  },
  charisma: {
    type: Number,
    required: true,
  },
  proficiencies: {
    type: Array,
    required: true,
  },
  damage_vulnerabilities: {
    type: Array,
    required: true,
  },
  damage_resistances: {
    type: Array,
    required: true,
  },
  damage_immunities: {
    type: Array,
    required: true,
  },
  condition_immunities: {
    type: Array,
    required: true,
  },
  senses: {
    type: Object,
    required: true,
  },
  languages: String,
  challenge_rating: {
    type: Number,
    required: true,
  },
  xp: {
    type: Number,
    required: true,
  },
  special_abilities: {
    type: Array,
    required: true,
  },
  actions: {
    type: Array,
    required: true,
  },
  legendary_actions: Array,
  url: {
    type: String,
    required: true,
  },
  source_book: {
    type: String,
    required: true,
    default: "Player's Handbook",
  },
});

module.exports =
  mongoose.models.Monster || mongoose.model("Monster", MonsterSchema);
