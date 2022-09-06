import React, { useState } from "react";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function CharacterCard({ race, subrace = [], traits }) {
  const [expanded, setExpanded] = useState(false);

  const raceTraits = traits.filter((trait) =>
    trait.races.some((r) => r.index === race.index)
  );

  const subraceTraits = traits.filter((trait) =>
    trait.subraces.some((r) => r.index === subrace.index)
  );

  let racialTraits = [...raceTraits, ...subraceTraits];

  const handleChangeExpanded = (panel) => (e, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  if (race.index === "dragonborn")
    racialTraits = racialTraits.filter(
      (trait) => !trait.index.includes("draconic-ancestry-")
    );

  return (
    <div className="text-black">
      <div className="justify-between-align-center flex w-full">
        <div className="grow">
          <h4 className="text-2xl">{subrace.name || race.name}</h4>
          <p className="text-gray-500">
            {subrace.source_book || race.source_book}
          </p>
          <p className="my-2">{race.brief}</p>
        </div>
        <img
          className="ml-3 h-[100px] w-[100px]"
          name={subrace.name || race.name}
          src={`/images/${subrace.index || race.index}-avatar.jpeg`}
          alt={`${subrace.name || race.name} Avatar`}
        />
      </div>
      <p className="my-2">{subrace.desc}</p>

      <p>
        <strong>Traits:</strong>{" "}
        {race.index === "human"
          ? "+1 to All Ability Scores, Extra Language"
          : racialTraits.map((trait) => trait.name).join(", ")}
      </p>

      <p className="py-3">
        <strong>Ability Score Increase: </strong>
        {race.index === "human"
          ? "Your ability scores each increase by 1."
          : race.ability_bonuses
              .map((ab) => `+${ab.bonus} ${ab.ability_score.name}`)
              .join(", ")}
        {subrace.ability_bonuses &&
          `, ${subrace.ability_bonuses
            .map((ab) => `+${ab.bonus} ${ab.ability_score.name}`)
            .join(", ")}`}
      </p>

      {/* Language */}
      <Accordion
        className="mb-3"
        expanded={expanded === "language"}
        onChange={handleChangeExpanded("language")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`${subrace.index || race.index}d-content`}
          id={`${subrace.index || race.index}d-header`}
        >
          <p>
            <strong>Languages</strong>
          </p>
        </AccordionSummary>
        <AccordionDetails>
          <p>{race.language_desc}</p>
        </AccordionDetails>
      </Accordion>

      {/* Racial Traits */}
      {race.index !== "human"
        ? racialTraits.map((trait) => (
            <Accordion
              className="mb-3"
              key={trait.name}
              expanded={expanded === trait.name}
              onChange={handleChangeExpanded(trait.name)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`${trait.name}d-content`}
                id={`${trait.name}d-header`}
              >
                <p>
                  <strong>{trait.name}</strong>
                </p>
              </AccordionSummary>
              <AccordionDetails>
                <p>{racialTraits.find((t) => t.index === trait.index).desc}</p>
              </AccordionDetails>
            </Accordion>
          ))
        : null}
    </div>
  );
}
