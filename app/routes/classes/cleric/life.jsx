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
  const subclassData = await SubclassData.findOne({ index: "life" });

  // Features
  const features = (await Feature.find().lean()).filter(
    (feature) => feature.subclass && feature.subclass.index === "life"
  );
  const classFeatures = createSet(sorter(features, "level", true));

  return { subclass: subclassData, features: classFeatures };
};

export default function LifeCleric() {
  const { subclass, features } = useLoaderData();

  const headers = ["Cleric Level", "Spells"];

  const rows = [
    ["1st", "Bless, Cure Wounds"],
    ["3rd", "Lesser Restoration, Spiritual Weapon"],
    ["5th", "Beacon of Hope, Revivify"],
    ["7th", "Death Ward, Guardian of Faith"],
    ["9th", "Mass Cure Wounds, Raise Dead"],
  ];

  const data = { subclass, features };

  return (
    <SubclassLayout data={data}>
      {table("Life Domain Spells", headers, rows)}
    </SubclassLayout>
  );
}
