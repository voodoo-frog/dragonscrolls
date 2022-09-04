import { Form, useLoaderData } from "@remix-run/react";
import React, { useEffect, useState } from "react";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import MonsterCard from "~/components/monsters/MonsterCard";

import { createSet, sorter, pagination } from "~/lib/common";
import dbConnect from "~/lib/dbConnect";

import Monster from "~/models/monster";

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

  // Monsters
  const res = await Monster.find({});
  const monsters = sorter(res);

  // Types
  let types = createSet(
    monsters.map((m) => {
      return { name: m.type };
    })
  );
  types = types
    .map((type) => type.name)
    .filter((type) => !type.includes("swarm"))
    .sort();

  // Alignments
  let alignments = createSet(
    monsters.map((m) => {
      return { name: m.alignment };
    })
  );
  alignments = alignments
    .map((alignment) => alignment.name)
    .filter((alignment) => !alignment.includes("50%"))
    .sort();

  // Sizes
  let sizes = createSet(
    monsters.map((m) => {
      return { name: m.size };
    })
  );
  sizes = sizes.map((alignment) => alignment.name).sort();

  // Challenge Ratings
  let challenge_ratings = createSet(
    monsters.map((m) => {
      return { name: m.challenge_rating };
    })
  );
  challenge_ratings = challenge_ratings
    .map((alignment) => alignment.name)
    .sort((a, b) => a - b);

  return { monsters, types, alignments, sizes, challenge_ratings };
};

