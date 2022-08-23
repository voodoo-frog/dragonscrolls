import { Form, useLoaderData } from "@remix-run/react";

import React, { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import SpellCard from "~/components/spells/SpellCard";

import { sorter, pagination } from "~/lib/common";
import dbConnect from "~/lib/dbConnect";

import Class from "~/models/class";
import MagicSchool from "~/models/magic_school";
import Spell from "~/models/spell";

export const meta = () => {
  return {
    title: "Dragon Scrolls: Spells",
  };
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const loader = async () => {
  await dbConnect();

  // Spells
  const spellResults = await Spell.find({});
  const spells = sorter(spellResults);

  /* Schools */
  const schoolResults = await MagicSchool.find({});
  const schools = sorter(schoolResults);

  /* Classes */
  const classResults = await Class.find({});
  const casters = sorter(
    classResults
      .filter((data) => data.spellcasting)
      .filter((data) => data.name !== "Artificer")
  );

  return { spells, schools, casters };
};

export default function SpellsPage() {
  const { spells, schools, casters } = useLoaderData();

  const [spellName, setSpellName] = useState("");
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [selectedSchools, setSelectedSchools] = useState([]);
  const [selectedCastingTimes, setSelectedCastingTimes] = useState([]);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [expanded, setExpanded] = useState("");
  const [page, setPage] = useState(1);
  const [filtered, setFiltered] = useState([]);

  const levels = ["Cantrip", 1, 2, 3, 4, 5, 6, 7, 8, 9];

  const castingTimes = [
    "1 action",
    "1 bonus action",
    "1 reaction",
    "1 minute",
    "10 minutes",
    "1 hour",
    "8 hours",
    "12 hours",
    "24 hours",
  ];

  const handleSpellNameChange = (event) => {
    setSpellName(event.target.value);
  };

  const handleChangeLevels = (event) => {
    const { value } = event.target;
    let sorted = value.sort();
    if (sorted.includes("cantrip")) {
      sorted = sorted.filter((item) => item !== "cantrip");
      sorted.unshift("cantrip");
    }

    setSelectedLevels(sorted);
  };

  const handleChangeSchools = (event) => {
    const { value } = event.target;

    setSelectedSchools(value.sort());
  };

  const handleChangeCastingTimes = (event) => {
    const { value } = event.target;

    setSelectedCastingTimes(value.sort());
  };

  const handleChangeClasses = (event) => {
    const { name } = event.target;

    if (selectedClasses.includes(name)) {
      setSelectedClasses(selectedClasses.filter((item) => item !== name));
    } else {
      setSelectedClasses([...selectedClasses, name]);
    }
  };

  const handleChangeExpanded = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleReset = () => {
    setSpellName("");
    setSelectedLevels([]);
    setSelectedSchools([]);
    setSelectedCastingTimes([]);
    setSelectedClasses([]);
    setExpanded("");
    setPage(1);
    setFiltered([]);
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    const res = spells
      .filter((spell) => {
        if (spellName !== "") {
          return spell.name.toLowerCase().includes(spellName.toLowerCase());
        } else {
          return true;
        }
      })
      .filter((spell) => {
        if (selectedLevels.length > 0) {
          return (
            selectedLevels.includes(spell.level) ||
            (spell.level === 0 && selectedLevels.includes("Cantrip"))
          );
        } else {
          return true;
        }
      })
      .filter((spell) => {
        if (selectedSchools.length > 0) {
          return selectedSchools.includes(spell.school.name);
        } else {
          return true;
        }
      })
      .filter((spell) => {
        if (selectedCastingTimes.length > 0) {
          return selectedCastingTimes.includes(spell.casting_time);
        } else {
          return true;
        }
      })
      .filter((spell) => {
        if (selectedClasses.length > 0) {
          return selectedClasses.some((selectedClass) =>
            spell.classes.find(({ name }) => selectedClass.includes(name))
          );
        } else {
          return true;
        }
      });
    setFiltered(res);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    spellName,
    selectedLevels,
    selectedSchools,
    selectedCastingTimes,
    selectedClasses,
  ]);

  return (
    <>
      <h3 className="m-3 text-4xl">Spells</h3>
      <div className="flex grid w-full grid-cols-3 justify-items-center gap-4 p-3 lg:grid-cols-8">
        {casters.map((caster) => (
          <div
            key={caster.index}
            className="content-center justify-center"
            onClick={handleChangeClasses}
          >
            <img
              height="100px"
              width="100px"
              name={caster.name}
              src={`/images/${caster.index}-emblem-color.jpeg`}
              alt={`${caster.name} Caster Emblem in color`}
              className={`block rounded-[50%] opacity-${
                selectedClasses.includes(caster.name) ? 100 : 60
              } hover:opacity-100 ${
                selectedClasses.includes(caster.name) ? "ring-2 ring-white" : ""
              }`}
            />
            <p className="text-center">{caster.name}</p>
          </div>
        ))}
      </div>

      <Form method="post">
        <div className="flex w-full justify-between p-3">
          <FormControl style={{ margin: 10, flex: 3 }}>
            <Typography
              htmlFor="spell-name"
              variant="caption"
              sx={{ fontWeight: "bold" }}
            >
              Spell Name
            </Typography>
            <TextField
              color="error"
              id="spell-name"
              placeholder="Search spell names..."
              variant="outlined"
              value={spellName}
              onChange={handleSpellNameChange}
              sx={{
                bgcolor: "rgba(0,0,0,0.2)",
                borderRadius: "50px",
                color: "black",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "50px",
                  color: "black",
                },
                "& .MuiInputLabel-root": { color: "black" },
              }}
            />
          </FormControl>

          <div className="hidden lg:flex">
            <FormControl
              color="error"
              style={{ minWidth: 150, margin: 10, flex: 1 }}
            >
              <Typography
                htmlFor="spell-level"
                variant="caption"
                sx={{ fontWeight: "bold" }}
              >
                Spell Level
              </Typography>
              <Select
                labelId="spell-level-label"
                id="spell-level"
                multiple
                value={selectedLevels}
                onChange={handleChangeLevels}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
                sx={{
                  bgcolor: "rgba(0,0,0,0.2)",
                  borderRadius: "50px",
                  color: "black",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "50px",
                    color: "black",
                  },
                  "& .MuiInputLabel-root": { color: "black" },
                }}
              >
                {levels.map((level) => (
                  <MenuItem key={level} value={level}>
                    <Checkbox checked={selectedLevels.indexOf(level) > -1} />
                    <ListItemText primary={level} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl
              color="error"
              style={{ minWidth: 150, margin: 10, flex: 2 }}
            >
              <Typography
                htmlFor="magic-school"
                variant="caption"
                sx={{ fontWeight: "bold" }}
              >
                Magic School
              </Typography>
              <Select
                labelId="magic-school-label"
                id="magic-school"
                multiple
                value={selectedSchools}
                onChange={handleChangeSchools}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
                sx={{
                  bgcolor: "rgba(0,0,0,0.2)",
                  borderRadius: "50px",
                  color: "black",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "50px",
                    color: "black",
                  },
                  "& .MuiInputLabel-root": { color: "black" },
                }}
              >
                {schools.map(({ name }) => (
                  <MenuItem key={name} value={name}>
                    <Checkbox checked={selectedSchools.indexOf(name) > -1} />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl
              color="error"
              style={{ minWidth: 150, margin: 10, flex: 2 }}
            >
              <Typography
                htmlFor="casting-time"
                variant="caption"
                sx={{ fontWeight: "bold" }}
              >
                Casting Time
              </Typography>
              <Select
                labelId="casting-time-label"
                id="casting-time"
                multiple
                value={selectedCastingTimes}
                onChange={handleChangeCastingTimes}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
                sx={{
                  bgcolor: "rgba(0,0,0,0.2)",
                  borderRadius: "50px",
                  color: "black",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "50px",
                    color: "black",
                  },
                  "& .MuiInputLabel-root": { color: "black" },
                }}
              >
                {castingTimes.map((ct) => (
                  <MenuItem key={ct} value={ct}>
                    <Checkbox checked={selectedCastingTimes.indexOf(ct) > -1} />
                    <ListItemText primary={ct} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <Button
            color="error"
            size="large"
            variant="contained"
            className="self-center rounded bg-red-500 p-3 capitalize text-white hover:bg-red-600"
            onClick={handleReset}
            sx={{
              marginTop: "20px",
            }}
          >
            Reset filters
          </Button>
        </div>
      </Form>

      <div className="m-3">
        {filtered
          .map((spell) => (
            <SpellCard
              key={spell.index}
              spell={spell}
              expanded={expanded === spell.index}
              handleChangeExpanded={handleChangeExpanded}
            />
          ))
          .splice((page - 1) * 10, 10)}
      </div>

      {pagination(filtered, page, handleChangePage)}
    </>
  );
}
