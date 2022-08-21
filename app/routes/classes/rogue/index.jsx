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
  const rogue = await Class.findOne({ index: "rogue" });

  // Class Features
  const features = (await Feature.find().lean()).filter(
    (feature) => feature.class.index === rogue.index
  );

  const classFeatures = createSet(sorter(features, "level", true));

  // Subclasses
  const subclasses = (await Subclass.find().lean()).filter(
    (subclass) => subclass.class.index === rogue.index
  );

  return { rogue, classFeatures, subclasses };
};

export default function Rogue() {
  const { rogue, classFeatures, subclasses } = useLoaderData();

  const classData = { singleClass: rogue, classFeatures };

  return (
    <ClassLayout classData={classData}>
      {feature(classFeatures, "Expertise", "rogue-expertise-1")}

      {feature(classFeatures, "Sneak Attack", "sneak-attack")}

      {feature(classFeatures, "Thieves' Cant", "thieves-cant")}

      {feature(classFeatures, "Cunning Action", "cunning-action")}

      {feature(classFeatures, "Roguish Archetype", "roguish-archetype")}
      {subclassList(subclasses)}

      {feature(
        classFeatures,
        "Ability Score Improvement",
        "rogue-ability-score-improvement-1"
      )}

      {feature(classFeatures, "Uncanny Dodge", "uncanny-dodge")}

      {feature(classFeatures, "Evasion", "rogue-evasion")}

      {feature(classFeatures, "Reliable Talent", "reliable-talent")}

      {feature(classFeatures, "Blindsense", "blindsense")}

      {feature(classFeatures, "Slippery Mind", "slippery-mind")}

      {feature(classFeatures, "Elusive", "elusive")}

      {feature(classFeatures, "Stroke of Luck", "stroke-of-luck")}
    </ClassLayout>
  );
}
