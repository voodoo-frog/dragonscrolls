const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");

const models = require("./app/models");

const AbilityScore = require("./app/models/ability_score");
const Alignment = require("./app/models/alignment");
const Background = require("./app/models/background");
const Class = require("./app/models/class");
const Condition = require("./app/models/condition");
const DamageType = require("./app/models/damage_type");
const Equipment = require("./app/models/equipment");
const EquipmentCategory = require("./app/models/equipment_category");
const Feat = require("./app/models/feat");
const Feature = require("./app/models/feature");
const Language = require("./app/models/language");
const Level = require("./app/models/level");
const MagicItem = require("./app/models/magic_item");
const MagicSchool = require("./app/models/magic_school");
const Monster = require("./app/models/monster");
const Proficiency = require("./app/models/proficiency");
const Race = require("./app/models/race");
const Rule = require("./app/models/rule");
const RuleSection = require("./app/models/rule_section");
const Skill = require("./app/models/skill");
const Spell = require("./app/models/spell");
const Subclass = require("./app/models/subclass");
const Subrace = require("./app/models/subrace");
const Trait = require("./app/models/trait");
const User = require("./app/models/user");
const WeaponProperty = require("./app/models/weapon_property");

// Load env variables
dotenv.config({ path: __dirname + "/.env" });
// Connect to DB
mongoose
  .connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("DB Connected"))
  .catch((error) => console.log("DB Connection Failed", error.message));

// Read JSON files
const ability_scores = JSON.parse(
  fs.readFileSync(`${__dirname}/app/_data/ability_scores.json`, "utf-8")
);
const alignments = JSON.parse(
  fs.readFileSync(`${__dirname}/app/_data/alignments.json`, "utf-8")
);
const backgrounds = JSON.parse(
  fs.readFileSync(`${__dirname}/app/_data/backgrounds.json`, "utf-8")
);
const classes = JSON.parse(
  fs.readFileSync(`${__dirname}/app/_data/classes.json`, "utf-8")
);
const conditions = JSON.parse(
  fs.readFileSync(`${__dirname}/app/_data/conditions.json`, "utf-8")
);
const damage_types = JSON.parse(
  fs.readFileSync(`${__dirname}/app/_data/damage_types.json`, "utf-8")
);
const equipment_categories = JSON.parse(
  fs.readFileSync(`${__dirname}/app/_data/equipment_categories.json`, "utf-8")
);
const equipment = JSON.parse(
  fs.readFileSync(`${__dirname}/app/_data/equipment.json`, "utf-8")
);
const feats = JSON.parse(
  fs.readFileSync(`${__dirname}/app/_data/feats.json`, "utf-8")
);
const features = JSON.parse(
  fs.readFileSync(`${__dirname}/app/_data/features.json`, "utf-8")
);
const languages = JSON.parse(
  fs.readFileSync(`${__dirname}/app/_data/languages.json`, "utf-8")
);
const levels = JSON.parse(
  fs.readFileSync(`${__dirname}/app/_data/levels.json`, "utf-8")
);
const magic_items = JSON.parse(
  fs.readFileSync(`${__dirname}/app/_data/magic_items.json`, "utf-8")
);
const magic_schools = JSON.parse(
  fs.readFileSync(`${__dirname}/app/_data/magic_schools.json`, "utf-8")
);
const monsters = JSON.parse(
  fs.readFileSync(`${__dirname}/app/_data/monsters.json`, "utf-8")
);
const proficiencies = JSON.parse(
  fs.readFileSync(`${__dirname}/app/_data/proficiencies.json`, "utf-8")
);
const races = JSON.parse(
  fs.readFileSync(`${__dirname}/app/_data/races.json`, "utf-8")
);
const rule_sections = JSON.parse(
  fs.readFileSync(`${__dirname}/app/_data/rule_sections.json`, "utf-8")
);
const rules = JSON.parse(
  fs.readFileSync(`${__dirname}/app/_data/rules.json`, "utf-8")
);
const skills = JSON.parse(
  fs.readFileSync(`${__dirname}/app/_data/skills.json`, "utf-8")
);
const spells = JSON.parse(
  fs.readFileSync(`${__dirname}/app/_data/spells.json`, "utf-8")
);
const subclasses = JSON.parse(
  fs.readFileSync(`${__dirname}/app/_data/subclasses.json`, "utf-8")
);
const subraces = JSON.parse(
  fs.readFileSync(`${__dirname}/app/_data/subraces.json`, "utf-8")
);
const traits = JSON.parse(
  fs.readFileSync(`${__dirname}/app/_data/traits.json`, "utf-8")
);
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/app/_data/users.json`, "utf-8")
);
const weapon_properties = JSON.parse(
  fs.readFileSync(`${__dirname}/app/_data/weapon_properties.json`, "utf-8")
);

// Import into DB
const importData = async () => {
  try {
    await AbilityScore.insertMany(ability_scores);
    await Alignment.insertMany(alignments);
    await Background.insertMany(backgrounds);
    await Class.insertMany(classes);
    await Condition.insertMany(conditions);
    await DamageType.insertMany(damage_types);
    await EquipmentCategory.insertMany(equipment_categories);
    await Equipment.insertMany(equipment);
    await Feat.insertMany(feats);
    await Feature.insertMany(features);
    await Language.insertMany(languages);
    await Level.insertMany(levels);
    await MagicItem.insertMany(magic_items);
    await MagicSchool.insertMany(magic_schools);
    await Monster.insertMany(monsters);
    await Proficiency.insertMany(proficiencies);
    await Race.insertMany(races);
    await RuleSection.insertMany(rule_sections);
    await Rule.insertMany(rules);
    await Skill.insertMany(skills);
    await Spell.insertMany(spells);
    await Subclass.insertMany(subclasses);
    await Subrace.insertMany(subraces);
    await Trait.insertMany(traits);
    await User.insertMany(users);
    await WeaponProperty.insertMany(weapon_properties);

    console.log("Data Imported...".green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete data
const deleteData = async () => {
  try {
    models.forEach(async (model) => {
      await model.deleteMany();
    });

    await User.deleteMany();

    console.log("Data Destroyed...".red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
