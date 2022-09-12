import WarningAmberIcon from "@mui/icons-material/WarningAmber";

import { sorter, alphabetizeNum, Accordion } from "~/lib/common";
import { CharacterCreationSelect } from "../../../lib/character_creator";

export default function ClassFeaturesView({
  character,
  setCharacter,
  mainClass,
  details,
  expanded,
  handleChangeExpanded,
}) {
  const {
    name,
    index,
    hit_die,
    proficiencies,
    proficiency_choices,
    saving_throws,
    children,
  } = mainClass;

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

  const throws = saving_throws.map((st) => st.name).join(", ");

  if (name === "Bard") tools = "Three musical instruments of your choice";
  if (name === "Monk")
    tools = "One type of artisan's tools or one musical instrument";


  return (
    <>
      <Accordion
        title={
          <div className="flex w-full justify-between">
            <div>
              <strong>Hit Points</strong>
              <p className="text-sm text-gray-500">Level 1</p>
            </div>
          </div>
        }
        expanded={expanded === 'hit-points'}
        onClick={() => handleChangeExpanded('hit-points')}
      >
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
      </Accordion>

      <Accordion
        title={
          <div className="flex w-full items-center justify-between">
            <div>
              <strong>Proficiencies</strong>
              <p className="text-sm text-gray-500">Level 1</p>
            </div>
            {(!details.bonus_skills ||
              Object.keys(details.bonus_skills).length <
              skill_choices?.choose) && (
                <WarningAmberIcon sx={{ color: "red" }} />
              )}
          </div>
        }
        expanded={expanded === 'proficiencies'}
        onClick={() => handleChangeExpanded('proficiencies')}
      >
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
            {skill_choices?.from?.length === 18
              ? `Choose any ${alphabetizeNum(skill_choices?.choose)} skills:`
              : `Choose ${alphabetizeNum(
                skill_choices?.choose
              )} skills from: ${skill_choices?.from
                .map((skill) => skill.name)
                .join(", ")}`}
          </p>
          {skillSelection}
        </div>
      </Accordion>

      {children}
    </>
  );
}