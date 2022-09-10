import { useEffect, useState } from "react";

import ClassAbilityScores from "./ClassAbilityScores";

import { CharacterCreationClassFeature } from "~/lib/character_creator";
import { select } from "~/lib/common";

export default function Rogue({
  character,
  setCharacter,
  subclasses,
  feats,
  features,
  asiComplete,
  skills,
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

  const handleChangeExpertiseChoice = (e) => {
    const { name, value } = e.target;

    setCharacter({
      ...character,
      class: {
        ...character.class,
        details: {
          ...details,
          expertise: {
            ...details.expertise,
            [name]: value,
          },
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
      name: "Roguish Archetype",
      error: !subclass,
    },
    {
      name: "Expertise",
      error:
        !details.expertise?.first ||
        !details.expertise?.second ||
        (level >= 6 &&
          (!details.expertise?.third || !details.expertise?.fourth)),
    },
  ];

  const expertise_options = [
    ...character.proficiencies.map(
      (prof) => skills.find((skill) => skill.index === prof).name
    ),
    "Thieves' Tools",
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
          {feature.name === "Roguish Archetype" && (
            <>
              {select(
                "Roguish Archetype",
                "roguish-archetype",
                subclass,
                subclasses,
                handleSubclassChange
              )}
            </>
          )}
          {feature.name === "Expertise" && (
            <>
              {select(
                "Expertise",
                "first",
                details.expertise?.first || "",
                expertise_options.filter(
                  (opt) =>
                    opt !== details.expertise?.second &&
                    opt !== details.expertise?.third &&
                    opt !== details.expertise?.fourth
                ),
                handleChangeExpertiseChoice
              )}
              {select(
                "Expertise",
                "second",
                details.expertise?.second || "",
                expertise_options.filter(
                  (opt) =>
                    opt !== details.expertise?.first &&
                    opt !== details.expertise?.third &&
                    opt !== details.expertise?.fourth
                ),
                handleChangeExpertiseChoice
              )}

              {character.level >= 6 && (
                <>
                  <p className="font-bold">6th level:</p>
                  {select(
                    "Expertise",
                    "third",
                    details.expertise?.third || "",
                    expertise_options.filter(
                      (opt) =>
                        opt !== details.expertise?.first &&
                        opt !== details.expertise?.second &&
                        opt !== details.expertise?.fourth
                    ),
                    handleChangeExpertiseChoice
                  )}
                  {select(
                    "Expertise",
                    "fourth",
                    details.expertise?.fourth || "",
                    expertise_options.filter(
                      (opt) =>
                        opt !== details.expertise?.first &&
                        opt !== details.expertise?.second &&
                        opt !== details.expertise?.third
                    ),
                    handleChangeExpertiseChoice
                  )}
                </>
              )}
            </>
          )}
        </CharacterCreationClassFeature>
      ))}
    </>
  );
}
