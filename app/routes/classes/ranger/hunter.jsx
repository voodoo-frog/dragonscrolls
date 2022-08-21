import { useLoaderData } from "@remix-run/react";

import SubclassLayout from "~/components/subclass/SubclassLayout";

import { createSet, sorter, list } from "~/lib/common";

import dbConnect from "~/lib/dbConnect";

import Feature from "~/models/feature";
import SubclassData from "~/models/subclass";

export const loader = async () => {
  await dbConnect();

  // Subclass
  const subclassData = await SubclassData.findOne({ index: "hunter" });

  // Features
  const features = (await Feature.find().lean()).filter(
    (feature) => feature.subclass && feature.subclass.index === "hunter"
  );
  const classFeatures = createSet(sorter(features, "level", true));

  return { subclass: subclassData, features: classFeatures };
};

export default function HunterRanger() {
  const { subclass, features } = useLoaderData();

  return (
    <SubclassLayout data={{ subclass }}>
      {list(features, "Hunter's Prey", "hunters-prey", 14, false)}
      {list(features, "Defensive Tactics", "defensive-tactics", 19, false)}
      {list(features, "Multiattack", "multiattack", 13, false)}
      {list(
        features,
        "Superior Hunter's Defense",
        "superior-hunters-defense",
        27,
        false
      )}
    </SubclassLayout>
  );
}
