import React from "react";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function ClassReview({
  character,
  setCharacter,
  mainClass,
  subclass = {},
  changeClass,
  features,
  expanded,
  handleChangeExpanded,
  children,
}) {
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

  const profChoices = proficiency_choices[0].from.map((skill) => skill.name);

  const skills =
    name === "Bard"
      ? "Choose any three"
      : `Choose ${proficiency_choices[0].choose} from ${profChoices.join(
        ", "
      )}`;

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
          <p className="text-gray-500">{subclass.source_book || source_book}</p>
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

      <div class="flex justify-start">
        <div class="mb-3 xl:w-96">
          <label htmlFor="level" className="font-bold">
            Level:
          </label>
          <select
            id="level"
            class="
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
          <div className="flex w-full justify-between">
            <div>
              <strong>Proficiencies</strong>
              <p className="text-sm text-gray-500">Level 1</p>
            </div>
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
          <p>
            <strong>Skills:</strong> {skills}
          </p>
        </AccordionDetails>
      </Accordion>

      {children}
    </div>
  );
}
