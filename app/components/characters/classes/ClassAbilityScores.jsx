import { useState } from "react";

import { CharacterCreationClassAbilityScore } from "~/lib/common";

export default function ClassAbilityScores({
  character,
  setCharacter,
  level,
  feats,
}) {
  const [expandFeat, setExpandFeat] = useState(false);
  return (
    <>
      <CharacterCreationClassAbilityScore
        level="4th"
        feats={feats}
        character={character}
        setCharacter={setCharacter}
        expandFeat={expandFeat}
        setExpandFeat={setExpandFeat}
      />

      {level >= 8 && (
        <>
          <p>8th Level:</p>
          <CharacterCreationClassAbilityScore
            level="8th"
            feats={feats}
            character={character}
            setCharacter={setCharacter}
            expandFeat={expandFeat}
            setExpandFeat={setExpandFeat}
          />
        </>
      )}

      {level >= 12 && (
        <>
          <p>12th Level:</p>
          <CharacterCreationClassAbilityScore
            level="12th"
            feats={feats}
            character={character}
            setCharacter={setCharacter}
            expandFeat={expandFeat}
            setExpandFeat={setExpandFeat}
          />
        </>
      )}

      {level >= 16 && (
        <>
          <p>16th Level:</p>
          <CharacterCreationClassAbilityScore
            level="16th"
            feats={feats}
            character={character}
            setCharacter={setCharacter}
            expandFeat={expandFeat}
            setExpandFeat={setExpandFeat}
          />
        </>
      )}

      {level >= 19 && (
        <>
          <p>19th Level:</p>
          <CharacterCreationClassAbilityScore
            level="19th"
            feats={feats}
            character={character}
            setCharacter={setCharacter}
            expandFeat={expandFeat}
            setExpandFeat={setExpandFeat}
          />
        </>
      )}
    </>
  );
}
