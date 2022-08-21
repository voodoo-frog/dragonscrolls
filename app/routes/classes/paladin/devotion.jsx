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
  const subclassData = await SubclassData.findOne({ index: "devotion" });

  // Features
  const features = (await Feature.find().lean()).filter(
    (feature) => feature.subclass && feature.subclass.index === "devotion"
  );
  const classFeatures = createSet(sorter(features, "level", true));

  return { subclass: subclassData, features: classFeatures };
};

export default function DevotionPaladin() {
  const { subclass, features } = useLoaderData();

  const headers = ["Paladin Level", "Spells"];

  const rows = [
    ["3rd", "Protection from Evil and Good, Sanctuary"],
    ["5th", "Lesser Restoration, Zone of Truth"],
    ["9th", "Beacon of Hope, Dispel Magic"],
    ["13th", "Freedom of Movement, Guardian of Faith"],
    ["17th", "Commune, Flame Strike"],
  ];

  const data = { subclass, features };

  return (
    <SubclassLayout data={data}>
      {table("Oath of Devotion Spells", headers, rows)}
    </SubclassLayout>
  );
}
