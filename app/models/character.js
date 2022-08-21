const mongoose = require("mongoose");

const CharacterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  race: String,
  class: String,
  level: {
    type: Number,
    default: 1,
  },
  xp: {
    type: Number,
    default: 1,
  },
  strength: {
    type: Number,
    default: 0,
  },
  dexterity: {
    type: Number,
    default: 0,
  },
  constitution: {
    type: Number,
    default: 0,
  },
  intelligence: {
    type: Number,
    default: 0,
  },
  wisdom: {
    type: Number,
    default: 0,
  },
  charisma: {
    type: Number,
    default: 0,
  },
  strength_mod: {
    type: Number,
    default: 0,
  },
  dexterity_mod: {
    type: Number,
    default: 0,
  },
  constitution_mod: {
    type: Number,
    default: 0,
  },
  intelligence_mod: {
    type: Number,
    default: 0,
  },
  wisdom_mod: {
    type: Number,
    default: 0,
  },
  charisma_mod: {
    type: Number,
    default: 0,
  },
  languages: {
    type: Array,
    default: ["Common"],
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
});

module.exports =
  mongoose.models.Character || mongoose.model("Character", CharacterSchema);
