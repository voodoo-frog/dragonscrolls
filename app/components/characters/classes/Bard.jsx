import { useEffect, useState } from "react";

import ClassAbilityScores from "./ClassAbilityScores";

import { CharacterCreationClassFeature } from "~/lib/character_creator";
import { select, Accordion } from "~/lib/common";

export default function Bard({
  character,
  setCharacter,
  subclasses,
  feats,
  features,
  asiComplete,
  skills,
  spells,
  expanded,
  handleChangeExpanded,
}) {
  const {
    level,
    class: { details, subclass },
  } = character;

  const [featureList, setFeatureList] = useState([]);
  const [expandSpell, setExpandSpell] = useState(false);

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

  const handleChangeExpandedSpell = (value) => {
    setExpandSpell(value !== expanded ? value : false);
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

  const handleChangeMagicalSecrets = (e) => {
    const { name, value } = e.target;

    setCharacter({
      ...character,
      class: {
        ...character.class,
        details: {
          ...details,
          magical_secrets: {
            ...details.magical_secrets,
            [name]: value,
          },
        },
      },
    });
  };

  const handleChangeAdditionalMagicalSecrets = (e) => {
    const { name, value } = e.target;

    setCharacter({
      ...character,
      class: {
        ...character.class,
        details: {
          ...details,
          additional_magical_secrets: {
            ...details.additional_magical_secrets,
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
      name: "Bard College",
      error: !subclass,
    },
    {
      name: "Expertise",
      error:
        !details.expertise?.first ||
        !details.expertise?.second ||
        (level >= 10 &&
          (!details.expertise?.third || !details.expertise?.fourth)),
    },
    {
      name: "Magical Secrets",
      error:
        !details.magical_secrets?.first ||
        !details.magical_secrets?.second ||
        (level >= 14 &&
          (!details.magical_secrets?.third ||
            !details.magical_secrets?.fourth)) ||
        (level >= 18 &&
          (!details.magical_secrets?.fifth || !details.magical_secrets?.sixth)),
    },
  ];

  const expertise_options = character.proficiencies.map(
    (prof) => skills.find((skill) => skill.index === prof).name
  );

  // TODO filter all known spells from "Magical Secrets" and "Additional Magical Secrets" lists

  return (
    <>
      {featureList.map((feature) => (
        <CharacterCreationClassFeature
          key={feature.index}
          features={features}
          index={feature.index}
          expanded={expanded}
          error={errors.find((error) => error.name === feature.name)}
          handleChangeExpanded={() => handleChangeExpanded}
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
              {select(
                "Bard College",
                "bard-college",
                subclass,
                subclasses,
                handleSubclassChange
              )}
              <p className="my-2">{subclasses.find(sc => sc.index === subclass)?.desc}</p>
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

              {character.level >= 10 && (
                <>
                  <p className="font-bold">10th level:</p>
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
          {feature.name === "Magical Secrets" && (
            <>
              {/* First Secret */}
              {select(
                "Magical Secret",
                "first",
                details.magical_secrets?.first || "",
                spells
                  .filter((spell) => spell.level <= 3)
                  .filter(
                    (spell) =>
                      spell.index !== details.additional_magical_secrets?.first &&
                      spell.index !== details.additional_magical_secrets?.second &&
                      spell.index !== details.magical_secrets?.second &&
                      spell.index !== details.magical_secrets?.third &&
                      spell.index !== details.magical_secrets?.fourth &&
                      spell.index !== details.magical_secrets?.fifth &&
                      spell.index !== details.magical_secrets?.sixth
                  ),
                handleChangeMagicalSecrets
              )}
              {details.magical_secrets?.first && (
                <Accordion
                  title='Spell Details'
                  expanded={expanded === 'magical-secrets-first'}
                  onClick={() => handleChangeExpandedSpell('magical-secrets-first')}
                >
                  {spells
                    .find(
                      (spell) =>
                        spell.index === details.magical_secrets?.first
                    )
                    .desc.map((desc, index) => (
                      <p key={index} className="mb-3">
                        {desc}
                      </p>
                    ))}
                </Accordion>
              )}

              {/* Second Secret */}
              {select(
                "Magical Secret",
                "second",
                details.magical_secrets?.second || "",
                spells
                  .filter((spell) => spell.level <= 5)
                  .filter(
                    (spell) =>
                      spell.index !== details.additional_magical_secrets?.first &&
                      spell.index !== details.additional_magical_secrets?.second &&
                      spell.index !== details.magical_secrets?.first &&
                      spell.index !== details.magical_secrets?.third &&
                      spell.index !== details.magical_secrets?.fourth &&
                      spell.index !== details.magical_secrets?.fifth &&
                      spell.index !== details.magical_secrets?.sixth
                  ),
                handleChangeMagicalSecrets
              )}
              {details.magical_secrets?.second && (
                <Accordion
                  title='Spell Details'
                  expanded={expanded === 'magical-secrets-second'}
                  onClick={() => handleChangeExpandedSpell('magical-secrets-second')}
                >
                  {spells
                    .find(
                      (spell) =>
                        spell.index === details.magical_secrets?.second
                    )
                    .desc.map((desc, index) => (
                      <p key={index} className="mb-3">
                        {desc}
                      </p>
                    ))}
                </Accordion>
              )}

              {character.level >= 14 && (
                <>
                  <p className="font-bold">14th level:</p>
                  {/* Third Secret */}
                  {select(
                    "Magical Secret",
                    "third",
                    details.magical_secrets?.third || "",
                    spells
                      .filter((spell) => spell.level <= 7)
                      .filter(
                        (spell) =>
                          spell.index !== details.additional_magical_secrets?.first &&
                          spell.index !== details.additional_magical_secrets?.second &&
                          spell.index !== details.magical_secrets?.first &&
                          spell.index !== details.magical_secrets?.second &&
                          spell.index !== details.magical_secrets?.fourth &&
                          spell.index !== details.magical_secrets?.fifth &&
                          spell.index !== details.magical_secrets?.sixth
                      ),
                    handleChangeMagicalSecrets
                  )}
                  {details.magical_secrets?.third && (
                    <Accordion
                      title='Spell Details'
                      expanded={expanded === 'magical-secrets-third'}
                      onClick={() => handleChangeExpandedSpell('magical-secrets-third')}
                    >
                      {spells
                        .find(
                          (spell) =>
                            spell.index === details.magical_secrets?.third
                        )
                        .desc.map((desc, index) => (
                          <p key={index} className="mb-3">
                            {desc}
                          </p>
                        ))}
                    </Accordion>
                  )}

                  {/* Fourth Secret */}
                  {select(
                    "Magical Secret",
                    "fourth",
                    details.magical_secrets?.fourth || "",
                    spells
                      .filter((spell) => spell.level <= 7)
                      .filter(
                        (spell) =>
                          spell.index !== details.additional_magical_secrets?.first &&
                          spell.index !== details.additional_magical_secrets?.second &&
                          spell.index !== details.magical_secrets?.first &&
                          spell.index !== details.magical_secrets?.second &&
                          spell.index !== details.magical_secrets?.third &&
                          spell.index !== details.magical_secrets?.fifth &&
                          spell.index !== details.magical_secrets?.sixth
                      ),
                    handleChangeMagicalSecrets
                  )}
                  {details.magical_secrets?.fourth && (
                    <Accordion
                      title='Spell Details'
                      expanded={expanded === 'magical-secrets-fourth'}
                      onClick={() => handleChangeExpandedSpell('magical-secrets-fourth')}
                    >
                      {spells
                        .find(
                          (spell) =>
                            spell.index === details.magical_secrets?.fourth
                        )
                        .desc.map((desc, index) => (
                          <p key={index} className="mb-3">
                            {desc}
                          </p>
                        ))}
                    </Accordion>
                  )}
                </>
              )}

              {character.level >= 18 && (
                <>
                  <p className="font-bold">18th level:</p>
                  {/* Fifth Secret */}
                  {select(
                    "Magical Secret",
                    "fifth",
                    details.magical_secrets?.fifth || "",
                    spells.filter(
                      (spell) =>
                        spell.index !== details.additional_magical_secrets?.first &&
                        spell.index !== details.additional_magical_secrets?.second &&
                        spell.index !== details.magical_secrets?.first &&
                        spell.index !== details.magical_secrets?.second &&
                        spell.index !== details.magical_secrets?.third &&
                        spell.index !== details.magical_secrets?.fourth &&
                        spell.index !== details.magical_secrets?.sixth
                    ),
                    handleChangeMagicalSecrets
                  )}
                  {details.magical_secrets?.fifth && (
                    <Accordion
                      title='Spell Details'
                      expanded={expanded === 'magical-secrets-fifth'}
                      onClick={() => handleChangeExpandedSpell('magical-secrets-fifth')}
                    >
                      {spells
                        .find(
                          (spell) =>
                            spell.index === details.magical_secrets?.fifth
                        )
                        .desc.map((desc, index) => (
                          <p key={index} className="mb-3">
                            {desc}
                          </p>
                        ))}
                    </Accordion>
                  )}

                  {/* Sixth Secret */}
                  {select(
                    "Magical Secret",
                    "sixth",
                    details.magical_secrets?.sixth || "",
                    spells.filter(
                      (spell) =>
                        spell.index !== details.additional_magical_secrets?.first &&
                        spell.index !== details.additional_magical_secrets?.second &&
                        spell.index !== details.magical_secrets?.first &&
                        spell.index !== details.magical_secrets?.second &&
                        spell.index !== details.magical_secrets?.third &&
                        spell.index !== details.magical_secrets?.fourth &&
                        spell.index !== details.magical_secrets?.fifth
                    ),
                    handleChangeMagicalSecrets
                  )}
                  {details.magical_secrets?.sixth && (
                    <Accordion
                      title='Spell Details'
                      expanded={expanded === 'magical-secrets-sixth'}
                      onClick={() => handleChangeExpandedSpell('magical-secrets-sixth')}
                    >
                      {spells
                        .find(
                          (spell) =>
                            spell.index === details.magical_secrets?.sixth
                        )
                        .desc.map((desc, index) => (
                          <p key={index} className="mb-3">
                            {desc}
                          </p>
                        ))}
                    </Accordion>
                  )}
                </>
              )}
            </>
          )}
          {feature.name === "Additional Magical Secrets" && (
            <>
              {/* First Additional Secret */}
              {select(
                "Additional Magical Secret",
                "first",
                details.additional_magical_secrets?.first || "",
                spells
                  .filter((spell) => spell.level <= 5)
                  .filter(
                    (spell) =>
                      spell.index !==
                      details.additional_magical_secrets?.second &&
                      spell.index !== details.magical_secrets?.first &&
                      spell.index !== details.magical_secrets?.second &&
                      spell.index !== details.magical_secrets?.third &&
                      spell.index !== details.magical_secrets?.fourth &&
                      spell.index !== details.magical_secrets?.fifth &&
                      spell.index !== details.magical_secrets?.sixth
                  ),
                handleChangeAdditionalMagicalSecrets
              )}
              {details.additional_magical_secrets?.first && (
                <Accordion
                  title='Spell Details'
                  expanded={expanded === 'magical-secrets-first'}
                  onClick={() => handleChangeExpandedSpell('magical-secrets-first')}
                >
                  {spells
                    .find(
                      (spell) =>
                        spell.index === details.additional_magical_secrets?.first
                    )
                    .desc.map((desc, index) => (
                      <p key={index} className="mb-3">
                        {desc}
                      </p>
                    ))}
                </Accordion>
              )}

              {/* Second Additional Secret */}
              {select(
                "Additional Magical Secret",
                "second",
                details.additional_magical_secrets?.second || "",
                spells
                  .filter((spell) => spell.level <= 3)
                  .filter(
                    (spell) =>
                      spell.index !==
                      details.additional_magical_secrets?.first &&
                      spell.index !== details.magical_secrets?.first &&
                      spell.index !== details.magical_secrets?.second &&
                      spell.index !== details.magical_secrets?.third &&
                      spell.index !== details.magical_secrets?.fourth &&
                      spell.index !== details.magical_secrets?.fifth &&
                      spell.index !== details.magical_secrets?.sixth
                  ),
                handleChangeAdditionalMagicalSecrets
              )}
              {details.additional_magical_secrets?.second && (
                <Accordion
                  title='Spell Details'
                  expanded={expanded === 'magical-secrets-second'}
                  onClick={() => handleChangeExpandedSpell('magical-secrets-second')}
                >
                  {spells
                    .find(
                      (spell) =>
                        spell.index === details.additional_magical_secrets?.second
                    )
                    .desc.map((desc, index) => (
                      <p key={index} className="mb-3">
                        {desc}
                      </p>
                    ))}
                </Accordion>
              )}
            </>
          )}
        </CharacterCreationClassFeature>
      ))}
    </>
  );
}
