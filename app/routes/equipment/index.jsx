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

import EquipmentCard from "~/components/equipment/EquipmentCard";

import { sorter, pagination } from "~/lib/common";
import dbConnect from "~/lib/dbConnect";

import Equipment from "~/models/equipment";
import { goldConverter } from "../../lib/common";

export const meta = () => {
  return {
    title: "Dragon Scrolls: Equipment",
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

  // Equipment
  const equipResults = await Equipment.find({});
  const equipment = sorter(equipResults);

  return { equipment };
};

export default function EquipmentPage() {
  const { equipment } = useLoaderData();

  const [search, setSearch] = useState({
    name: "",
    cost_min: "",
    cost_max: "",
    weight_min: "",
    weight_max: "",
  });
  const [categories, setCategories] = useState([]);
  const [expanded, setExpanded] = useState("");
  const [page, setPage] = useState(1);
  const [filtered, setFiltered] = useState([]);

  const { name, cost_min, cost_max, weight_min, weight_max } = search;

  const handleChangeCategories = (event) => {
    const { value } = event.target;

    setCategories(value.sort());
  };

  const handleChangeExpanded = (value) => {
    setExpanded(value !== expanded ? value : false);
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const handleReset = () => {
    setSearch({
      name: "",
      cost_min: "",
      cost_max: "",
      weight_min: "",
      weight_max: "",
    });
    setCategories([]);
    setExpanded("");
    setPage(1);
    setFiltered([]);
  };

  useEffect(() => {
    const res = equipment
      .filter((item) => {
        if (name !== "") {
          return item.name.toLowerCase().includes(name.toLowerCase());
        } else {
          return true;
        }
      })
      .filter((item) => {
        if (cost_min) {
          const { quantity, unit } = item.cost;
          const value = goldConverter(quantity, unit);
          return value >= cost_min;
        } else {
          return true;
        }
      })
      .filter((item) => {
        if (cost_max) {
          const { quantity, unit } = item.cost;
          const value = goldConverter(quantity, unit);
          return value <= cost_max;
        } else {
          return true;
        }
      })
      .filter((item) => {
        if (weight_min) {
          return item.weight >= weight_min;
        } else {
          return true;
        }
      })
      .filter((item) => {
        if (weight_max) {
          return item.weight <= weight_max;
        } else {
          return true;
        }
      })
      .filter((item) => {
        if (categories.length > 0) {
          return categories.includes(item.equipment_category.name);
        } else {
          return true;
        }
      });
    setFiltered(res);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, cost_min, cost_max, weight_min, weight_max, categories]);

  const categoryList = [
    "Adventuring Gear",
    "Armor",
    "Mounts and Vehicles",
    "Tools",
    "Weapon",
  ];

  return (
    <>
      <h3 className="m-3	text-4xl">Equipment</h3>

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
              style={{
                minWidth: 50,
                margin: 10,
                flex: 1,
                justifyContent: "flex-end",
              }}
            >
              <Typography
                htmlFor="cost_min"
                variant="caption"
                sx={{ fontWeight: "bold" }}
              >
                Cost (gp)
              </Typography>
              <TextField
                color="error"
                id="cost_min"
                placeholder="Min"
                variant="outlined"
                value={cost_min}
                onChange={(e) =>
                  setSearch({ ...search, cost_min: e.target.value })
                }
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
            <FormControl
              style={{
                minWidth: 50,
                margin: 10,
                flex: 1,
                justifyContent: "flex-end",
              }}
            >
              <TextField
                color="error"
                id="cost_max"
                placeholder="Max"
                variant="outlined"
                value={cost_max}
                onChange={(e) =>
                  setSearch({ ...search, cost_max: e.target.value })
                }
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

            <FormControl
              style={{
                minWidth: 50,
                margin: 10,
                flex: 1,
                justifyContent: "flex-end",
              }}
            >
              <Typography
                htmlFor="weight_min"
                variant="caption"
                sx={{ fontWeight: "bold" }}
              >
                Weight (lbs)
              </Typography>
              <TextField
                color="error"
                id="weight_min"
                placeholder="Min"
                variant="outlined"
                value={weight_min}
                onChange={(e) =>
                  setSearch({ ...search, weight_min: e.target.value })
                }
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
            <FormControl
              style={{
                minWidth: 50,
                margin: 10,
                flex: 1,
                justifyContent: "flex-end",
              }}
            >
              <TextField
                color="error"
                id="weight_max"
                placeholder="Max"
                variant="outlined"
                value={weight_max}
                onChange={(e) =>
                  setSearch({ ...search, weight_max: e.target.value })
                }
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

            <FormControl
              color="error"
              style={{ minWidth: 150, margin: 10, flex: 2 }}
            >
              <Typography
                htmlFor="category"
                variant="caption"
                sx={{ fontWeight: "bold" }}
              >
                Categories
              </Typography>
              <Select
                labelId="category-label"
                id="category"
                multiple
                value={categories}
                onChange={handleChangeCategories}
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
                {categoryList.map((ct) => (
                  <MenuItem key={ct} value={ct}>
                    <Checkbox checked={categories.indexOf(ct) > -1} />
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

      <div className="text-md flex w-full pl-[50px] font-bold">
        <h5 className="w-[250px]">Name</h5>
        <div className="hidden lg:flex">
          <h5 className="w-[150px]">Cost (gp)</h5>
          <h5 className="w-[150px]">Weight (lbs)</h5>
          <h5>Category</h5>
        </div>
      </div>

      <div className="accordion m-3" id="equipment-accordion">
        {filtered
          .map((item) => (
            <EquipmentCard
              key={item.index}
              item={item}
              expanded={expanded}
              handleChangeExpanded={handleChangeExpanded}
            />
          ))
          .splice((page - 1) * 10, 10)}
      </div>

      {pagination(filtered, page, handleChangePage)}
    </>
  );
}
