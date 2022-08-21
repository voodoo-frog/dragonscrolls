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
  const monk = await Class.findOne({ index: "monk" });

  // Class Features
  const features = (await Feature.find().lean()).filter(
    (feature) => feature.class.index === monk.index
  );

  const classFeatures = createSet(sorter(features, "level", true));

  // Subclasses
  const subclasses = (await Subclass.find().lean()).filter(
    (subclass) => subclass.class.index === monk.index
  );

  return { monk, classFeatures, subclasses };
};

export default function Monk() {
  const { monk, classFeatures, subclasses } = useLoaderData();

  const classData = { singleClass: monk, classFeatures };

  return (
    <ClassLayout classData={classData}>
      {feature(classFeatures, "Unarmored Defense", "monk-unarmored-defense")}

      {feature(classFeatures, "Martial Arts", "martial-arts")}

      {feature(classFeatures, "Ki", "ki")}

      {feature(classFeatures, "Unarmored Movement", "unarmored-movement-1")}

      {feature(classFeatures, "Monastic Tradition", "monastic-tradition")}
      {subclassList(subclasses)}

      {feature(classFeatures, "Deflect Missiles", "deflect-missiles")}

      {feature(
        classFeatures,
        "Ability Score Improvement",
        "monk-ability-score-improvement-1"
      )}

      {feature(classFeatures, "Slow Fall", "slow-fall")}

      {feature(classFeatures, "Extra Attack", "monk-extra-attack")}

      {feature(classFeatures, "Stunning Strike", "stunning-strike")}

      {feature(classFeatures, "Ki-Empowered Strikes", "ki-empowered-strikes")}

      {feature(classFeatures, "Evasion", "monk-evasion")}

      {feature(classFeatures, "Stillness of Mind", "stillness-of-mind")}

      {feature(classFeatures, "Purity of Body", "purity-of-body")}

      {feature(
        classFeatures,
        "Tongue of the Sun and Moon",
        "tongue-of-the-sun-and-moon"
      )}

      {feature(classFeatures, "Diamond Soul", "diamond-soul")}

      {feature(classFeatures, "Timeless Body", "monk-timeless-body")}

      {feature(classFeatures, "Empty Body", "empty-body")}

      {feature(classFeatures, "Perfect Self", "perfect-self")}
    </ClassLayout>
  );
}
