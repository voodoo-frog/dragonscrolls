import { useState } from "react";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import {
  CharacterCreationFeature,
  CharacterCreationLanguages,
  CharacterCreationAbilityScore,
} from "~/lib/common";

export default function HalfElf({
  character,
  setCharacter,
  race,
  expanded,
  handleChangeExpanded,
  abilityScores,
  languages,
  skills,
  traits,
}) {
  const [chosenAbilityScores, setChosenAbilityScores] = useState({
    first: "",
    second: "",
  });
  const [chosenSkills, setChosenSkills] = useState({
    first: "",
    second: "",
  });
  const [extraLanguage, setExtraLanguage] = useState("");

  const handleChangeAbilityScore = (e) => {
    const { name, value } = e.target;
    setChosenAbilityScores({
      ...chosenAbilityScores,
      [name]: value,
    });

    setCharacter({
      ...character,
      raceDetails: {
        ...character.raceDetails,
        abilityScores: {
          ...character.raceDetails.abilityScores,
          [name]: value,
        },
      },
    });
  };

  return (
    <>
      <CharacterCreationAbilityScore
        race={race}
        error={
          chosenAbilityScores.first === "" || chosenAbilityScores.second === ""
        }
        expanded={expanded}
        handleChangeExpanded={handleChangeExpanded}
      >
        <FormControl fullWidth className="my-3">
          <InputLabel className="my-3" id="ability-score-1-select-label">
            Choose an Ability Score
          </InputLabel>
          <Select
            className="my-3"
            labelId="ability-score-1-select-label"
            id="ability-score-1-select"
            name="first"
            value={chosenAbilityScores.first}
            label="Choose an Ability Score"
            onChange={handleChangeAbilityScore}
          >
            {abilityScores
              .filter((score) => score.index !== "cha")
              .map((score) => (
                <MenuItem key={score.index} value={score.index}>
                  {score.full_name}
                </MenuItem>
              ))
              .filter(
                (score) => score.props.value !== chosenAbilityScores.second
              )}
          </Select>
        </FormControl>

        <FormControl fullWidth className="my-3">
          <InputLabel id="ability-score-2-select-label">
            Choose an Ability Score
          </InputLabel>
          <Select
            labelId="ability-score-2-select-label"
            id="ability-score-2-select"
            name="second"
            value={chosenAbilityScores.second}
            label="Choose an Ability Score"
            onChange={handleChangeAbilityScore}
          >
            {abilityScores
              .filter((score) => score.index !== "cha")
              .map((score) => (
                <MenuItem key={score.index} value={score.index}>
                  {score.full_name}
                </MenuItem>
              ))
              .filter(
                (score) => score.props.value !== chosenAbilityScores.first
              )}
          </Select>
        </FormControl>
      </CharacterCreationAbilityScore>

      <CharacterCreationLanguages
        race={race}
        error={extraLanguage === ""}
        expanded={expanded}
        handleChangeExpanded={handleChangeExpanded}
      >
        <FormControl fullWidth>
          <InputLabel id="extra-language-select-label">
            Choose a Language
          </InputLabel>
          <Select
            labelId="extra-language-select-label"
            id="extra-language-select"
            value={extraLanguage}
            label="Choose a Language"
            onChange={(e) => setExtraLanguage(e.target.value)}
          >
            {languages
              .filter(
                (language) =>
                  language.index !== "common" && language.index !== "elvish"
              )
              .map((language) => (
                <MenuItem key={language.index} value={language.index}>
                  {language.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </CharacterCreationLanguages>

      <CharacterCreationFeature
        traits={traits}
        name="Darkvision"
        index="darkvision"
        expanded={expanded}
        handleChangeExpanded={handleChangeExpanded}
      />

      <CharacterCreationFeature
        traits={traits}
        name="Fey Ancestry"
        index="fey-ancestry"
        expanded={expanded}
        handleChangeExpanded={handleChangeExpanded}
      />

      <CharacterCreationFeature
        traits={traits}
        name="Skill Versatility"
        index="skill-versatility"
        error={chosenSkills.first === "" || chosenSkills.second === ""}
        expanded={expanded}
        handleChangeExpanded={handleChangeExpanded}
      >
        <FormControl fullWidth className="my-3">
          <InputLabel className="my-3" id="skill-versatility-select-label">
            Choose a Skill
          </InputLabel>
          <Select
            className="my-3"
            labelId="skill-versatility-select-label"
            id="skill-versatility-select"
            name="first"
            value={chosenSkills.first}
            label="Choose a Skill"
            onChange={(e) =>
              setChosenSkills({ ...chosenSkills, first: e.target.value })
            }
          >
            {skills
              .map((skill) => (
                <MenuItem key={skill.index} value={skill.index}>
                  {skill.name}
                </MenuItem>
              ))
              .filter((skill) => skill.props.value !== chosenSkills.second)}
          </Select>
        </FormControl>

        <FormControl fullWidth className="my-3">
          <InputLabel id="skill-versatility-select-label">
            Choose a Skill
          </InputLabel>
          <Select
            labelId="skill-versatility-select-label"
            id="skill-versatility-select"
            name="second"
            value={chosenSkills.second}
            label="Choose a Skill"
            onChange={(e) =>
              setChosenSkills({ ...chosenSkills, second: e.target.value })
            }
          >
            {skills
              .map((skill) => (
                <MenuItem key={skill.index} value={skill.index}>
                  {skill.name}
                </MenuItem>
              ))
              .filter((skill) => skill.props.value !== chosenSkills.first)}
          </Select>
        </FormControl>
      </CharacterCreationFeature>
    </>
  );
}
