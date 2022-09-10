import { useState } from "react";

import ClassReview from "./classes/ClassReview";
import ClassSelect from "./classes/ClassSelect";

import Artificer from "./classes/Artificer";
import Barbarian from "./classes/Barbarian";
import Bard from "./classes/Bard";
import Cleric from "./classes/Cleric";
import Druid from "./classes/Druid";
import Fighter from "./classes/Fighter";
import Monk from "./classes/Monk";
import Paladin from "./classes/Paladin";
import Ranger from "./classes/Ranger";
import Rogue from "./classes/Rogue";
import Sorcerer from "./classes/Sorcerer";
import Warlock from "./classes/Warlock";
import Wizard from "./classes/Wizard";

import { classFeatures, subclassFeatures, sorter } from "~/lib/common";

export default function CharacterClass({
  character,
  setCharacter,
  classes,
  subclasses,
  skills,
  spells,
  feats,
  features,
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState({});
  const [selectedSubclass, setSelectedSubclass] = useState({});
  const [expanded, setExpanded] = useState(false);
  const [changeClass, setChangeClass] = useState(false);

  const {
    class: { ability_score_improvements },
    level,
  } = character;

  const lvl4ASIComplete = Boolean(
    level >= 4 &&
      ability_score_improvements["4th"].option &&
      (ability_score_improvements["4th"].feat ||
        (ability_score_improvements["4th"].first &&
          ability_score_improvements["4th"].second))
  );

  const lvl6ASIComplete = Boolean(
    (level >= 6 && character.class.index !== "fighter") ||
      (ability_score_improvements["6th"]?.option &&
        (ability_score_improvements["6th"]?.feat ||
          (ability_score_improvements["6th"]?.first &&
            ability_score_improvements["6th"]?.second)) &&
        lvl4ASIComplete)
  );

  const lvl8ASIComplete = Boolean(
    level >= 8 &&
      ability_score_improvements["8th"].option &&
      (ability_score_improvements["8th"].feat ||
        (ability_score_improvements["8th"].first &&
          ability_score_improvements["8th"].second)) &&
      lvl6ASIComplete
  );

  const lvl12ASIComplete = Boolean(
    level >= 12 &&
      ability_score_improvements["12th"].option &&
      (ability_score_improvements["12th"].feat ||
        (ability_score_improvements["12th"].first &&
          ability_score_improvements["12th"].second)) &&
      lvl8ASIComplete
  );

  const lvl14ASIComplete = Boolean(
    (level >= 14 && character.class.index !== "fighter") ||
      (ability_score_improvements["14th"]?.option &&
        (ability_score_improvements["14th"]?.feat ||
          (ability_score_improvements["14th"]?.first &&
            ability_score_improvements["14th"]?.second)) &&
        lvl12ASIComplete)
  );

  const lvl16ASIComplete = Boolean(
    level >= 16 &&
      ability_score_improvements["16th"].option &&
      (ability_score_improvements["16th"].feat ||
        (ability_score_improvements["16th"].first &&
          ability_score_improvements["16th"].second)) &&
      lvl14ASIComplete
  );

  const lvl19ASIComplete = Boolean(
    level >= 19 &&
      ability_score_improvements["19th"].option &&
      (ability_score_improvements["19th"].feat ||
        (ability_score_improvements["19th"].first &&
          ability_score_improvements["19th"].second)) &&
      lvl16ASIComplete
  );

  let asiComplete = false;

  if (level >= 19) {
    asiComplete = lvl19ASIComplete;
  } else if (level >= 16) {
    asiComplete = lvl16ASIComplete;
  } else if (level >= 14) {
    asiComplete = lvl14ASIComplete;
  } else if (level >= 12) {
    asiComplete = lvl12ASIComplete;
  } else if (level >= 8) {
    asiComplete = lvl8ASIComplete;
  } else if (level >= 6) {
    asiComplete = lvl6ASIComplete;
  } else if (level >= 4) {
    asiComplete = lvl4ASIComplete;
  }

  const handleSelection = (mainClass, subclass = "") => {
    setSelectedClass(mainClass);
    setSelectedSubclass(subclass);

    setModalOpen(true);
  };

  const handleSelectClass = async () => {
    const classSelection = {
      ...character,
      class: {
        index: selectedClass.index,
        subclass: selectedSubclass.index || null,
        ability_score_improvements: {
          "4th": {
            option: "",
            feat: "",
            first: "",
            second: "",
          },
          "8th": {
            option: "",
            feat: "",
            first: "",
            second: "",
          },
          "12th": {
            option: "",
            feat: "",
            first: "",
            second: "",
          },
          "16th": {
            option: "",
            feat: "",
            first: "",
            second: "",
          },
          "19th": {
            option: "",
            feat: "",
            first: "",
            second: "",
          },
        },
        proficiencies: {
          armor: selectedClass.proficiencies
            .filter((prof) => prof.category === "armor")
            .map((prof) => prof.index),
          weapons: selectedClass.proficiencies
            .filter((prof) => prof.category === "weapon")
            .map((prof) => prof.index),
          tools: selectedClass.proficiencies
            .filter((prof) => prof.category === "tool")
            .map((prof) => prof.index),
          skills: [],
          instruments: [],
          artisans_tools: [],
        },
        details: {},
      },
      equipment: selectedClass.starting_equipment,
    };

    await setCharacter(classSelection);
    setModalOpen(false);
    setChangeClass(false);
  };

  const handleChangeExpanded = (panel) => (e, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const fullFeatures = [...classFeatures(features, character.class.index)];

  if (character.class.subclass)
    fullFeatures.push(...subclassFeatures(features, character.class.subclass));

  sorter(fullFeatures, "level", true);

  let classDetails;
  switch (character.class.index) {
    case "artificer":
      classDetails = (
        <Artificer
          character={character}
          setCharacter={setCharacter}
          asiComplete={asiComplete}
          feats={feats}
          features={fullFeatures}
          spells={spells}
          subclasses={subclasses.filter(
            (subclass) => subclass.class.index === character.class.index
          )}
          expanded={expanded}
          handleChangeExpanded={handleChangeExpanded}
        />
      );
      break;
    case "barbarian":
      classDetails = (
        <Barbarian
          character={character}
          setCharacter={setCharacter}
          subclasses={subclasses.filter(
            (subclass) => subclass.class.index === character.class.index
          )}
          feats={feats}
          asiComplete={asiComplete}
          features={fullFeatures}
          expanded={expanded}
          handleChangeExpanded={handleChangeExpanded}
        />
      );
      break;
    case "bard":
      classDetails = (
        <Bard
          character={character}
          setCharacter={setCharacter}
          asiComplete={asiComplete}
          feats={feats}
          features={fullFeatures}
          skills={skills}
          spells={spells}
          subclasses={subclasses.filter(
            (subclass) => subclass.class.index === character.class.index
          )}
          expanded={expanded}
          handleChangeExpanded={handleChangeExpanded}
        />
      );
      break;
    case "cleric":
      classDetails = (
        <Cleric
          character={character}
          setCharacter={setCharacter}
          asiComplete={asiComplete}
          feats={feats}
          features={fullFeatures}
          spells={spells}
          subclasses={subclasses.filter(
            (subclass) => subclass.class.index === character.class.index
          )}
          expanded={expanded}
          handleChangeExpanded={handleChangeExpanded}
        />
      );
      break;
    case "druid":
      classDetails = (
        <Druid
          character={character}
          setCharacter={setCharacter}
          asiComplete={asiComplete}
          feats={feats}
          features={fullFeatures}
          spells={spells}
          subclasses={subclasses.filter(
            (subclass) => subclass.class.index === character.class.index
          )}
          expanded={expanded}
          handleChangeExpanded={handleChangeExpanded}
        />
      );
      break;
    case "fighter":
      classDetails = (
        <Fighter
          character={character}
          setCharacter={setCharacter}
          subclasses={subclasses.filter(
            (subclass) => subclass.class.index === character.class.index
          )}
          feats={feats}
          asiComplete={asiComplete}
          features={fullFeatures}
          expanded={expanded}
          handleChangeExpanded={handleChangeExpanded}
        />
      );
      break;
    case "monk":
      classDetails = (
        <Monk
          character={character}
          setCharacter={setCharacter}
          subclasses={subclasses.filter(
            (subclass) => subclass.class.index === character.class.index
          )}
          feats={feats}
          asiComplete={asiComplete}
          features={fullFeatures}
          expanded={expanded}
          handleChangeExpanded={handleChangeExpanded}
        />
      );
      break;
    case "paladin":
      classDetails = (
        <Paladin
          character={character}
          setCharacter={setCharacter}
          asiComplete={asiComplete}
          feats={feats}
          features={fullFeatures}
          spells={spells}
          subclasses={subclasses.filter(
            (subclass) => subclass.class.index === character.class.index
          )}
          expanded={expanded}
          handleChangeExpanded={handleChangeExpanded}
        />
      );
      break;
    case "ranger":
      classDetails = (
        <Ranger
          character={character}
          setCharacter={setCharacter}
          asiComplete={asiComplete}
          feats={feats}
          features={fullFeatures}
          spells={spells}
          subclasses={subclasses.filter(
            (subclass) => subclass.class.index === character.class.index
          )}
          expanded={expanded}
          handleChangeExpanded={handleChangeExpanded}
        />
      );
      break;
    case "rogue":
      classDetails = (
        <Rogue
          character={character}
          setCharacter={setCharacter}
          subclasses={subclasses.filter(
            (subclass) => subclass.class.index === character.class.index
          )}
          feats={feats}
          features={fullFeatures}
          asiComplete={asiComplete}
          skills={skills}
          expanded={expanded}
          handleChangeExpanded={handleChangeExpanded}
        />
      );
      break;
    case "sorcerer":
      classDetails = (
        <Sorcerer
          character={character}
          setCharacter={setCharacter}
          asiComplete={asiComplete}
          feats={feats}
          features={fullFeatures}
          spells={spells}
          subclasses={subclasses.filter(
            (subclass) => subclass.class.index === character.class.index
          )}
          expanded={expanded}
          handleChangeExpanded={handleChangeExpanded}
        />
      );
      break;
    case "warlock":
      classDetails = (
        <Warlock
          character={character}
          setCharacter={setCharacter}
          asiComplete={asiComplete}
          feats={feats}
          features={fullFeatures}
          spells={spells}
          subclasses={subclasses.filter(
            (subclass) => subclass.class.index === character.class.index
          )}
          expanded={expanded}
          handleChangeExpanded={handleChangeExpanded}
        />
      );
      break;
    case "wizard":
      classDetails = (
        <Wizard
          character={character}
          setCharacter={setCharacter}
          asiComplete={asiComplete}
          feats={feats}
          features={fullFeatures}
          spells={spells}
          subclasses={subclasses.filter(
            (subclass) => subclass.class.index === character.class.index
          )}
          expanded={expanded}
          handleChangeExpanded={handleChangeExpanded}
        />
      );
      break;
    default:
      break;
  }

  // TODO complete Artificer class
  // TODO complete Bard class
  // TODO complete Cleric class
  // TODO complete Druid class
  // TODO complete Paladin class
  // TODO complete Ranger class
  // TODO complete Sorcerer class
  // TODO complete Warlock class
  // TODO complete Wizard class

  return (
    <div className="align-center w-full">
      <div className="form-floating mb-3">
        {/* No Class Selected */}
        {!character.class.index && (
          <ClassSelect
            changeClass={changeClass}
            classes={classes}
            features={features}
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            selectedClass={selectedClass}
            handleSelectClass={handleSelectClass}
            handleSelection={handleSelection}
          />
        )}

        {/* Class Selected */}
        {character.class.index && !changeClass && (
          <ClassReview
            character={character}
            setCharacter={setCharacter}
            mainClass={classes.find((c) => c.index === character.class.index)}
            subclass={subclasses.find(
              (subclass) => subclass.index === character.class.subclass
            )}
            changeClass={() => setChangeClass(true)}
            expanded={expanded}
            handleChangeExpanded={handleChangeExpanded}
          >
            {classDetails}
          </ClassReview>
        )}

        {/* Class Change */}
        {character.class.index && changeClass && (
          <>
            <p className="text-lg">Current Class</p>
            <div className="flex items-center">
              <img
                className="h-[80px] w-[80px] rounded-full"
                name={character.class.index}
                src={`/images/${character.class.index}-emblem-color.jpeg`}
                alt={`${character.class.index} Avatar`}
              />
              <p className="ml-5 text-lg uppercase text-gray-500">
                {classes.find((c) => c.index === character.class.index).name}
              </p>

              <button
                className="ml-auto rounded bg-red-500 p-2 text-white hover:bg-red-600"
                onClick={() => setChangeClass(false)}
              >
                Keep Class
              </button>
            </div>

            <ClassSelect
              changeClass={changeClass}
              classes={classes.filter((c) => c.index !== character.class.index)}
              features={features}
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
              selectedClass={selectedClass}
              handleSelectClass={handleSelectClass}
              handleSelection={handleSelection}
            />
          </>
        )}
      </div>
    </div>
  );
}
