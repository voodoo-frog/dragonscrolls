import { useLoaderData } from "@remix-run/react";

import { createSet, sorter, feature, subclassList, table } from "~/lib/common";

import ClassLayout from "~/components/classes/ClassLayout";

import Class from "~/models/class";
import Feature from "~/models/feature";
import Subclass from "~/models/subclass";

import dbConnect from "~/lib/dbConnect";

export const loader = async () => {
  await dbConnect();

  // Class
  const warlock = await Class.findOne({ index: "warlock" });

  // Class Features
  const features = (await Feature.find().lean()).filter(
    (feature) => feature.class.index === warlock.index
  );

  const classFeatures = createSet(sorter(features, "level", true));

  // Subclasses
  const subclasses = (await Subclass.find().lean()).filter(
    (subclass) => subclass.class.index === warlock.index
  );

  return { warlock, classFeatures, subclasses };
};

export default function Warlock() {
  const { warlock, classFeatures, subclasses } = useLoaderData();

  const classData = { singleClass: warlock, classFeatures };

  const headers = ["Name", "Level", "Prerequisites", "Description"];

  const rows = classFeatures
    .filter(
      (feature) =>
        feature.parent && feature.parent.index === "eldritch-invocations-1"
    )
    .map((feature) => {
      const prerequisites = feature.prerequisites
        .map((req) => {
          let res;

          if (req.type === "level") {
            res = `${req.level}th level`;
          } else {
            res = req.name;
          }

          return res;
        })
        .join(", ");

      return [
        feature.name,
        feature.level,
        prerequisites || "None",
        feature.desc.join("\n"),
      ];
    })
    .sort((a, b) => a[0].localeCompare(b[0]));

  return (
    <ClassLayout classData={classData}>
      {feature(classFeatures, "Otherworldly Patron", "otherworldly-patron")}
      {subclassList(subclasses)}

      {feature(classFeatures, "Eldritch Invocations", "eldritch-invocations-1")}

      {feature(classFeatures, "Pact Boon", "pact-boon")}
      <ul className="list-inside list-disc">
        {classFeatures
          .filter(
            (feature) => feature.parent && feature.parent.index === "pact-boon"
          )
          .sort((a, b) => a.name - b.name)
          .map((feature) => (
            <li key={feature.index}>
              <span className="font-bold">{feature.name}</span>
              <ul className="ml-6 list-inside list-disc">
                {feature.desc.map((desc, index) => (
                  <li className="my-2" key={index}>
                    {desc}
                  </li>
                ))}
              </ul>
            </li>
          ))}
      </ul>

      {feature(
        classFeatures,
        "Ability Score Improvement",
        "warlock-ability-score-improvement-1"
      )}
      {feature(classFeatures, "Mystic Arcanum", "mystic-arcanum-6th-level")}
      {feature(classFeatures, "Eldritch Master", "eldritch-master")}

      {table("Eldritch Invocations", headers, rows)}
    </ClassLayout>
  );
}
