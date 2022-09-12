import {
  CharacterCreationAbilityScore,
  CharacterCreationFeature,
  CharacterCreationLanguages,
} from "~/lib/character_creator";
import { select } from "~/lib/common";

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
  const { details } = character.race;

  const handleChangeAbilityScore = (e) => {
    const { value, name } = e.target;

    let new_scores = details.bonus_ability_scores || [];

    if (name === "first") {
      new_scores[0] = value;
    } else {
      new_scores[1] = value;
    }

    setCharacter((character) => ({
      ...character,
      race: {
        ...character.race,
        details: {
          ...details,
          bonus_ability_scores: [...new_scores],
        },
      },
    }));
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

  const handleChangeSkill = (e) => {
    const { value, name } = e.target;

    let old_skill = "";

    let new_skills = details.bonus_skills || [];

    if (name === "first") {
      old_skill = new_skills[0];
      new_skills[0] = value;
    } else {
      old_skill = new_skills[1];
      new_skills[1] = value;
    }

    if (old_skill) {
      character.proficiencies.splice(
        character.proficiencies.indexOf(old_skill),
        1
      );
    }

    setCharacter((character) => ({
      ...character,
      race: {
        ...character.race,
        details: {
          ...details,
          bonus_skills: [...new_skills],
        },
      },
      proficiencies: [...character.proficiencies, value],
    }));
  };

  return (
    <div className="accordion">
      <CharacterCreationAbilityScore
        race={race}
        error={
          !details.bonus_ability_scores?.[0] ||
          !details.bonus_ability_scores?.[1]
        }
        expanded={expanded}
        handleChangeExpanded={handleChangeExpanded}
      >
        {select(
          "Ability Score",
          "first",
          details.bonus_ability_scores?.[0] || "",
          abilityScores.filter(
            (score) =>
              score.index !== "cha" &&
              score.index !== details.bonus_ability_scores?.[1]
          ),
          handleChangeAbilityScore
        )}

        {select(
          "Ability Score",
          "second",
          details.bonus_ability_scores?.[1] || "",
          abilityScores.filter(
            (score) =>
              score.index !== "cha" &&
              score.index !== details.bonus_ability_scores?.[0]
          ),
          handleChangeAbilityScore
        )}
      </CharacterCreationAbilityScore>

      <CharacterCreationLanguages
        race={race}
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
        error={!details.bonus_skills?.[0] || !details.bonus_skills?.[1]}
        expanded={expanded}
        handleChangeExpanded={handleChangeExpanded}
      >
        {select(
          "Skill",
          "first",
          details.bonus_skills?.[0] || "",
          skills.filter((skill) => skill.index !== details.bonus_skills?.[1]),
          handleChangeSkill
        )}

        {select(
          "Skill",
          "second",
          details.bonus_skills?.[1] || "",
          skills.filter((skill) => skill.index !== details.bonus_skills?.[0]),
          handleChangeSkill
        )}
      </CharacterCreationFeature>
    </div>
  );
}
