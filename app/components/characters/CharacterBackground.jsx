import { useEffect, useState } from "react";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

import { sorter, alphabetizeNum, select } from "~/lib/common";
import {
  CharacterCreationBackgroundFeature,
  CharacterCreationSelect,
} from "../../lib/character_creator";

export default function CharacterBackground({
  character,
  setCharacter,
  alignments,
  backgrounds,
}) {
  const [background, setBackground] = useState({});
  const [skills, setSkills] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [scExpanded, setScExpanded] = useState(false);

  const {
    starting_proficiencies,
    desc,
    language_options,
    personality_traits,
    feature,
    suggested_characteristics,
    ideals,
    bonds,
    flaws,
  } = background;

  const { bonus_skills } = character.race.details;

  useEffect(() => {
    const { index } = character.background;
    if (index) {
      const bg = backgrounds.find((background) => background.index === index);
      setBackground(bg);

      const bgSkills = bg.starting_proficiencies.filter(
        (bg) => bg.type === "skill"
      );

      setSkills(bgSkills);
    }
  }, [backgrounds, character.background]);

  const handleChangeExpanded = (panel) => (e, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleChangeScExpanded = (panel) => (e, newExpanded) => {
    setScExpanded(newExpanded ? panel : false);
  };

  const handleChangeBackground = (event) => {
    const { value } = event.target;

    const bg = backgrounds.find((background) => background.index === value);

    setBackground(bg);

    const bgSkills = bg.starting_proficiencies.filter(
      (bg) => bg.type === "skill"
    );

    let old_skills = skills;

    if (old_skills) {
      old_skills = old_skills.forEach((skill) => {
        character.proficiencies.splice(
          character.proficiencies.indexOf(skill),
          1
        );
      });
    }

    setSkills(bgSkills);

    setCharacter((character) => ({
      ...character,
      personality_traits: [],
      ideal: "",
      bond: "",
      flaw: "",
      background: {
        index: value,
        skill_proficiencies: bgSkills.reduce((acc, skill) => {
          acc.push(skill.index);
          return acc;
        }, []),
      },
      proficiencies: [
        ...character.proficiencies,
        ...bgSkills.reduce((acc, skill) => {
          acc.push(skill.index);
          return acc;
        }, []),
      ],
    }));
  };

  const handleSelectLanguages = (e, opt) => {
    const { value } = e.target;
    const { bonus_languages } = character.background;

    const oldLang = (bonus_languages && bonus_languages[opt]) || [];

    if (character.languages.includes(oldLang)) {
      character.languages.splice(character.languages.indexOf(oldLang), 1);
    }

    setCharacter((character) => ({
      ...character,
      languages: [...character.languages, value],
      background: {
        ...character.background,
        bonus_languages: {
          ...character.background.bonus_languages,
          [opt]: value,
        },
      },
    }));
  };

  const handlePersonality = (e) => {
    const { value, name } = e.target;
    const { personality_traits } = character;

    if (name === "first") {
      personality_traits[0] = value;
    } else {
      personality_traits[1] = value;
    }

    setCharacter((character) => ({
      ...character,
      personality_traits,
    }));
  };

  const errors = [
    {
      name: "Skills",
      error: [],
    },
    {
      name: "Languages",
      error:
        !character.background.bonus_languages ||
        Object.keys(character.background.bonus_languages).length <
          background.language_options.choose,
    },
    {
      name: "Suggested Characteristics",
      error:
        !character.personality_traits.length > 0 ||
        !character.ideal.length > 0 ||
        !character.bond.length > 0 ||
        !character.flaw.length > 0,
    },
  ];

  if (skills?.length > 0) {
    const skillsArr = skills.map((skill) => skill.index);

    const duplicates = bonus_skills?.filter((skill) =>
      skillsArr.includes(skill)
    );
    if (duplicates?.length > 0) {
      duplicates.forEach((skill) => {
        errors
          .find((err) => err.name === "Skills")
          .error.push(
            `You have ${skill} as a race proficient skill. Go back and choose another skill if applicable.`
          );
      });
    }
  }

  const languageOptions = [];
  if (background.index && language_options) {
    const { choose, from } = language_options;
    const { bonus_languages } = character.background;
    for (let i = 0; i < choose; i++) {
      const idx = i + 1;
      const opt = `option${idx}`;

      const remainingChosenOptions = Object.entries(bonus_languages || {})
        .filter(([key, value]) => key !== opt && !value.includes("option"))
        .map(([key, value]) => value);

      const options = sorter(
        from.filter((lang) => !remainingChosenOptions.includes(lang.index))
      ).map((lang) => {
        const { index, name } = lang;

        let option;

        if (character.languages.includes(index)) {
          if (bonus_languages && bonus_languages[opt] === index) {
            option = (
              <option key={index} value={index}>
                {name}
              </option>
            );
          } else {
            option = (
              <option key={index} value={index} disabled>
                {name} (race)
              </option>
            );
          }
        } else {
          option = (
            <option key={index} value={index}>
              {name}
            </option>
          );
        }

        return option;
      });

      languageOptions.push(
        CharacterCreationSelect({
          label: "Language",
          value: character.background.bonus_languages?.[opt] || "",
          onChange: (e) => handleSelectLanguages(e, opt),
          options,
        })
      );
    }
  }

  let ptHeaders;
  let ptRows;

  let idealsHeaders;
  let idealsRows;

  let bondsHeaders;
  let bondsRows;

  let flawsHeaders;
  let flawsRows;

  // Personality Traits
  if (personality_traits) {
    ptHeaders = [`d${personality_traits.from.length}`, "Personality Traits"];
    ptRows = personality_traits.from.map((trait, idx) => {
      return [idx + 1, trait];
    });
  }

  // Ideals
  if (ideals) {
    idealsHeaders = [`d${ideals.from.length}`, "Ideals"];
    idealsRows = ideals.from.map((ideal, idx) => {
      return [idx + 1, `${ideal.desc} (${ideal.alignments_desc})`];
    });
  }

  // Bonds
  if (bonds) {
    bondsHeaders = [`d${bonds.from.length}`, "Bonds"];
    bondsRows = bonds.from.map((bond, idx) => {
      return [idx + 1, bond];
    });
  }

  // Flaws
  if (flaws) {
    flawsHeaders = [`d${flaws.from.length}`, "Flaws"];
    flawsRows = flaws.from.map((flaw, idx) => {
      return [idx + 1, flaw];
    });
  }

  return (
    <div className="align-center w-full">
      <div id="alignment">
        <label htmlFor="alignment" className="font-bold">
          Alignment:
        </label>
        {select(
          "Alignment",
          "alignment",
          character.alignment,
          alignments,
          (e) =>
            setCharacter({
              ...character,
              alignment: e.target.value,
            })
        )}

        <div className="my-3">
          {character.alignment && (
            <p>
              {
                alignments.find(
                  (alignment) => alignment.index === character.alignment
                ).desc
              }
            </p>
          )}
        </div>
      </div>
      <div id="background">
        <label htmlFor="background" className="font-bold">
          Background:
        </label>
        {select(
          "Background",
          "background",
          character.background.index,
          backgrounds,
          (e) => handleChangeBackground(e)
        )}

        <div className="my-3">
          {background.index && (
            <>
              <p className="mb-3 text-sm italic text-gray-500">
                Source: {background.source_book}
              </p>

              {desc.map((item) => (
                <p key={item} className="mb-3">
                  {item}
                </p>
              ))}

              <div className="mb-3">
                <p>
                  <strong>Skill Proficiencies:</strong>{" "}
                  {starting_proficiencies
                    .filter((bg) => bg.type === "skill")
                    .map((bg) => bg.name)
                    .join(", ")}
                </p>
                {errors
                  .find((err) => err.name === "Skills")
                  ?.error.map((text) => (
                    <p key={text} className="italic text-red-500">
                      {text}
                    </p>
                  ))}

                <p>
                  <strong>Tool Proficiencies:</strong>{" "}
                  {starting_proficiencies
                    .filter(
                      (bg) =>
                        bg.type === "tool" ||
                        bg.type === "instrument" ||
                        bg.type === "artisans_tool"
                    )
                    .map((bg) => bg.name)
                    .join(", ") || "None"}
                </p>

                <p>
                  <strong>Equipment:</strong>{" "}
                  {background.starting_equipment_desc}
                </p>
              </div>

              {background.language_options && (
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
                    <p className="flex w-full justify-between">
                      <strong>Languages</strong>
                      {errors.find((err) => err.name === "Languages")
                        ?.error && <WarningAmberIcon sx={{ color: "red" }} />}
                    </p>
                  </AccordionSummary>
                  <AccordionDetails>
                    <p>
                      Choose any {alphabetizeNum(language_options.choose)}{" "}
                      languages:
                    </p>

                    {languageOptions}
                  </AccordionDetails>
                </Accordion>
              )}

              <Accordion
                className="mb-3"
                expanded={expanded === "bg-feature"}
                onChange={handleChangeExpanded("bg-feature")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`bg-feature-content`}
                  id={`bg-feature-header`}
                >
                  <strong>{feature.name}</strong>
                </AccordionSummary>
                <AccordionDetails>
                  {feature.desc.map((item) => (
                    <p key={item} className="mb-3">
                      {item}
                    </p>
                  ))}
                </AccordionDetails>
              </Accordion>

              <Accordion
                className="mb-3"
                expanded={expanded === "suggested-characteristics"}
                onChange={handleChangeExpanded("suggested-characteristics")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`suggested-characteristics-content`}
                  id={`suggested-characteristics-header`}
                >
                  <p className="flex w-full justify-between">
                    <strong>Suggested Characteristics</strong>
                    {errors.find(
                      (err) => err.name === "Suggested Characteristics"
                    )?.error && <WarningAmberIcon sx={{ color: "red" }} />}
                  </p>
                </AccordionSummary>
                <AccordionDetails>
                  {suggested_characteristics}

                  {/* Personality Traits */}
                  <CharacterCreationBackgroundFeature
                    headers={ptHeaders}
                    rows={ptRows}
                    index="personality-traits"
                    title="Personality Traits"
                    expanded={scExpanded}
                    handleExpanded={handleChangeScExpanded}
                    error={character.personality_traits.length !== 2}
                  >
                    {select(
                      "Personality Trait",
                      "first",
                      character.personality_traits[0],
                      personality_traits.from.filter(
                        (trait) => trait !== character.personality_traits[1]
                      ),
                      handlePersonality
                    )}

                    {select(
                      "Personality Trait",
                      "second",
                      character.personality_traits[1],
                      personality_traits.from.filter(
                        (trait) => trait !== character.personality_traits[0]
                      ),
                      handlePersonality
                    )}
                  </CharacterCreationBackgroundFeature>

                  {/* Ideals */}
                  <CharacterCreationBackgroundFeature
                    headers={idealsHeaders}
                    rows={idealsRows}
                    index="ideals"
                    title="Ideals"
                    expanded={scExpanded}
                    handleExpanded={handleChangeScExpanded}
                    error={!character.ideal.length > 0}
                  >
                    {select(
                      "Ideal",
                      "ideal",
                      character.ideal,
                      ideals.from.map((ideal) => ideal.desc),
                      (e) =>
                        setCharacter({ ...character, ideal: e.target.value })
                    )}
                  </CharacterCreationBackgroundFeature>

                  {/* Bonds */}
                  <CharacterCreationBackgroundFeature
                    headers={bondsHeaders}
                    rows={bondsRows}
                    index="bonds"
                    title="Bonds"
                    expanded={scExpanded}
                    handleExpanded={handleChangeScExpanded}
                    error={!character.bond.length > 0}
                  >
                    {select("Bond", "bond", character.bond, bonds.from, (e) =>
                      setCharacter({ ...character, bond: e.target.value })
                    )}
                  </CharacterCreationBackgroundFeature>

                  {/* Flaws */}
                  <CharacterCreationBackgroundFeature
                    headers={flawsHeaders}
                    rows={flawsRows}
                    index="flaws"
                    title="Flaws"
                    expanded={scExpanded}
                    handleExpanded={handleChangeScExpanded}
                    error={!character.flaw.length > 0}
                  >
                    {select("Flaw", "flaw", character.flaw, flaws.from, (e) =>
                      setCharacter({ ...character, flaw: e.target.value })
                    )}
                  </CharacterCreationBackgroundFeature>
                </AccordionDetails>
              </Accordion>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
