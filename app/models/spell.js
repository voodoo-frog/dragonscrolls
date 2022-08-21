const mongoose = require("mongoose");

const SpellSchema = new mongoose.Schema({
  index: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: Array,
    required: true,
  },
  higher_level: Array,
  range: {
    type: String,
    required: true,
  },
  components: {
    type: Array,
    required: true,
  },
  material: String,
  ritual: Boolean,
  duration: String,
  concentration: Boolean,
  casting_time: String,
  level: {
    type: Number,
    required: true,
  },
  heal_at_slot_level: Object,
  area_of_effect: Object,
  attack_type: String,
  damage: Object,
  dc: Object,
  school: {
    index: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  classes: {
    type: Array,
    required: true,
  },
  subclasses: Array,
  url: {
    type: String,
    required: true,
  },
  source_book: {
    type: String,
    required: true,
    default: "Basic Rules",
  },
});

module.exports = mongoose.models.Spell || mongoose.model("Spell", SpellSchema);
