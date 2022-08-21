import { useLoaderData } from "@remix-run/react";

import { createSet, sorter, feature, subclassList, list } from "~/lib/common";

import ClassLayout from "~/components/classes/ClassLayout";

import Class from "~/models/class";
import Feature from "~/models/feature";
import Subclass from "~/models/subclass";

import dbConnect from "~/lib/dbConnect";

export const loader = async () => {
  await dbConnect();

  // Class
  const fighter = await Class.findOne({ index: "fighter" });

  // Class Features
  const features = (await Feature.find().lean()).filter(
    (feature) => feature.class.index === fighter.index
  );

  const classFeatures = createSet(sorter(features, "level", true));

  // Subclasses
  const subclasses = (await Subclass.find().lean()).filter(
    (subclass) => subclass.class.index === fighter.index
  );

  return { fighter, classFeatures, subclasses };
};

export default function Fighter() {
  const { fighter, classFeatures, subclasses } = useLoaderData();

  const classData = { singleClass: fighter, classFeatures };

  return (
    <ClassLayout classData={classData}>
      {list(classFeatures, "Fighting Style", "fighter-fighting-style")}

      {feature(classFeatures, "Second Wind", "second-wind")}

      {feature(classFeatures, "Action Surge", "action-surge-1-use")}

      {feature(classFeatures, "Martial Archetype", "martial-archetype")}
      {subclassList(subclasses)}

      {feature(
        classFeatures,
        "Ability Score Improvement",
        "fighter-ability-score-improvement-1"
      )}

      {feature(classFeatures, "Extra Attack", "extra-attack-1")}

      {feature(classFeatures, "Indomitable", "indomitable-1-use")}
    </ClassLayout>
  );
}
