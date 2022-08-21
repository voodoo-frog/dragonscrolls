import { useLoaderData } from "@remix-run/react";

import SubclassLayout from "~/components/subclass/SubclassLayout";

import { createSet, sorter } from "~/lib/common";
import dbConnect from "~/lib/dbConnect";

import Feature from "~/models/feature";
import SubclassData from "~/models/subclass";

export const loader = async ({ params }) => {
  await dbConnect();

  const { subclass } = params;

  // Subclass
  const subclassData = await SubclassData.findOne({ index: subclass });

  // Features
  const features = (await Feature.find().lean()).filter(
    (feature) => feature.subclass && feature.subclass.index === subclass
  );
  const classFeatures = createSet(sorter(features, "level", true));

  return { subclass: subclassData, features: classFeatures };
};

export default function Subclass() {
  const { subclass, features } = useLoaderData();

  const data = { subclass, features };

  return <SubclassLayout data={data} />;
}
