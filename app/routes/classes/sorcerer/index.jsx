import { useLoaderData } from "@remix-run/react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { createSet, sorter, feature, subclassList } from "~/lib/common";

import ClassLayout from "~/components/classes/ClassLayout";

import Class from "~/models/class";
import Feature from "~/models/feature";
import Subclass from "~/models/subclass";

import dbConnect from "~/lib/dbConnect";

export const loader = async () => {
  await dbConnect();

  // Class
  const sorcerer = await Class.findOne({ index: "sorcerer" });

  // Class Features
  const features = (await Feature.find().lean()).filter(
    (feature) => feature.class.index === sorcerer.index
  );

  const classFeatures = createSet(sorter(features, "level", true));

  // Subclasses
  const subclasses = (await Subclass.find().lean()).filter(
    (subclass) => subclass.class.index === sorcerer.index
  );

  return { sorcerer, classFeatures, subclasses };
};

export default function Sorcerer() {
  const { sorcerer, classFeatures, subclasses } = useLoaderData();

  const classData = { singleClass: sorcerer, classFeatures };

  return (
    <ClassLayout classData={classData}>
      {feature(classFeatures, "Sorcerous Origin", "sorcerous-origin")}
      {subclassList(subclasses)}

      {feature(classFeatures, "Font of Magic", "font-of-magic")}
      <TableContainer
        className="my-3"
        component={Paper}
        sx={{ backgroundColor: "rgb(17 24 39 / 0.25)" }}
      >
        <h5 className="m-3 text-lg font-bold capitalize">
          Creating Spell Slots
        </h5>
        <hr />
        <Table size="small" aria-label="wild shape table">
          <TableHead>
            <TableRow>
              <TableCell className="font-bold">
                <strong>Spell Slot Level</strong>
              </TableCell>
              <TableCell align="left">
                <strong>Sorcery Point Cost</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                1st
              </TableCell>
              <TableCell align="left">2</TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                2nd
              </TableCell>
              <TableCell align="left">3</TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                3rd
              </TableCell>
              <TableCell align="left">5</TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                4th
              </TableCell>
              <TableCell align="left">6</TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                5th
              </TableCell>
              <TableCell align="left">7</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {feature(classFeatures, "Metamagic", "metamagic-1")}
      <ul className="list-inside list-disc">
        {classFeatures
          .filter(
            (feature) =>
              feature.parent && feature.parent.index === "metamagic-1"
          )
          .sort((a, b) => a.name - b.name)
          .map((feature) => (
            <li key={feature.index}>
              <span className="font-bold">{feature.name}:</span>{" "}
              {feature.desc.map((desc, index) => (
                <span key={index}>{desc}</span>
              ))}
            </li>
          ))}
      </ul>

      {feature(
        classFeatures,
        "Ability Score Improvement",
        "sorcerer-ability-score-improvement-1"
      )}

      {feature(classFeatures, "Sorcerous Restoration", "sorcerous-restoration")}
    </ClassLayout>
  );
}
