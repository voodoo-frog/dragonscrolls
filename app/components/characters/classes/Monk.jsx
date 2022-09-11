import { useEffect, useState } from "react";

import ClassAbilityScores from "./ClassAbilityScores";

import { CharacterCreationClassFeature } from "~/lib/character_creator";
import { select } from "~/lib/common";

export default function Fighter({
  character,
  setCharacter,
  subclasses,
  feats,
  features,
  asiComplete,
  expanded,
  handleChangeExpanded,
}) {
  const {
    level,
    class: { subclass },
  } = character;

  const [featureList, setFeatureList] = useState([]);

  useEffect(() => {
    const list = features.filter((feature) => {
      return feature.level <= level;
    });

    setFeatureList(list);
  }, [character.class, level, features]);

  const handleSubclassChange = (e) => {
    const { value } = e.target;

    setCharacter({
      ...character,
      class: {
        ...character.class,
        subclass: value,
      },
    });
  };

  const errors = [
    {
      name: "Ability Score Improvement",
      error: !asiComplete,
    },
    {
      name: "Monastic Tradition",
      error: !subclass,
    },
  ];

  return (
    <>
      {featureList.map((feature) => (
        <CharacterCreationClassFeature
          key={feature.index}
          features={features}
          index={feature.index}
          expanded={expanded}
          error={errors.find((error) => error.name === feature.name)}
          handleChangeExpanded={handleChangeExpanded}
        >
          {feature.name === "Ability Score Improvement" && (
            <ClassAbilityScores
              character={character}
              setCharacter={setCharacter}
              level={level}
              feats={feats}
            />
          )}
          {feature.name === "Monastic Tradition" && (
            <>
              {select(
                "Monastic Tradition",
                "monastic-tradition",
                subclass,
                subclasses,
                handleSubclassChange
              )}
              <p className="my-2">{subclasses.find(sc => sc.index === subclass)?.desc}</p>
            </>
          )}
        </CharacterCreationClassFeature>
      ))}
    </>
  );
}
