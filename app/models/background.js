const mongoose = require("mongoose");

const BackgroundSchema = new mongoose.Schema({
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
  starting_proficiencies: {
    type: Array,
    required: true,
  },
  language_options: {
    choose: Number,
    type: { type: String },
    from: Array,
  },
  starting_equipment_desc: {
    type: String,
    required: true,
  },
  starting_equipment: {
    type: Array,
    required: true,
  },
  starting_equipment_options: Array,
  feature: {
    name: {
      type: String,
      required: true,
    },
    desc: {
      type: Array,
      required: true,
    },
  },
  suggested_characteristics: {
    type: String,
    required: true,
  },
  personality_traits: {
    choose: Number,
    type: { type: String },
    from: Array,
  },
  ideals: {
    choose: Number,
    type: { type: String },
    from: Array,
  },
  bonds: {
    choose: Number,
    type: { type: String },
    from: Array,
  },
  flaws: {
    choose: Number,
    type: { type: String },
    from: Array,
  },
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

module.exports =
  mongoose.models.Background || mongoose.model("Background", BackgroundSchema);
