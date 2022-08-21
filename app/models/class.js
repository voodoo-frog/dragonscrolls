const mongoose = require("mongoose");

const ClassSchema = new mongoose.Schema({
  index: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  hit_die: {
    type: Number,
    required: true,
  },
  brief: String,
  desc: String,
  primary_ability: Array,
  proficiency_choices: Array,
  proficiencies: Array,
  saving_throws: Array,
  starting_equipment: Array,
  starting_equipment_options: Array,
  class_levels: {
    type: String,
    required: true,
  },
  multi_classing: {
    prerequisites: Array,
    prerequisite_options: {
      type: {
        type: String,
      },
      choose: Number,
      from: Array,
    },
  },
  subclasses: Array,
  spellcasting: Object,
  spells: String,
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

module.exports = mongoose.models.Class || mongoose.model("Class", ClassSchema);
