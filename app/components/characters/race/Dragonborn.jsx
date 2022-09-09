import {
  CharacterCreationAbilityScore,
  CharacterCreationFeature,
  CharacterCreationLanguages,
} from "~/lib/character_creator";
import { select, table } from "~/lib/common";

export default function Dragonborn({
  character,
  setCharacter,
  race,
  expanded,
  handleChangeExpanded,
  traits,
}) {
  const { details } = character.race;

  const ancestry =
    details.bonus_features?.find((bf) =>
      Object.keys(bf).find((key) => key === "draconic_ancestry")
    );

  const dragon_types = [
    { index: 'black', name: 'Black' },
    { index: 'blue', name: 'Blue' },
    { index: 'brass', name: 'Brass' },
    { index: 'bronze', name: 'Bronze' },
    { index: 'copper', name: 'Copper' },
    { index: 'gold', name: 'Gold' },
    { index: 'green', name: 'Green' },
    { index: 'red', name: 'Red' },
    { index: 'silver', name: 'Silver' },
    { index: 'white', name: 'White' }
  ];

  const handleChangeDraconicAncestry = (e) => {
    const { value } = e.target;

    setCharacter({
      ...character,
      race: {
        ...character.race,
        details: {
          ...details,
          bonus_features: [{ draconic_ancestry: value }],
        },
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
        error={!ancestry?.draconic_ancestry}
        handleChangeExpanded={handleChangeExpanded}
      >
        {table(undefined, headers, rows, true)}

        {select(
          "Option",
          "draconic-ancestry-option",
          ancestry?.draconic_ancestry ||
          "",
          dragon_types,
          handleChangeDraconicAncestry
        )}
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
