import React, { useState } from "react";

import { AccordionItem } from "~/lib/common";

export default function CharacterCard({ race, subrace = {}, traits }) {
  const [expanded, setExpanded] = useState(false);

  const raceTraits = traits.filter((trait) =>
    trait.races.some((r) => r.index === race.index)
  );

  const subraceTraits = traits.filter((trait) =>
    trait.subraces.some((r) => r.index === subrace.index)
  );

  let racialTraits = [...raceTraits, ...subraceTraits];

  const handleChangeExpanded = (value) => {
    setExpanded(value !== expanded ? value : false);
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
          <p className="mb-3 text-sm italic text-gray-500">
            Source: {subrace.source_book || race.source_book}
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

      <div className="accordion m-4">
        {/* Language */}
        <AccordionItem
          title='Languages'
          expanded={expanded === 'language'}
          onClick={() => handleChangeExpanded('language')}
        >
          <p>{race.language_desc}</p>
        </AccordionItem>

        {/* Racial Traits */}
        {race.index !== "human"
          && racialTraits.map((trait) => (
            <AccordionItem
              key={trait.index}
              title={trait.name}
              expanded={expanded === trait.name}
              onClick={() => handleChangeExpanded(trait.name)}
            >
              <p>{racialTraits.find((t) => t.index === trait.index).desc}</p>
            </AccordionItem>
          ))}
      </div>
    </div>
  );
}
