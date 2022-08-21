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
  const barbarian = await Class.findOne({ index: "barbarian" });

  // Class Features
  const features = (await Feature.find().lean()).filter(
    (feature) => feature.class.index === barbarian.index
  );

  const classFeatures = createSet(sorter(features, "level", true));

  // Subclasses
  const subclasses = (await Subclass.find().lean()).filter(
    (subclass) => subclass.class.index === barbarian.index
  );

  return { barbarian, classFeatures, subclasses };
};

export default function Barbarian() {
  const { barbarian, classFeatures, subclasses } = useLoaderData();

  const classData = { singleClass: barbarian, classFeatures };

  return (
    <ClassLayout classData={classData}>
      {feature(classFeatures, "Rage", "rage")}

      {feature(
        classFeatures,
        "Unarmored Defense",
        "barbarian-unarmored-defense"
      )}

      {feature(classFeatures, "Danger Sense", "danger-sense")}

      {feature(classFeatures, "Reckless Attack", "reckless-attack")}

      {feature(classFeatures, "Primal Path", "primal-path")}
      {subclassList(subclasses)}

      {feature(
        classFeatures,
        "Ability Score Improvement",
        "barbarian-ability-score-improvement-1"
      )}

      {feature(classFeatures, "Extra Attack", "barbarian-extra-attack")}

      {feature(classFeatures, "Fast Movement", "fast-movement")}

      {feature(classFeatures, "Feral Instinct", "feral-instinct")}

      {feature(classFeatures, "Brutal Critical", "brutal-critical-1-die")}

      {feature(classFeatures, "Relentless Rage", "relentless-rage")}

      {feature(classFeatures, "Persistent Rage", "persistent-rage")}

      {feature(classFeatures, "Indomitable Might", "indomitable-might")}

      {feature(classFeatures, "Primal Champion", "primal-champion")}
    </ClassLayout>
  );
}
