import { useLoaderData } from "@remix-run/react";

import { createSet, sorter, feature, subclassList } from "~/lib/common";

import ClassLayout from "~/components/classes/ClassLayout";

import Class from "~/models/class";
import Feature from "~/models/feature";
import Subclass from "~/models/subclass";

import dbConnect from "~/lib/dbConnect";

export const loader = async () => {
  await dbConnect();

  // Class
  const cleric = await Class.findOne({ index: "cleric" });

  // Class Features
  const features = (await Feature.find().lean()).filter(
    (feature) => feature.class.index === cleric.index
  );

  const classFeatures = createSet(sorter(features, "level", true));

  // Subclasses
  const subclasses = (await Subclass.find().lean()).filter(
    (subclass) => subclass.class.index === cleric.index
  );

  return { cleric, classFeatures, subclasses };
};

export default function Cleric() {
  const { cleric, classFeatures, subclasses } = useLoaderData();

  const classData = { singleClass: cleric, classFeatures };

  return (
    <ClassLayout classData={classData}>
      {feature(classFeatures, "Divine Domain", "divine-domain")}
      {subclassList(subclasses)}

      {feature(classFeatures, "Channel Divinity", "channel-divinity-1-rest")}
      {feature(
        classFeatures,
        "Channel Divinity: Turn Undead",
        "channel-divinity-turn-undead"
      )}

      {feature(
        classFeatures,
        "Ability Score Improvement",
        "cleric-ability-score-improvement-1"
      )}

      {feature(
        classFeatures,
        "Destroy Undead",
        "destroy-undead-cr-1-2-or-below"
      )}

      {feature(classFeatures, "Divine Intervention", "divine-intervention")}
    </ClassLayout>
  );
}
