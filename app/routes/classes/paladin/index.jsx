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
  const paladin = await Class.findOne({ index: "paladin" });

  // Class Features
  const features = (await Feature.find().lean()).filter(
    (feature) => feature.class.index === paladin.index
  );

  const classFeatures = createSet(sorter(features, "level", true));

  // Subclasses
  const subclasses = (await Subclass.find().lean()).filter(
    (subclass) => subclass.class.index === paladin.index
  );

  return { paladin, classFeatures, subclasses };
};

export default function Paladin() {
  const { paladin, classFeatures, subclasses } = useLoaderData();

  const classData = { singleClass: paladin, classFeatures };

  return (
    <ClassLayout classData={classData}>
      {feature(classFeatures, "Divine Sense", "divine-sense")}

      {feature(classFeatures, "Lay on Hands", "lay-on-hands")}

      {list(classFeatures, "Fighting Style", "paladin-fighting-style")}

      {feature(classFeatures, "Divine Smite", "divine-smite")}

      {feature(classFeatures, "Divine Health", "divine-health")}

      {feature(classFeatures, "Sacred Oath", "sacred-oath")}
      {subclassList(subclasses)}

      {feature(classFeatures, "Oath Spells", "oath-spells")}

      {feature(classFeatures, "Channel Divinity", "channel-divinity")}

      {feature(
        classFeatures,
        "Ability Score Improvement",
        "paladin-ability-score-improvement-1"
      )}

      {feature(classFeatures, "Extra Attack", "paladin-extra-attack")}

      {feature(classFeatures, "Aura of Protection", "aura-of-protection")}

      {feature(classFeatures, "Aura of Courage", "aura-of-courage")}

      {feature(classFeatures, "Improved Divine Smite", "improved-divine-smite")}

      {feature(classFeatures, "Cleansing Touch", "cleansing-touch")}
    </ClassLayout>
  );
}
