import {
  CharacterCreationAbilityScore,
  CharacterCreationFeature,
  CharacterCreationLanguages,
} from "~/lib/character_creator";
import { select } from "~/lib/common";

export default function Dwarf({
  character,
  setCharacter,
  race,
  subrace,
  traits,
  expanded,
  handleChangeExpanded,
}) {
  const { details } = character.race;

  const tools = ["Smith's Tools", "Brewer's Supplies", "Mason's Tools"];

  const handleChangeToolProficiency = (e) => {
    const { value } = e.target;

    setCharacter({
      ...character,
      race: {
        ...character.race,
        details: {
          ...details,
          tool_proficiencies: [value],
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
        error={!details.tool_proficiencies?.[0]}
        handleChangeExpanded={handleChangeExpanded}
      >
        {select(
          "Artisan's Tool",
          "artisan-tool",
          details.tool_proficiencies?.[0] || "",
          tools,
          handleChangeToolProficiency
        )}
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
