import { useEffect, useState } from "react";

import { CharacterCreationClassFeature } from "~/lib/character_creator";
import ClassAbilityScores from "./ClassAbilityScores";

export default function Bard({
  character,
  setCharacter,
  subclasses,
  feats,
  features,
  asiComplete,
  expanded,
  handleChangeExpanded,
}) {
  const { level } = character;

  const [featureList, setFeatureList] = useState([]);

  useEffect(() => {
    const list = features.filter((feature) => {
      return feature.level <= level;
    });

    setFeatureList(list);
  }, [character.class, level, features]);

  const errors = [
    {
      name: "Ability Score Improvement",
      error: !asiComplete,
    },
    {
      name: "Bard College",
      error: !character.class.subclass,
    },
    {
      name: "Expertise",
      error: !character.class.class_features.expertise,
    },
    {
      name: "Magical Secrets",
      error: !character.class.class_features.expertise,
    },
  ];

  return (
    <>
      <div>
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
            {feature.name === "Bard College" && (
              <>
                <label htmlFor="bardCollege" className="font-bold">
                  Bard College:
                </label>
                <select
                  id="bardCollege"
                  className="
                    form-select m-0
                    block
                    w-full
                    appearance-none
                    rounded
                    border
                    border-solid
                    border-gray-300
                    bg-white bg-clip-padding bg-no-repeat
                    px-3 py-1.5 text-base
                    font-normal
                    text-gray-700
                    transition
                    ease-in-out
                    focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none
                  "
                  aria-label="Default select example"
                  value={character.class.subclass}
                  onChange={(e) =>
                    setCharacter({
                      ...character,
                      class: {
                        ...character.class,
                        subclass: e.target.value,
                      },
                    })
                  }
                >
                  <option value="">Choose a College</option>
                  {subclasses.map((subclass) => (
                    <option key={subclass.index} value={subclass.index}>
                      {subclass.name}
                    </option>
                  ))}
                </select>
              </>
            )}
          </CharacterCreationClassFeature>
        ))}
      </div>
    </>
  );
}
