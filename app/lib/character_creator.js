import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

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
  return (
    <>
      <FormControl fullWidth className="my-3">
        <InputLabel
          className="my-3"
          id="ability-score-improvement-ability-select-label"
        >
          Choose an Option
        </InputLabel>
        <Select
          className="my-3"
          labelId="ability-score-improvement-ability-option-select-label"
          id="ability-score-improvement-ability-option-select"
          name="first option"
          value={character.class.ability_score_improvements[level].option}
          label="Choose an Option"
          onChange={(e) =>
            setCharacter({
              ...character,
              class: {
                ...character.class,
                ability_score_improvements: {
                  ...character.class.ability_score_improvements,
                  [level]: {
                    option: e.target.value,
                  },
                },
              },
            })
          }
        >
          {["Ability Score Improvement", "Feat"].map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {character.class.ability_score_improvements[level].option ===
        "Ability Score Improvement" && (
        <>
          <FormControl fullWidth className="my-3">
            <InputLabel
              className="my-3"
              id="ability-score-improvement-ability-select-label"
            >
              Choose an Ability Score
            </InputLabel>
            <Select
              className="my-3"
              labelId="ability-score-improvement-ability-select-label"
              id="ability-score-improvement-ability-select"
              name="first"
              value={character.class.ability_score_improvements[level].first}
              label="Choose an Ability Score"
              onChange={(e) =>
                setCharacter({
                  ...character,
                  class: {
                    ...character.class,
                    ability_score_improvements: {
                      ...character.class.ability_score_improvements,
                      [level]: {
                        ...character.class.ability_score_improvements[level],
                        first: e.target.value,
                      },
                    },
                  },
                })
              }
            >
              {[
                "Strength",
                "Dexterity",
                "Constitution",
                "Intelligence",
                "Wisdom",
                "Charisma",
              ].map((ability) => (
                <MenuItem key={ability} value={ability}>
                  {ability}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth className="my-3">
            <InputLabel
              className="my-3"
              id="ability-score-improvement-ability-select-label"
            >
              Choose an Ability Score
            </InputLabel>
            <Select
              className="my-3"
              labelId="ability-score-improvement-ability-select-label"
              id="ability-score-improvement-ability-select"
              name="second"
              value={character.class.ability_score_improvements[level].second}
              label="Choose an Ability Score"
              onChange={(e) =>
                setCharacter({
                  ...character,
                  class: {
                    ...character.class,
                    ability_score_improvements: {
                      ...character.class.ability_score_improvements,
                      [level]: {
                        ...character.class.ability_score_improvements[level],
                        second: e.target.value,
                      },
                    },
                  },
                })
              }
            >
              {[
                "Strength",
                "Dexterity",
                "Constitution",
                "Intelligence",
                "Wisdom",
                "Charisma",
              ].map((ability) => (
                <MenuItem key={ability} value={ability}>
                  {ability}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </>
      )}

      {character.class.ability_score_improvements[level].option === "Feat" && (
        <FormControl fullWidth className="my-3">
          <InputLabel
            className="my-3"
            id="ability-score-improvement-feat-select-label"
          >
            Choose a Feat
          </InputLabel>
          <Select
            className="my-3"
            labelId="ability-score-improvement-feat-select-label"
            id="ability-score-improvement-feat-select"
            name="feat"
            value={character.class.ability_score_improvements[level].feat}
            label="Choose a Feat"
            onChange={(e) =>
              setCharacter({
                ...character,
                class: {
                  ...character.class,
                  ability_score_improvements: {
                    ...character.class.ability_score_improvements,
                    [level]: {
                      ...character.class.ability_score_improvements[level],
                      feat: e.target.value,
                    },
                  },
                },
              })
            }
          >
            {feats.map((feat) => (
              <MenuItem key={feat.index} value={feat.index}>
                {feat.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {character.class.ability_score_improvements[level].feat &&
        character.class.ability_score_improvements[level].feat !== "" && (
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
                    character.class.ability_score_improvements[level].feat
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
        <div className="flex w-full justify-between">
          <div>
            <strong>{name}</strong>
            <p className="text-sm text-gray-500">Level {level}</p>
          </div>
          {error && error.error && (
            <WarningAmberIcon
              className="h-full self-center"
              sx={{ color: "red" }}
            />
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
