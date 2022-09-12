import WarningAmberIcon from "@mui/icons-material/WarningAmber";

import { select, Accordion, AccordionItem } from "./common";

export const CharacterCreationAbilityScore = ({
  race,
  expanded,
  handleChangeExpanded,
  error = false,
  children,
}) => (
  <AccordionItem
        title={
          <p className="flex w-full justify-between">
        Ability Score Increase
        {error && <WarningAmberIcon sx={{ color: "red" }} />}
      </p>
        }
        expanded={expanded === "ability-score"}
        onClick={() => handleChangeExpanded("ability-score")}
      >
        <p className="mb-3">{race.ability_score_desc}</p>
      {children}
      </AccordionItem>
);

export const CharacterCreationLanguages = ({
  race,
  expanded,
  handleChangeExpanded,
  error = false,
  children,
}) => (
  <AccordionItem
  title={
    <p className="flex w-full justify-between">
      Languages
      {error && <WarningAmberIcon sx={{ color: "red" }} />}
    </p>
  }
  expanded={expanded === "language"}
  onClick={() => handleChangeExpanded("language")}
>
<p className="mb-3">{race.language_desc}</p>
      {children}
</AccordionItem>
);

export const CharacterCreationFeature = ({
  traits,
  name,
  index,
  expanded,
  handleChangeExpanded,
  error = false,
  children,
}) => (
  <AccordionItem
  title={
    <p className="flex w-full justify-between">
        {name}
        {error && <WarningAmberIcon sx={{ color: "red" }} />}
      </p>
  }
  expanded={expanded === name}
  onClick={() => handleChangeExpanded(name)}
>
{traits
        .find((t) => t.index === index)
        .desc.map((trait) => (
          <p key={trait} className="mb-3">
            {trait}
          </p>
        ))}
      {children}
</AccordionItem>
);

export const CharacterCreationClassAbilityScore = ({
  level,
  character,
  setCharacter,
  feats,
  expanded,
  handleChangeExpanded,
}) => {
  const handleChangeOption = (e) => {
    const { value } = e.target;

    setCharacter({
      ...character,
      class: {
        ...character.class,
        ability_score_improvements: {
          ...character.class.ability_score_improvements,
          [level]: {
            option: value,
          },
        },
      },
    });
  };

  const handleChangeAbilityScore = (e) => {
    const { name, value } = e.target;
    setCharacter({
      ...character,
      class: {
        ...character.class,
        ability_score_improvements: {
          ...character.class.ability_score_improvements,
          [level]: {
            ...character.class.ability_score_improvements[level],
            [name]: value,
          },
        },
      },
    });
  };

  const handleChangeFeat = (e) => {
    const { value } = e.target;

    setCharacter({
      ...character,
      class: {
        ...character.class,
        ability_score_improvements: {
          ...character.class.ability_score_improvements,
          [level]: {
            ...character.class.ability_score_improvements[level],
            feat: value,
          },
        },
      },
    });
  };
  return (
    <>
      {select(
        "Option",
        "option",
        character.class.ability_score_improvements[level]?.option,
        ["Ability Score Improvement", "Feat"],
        handleChangeOption
      )}

      {character.class.ability_score_improvements[level]?.option ===
        "Ability Score Improvement" && (
        <>
          {select(
            "Ability Score",
            "first",
            character.class.ability_score_improvements[level]?.first,
            [
              "Strength",
              "Dexterity",
              "Constitution",
              "Intelligence",
              "Wisdom",
              "Charisma",
            ],
            handleChangeAbilityScore
          )}

          {select(
            "Ability Score",
            "second",
            character.class.ability_score_improvements[level]?.second,
            [
              "Strength",
              "Dexterity",
              "Constitution",
              "Intelligence",
              "Wisdom",
              "Charisma",
            ],
            handleChangeAbilityScore
          )}
        </>
      )}

      {character.class.ability_score_improvements[level]?.option === "Feat" && (
        <>
          {select(
            "Feat",
            "feat",
            character.class.ability_score_improvements[level]?.feat,
            feats,
            handleChangeFeat
          )}
        </>
      )}

      {character.class.ability_score_improvements[level]?.feat &&
        character.class.ability_score_improvements[level]?.feat !== "" && (
          <Accordion
  title="Feat Details"
  expanded={expanded === "expand-feat"}
  onClick={() => handleChangeExpanded("expand-feat")}
>
{feats
                .find(
                  (feat) =>
                    feat.index ===
                    character.class.ability_score_improvements[level]?.feat
                )
                .desc.map((desc, index) => (
                  <p key={index} className="mb-3">
                    {desc}
                  </p>
                ))}
</Accordion>
        )}
    </>
  );
};

export const CharacterCreationClassFeature = ({
  features,
  index,
  expanded,
  handleChangeExpanded,
  error,
  children,
}) => {
  const feature = features.find((feature) => feature.index === index);
  const { name, level, desc } = feature;

  return (
    <Accordion
        title={
          <div className="flex w-full items-center justify-between">
          <div>
            <strong>{name}</strong>
            <p className="text-sm text-gray-500">Level {level}</p>
          </div>
          {error && error.error && <WarningAmberIcon sx={{ color: "red" }} />}
        </div>
        }
        expanded={expanded === name}
        onClick={() => handleChangeExpanded(name)}
      >
        {desc.map((item) => (
          <p key={item} className="mb-3">
            {item}
          </p>
        ))}
      </Accordion>
  );
};

export const CharacterCreationBackgroundFeature = ({
  index,
  title,
  headers,
  rows,
  expanded,
  handleExpanded,
  error,
  children,
}) => {
  return (
    <Accordion
        title={
          <div className="flex w-full justify-between">
          <strong>{title}</strong>
          {error && (
            <WarningAmberIcon
              className="h-full self-center"
              sx={{ color: "red" }}
            />
          )}
        </div>
        }
        expanded={expanded === index}
        onClick={() => handleChangeExpanded(index)}
      >
        {/* Table */}
        <div className="flex flex-col">
          <div className="overflow-hidden sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full border">
                  <thead className="border-b bg-white">
                    <tr>
                      {headers.map((header) => (
                        <th
                          key={header}
                          scope="col"
                          className="px-6 py-4 text-left text-sm font-medium text-gray-900"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, idx) => (
                      <tr
                        key={idx}
                        className={`bg-${
                          idx % 2 === 0 ? "gray-100" : "white"
                        } border-b`}
                      >
                        <td className="whitespace-normal px-6 py-4 text-sm font-medium text-gray-900">
                          {row[0]}
                        </td>
                        <td className="whitespace-normal px-6 py-4 text-sm font-light text-gray-900">
                          {row[1]}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {children}
      </Accordion>
  );
};

export const CharacterCreationSelect = ({
  label,
  value,
  onChange,
  options,
}) => {
  let title = "Choose a";

  const vowels = ["a", "e", "i", "o", "u"];

  if (vowels.includes(label.charAt(0).toLowerCase())) {
    title = "Choose an";
  }

  title += ` ${label}`;

  return (
    <div className="mt-3 flex w-full justify-start">
      <div className="mb-3 w-full">
        <select
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
          value={value}
          onChange={onChange}
        >
          <option value="">{title}</option>
          {options}
        </select>
      </div>
    </div>
  );
};
