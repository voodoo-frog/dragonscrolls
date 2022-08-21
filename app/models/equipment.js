const mongoose = require("mongoose");

const EquipmentSchema = new mongoose.Schema({
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
  armor_category: String,
  gear_category: {
    index: String,
    name: String,
    url: String,
  },
  tool_category: String,
  vehicle_category: String,
  weapon_category: String,
  weapon_range: String,
  category_range: String,
  cost: {
    quantity: Number,
    unit: String,
  },
  contents: Array,
  speed: {
    quantity: Number,
    unit: String,
  },
  capacity: String,
  damage: {
    damage_dice: String,
    damage_type: {
      index: String,
      name: String,
      url: String,
    },
  },
  range: {
    normal: Number,
    long: Number,
  },
  weight: Number,
  desc: Array,
  properties: Array,
  url: {
    type: String,
    required: true,
  },
  special: Array,
  source_book: {
    type: String,
    required: true,
    default: "Basic Rules",
  },
});

module.exports =
  mongoose.models.Equipment || mongoose.model("Equipment", EquipmentSchema);
