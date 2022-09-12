import { useLoaderData } from "@remix-run/react";

import SubclassLayout from "~/components/subclass/SubclassLayout";

import { createSet, sorter, table } from "~/lib/common";
import dbConnect from "~/lib/dbConnect";

import Feature from "~/models/feature";
import SubclassData from "~/models/subclass";

export const loader = async () => {
  await dbConnect();

  // Subclass
  const subclassData = await SubclassData.findOne({ index: "land" });

  // Features
  const features = (await Feature.find().lean()).filter(
    (feature) =>
      feature.subclass &&
      feature.subclass.index === "land" &&
      !feature.name.includes("Circle of the Land")
  );
  const classFeatures = createSet(sorter(features, "level", true));

  return { subclass: subclassData, features: classFeatures };
};

export default function LandDruid() {
  const { subclass, features } = useLoaderData();

  const headers = ["Druid Level", "Circle Spells"];

  const arctic = [
    ["3rd", "Hold Person, Spike Growth"],
    ["5th", "Sleet Storm, Slow"],
    ["7th", "Freedom of Movement, Ice Storm"],
    ["9th", "Commune with Nature, Cone of Cold"],
  ];

  const coast = [
    ["3rd", "Mirror Image, Misty Step"],
    ["5th", "Water Breathing, Water Walk"],
    ["7th", "Control Water, Freedom of Movement"],
    ["9th", "Conjure Elemental, Scrying"],
  ];

  const desert = [
    ["3rd", "	Blur, Silence"],
    ["5th", "Create Food and Water, Protection from Energy"],
    ["7th", "Blight, Hallucinatory Terrain"],
    ["9th", "Insect Plague, Wall of Stone"],
  ];

  const forest = [
    ["3rd", "Barkskin, Spider Climb"],
    ["5th", "Call Lightning, Plant Growth"],
    ["7th", "Divination, Freedom of Movement"],
    ["9th", "Commune with Nature, Tree Stride"],
  ];

  const grassland = [
    ["3rd", "	Invisibility, Pass Without Trace"],
    ["5th", "Daylight, Haste"],
    ["7th", "Divination, Freedom of Movement"],
    ["9th", "Dream, Insect Plague"],
  ];

  const mountain = [
    ["3rd", "Spider Climb, Spike Growth"],
    ["5th", "Lightning Bolt, Meld into Stone"],
    ["7th", "Stone Shape, Stoneskin"],
    ["9th", "Passwall, Wall of Stone"],
  ];

  const swamp = [
    ["3rd", "Darkness, Melf's Acid Arrow"],
    ["5th", "	Water Walk, Stinking Cloud"],
    ["7th", "Freedom of Movement, Locate Creature"],
    ["9th", "Insect Plague, Scrying"],
  ];

  const underdark = [
    ["3rd", "Spider Climb, Web"],
    ["5th", "Gaseous Form, Stinking Cloud"],
    ["7th", "Greater Invisibility, Stone Shape"],
    ["9th", "Cloudkill, Insect Plague"],
  ];

  const data = { subclass, features };

  return (
    <SubclassLayout data={data}>
      {table("Arctic", headers, arctic, true)}
      {table("Coast", headers, coast, true)}
      {table("Desert", headers, desert, true)}
      {table("Forest", headers, forest, true)}
      {table("Grassland", headers, grassland, true)}
      {table("Mountain", headers, mountain, true)}
      {table("Swamp", headers, swamp, true)}
      {table("Underdark", headers, underdark, true)}
    </SubclassLayout>
  );
}
