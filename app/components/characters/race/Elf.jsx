import { useState } from "react";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import {
  CharacterCreationAbilityScore,
  CharacterCreationFeature,
  CharacterCreationLanguages,
} from "~/lib/character_creator";
import { select } from "~/lib/common";

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
  const { details } = character.race;

  const [expandSpell, setExpandSpell] = useState(false);

  const handleChangeCantrip = (e) => {
    const { value } = e.target;

    setCharacter({
      ...character,
      race: {
        ...character.race,
        details: {
          ...details,
          bonus_spells: [value],
        },
      },
    });
  };

  const handleChangeLanguage = (e) => {
    const { value } = e.target;

    const old_lang = details.bonus_languages?.[0] || "";

    if (old_lang) {
      character.languages.splice(character.languages.indexOf(old_lang), 1);
    }

    setCharacter({
      ...character,
      languages: [...character.languages, value],
      race: {
        ...character.race,
        details: {
          ...details,
          bonus_languages: [value],
        },
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
            error={!details.bonus_languages?.[0]}
            expanded={expanded}
            handleChangeExpanded={handleChangeExpanded}
          >
            {select(
              "Language",
              "language",
              details.bonus_languages?.[0] || "",
              languages.filter(
                (language) =>
                  language.index !== "common" && language.index !== "elvish"
              ),
              handleChangeLanguage
            )}
          </CharacterCreationFeature>

          <CharacterCreationFeature
            traits={traits}
            name="High Elf Cantrip"
            index="high-elf-cantrip"
            expanded={expanded}
            error={!details.bonus_spells?.[0]}
            handleChangeExpanded={handleChangeExpanded}
          >
            {select(
              "Cantrip",
              "cantrip",
              details.bonus_spells?.[0] || "",
              spells
                .filter((spell) => spell.level === 0)
                .filter((spell) =>
                  spell.classes.some((c) => c.index === "wizard")
                ),
              handleChangeCantrip
            )}

            {details.bonus_spells?.[0] && (
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
                    .find((spell) => spell.index === details.bonus_spells[0])
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
