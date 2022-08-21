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
  const bard = await Class.findOne({ index: "bard" });

  // Class Features
  const features = (await Feature.find().lean()).filter(
    (feature) => feature.class.index === bard.index
  );

  const classFeatures = createSet(sorter(features, "level", true));

  // Subclasses
  const subclasses = (await Subclass.find().lean()).filter(
    (subclass) => subclass.class.index === bard.index
  );

  return { bard, classFeatures, subclasses };
};

export default function Bard() {
  const { bard, classFeatures, subclasses } = useLoaderData();

  const classData = { singleClass: bard, classFeatures };

  return (
    <ClassLayout classData={classData}>
      {feature(classFeatures, "Bardic Inspiration", "bardic-inspiration-d6")}

      {feature(classFeatures, "Jack of all Trades", "jack-of-all-trades")}

      {feature(classFeatures, "Song of Rest", "song-of-rest-d6")}

      {feature(classFeatures, "Bard College", "bard-college")}
      {subclassList(subclasses)}

      {feature(classFeatures, "Expertise", "bard-expertise-1")}

      {feature(
        classFeatures,
        "Ability Score Improvement",
        "bard-ability-score-improvement-1"
      )}

      {feature(classFeatures, "Font of Inspiration", "font-of-inspiration")}

      {feature(classFeatures, "Countercharm", "countercharm")}

      {feature(classFeatures, "Magical Secrets", "magical-secrets-1")}

      {feature(classFeatures, "Superior Inspiration", "superior-inspiration")}
    </ClassLayout>
  );
}
