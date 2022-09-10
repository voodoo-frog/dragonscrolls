import { useState } from "react";

import CharacterNameRaceReview from "./race/CharacterNameRaceReview";
import CharacterSelectRace from "./race/CharacterSelectRace";

import Default from "./race/Default";
import Dwarf from "./race/Dwarf";
import Dragonborn from "./race/Dragonborn";
import HalfElf from "./race/HalfElf";
import Human from "./race/Human";
import Elf from "./race/Elf";

export default function CharacterNameRace({
  character,
  setCharacter,
  abilityScores,
  languages,
  races,
  skills,
  spells,
  subraces,
  traits,
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRace, setSelectedRace] = useState({});
  const [selectedSubrace, setSelectedSubrace] = useState({});
  const [displaySubrace, setDisplaySubrace] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [changeRace, setChangeRace] = useState(false);

  const { race, ability_scores, name } = character;

  let raceDetails;

  const handleSelection = (race, subrace = "") => {
    setSelectedRace(race);
    setSelectedSubrace(subrace);
    setDisplaySubrace(race.index);

    setModalOpen(true);
  };

  const handleSubraceSelection = (race) => {
    race !== displaySubrace ? setDisplaySubrace(race) : setDisplaySubrace("");
  };

  const handleSelectRace = async () => {
    const newCharacter = {
      ...character,
      race: {
        index: selectedRace.index,
        subrace: selectedSubrace.index || null,
        size: selectedRace.size,
        starting_proficiencies: selectedRace.starting_proficiencies,
        traits: selectedRace.traits.map((trait) => trait.index),
        details: {
          starting_ability_scores: {},
        },
      },
      languages: [],
      proficiencies: [],
      ability_scores: {
        str: 0,
        dex: 0,
        con: 0,
        int: 0,
        wis: 0,
        cha: 0,
      },
    };

    // Ability Score Modifiers
    for (const score in ability_scores) {
      let value = 0;

      if (selectedRace.ability_bonuses) {
        const bonus = selectedRace.ability_bonuses.find(
          (bonus) => bonus.ability_score.index === score
        );

        if (bonus) {
          value += bonus.bonus;
        }
      }

      if (selectedSubrace.ability_bonuses) {
        const bonus = selectedSubrace.ability_bonuses.find(
          (bonus) => bonus.ability_score.index === score
        );

        if (bonus) {
          value += bonus.bonus;
        }
      }
      if (value > 0) {
        newCharacter.race.details.starting_ability_scores[score] = value;
      }

      newCharacter.ability_scores[score] = value;
    }

    // Languages
    if (selectedRace.languages) {
      newCharacter.languages.push(
        ...selectedRace.languages.map((language) => language.index)
      );
    }

    if (selectedSubrace.languages) {
      newCharacter.languages.push(
        ...selectedSubrace.languages.map((language) => language.index)
      );
    }

    await setCharacter(newCharacter);
    setModalOpen(false);
    setChangeRace(false);
    setDisplaySubrace("");
  };

  const handleChangeExpanded = (panel) => (e, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  switch (race.index) {
    case "dragonborn":
      raceDetails = (
        <Dragonborn
          character={character}
          setCharacter={setCharacter}
          race={races.find((r) => r.index === race.index)}
          traits={traits}
          expanded={expanded}
          handleChangeExpanded={handleChangeExpanded}
        />
      );
      break;
    case "dwarf":
      raceDetails = (
        <Dwarf
          character={character}
          setCharacter={setCharacter}
          race={races.find((r) => r.index === race.index)}
          subrace={subraces.find((subrace) => subrace.index === race.subrace)}
          traits={traits}
          expanded={expanded}
          handleChangeExpanded={handleChangeExpanded}
        />
      );
      break;
    case "elf":
      raceDetails = (
        <Elf
          character={character}
          setCharacter={setCharacter}
          race={races.find((r) => r.index === race.index)}
          subrace={subraces.find((subrace) => subrace.index === race.subrace)}
          languages={languages}
          spells={spells}
          traits={traits}
          expanded={expanded}
          handleChangeExpanded={handleChangeExpanded}
        />
      );
      break;
    case "half-elf":
      raceDetails = (
        <HalfElf
          character={character}
          setCharacter={setCharacter}
          race={races.find((r) => r.index === race.index)}
          abilityScores={abilityScores}
          languages={languages}
          skills={skills}
          traits={traits}
          expanded={expanded}
          handleChangeExpanded={handleChangeExpanded}
        />
      );
      break;
    case "human":
      raceDetails = (
        <Human
          character={character}
          setCharacter={setCharacter}
          race={races.find((r) => r.index === race.index)}
          languages={languages}
          expanded={expanded}
          handleChangeExpanded={handleChangeExpanded}
        />
      );
      break;
    default:
      // half-orc, wood elf, lightfoot & mountain halfling, rock gnome, tiefling
      raceDetails = (
        <Default
          traits={traits}
          selectedRace={selectedRace}
          handleChangeExpanded={handleChangeExpanded}
          expanded={expanded}
        />
      );
      break;
  }

  return (
    <div className="align-center w-full">
      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control m-0 mb-5 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
          id="floatingInput"
          placeholder="Conan the Barbarian"
          value={name}
          onChange={(e) => setCharacter({ ...character, name: e.target.value })}
        />
        <label htmlFor="floatingInput" className="text-gray-700">
          Character Name
        </label>

        {/* No Race Selected */}
        {!race.index && (
          <CharacterSelectRace
            changeRace={changeRace}
            races={races}
            subraces={subraces}
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            selectedRace={selectedRace}
            handleSelectRace={handleSelectRace}
            selectedSubrace={selectedSubrace}
            handleSubraceSelection={handleSubraceSelection}
            traits={traits}
            displaySubrace={displaySubrace}
            handleSelection={handleSelection}
          />
        )}

        {/* Race Selected - Summary */}
        {race.index && !changeRace && (
          <CharacterNameRaceReview
            race={races.find((r) => r.index === race.index)}
            subrace={subraces.find((subrace) => subrace.index === race.subrace)}
            traits={traits}
            changeRace={() => setChangeRace(true)}
          >
            {raceDetails}
          </CharacterNameRaceReview>
        )}

        {/* Race Selected - Change Choice */}
        {race.index && changeRace && (
          <>
            <p className="text-lg">Current Race</p>
            <div className="flex items-center">
              <img
                className="h-[80px] w-[80px] rounded-full"
                name={race.subrace || race.index}
                src={`/images/${race.subrace || race.index}-avatar.jpeg`}
                alt={`${race.subrace || race.index} Avatar`}
              />
              <p className="ml-5 text-lg uppercase text-gray-500">
                {race.subrace
                  ? subraces.find((subrace) => subrace.index === race.subrace)
                      .name
                  : races.find((r) => r.index === race.index).name}
              </p>

              <button
                className="ml-auto rounded bg-red-500 p-2 text-white hover:bg-red-600"
                onClick={() => setChangeRace(false)}
              >
                Keep Race
              </button>
            </div>

            <CharacterSelectRace
              changeRace={changeRace}
              races={
                race.subrace ? races : races.filter((r) => r.index !== race)
              }
              subraces={
                race.subrace
                  ? subraces.filter((subrace) => subrace.index !== race.subrace)
                  : subraces
              }
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
              selectedRace={selectedRace}
              handleSelectRace={handleSelectRace}
              selectedSubrace={selectedSubrace}
              handleSubraceSelection={handleSubraceSelection}
              traits={traits}
              displaySubrace={displaySubrace}
              handleSelection={handleSelection}
            />
          </>
        )}
      </div>
    </div>
  );
}
