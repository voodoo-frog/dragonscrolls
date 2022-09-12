import { useLoaderData } from "@remix-run/react";

import SubclassLayout from "~/components/subclass/SubclassLayout";

import { createSet, sorter, table } from "~/lib/common";
import dbConnect from "~/lib/dbConnect";

import Feature from "~/models/feature";
import SubclassData from "~/models/subclass";

export const loader = async () => {
  await dbConnect();

  // Subclass
  const subclassData = await SubclassData.findOne({ index: "draconic" });

  // Features
  const features = (await Feature.find().lean()).filter(
    (feature) =>
      feature.subclass &&
      feature.subclass.index === "draconic" &&
      !feature.name.includes("Dragon Ancestor:")
  );
  const classFeatures = createSet(sorter(features, "level", true));

  return { subclass: subclassData, features: classFeatures };
};

export default function DraconicSorcerer() {
  const { subclass, features } = useLoaderData();

  const headers = ["Dragon Color", "Damage Type"];

  const rows = [
    ["Black", "Acid"],
    ["Blue", "Lightning"],
    ["Brass", "Fire"],
    ["Bronze", "Lightning"],
    ["Copper", "Acid"],
    ["Gold", "Fire"],
    ["Green", "Poison"],
    ["Red", "Fire"],
    ["Silver", "Cold"],
    ["White", "Cold"],
  ];

  const data = { subclass, features };

  return (
    <SubclassLayout data={data}>
      {table("Draconic Ancestry", headers, rows)}
    </SubclassLayout>
  );
}
