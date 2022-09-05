import { useState } from "react";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import {
  CharacterCreationAbilityScore,
  CharacterCreationLanguages,
} from "~/lib/common";

export default function Human({
  race,
  expanded,
  handleChangeExpanded,
  languages,
}) {
  const [extraLanguage, setExtraLanguage] = useState("");

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
        error={extraLanguage === ""}
        handleChangeExpanded={handleChangeExpanded}
      >
        <FormControl fullWidth>
          <InputLabel id="skill-versatility-select-label">
            Choose a Language
          </InputLabel>
          <Select
            labelId="skill-versatility-select-label"
            id="skill-versatility-select"
            value={extraLanguage}
            label="Choose a Language"
            onChange={(e) => setExtraLanguage(e.target.value)}
          >
            {languages.map((language) => (
              <MenuItem key={language.index} value={language.index}>
                {language.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </CharacterCreationLanguages>
    </>
  );
}