export default function MonstersPage() {
  const { monsters, types, alignments, sizes, challenge_ratings } =
    useLoaderData();

  const [search, setSearch] = useState({
    name: "",
    cr_min: "",
    cr_max: "",
  });
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedAlignments, setSelectedAlignments] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [expanded, setExpanded] = useState("");
  const [page, setPage] = useState(1);
  const [typePage, setTypePage] = useState(1);
  const [filtered, setFiltered] = useState([]);

  const { name, cr_min, cr_max } = search;

  const handleChangeTypes = (event) => {
    const { name } = event.target;

    if (selectedTypes.includes(name)) {
      setSelectedTypes(selectedTypes.filter((item) => item !== name));
    } else {
      setSelectedTypes([...selectedTypes, name]);
    }
  };

  const handleChangeAlignments = (event) => {
    const { value } = event.target;

    setSelectedAlignments(value.sort());
  };

  const handleChangeSizes = (event) => {
    const { value } = event.target;

    setSelectedSizes(value.sort());
  };

  const handleChangeExpanded = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const handleReset = () => {
    setSearch({
      name: "",
      cr_min: "",
      cr_max: "",
    });
    setSelectedTypes([]);
    setSelectedAlignments([]);
    setSelectedSizes([]);
    setExpanded("");
    setPage(1);
    setTypePage(1);
    setFiltered([]);
  };

  useEffect(() => {
    const res = monsters
      .filter((monster) => {
        if (name !== "") {
          return monster.name.toLowerCase().includes(name.toLowerCase());
        } else {
          return true;
        }
      })
      .filter((monster) => {
        if (cr_min) {
          return Number(monster.challenge_rating) >= Number(cr_min);
        } else {
          return true;
        }
      })
      .filter((monster) => {
        if (cr_max) {
          return Number(monster.challenge_rating) <= Number(cr_max);
        } else {
          return true;
        }
      })
      .filter((monster) => {
        if (selectedSizes.length > 0) {
          return selectedSizes.includes(monster.size);
        } else {
          return true;
        }
      })
      .filter((monster) => {
        if (selectedAlignments.length > 0) {
          return selectedAlignments.includes(monster.alignment);
        } else {
          return true;
        }
      })
      .filter((monster) => {
        if (selectedTypes.length > 0) {
          return selectedTypes.includes(monster.type);
        } else {
          return true;
        }
      });
    setFiltered(res);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    monsters,
    name,
    cr_min,
    cr_max,
    selectedSizes,
    selectedAlignments,
    selectedTypes,
  ]);

  return (
    <>
      <h3 className="m-3	text-4xl">Monsters</h3>

      <div className="flex grid w-full grid-cols-3 justify-items-center gap-4 p-3 md:grid-cols-4 lg:grid-cols-8">
        <div
          className={`content-center justify-center ${
            typePage === 1 && "hidden"
          }`}
          onClick={() => setTypePage(1)}
        >
          <div className="align-center flex h-[100px] w-[100px] justify-center rounded-full bg-red-500 text-center">
            <ChevronLeftIcon sx={{ fontSize: "100px", color: "white" }} />
          </div>
          <p className="text-center font-bold capitalize">Go back</p>
        </div>

        {types
          .map((type) => (
            <div
              key={type.index}
              className="content-center justify-center"
              onClick={handleChangeTypes}
            >
              <img
                height="100px"
                width="100px"
                name={type}
                src={`/images/${type}.jpeg`}
                alt={`${type} type Emblem in color`}
                className={`block rounded-[50%] opacity-${
                  selectedTypes.includes(type) ? 100 : 60
                } hover:opacity-100 ${
                  selectedTypes.includes(type) ? "ring-2 ring-white" : ""
                }`}
              />
              <p className="text-center font-bold capitalize">{type}</p>
            </div>
          ))
          .slice(typePage === 1 ? 0 : 7, typePage === 1 ? 7 : 14)}

        <div
          className={`content-center justify-center ${
            typePage === 2 && "hidden"
          }`}
          onClick={() => setTypePage(2)}
        >
          <div className="align-center flex h-[100px] w-[100px] justify-center rounded-full bg-red-500 text-center">
            <ChevronRightIcon sx={{ fontSize: "100px", color: "white" }} />
          </div>
          <p className="text-center font-bold capitalize">View More</p>
        </div>
      </div>

      <Form method="post">
        <div className="flex w-full justify-between p-3">
          <FormControl
            style={{
              minWidth: 150,
              margin: 10,
              flex: 3,
              justifyContent: "flex-end",
            }}
          >
            <Typography
              htmlFor="equipment-name"
              variant="caption"
              sx={{ fontWeight: "bold" }}
            >
              Equipment Name
            </Typography>
            <TextField
              color="error"
              id="equipment-name"
              placeholder="Search equipment names..."
              variant="outlined"
              value={name}
              onChange={(e) => setSearch({ ...search, name: e.target.value })}
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
              style={{
                minWidth: 50,
                margin: 10,
                flex: 1,
                justifyContent: "flex-end",
              }}
            >
              <Typography
                htmlFor="cr_min"
                variant="caption"
                sx={{ fontWeight: "bold" }}
              >
                Challenge Rating (CR)
              </Typography>
              <Select
                labelId="category-label"
                id="category"
                value={cr_min}
                onChange={(e) =>
                  setSearch({ ...search, cr_min: e.target.value })
                }
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
                {challenge_ratings.map((cr) => (
                  <MenuItem key={cr} value={cr}>
                    <ListItemText primary={cr} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl
              color="error"
              style={{
                minWidth: 50,
                margin: 10,
                flex: 1,
                justifyContent: "flex-end",
              }}
            >
              <Select
                labelId="category-label"
                id="category"
                value={cr_max}
                placeholder="CR"
                onChange={(e) =>
                  setSearch({ ...search, cr_max: e.target.value })
                }
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
                {challenge_ratings.map((cr) => (
                  <MenuItem key={cr} value={cr}>
                    <ListItemText primary={cr} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl
              color="error"
              style={{
                minWidth: 150,
                margin: 10,
                flex: 2,
                justifyContent: "flex-end",
              }}
            >
              <Typography
                htmlFor="category"
                variant="caption"
                sx={{ fontWeight: "bold" }}
              >
                Size
              </Typography>
              <Select
                labelId="category-label"
                id="category"
                multiple
                value={selectedSizes}
                onChange={handleChangeSizes}
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
                {sizes.map((size) => (
                  <MenuItem key={size} value={size}>
                    <Checkbox checked={selectedSizes.indexOf(size) > -1} />
                    <ListItemText primary={size} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl
              color="error"
              style={{
                minWidth: 150,
                margin: 10,
                flex: 2,
                justifyContent: "flex-end",
              }}
            >
              <Typography
                htmlFor="category"
                variant="caption"
                sx={{ fontWeight: "bold" }}
              >
                Alignments
              </Typography>
              <Select
                labelId="category-label"
                id="category"
                multiple
                value={selectedAlignments}
                onChange={handleChangeAlignments}
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
                {alignments.map((alignment) => (
                  <MenuItem key={alignment} value={alignment}>
                    <Checkbox
                      checked={selectedAlignments.indexOf(alignment) > -1}
                    />
                    <ListItemText className="capitalize" primary={alignment} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="pt-[35px] lg:pt-[55px]">
            <Button
              color="error"
              size="large"
              variant="contained"
              className="self-center rounded bg-red-500 p-3 capitalize text-white hover:bg-red-600"
              onClick={handleReset}
            >
              Reset filters
            </Button>
          </div>
        </div>
      </Form>

      <div className="text-md flex w-full pl-[50px] font-bold">
        <h5 className="w-[250px]">Name</h5>
        <div className="hidden lg:flex">
          <h5 className="w-[100px]">CR</h5>
          <h5 className="w-[150px]">Type</h5>
          <h5 className="w-[150px]">Size</h5>
          <h5>Alignment</h5>
        </div>
      </div>

      <div className="m-3">
        {filtered
          .map((monster) => (
            <MonsterCard
              key={monster.index}
              monster={monster}
              expanded={expanded === monster.index}
              handleChangeExpanded={handleChangeExpanded}
            />
          ))
          .splice((page - 1) * 10, 10)}
      </div>

      {pagination(filtered, page, handleChangePage)}
    </>
  );
}
