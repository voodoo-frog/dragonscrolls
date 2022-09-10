import React from "react";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

import { sorter, alphabetizeNum } from "~/lib/common";
import { CharacterCreationSelect } from "../../../lib/character_creator";

export default function ClassReview({
  character,
  setCharacter,
  mainClass,
  subclass = {},
  changeClass,
  expanded,
  handleChangeExpanded,
  children,
}) {
  const { details } = character.class;

  const handleSelectSkills = (e, opt) => {
    const { value } = e.target;
    const { bonus_skills } = details;

    let old_skill = bonus_skills?.[opt] || '';

    if (old_skill) {
      character.proficiencies.splice(character.proficiencies.indexOf(old_skill), 1);
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
    hit_die,
    brief,
    proficiencies,
    proficiency_choices,
    saving_throws,
    source_book,
  } = mainClass;

  const armors =
    proficiencies
      .filter((prof) => prof.category === "armor")
      .map((res) => res.name)
      .join(", ") || "None";

  const weapons =
    proficiencies
      .filter((prof) => prof.category === "weapon")
      .map((res) => res.name)
      .join(", ") || "None";

  let tools =
    proficiencies
      .filter((prof) => prof.category === "tool")
      .map((res) => res.name)
      .join(", ") || "None";

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
        } else if (character.background.details?.bonus_skills?.includes(index)) {
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
          label: 'Skill',
          value:
            details.bonus_skills?.[opt] ||
            ""
          ,
          onChange: (e) => handleSelectSkills(e, opt),
          options,
        })
      );
    }
  }

  const throws = saving_throws.map((st) => st.name).join(", ");

  if (name === "Bard") tools = "Three musical instruments of your choice";
  if (name === "Monk")
    tools = "One type of artisan's tools or one musical instrument";

  return (
    <div className="text-black">
      <div className="justify-between-align-center flex w-full">
        <div className="grow">
          <h4 className="text-2xl">
            {name} {subclass.name && `(${subclass.flavor_name})`}
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

      <Accordion
        className="mb-3"
        expanded={expanded === "hit-points"}
        onChange={handleChangeExpanded("hit-points")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`hit-points-content`}
          id={`hit-points-header`}
        >
          <div className="flex w-full justify-between">
            <div>
              <strong>Hit Points</strong>
              <p className="text-sm text-gray-500">Level 1</p>
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <p>
            <strong>Hit Points:</strong> 1d{hit_die} per {index} level
          </p>
          <p>
            <strong>Hit Points at 1st Level:</strong> {hit_die} + Constitution
            modifier
          </p>
          <p>
            <strong>Hit Points at Higher Levels:</strong> 1d{hit_die} (or{" "}
            {hit_die / 2 + 1}) + your Constitution modifier per {index} level
            after 1st
          </p>
        </AccordionDetails>
      </Accordion>

      <Accordion
        className="mb-3"
        expanded={expanded === "proficiencies"}
        onChange={handleChangeExpanded("proficiencies")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`proficiencies-content`}
          id={`proficiencies-header`}
        >
          <div className="flex w-full justify-between items-center">
            <div>
              <strong>Proficiencies</strong>
              <p className="text-sm text-gray-500">Level 1</p>
            </div>
            {(!details.bonus_skills || Object.keys(details.bonus_skills).length < skill_choices?.choose) && <WarningAmberIcon sx={{ color: "red" }} />}
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <p>
            <strong>Armor:</strong> {armors}
          </p>
          <p>
            <strong>Weapons:</strong> {weapons}
          </p>
          <p>
            <strong>Tools:</strong> {tools}
          </p>
          <p>
            <strong>Saving Throws:</strong> {throws}
          </p>
          <div>
            <strong>Skills:</strong>
            <p>
              {skill_choices?.from?.length === 18 ? `Choose any ${alphabetizeNum(skill_choices?.choose)} skills:` : `Choose ${alphabetizeNum(skill_choices?.choose)} skills from: ${skill_choices?.from.map(skill => skill.name).join(", ")}`}
            </p>
            {skillSelection}
          </div>
        </AccordionDetails>
      </Accordion>

      {children}
    </div>
  );
}
