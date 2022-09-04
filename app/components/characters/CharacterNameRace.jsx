import { useState } from "react";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import CharacterNameRaceLayout from "./CharacterNameRaceLayout";
import CharacterSelectRace from "./CharacterSelectRace";

import Dragonborn from "./race/Dragonborn";
import HalfElf from "./race/HalfElf";
import Human from "./race/Human";

export default function CharacterNameRace({
  character,
  setCharacter,
  abilityScores,
  languages,
  races,
  skills,
  subraces,
  traits,
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRace, setSelectedRace] = useState({});
  const [selectedSubrace, setSelectedSubrace] = useState({});
  const [displaySubrace, setDisplaySubrace] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [changeRace, setChangeRace] = useState(false);

  let raceDetails;

  // console.log('abilityScores', abilityScores);
  // console.log('languages', languages);
  // console.log("races", races);
  // console.log('skills', skills);
  // console.log("subraces", subraces);
  // console.log("traits", traits);

  const handleSelection = (race, subrace = "") => {
    setSelectedRace(race);
    setSelectedSubrace(subrace);
    setDisplaySubrace(race.index);

    setModalOpen(true);
  };

  const handleSubraceSelection = (race) => {
    race !== displaySubrace ? setDisplaySubrace(race) : setDisplaySubrace("");
  };

  const handleSelectRace = () => {
    setCharacter({
      ...character,
      race: selectedRace.index,
      subrace: selectedSubrace.index || null,
    });

    setModalOpen(false);
    setChangeRace(false);
    setDisplaySubrace("");
  };

  const handleChangeExpanded = (panel) => (e, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  switch (character.race) {
    case "dragonborn":
      raceDetails = (
        <Dragonborn
          race={races.find(race => race.index === character.race)}
          traits={traits}
          expanded={expanded}
          handleChangeExpanded={handleChangeExpanded}
        />
      );
      break;
    case "half-elf":
      raceDetails = (
        <HalfElf
          race={races.find(race => race.index === character.race)}
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
          race={races.find(race => race.index === character.race)}
          languages={languages}
          expanded={expanded}
          handleChangeExpanded={handleChangeExpanded}
        />
      );
      break;
    // TODO need hill dwarf, high elf, lightfoot & mountain halfling
    default:
      // half-orc, wood elf, rock gnome, tiefling
      raceDetails = traits
        .filter((trait) =>
          trait.races.some((r) => r.index === selectedRace.index)
        )
        .map((trait) => (
          <Accordion
            className="mb-3"
            key={trait.name}
            expanded={expanded === trait.name}
            onChange={handleChangeExpanded(trait.name)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`${trait.name}-content`}
              id={`${trait.name}-header`}
            >
              <p>
                <strong>{trait.name}</strong>
              </p>
            </AccordionSummary>
            <AccordionDetails>
              <p>{traits.find((t) => t.index === trait.index).desc}</p>
            </AccordionDetails>
          </Accordion>
        ));
  }

  return (
    <div className="align-center w-full">
      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control m-0 mb-5 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
          id="floatingInput"
          placeholder="Conan the Barbarian"
          value={character.name}
          onChange={(e) => setCharacter({ ...character, name: e.target.value })}
        />
        <label htmlFor="floatingInput" className="text-gray-700">
          Character Name
        </label>

        {/* No Race Selected */}
        {!character.race && (
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
        {character.race && !changeRace && (
          <CharacterNameRaceLayout
            race={races.find(race => race.index === character.race)}
            subrace={subraces.find(subrace => subrace.index === character.subrace)}
            traits={traits}
            changeRace={() => setChangeRace(true)}
          >
            {raceDetails}
          </CharacterNameRaceLayout>
        )}

        {/* Race Selected - Change Choice */}
        {character.race && changeRace && (
          <>
            <p className="text-lg">Current Race</p>
            <div className="flex items-center">
              <img
                className="h-[80px] w-[80px] rounded-full"
                name={character.subrace || character.race}
                src={`/images/${character.subrace || character.race
                  }-avatar.jpeg`}
                alt={`${character.subrace || character.race} Avatar`}
              />
              <p className="ml-5 text-lg uppercase text-gray-500">
                {character.subrace
                  ? subraces.find(
                    (subrace) => subrace.index === character.subrace
                  ).name
                  : races.find((race) => race.index === character.race).name}
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
                character.subrace
                  ? races
                  : races.filter((race) => race.index !== character.race)
              }
              subraces={
                character.subrace
                  ? subraces.filter(
                    (subrace) => subrace.index !== character.subrace
                  )
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
