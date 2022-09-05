import { useState } from "react";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import {
  CharacterCreationAbilityScore,
  CharacterCreationFeature,
  CharacterCreationLanguages,
} from "~/lib/common";

export default function Dwarf({
  character,
  setCharacter,
  race,
  subrace,
  traits,
  expanded,
  handleChangeExpanded,
}) {
  const [toolProficiency, setToolProficiency] = useState("");

  const handleChangeToolProficiency = (e) => {
    const { value } = e.target;
    setToolProficiency(value);

    setCharacter({
      ...character,
      raceDetails: {
        ...character.raceDetails,
        toolProficiency: value,
      },
    });
  };

  return (
    <>
      <CharacterCreationAbilityScore
        race={race}
        expanded={expanded}
        handleChangeExpanded={handleChangeExpanded}
      />

      <CharacterCreationLanguages
        race={race}
        expanded={expanded}
        handleChangeExpanded={handleChangeExpanded}
      />

      <CharacterCreationFeature
        traits={traits}
        name="Darkvision"
        index="darkvision"
        expanded={expanded}
        handleChangeExpanded={handleChangeExpanded}
      />

      <CharacterCreationFeature
        traits={traits}
        name="Dwarven Combat Training"
        index="dwarven-combat-training"
        expanded={expanded}
        handleChangeExpanded={handleChangeExpanded}
      />

      <CharacterCreationFeature
        traits={traits}
        name="Dwarven Resilience"
        index="dwarven-resilience"
        expanded={expanded}
        handleChangeExpanded={handleChangeExpanded}
      />

      <CharacterCreationFeature
        traits={traits}
        name="Stonecunning"
        index="stonecunning"
        expanded={expanded}
        handleChangeExpanded={handleChangeExpanded}
      />

      <CharacterCreationFeature
        traits={traits}
        name="Tool Proficiency"
        index="tool-proficiency"
        expanded={expanded}
        error={toolProficiency === ""}
        handleChangeExpanded={handleChangeExpanded}
      >
        <FormControl fullWidth>
          <InputLabel id="tool-proficiency-label">
            Choose an Artisan's Tool
          </InputLabel>
          <Select
            labelId="tool-proficiency-label"
            id="tool-proficiency"
            value={toolProficiency}
            label="Choose an Artisan's Tool"
            onChange={handleChangeToolProficiency}
          >
            <MenuItem value="smiths-tools">Smith's Tools</MenuItem>
            <MenuItem value="brewers-supplies">Brewer's Supplies</MenuItem>
            <MenuItem value="masons-tools">Mason's Tools</MenuItem>
          </Select>
        </FormControl>
      </CharacterCreationFeature>

      {traits
        .filter((trait) =>
          trait.subraces.some((r) => r.index === subrace.index)
        )
        .map((trait) => (
          <CharacterCreationFeature
            key={trait.index}
            traits={traits}
            name={trait.name}
            index={trait.index}
            expanded={expanded}
            handleChangeExpanded={handleChangeExpanded}
          />
        ))}
    </>
  );
}
