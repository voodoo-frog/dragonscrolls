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
  const ranger = await Class.findOne({ index: "ranger" });

  // Class Features
  const features = (await Feature.find().lean()).filter(
    (feature) => feature.class.index === ranger.index
  );

  const classFeatures = createSet(sorter(features, "level", true));

  // Subclasses
  const subclasses = (await Subclass.find().lean()).filter(
    (subclass) => subclass.class.index === ranger.index
  );

  return { ranger, classFeatures, subclasses };
};

export default function Ranger() {
  const { ranger, classFeatures, subclasses } = useLoaderData();

  const classData = { singleClass: ranger, classFeatures };

  return (
    <ClassLayout classData={classData}>
      {feature(classFeatures, "Favored Enemy", "favored-enemy-1-type")}
      {feature(
        classFeatures,
        "Natural Explorer",
        "natural-explorer-1-terrain-type"
      )}
      {list(classFeatures, "Fighting Style", "ranger-fighting-style")}
      {feature(classFeatures, "Primeval Awareness", "primeval-awareness")}

      {feature(classFeatures, "Ranger Conclave", "ranger-archetype")}
      {subclassList(subclasses)}

      {feature(
        classFeatures,
        "Ability Score Improvement",
        "ranger-ability-score-improvement-1"
      )}
      {feature(classFeatures, "Extra Attack", "ranger-extra-attack")}
      {feature(classFeatures, "Land's Stride", "ranger-lands-stride")}
      {feature(classFeatures, "Hide in Plain Sight", "hide-in-plain-sight")}
      {feature(classFeatures, "Vanish", "vanish")}
      {feature(classFeatures, "Feral Senses", "feral-senses")}
      {feature(classFeatures, "Foe Slayer", "foe-slayer")}
    </ClassLayout>
  );
}
