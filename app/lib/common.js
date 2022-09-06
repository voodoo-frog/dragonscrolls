import { Link } from "@remix-run/react";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Pagination from "@mui/material/Pagination";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

export const sorter = (arr, category = "name", numeric = false) => {
  return arr.sort((a, b) => {
    const nameA = a[category].toString().toUpperCase();
    const nameB = b[category].toString().toUpperCase();
    return nameA.localeCompare(nameB, undefined, { numeric });
  });
};

export const createSet = (arr) => {
  const setOfNames = new Set();
  const res = [];
  arr.forEach((item) => {
    setOfNames.add(item.name);
  });

  setOfNames.forEach((name) => {
    res.push(arr.find((item) => item.name === name));
  });

  return [...new Map(res.map((item) => [item.name, item])).values()];
};

export const fetcher = (...args) => fetch(...args).then((res) => res.json());

export const capitalize = (val) => {
  if (val instanceof String) {
    return val.charAt(0).toUpperCase() + val.substring(1);
  } else {
    return val;
  }
};

export const currencyConverter = (qty, from, to) => {
  const rates = {
    cp: 20,
    sp: 2,
    ep: 1,
    gp: 0.2,
    pp: 0.02,
  };
  const fromRate = rates[from];
  const toRate = rates[to];
  return Math.round(qty * (toRate / fromRate) * 100) / 100;
};

export const goldConverter = (qty, from) => {
  return currencyConverter(qty, from, "gp");
};

export const feature = (features, title, idx) => (
  <>
    <h5 className="mt-3 text-2xl font-bold capitalize">{title}</h5>
    <>
      {features
        .find((feature) => feature.index === idx)
        .desc.map((desc, index) => (
          <p key={index}>{desc}</p>
        ))}
    </>
  </>
);

export const list = (features, title, idx, sliceNum = 16, fullDesc = true) => (
  <>
    <h5 className="mt-3 text-2xl font-bold capitalize">{title}</h5>

    {fullDesc ? (
      features
        .find((feature) => feature.index === idx)
        .desc.map((desc, index) => <p key={index}>{desc}</p>)
    ) : (
      <p>{features.find((feature) => feature.index === idx).desc[0]}</p>
    )}

    <ul className="list-inside list-disc">
      {features
        .filter((feature) => feature.parent && feature.parent.index === idx)
        .sort((a, b) => {
          const nameA = a.index.toString().toUpperCase();
          const nameB = b.index.toString().toUpperCase();
          return nameA.localeCompare(nameB);
        })
        .map((feature) => (
          <li key={feature.index}>
            <span className="font-bold">{feature.name.slice(sliceNum)}:</span>{" "}
            {feature.desc.map((desc, index) => (
              <span key={index}>{desc}</span>
            ))}
          </li>
        ))}
    </ul>
  </>
);

export const subclassList = (list) => (
  <ul>
    {list.map((subclass) => (
      <div key={subclass.index}>
        <div className="w-50 m-5 flex divide-black font-bold">
          <Link to={subclass.index} className="text-lg">
            {subclass.name} ({subclass.source_book})
          </Link>
        </div>
      </div>
    ))}
  </ul>
);

export const table = (title, headers, rows, small = false) => (
  <TableContainer
    className="my-3"
    component={Paper}
    sx={{ backgroundColor: "rgb(17 24 39 / 0.25)", border: "1px solid white" }}
  >
    {title && (
      <>
        <h5 className="m-3 text-lg font-bold capitalize">{title}</h5>
        <hr />
      </>
    )}
    <Table aria-label="table" size={small ? "small" : "medium"}>
      <TableHead>
        <TableRow>
          {headers.map((header) => (
            <TableCell key={header}>
              <strong>{header}</strong>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row, idx) => (
          <TableRow
            key={idx}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            {row.map((cell, idx) => (
              <TableCell
                key={idx}
                sx={{
                  "&:first-letter": {
                    textTransform: "capitalize",
                  },
                }}
              >
                {cell}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export const pagination = (array, page, onChange) => (
  <div className="flex justify-center py-5">
    <Pagination
      sx={{
        "& .MuiPaginationItem-root.Mui-selected": {
          backgroundColor: "#EF4444",
          color: "white",
        },
      }}
      count={Math.ceil(array.length / 10)}
      page={page}
      onChange={onChange}
    />
  </div>
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

export const classFeatures = (features, mainClass) => {
  let classFeatures = features.filter(
    (feature) => feature.class.index === mainClass && !feature.subclass
  );

  classFeatures = createSet(sorter(classFeatures, "level", true));

  return classFeatures;
};

export const subclassFeatures = (features, subclass) => {
  console.log('features', features)
  console.log("subclass", subclass);
  let classFeatures = features.filter(
    (feature) => feature.subclass && feature.subclass.index === subclass
  );

  console.log("subclassFeatures", classFeatures);

  classFeatures = createSet(sorter(classFeatures, "level", true));

  return classFeatures;
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
          {error && error.error && <WarningAmberIcon className="h-full self-center" sx={{ color: "red" }} />}
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

export const CharacterCreationClassAbilityScore = ({
  level,
  character,
  setCharacter,
  feats,
  expandFeat,
  setExpandFeat,
}) => {
  return (<>
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

      {character.class.ability_score_improvements[level].feat && character.class.ability_score_improvements[level].feat !== "" && (
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
              .find((feat) => feat.index === character.class.ability_score_improvements[level].feat)
              .desc.map((desc, index) => (
                <p key={index} className="mb-3">
                  {desc}
                </p>
              ))}
          </AccordionDetails>
        </Accordion>
      )}
  </>)
};

