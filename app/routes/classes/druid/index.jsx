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
  const druid = await Class.findOne({ index: "druid" });

  // Class Features
  const features = (await Feature.find().lean()).filter(
    (feature) => feature.class.index === druid.index
  );

  const classFeatures = createSet(sorter(features, "level", true));

  // Subclasses
  const subclasses = (await Subclass.find().lean()).filter(
    (subclass) => subclass.class.index === druid.index
  );

  return { druid, classFeatures, subclasses };
};

export default function Druid() {
  const { druid, classFeatures, subclasses } = useLoaderData();

  const classData = { singleClass: druid, classFeatures };

  return (
    <ClassLayout classData={classData}>
      {feature(classFeatures, "Druidic", "druidic")}

      <h5 className="mt-3 text-2xl font-bold capitalize">Wild Shape</h5>

      <TableContainer
        className="my-3"
        component={Paper}
        sx={{ backgroundColor: "rgb(17 24 39 / 0.25)" }}
      >
        <h5 className="m-3 text-lg font-bold capitalize">Beast Shapes</h5>
        <hr />
        <Table
          sx={{ minWidth: 650 }}
          size="small"
          aria-label="wild shape table"
        >
          <TableHead>
            <TableRow>
              <TableCell className="font-bold">
                <strong>Level</strong>
              </TableCell>
              <TableCell align="left">
                <strong>Max CR</strong>
              </TableCell>
              <TableCell align="left">
                <strong>Limitations</strong>
              </TableCell>
              <TableCell align="left">
                <strong>Example</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                2nd
              </TableCell>
              <TableCell align="left">1/4</TableCell>
              <TableCell align="left">No flying or swimming speed</TableCell>
              <TableCell align="left">Wolf</TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                4th
              </TableCell>
              <TableCell align="left">1/2</TableCell>
              <TableCell align="left">No flying speed</TableCell>
              <TableCell align="left">Crocodile</TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                8th
              </TableCell>
              <TableCell align="left">1</TableCell>
              <TableCell align="left"></TableCell>
              <TableCell align="left">Giant eagle</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {classFeatures
        .find(
          (feature) =>
            feature.index ===
            "wild-shape-cr-1-4-or-below-no-flying-or-swim-speed"
        )
        .desc.map((desc, index) => (
          <p key={index}>{desc}</p>
        ))}

      {feature(classFeatures, "Druid Circle", "druid-circle")}
      {subclassList(subclasses)}

      {feature(
        classFeatures,
        "Ability Score Improvement",
        "druid-ability-score-improvement-1"
      )}
      {feature(classFeatures, "Timeless Body", "druid-timeless-body")}
      {feature(classFeatures, "Beast Spells", "beast-spells")}
      {feature(classFeatures, "Archdruid", "archdruid")}
    </ClassLayout>
  );
}
