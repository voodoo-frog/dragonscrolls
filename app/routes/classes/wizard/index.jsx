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
  const wizard = await Class.findOne({ index: "wizard" });

  // Class Features
  const features = (await Feature.find().lean()).filter(
    (feature) => feature.class.index === wizard.index
  );

  const classFeatures = createSet(sorter(features, "level", true));

  // Subclasses
  const subclasses = (await Subclass.find().lean()).filter(
    (subclass) => subclass.class.index === wizard.index
  );

  return { wizard, classFeatures, subclasses };
};

export default function Wizard() {
  const { wizard, classFeatures, subclasses } = useLoaderData();

  const classData = { singleClass: wizard, classFeatures };

  return (
    <ClassLayout classData={classData}>
      {feature(classFeatures, "Arcane Recovery", "arcane-recovery")}

      {feature(classFeatures, "Arcane Tradition", "arcane-tradition")}
      {subclassList(subclasses)}

      {feature(
        classFeatures,
        "Ability Score Improvement",
        "wizard-ability-score-improvement-1"
      )}
      {feature(classFeatures, "Spell Mastery", "spell-mastery")}
      {feature(classFeatures, "Signature Spells", "signature-spell")}
    </ClassLayout>
  );
}
