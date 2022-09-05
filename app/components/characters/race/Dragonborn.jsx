import { useState } from "react";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import {
  CharacterCreationAbilityScore,
  CharacterCreationFeature,
  CharacterCreationLanguages,
  table,
} from "~/lib/common";

export default function Dragonborn({
  character,
  setCharacter,
  race,
  expanded,
  handleChangeExpanded,
  traits,
}) {
  const [draconicAncestry, setDraconicAncestry] = useState("");

  const handleChangeDraconicAncestry = (e) => {
    const { value } = e.target;

    setDraconicAncestry(value);

    setCharacter({
      ...character,
      raceDetails: {
        ...character.raceDetails,
        draconicAncestry: value,
      },
    });
  };

  const headers = ["Dragon", "Damage Type", "Breath Weapon"];

  const rows = [
    ["Black", "Acid", "5 by 30 ft. line (Dex. save)"],
    ["Blue", "Lightning", "5 by 30 ft. line (Dex. save)"],
    ["Brass", "Fire", "5 by 30 ft. line (Dex. save)"],
    ["Bronze", "Lightning", "5 by 30 ft. line (Dex. save)"],
    ["Copper", "Acid", "5 by 30 ft. line (Dex. save)"],
    ["Gold", "Fire", "15 ft. cone (Dex. save)"],
    ["Green", "Poison", "15 ft. cone (Dex. save)"],
    ["Red", "Fire", "15 ft. cone (Dex. save)"],
    ["Silver", "Cold", "15 ft. cone (Dex. save)"],
    ["White", "Cold", "15 ft. cone (Dex. save)"],
  ];
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
        name="Draconic Ancestry"
        index="draconic-ancestry"
        expanded={expanded}
        error={draconicAncestry === ""}
        handleChangeExpanded={handleChangeExpanded}
      >
        {table(undefined, headers, rows, true)}

        <FormControl fullWidth className="my-3">
          <InputLabel id="draconic-ancestry-select-label">
            Choose an Option
          </InputLabel>
          <Select
            labelId="draconic-ancestry-select-label"
            id="draconic-ancestry-select"
            value={draconicAncestry}
            label="Choose an Option"
            onChange={handleChangeDraconicAncestry}
          >
            <MenuItem value="black">Black</MenuItem>
            <MenuItem value="blue">Blue</MenuItem>
            <MenuItem value="brass">Brass</MenuItem>
            <MenuItem value="bronze">Bronze</MenuItem>
            <MenuItem value="copper">Copper</MenuItem>
            <MenuItem value="gold">Gold</MenuItem>
            <MenuItem value="green">Green</MenuItem>
            <MenuItem value="red">Red</MenuItem>
            <MenuItem value="silver">Silver</MenuItem>
            <MenuItem value="white">White</MenuItem>
          </Select>
        </FormControl>
      </CharacterCreationFeature>

      <CharacterCreationFeature
        traits={traits}
        name="Breath Weapon"
        index="breath-weapon"
        expanded={expanded}
        handleChangeExpanded={handleChangeExpanded}
      />

      <CharacterCreationFeature
        traits={traits}
        name="Damage Resistance"
        index="damage-resistance"
        expanded={expanded}
        handleChangeExpanded={handleChangeExpanded}
      />
    </>
  );
}
