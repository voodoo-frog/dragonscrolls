import { useState } from "react";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import {
  CharacterCreationAbilityScore,
  CharacterCreationFeature,
  CharacterCreationLanguages,
} from "~/lib/common";

export default function Elf({
  character,
  setCharacter,
  race,
  subrace,
  languages,
  spells,
  traits,
  expanded,
  handleChangeExpanded,
}) {
  const [cantrip, setCantrip] = useState("");
  const [extraLanguage, setExtraLanguage] = useState("");
  const [expandSpell, setExpandSpell] = useState(false);

  const handleChangeCantrip = (e) => {
    const { value } = e.target;
    setCantrip(value);

    setCharacter({
      ...character,
      raceDetails: {
        ...character.raceDetails,
        cantrip: value,
      },
    });
  };

  const handleChangeLanguage = (e) => {
    const { value } = e.target;
    setExtraLanguage(value);

    setCharacter({
      ...character,
      languages: [...character.languages, value],
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

      {traits
        .filter((trait) => trait.races.some((r) => r.index === "elf"))
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

      {subrace.index === "high-elf" && (
        <>
          <CharacterCreationFeature
            traits={traits}
            name="Elf Weapon Training"
            index="elf-weapon-training"
            expanded={expanded}
            handleChangeExpanded={handleChangeExpanded}
          />

          <CharacterCreationFeature
            traits={traits}
            name="Extra Language"
            index="extra-language"
            error={extraLanguage === ""}
            expanded={expanded}
            handleChangeExpanded={handleChangeExpanded}
          >
            <FormControl fullWidth className="my-3">
              <InputLabel id="extra-language-select-label">
                Choose a Language
              </InputLabel>
              <Select
                labelId="extra-language-select-label"
                id="extra-language-select"
                value={extraLanguage}
                label="Choose a Language"
                onChange={handleChangeLanguage}
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
          </CharacterCreationFeature>
          <CharacterCreationFeature
            traits={traits}
            name="High Elf Cantrip"
            index="high-elf-cantrip"
            expanded={expanded}
            error={cantrip === ""}
            handleChangeExpanded={handleChangeExpanded}
          >
            <FormControl fullWidth className="my-3">
              <InputLabel id="high-elf-cantrip-select-label">
                Choose a Cantrip
              </InputLabel>
              <Select
                labelId="high-elf-cantrip-select-label"
                id="high-elf-cantrip-select"
                value={cantrip}
                label="Choose a Cantrip"
                onChange={handleChangeCantrip}
              >
                {spells
                  .filter((spell) => spell.level === 0)
                  .filter((spell) =>
                    spell.classes.some((c) => c.index === "wizard")
                  )
                  .map((spell) => (
                    <MenuItem key={spell.index} value={spell.index}>
                      {spell.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            {cantrip !== "" && (
              <Accordion
                elevation={0}
                className="my-3"
                expanded={expandSpell}
                onChange={() => setExpandSpell(!expandSpell)}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="expand-spell-content"
                  id="expand-spell-header"
                >
                  <p>
                    <strong>Spell Details</strong>
                  </p>
                </AccordionSummary>
                <AccordionDetails>
                  {spells
                    .find((spell) => spell.index === cantrip)
                    .desc.map((desc, index) => (
                      <p key={index} className="mb-3">
                        {desc}
                      </p>
                    ))}
                </AccordionDetails>
              </Accordion>
            )}
          </CharacterCreationFeature>
        </>
      )}
    </>
  );
}
