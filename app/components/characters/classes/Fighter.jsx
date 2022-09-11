import { useEffect, useState } from "react";

import ClassAbilityScores from "./ClassAbilityScores";

import { CharacterCreationClassFeature } from "~/lib/character_creator";
import { select, table } from "~/lib/common";

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
    class: { details, subclass },
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

  const handleChangeFightingStyle = (e) => {
    const { value } = e.target;

    setCharacter({
      ...character,
      class: {
        ...character.class,
        details: {
          ...details,
          fighting_style: value,
        },
      },
    });
  };

  const handleChangeAdditionalFightingStyle = (e) => {
    const { value } = e.target;

    setCharacter({
      ...character,
      class: {
        ...character.class,
        details: {
          ...details,
          additional_fighting_style: value,
        },
      },
    });
  };

  const errors = [
    {
      name: "Ability Score Improvement",
      error: !asiComplete,
    },
    {
      name: "Martial Archetype",
      error: !subclass,
    },
    {
      name: "Fighting Style",
      error: !details.fighting_style,
    },
    {
      name: "Additional Fighting Style",
      error: !details.additional_fighting_style,
    },
  ];

  const fighting_styles = featureList.filter((feature) => {
    return feature.index.includes("fighting-style-");
  });

  const headers = ["Name", "Description"];
  const rows = fighting_styles.map((feature) => [feature.name, feature.desc]);

  return (
    <>
      {featureList
        .filter((feature) => !feature.index.includes("fighting-style-"))
        .map((feature) => (
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
            {feature.name === "Martial Archetype" && (
              <>
                {select(
                  "Martial Archetype",
                  "martial-archetype",
                  subclass,
                  subclasses,
                  handleSubclassChange
                )}
                <p className="my-2">{subclasses.find(sc => sc.index === subclass)?.desc}</p>
              </>
            )}
            {feature.name === "Fighting Style" && (
              <>
                {table("", headers, rows)}

                {select(
                  "Fighting Style",
                  "fighting-style",
                  details.fighting_style || "",
                  fighting_styles.filter(
                    (style) => style.index !== details.additional_fighting_style
                  ),
                  handleChangeFightingStyle
                )}
              </>
            )}

            {feature.name === "Additional Fighting Style" && (
              <>
                {table("", headers, rows)}

                {select(
                  "Fighting Style",
                  "additional-fighting-style",
                  details.additional_fighting_style || "",
                  fighting_styles.filter(
                    (style) => style.index !== details.fighting_style
                  ),
                  handleChangeAdditionalFightingStyle
                )}
              </>
            )}
          </CharacterCreationClassFeature>
        ))}
    </>
  );
}
