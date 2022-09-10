import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

import { select } from './common';

export const CharacterCreationAbilityScore = ({
  race,
  expanded,
  handleChangeExpanded,
  error = false,
  children,
}) => (
  <Accordion
    className="mb-3"
    expanded={expanded === "ability-score"}
    onChange={handleChangeExpanded("ability-score")}
  >
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls={`${race.index}-ability-score-content`}
      id={`${race.index}-ability-score-header`}
    >
      <p className="flex w-full justify-between">
        <strong>Ability Score Increase</strong>
        {error && <WarningAmberIcon sx={{ color: "red" }} />}
      </p>
    </AccordionSummary>
    <AccordionDetails>
      <p className="mb-3">{race.ability_score_desc}</p>
      {children}
    </AccordionDetails>
  </Accordion>
);

export const CharacterCreationLanguages = ({
  race,
  expanded,
  handleChangeExpanded,
  error = false,
  children,
}) => (
  <Accordion
    className="mb-3"
    expanded={expanded === "language"}
    onChange={handleChangeExpanded("language")}
  >
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls={`${race.index}-language-content`}
      id={`${race.index}-language-header`}
    >
      <p className="flex w-full justify-between">
        <strong>Languages</strong>
        {error && <WarningAmberIcon sx={{ color: "red" }} />}
      </p>
    </AccordionSummary>
    <AccordionDetails>
      <p className="mb-3">{race.language_desc}</p>
      {children}
    </AccordionDetails>
  </Accordion>
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
  <Accordion
    className="mb-3"
    expanded={expanded === name}
    onChange={handleChangeExpanded(name)}
  >
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls={`${index}-content`}
      id={`${index}-header`}
    >
      <p className="flex w-full justify-between">
        <strong>{name}</strong>
        {error && <WarningAmberIcon sx={{ color: "red" }} />}
      </p>
    </AccordionSummary>
    <AccordionDetails>
      {traits
        .find((t) => t.index === index)
        .desc.map((trait) => (
          <p key={trait} className="mb-3">
            {trait}
          </p>
        ))}
      {children}
    </AccordionDetails>
  </Accordion>
);

export const CharacterCreationClassAbilityScore = ({
  level,
  character,
  setCharacter,
  feats,
  expandFeat,
  setExpandFeat,
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
    })
  }

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
    })
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
    })
  };
  return (
    <>
      {select(
        "Option",
        "option",
        character.class.ability_score_improvements[level]?.option,
        ["Ability Score Improvement", "Feat"],
        handleChangeOption,
      )}

      {character.class.ability_score_improvements[level]?.option === "Ability Score Improvement" && (
        <>
          {select(
            "Ability Score",
            "first",
            character.class.ability_score_improvements[level]?.first,
            ["Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"],
            handleChangeAbilityScore,
          )}

          {select(
            "Ability Score",
            "second",
            character.class.ability_score_improvements[level]?.second,
            ["Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"],
            handleChangeAbilityScore,
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
          handleChangeFeat,
        )}
        </>
      )}

      {character.class.ability_score_improvements[level]?.feat &&
        character.class.ability_score_improvements[level]?.feat !== "" && (
          <Accordion
            elevation={0}
            className="my-3"
            expanded={expandFeat}
            onChange={() => setExpandFeat(!expandFeat)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="expand-feat-content"
              id="expand-feat-header"
            >
              <p>
                <strong>Feat Details</strong>
              </p>
            </AccordionSummary>
            <AccordionDetails>
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
            </AccordionDetails>
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
      className="mb-3"
      expanded={expanded === name}
      onChange={handleChangeExpanded(name)}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`${index}-content`}
        id={`${index}-header`}
      >
        <div className="flex w-full justify-between items-center">
          <div>
            <strong>{name}</strong>
            <p className="text-sm text-gray-500">Level {level}</p>
          </div>
          {error && error.error && (
            <WarningAmberIcon sx={{ color: "red" }} />
          )}
        </div>
      </AccordionSummary>
      <AccordionDetails>
        {desc.map((item) => (
          <p key={item} className="mb-3">
            {item}
          </p>
        ))}
        {children}
      </AccordionDetails>
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
      className="mb-3"
      expanded={expanded === `sc-${index}`}
      onChange={handleExpanded(`sc-${index}`)}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`sc-${index}-content`}
        id={`sc-${index}-header`}
      >
        <div className="flex w-full justify-between">
          <strong>{title}</strong>
          {error && (
            <WarningAmberIcon
              className="h-full self-center"
              sx={{ color: "red" }}
            />
          )}
        </div>
      </AccordionSummary>
      <AccordionDetails className="overflow-hidden">
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
      </AccordionDetails>
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
  <div className="mt-3 flex justify-start w-full">
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