import React, { useState } from "react";

import { sorter } from "~/lib/common";
import { CharacterCreationSelect } from "../../../lib/character_creator";
import { tabs } from "../../../lib/common";
import ClassFeaturesView from "./ClassFeaturesView";
import SpellsView from "./SpellsView";

export default function ClassReview({
  character,
  setCharacter,
  mainClass,
  subclass = {},
  changeClass,
  levels,
  spells,
  expanded,
  handleChangeExpanded,
  children,
}) {
  const { details } = character.class;
  const [currTab, setCurrTab] = useState('Class Features');

  const handleSelectSkills = (e, opt) => {
    const { value } = e.target;
    const { bonus_skills } = details;

    let old_skill = bonus_skills?.[opt] || "";

    if (old_skill) {
      character.proficiencies.splice(
        character.proficiencies.indexOf(old_skill),
        1
      );
    }

    setCharacter((character) => ({
      ...character,
      class: {
        ...character.class,
        details: {
          ...details,
          bonus_skills: {
            ...bonus_skills,
            [opt]: value,
          },
        },
      },
      proficiencies: [...character.proficiencies, value],
    }));
  };

  const {
    name,
    index,
    desc,
    brief,
    proficiency_choices,
    source_book,
  } = mainClass;

  const skill_choices = proficiency_choices.find((pc) => pc.type === "skills");

  const skillSelection = [];
  if (skill_choices) {
    const { choose, from } = skill_choices;
    const { bonus_skills } = details;
    for (let i = 0; i < choose; i++) {
      const idx = i + 1;
      const opt = `option${idx}`;

      const remainingChosenOptions = Object.entries(bonus_skills || {})
        .filter(([key, value]) => key !== opt && !value.includes("option"))
        .map(([key, value]) => value);

      const options = sorter(
        from.filter((skill) => !remainingChosenOptions.includes(skill.index))
      ).map((skill) => {
        const { index, name } = skill;

        let option;

        if (character.race.details?.bonus_skills?.includes(index)) {
          option = (
            <option key={index} value={index} disabled>
              {name} (race)
            </option>
          );
        } else if (
          character.background.details?.bonus_skills?.includes(index)
        ) {
          option = (
            <option key={index} value={index} disabled>
              {name} (background)
            </option>
          );
        } else {
          option = (
            <option key={index} value={index}>
              {name}
            </option>
          );
        }

        return option;
      });

      skillSelection.push(
        CharacterCreationSelect({
          label: "Skill",
          value: details.bonus_skills?.[opt] || "",
          onChange: (e) => handleSelectSkills(e, opt),
          options,
        })
      );
    }
  }

  const handleChangeTab = (e) => {
    const { value } = e.target;

    setCurrTab(value);
  };

  return (
    <div className="text-black">
      <div className="justify-between-align-center flex w-full">
        <div className="grow">
          <h4 className="text-2xl">
            {name} {subclass.name && `(${subclass?.flavor_name})`}
          </h4>
          <p className="mb-3 text-sm italic text-gray-500">
            Source: {subclass.source_book || source_book}
          </p>
          <p className="my-2">{brief}</p>
        </div>
        <div className="ml-3 flex shrink-0 flex-col items-center justify-center p-0">
          <img
            className="h-[100px] w-[100px]"
            name={name}
            src={`/images/${index}-emblem-color.jpeg`}
            alt={`${name} Avatar`}
          />
          <button
            className="text-sm text-blue-500 hover:underline"
            onClick={changeClass}
          >
            Change Class
          </button>
        </div>
      </div>
      <p className="my-2">{desc}</p>

      <div className="flex justify-start">
        <div className="mb-3 xl:w-96">
          <label htmlFor="level" className="font-bold">
            Level:
          </label>
          <select
            id="level"
            className="
              form-select m-0
              block
              w-[70px]
              appearance-none
              rounded
              border
              border-solid
              border-gray-300
              bg-white bg-clip-padding bg-no-repeat
              px-3 py-1.5 text-base
              font-normal
              text-gray-700
              transition
              ease-in-out
              focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none
            "
            aria-label="Default select example"
            value={character.level}
            onChange={(e) =>
              setCharacter({ ...character, level: Number(e.target.value) })
            }
          >
            {Array.from(Array(20).keys()).map((level) => (
              <option key={level} value={level + 1}>
                {level + 1}
              </option>
            ))}
          </select>
        </div>
      </div>

      {mainClass.spellcasting && tabs(['Class Features', 'Spells'], currTab, (e) => handleChangeTab(e))}

      {currTab === 'Class Features' && (
        <>
          <ClassFeaturesView
            character={character}
            mainClass={mainClass}
            details={details}
            expanded={expanded}
            handleChangeExpanded={handleChangeExpanded}
          />
          {children}
        </>
      )}

      {currTab === 'Spells' && (
        <>
          <SpellsView
            character={character}
            levels={sorter(levels.filter((l) => l.class.index === character.class.index), 'level', true)}
            spells={spells}
            expanded={expanded}
            handleChangeExpanded={handleChangeExpanded}
          />
        </>
      )}
    </div>
  );
}
