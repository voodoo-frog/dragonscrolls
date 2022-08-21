const mongoose = require("mongoose");

const MagicItemSchema = new mongoose.Schema({
  index: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  equipment_category: {
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
  rarity: {
    name: {
      type: String,
      required: true,
    },
  },
  variants: {
    type: Array,
    required: true,
  },
  variant: {
    type: Boolean,
    required: true,
  },
  desc: {
    type: Array,
    required: true,
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
  mongoose.models.MagicItem || mongoose.model("MagicItem", MagicItemSchema);
