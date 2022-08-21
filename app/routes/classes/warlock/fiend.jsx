import { useLoaderData } from "@remix-run/react";

import SubclassLayout from "~/components/subclass/SubclassLayout";

import { createSet, sorter } from "~/lib/common";
import dbConnect from "~/lib/dbConnect";

import Feature from "~/models/feature";
import SubclassData from "~/models/subclass";
import { table } from "../../../lib/common";

export const loader = async () => {
  await dbConnect();

  // Subclass
  const subclassData = await SubclassData.findOne({ index: "fiend" });

  // Features
  const features = (await Feature.find().lean()).filter(
    (feature) => feature.subclass && feature.subclass.index === "fiend"
  );
  const classFeatures = createSet(sorter(features, "level", true));

  return { subclass: subclassData, features: classFeatures };
};

export default function FiendWarlock() {
  const { subclass, features } = useLoaderData();

  const headers = ["Spell Level", "Spells"];

  const rows = [
    ["1st", "Burning Hands, Command"],
    ["2nd", "Blindness/Deafness, Scorching Ray"],
    ["3rd", "Fireball, Stinking Cloud"],
    ["4th", "Fire Shield, Wall of Fire"],
    ["5th", "Flame Strike, Hallow"],
  ];

  const data = { subclass, features };

  return (
    <SubclassLayout data={data}>
      {table("Fiend Expanded Spells", headers, rows)}
    </SubclassLayout>
  );
}
