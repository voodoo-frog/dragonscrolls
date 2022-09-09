import {
  CharacterCreationAbilityScore,
  CharacterCreationLanguages,
} from "~/lib/character_creator";
import { select } from "~/lib/common";

export default function Human({
  character,
  setCharacter,
  race,
  expanded,
  handleChangeExpanded,
  languages,
}) {
  const { details } = character.race;

  const handleChangeLanguage = (e) => {
    const { value } = e.target;

    const old_lang = details.bonus_languages?.[0] || '';

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
        error={!details.bonus_languages?.[0]}
        expanded={expanded}
        handleChangeExpanded={handleChangeExpanded}
      >
        {select(
          "Language",
          "language",
          details.bonus_languages?.[0] ||
          "",
          languages
            .filter(
              (language) =>
                language.index !== "common"
            ),
          handleChangeLanguage
        )}
      </CharacterCreationLanguages>
    </>
  );
}
