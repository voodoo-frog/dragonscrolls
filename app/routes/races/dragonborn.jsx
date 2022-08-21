import { useLoaderData } from "@remix-run/react";

import RaceLayout from "~/components/races/RaceLayout";

import { feature, table } from "~/lib/common";
import dbConnect from "~/lib/dbConnect";

import Race from "~/models/race";
import Trait from "~/models/trait";

export const loader = async () => {
  await dbConnect();

  // Race
  const race = await Race.findOne({ index: "dragonborn" });

  // Traits
  const traitsArr = await Trait.find();

  const traits = traitsArr.filter((trait) =>
    trait.races.some((r) => r.index === race.index)
  );

  return { race, traits };
};

export default function Dragonborn() {
  const { race, traits } = useLoaderData();

  const headers = ["Dragon", "Damage Type", "Breath Weapon"];

  const rows = [
    ["Black", "Acid", "5 by 30 ft. line (Dex. save)"],
    ["Blue", "Lightning", "5 by 30 ft. line (Dex. save)"],
    ["Brass", "Fire", "5 by 30 ft. line (Dex. save)"],
    ["Bronze", "Lightning", "5 by 30 ft. line (Dex. save)"],
    ["Copper", "Acid", "5 by 30 ft. line (Dex. save)"],
    ["Gold", "Fire", "15 ft. cone (Dex. save)"],
    ["Green", "Poison", "15 ft. cone (Dex. save)"],
    ["Red", "Fire", "15 ft. cone (Dex. save)"],
    ["Silver", "Cold", "15 ft. cone (Dex. save)"],
    ["White", "Cold", "15 ft. cone (Dex. save)"],
  ];

  return (
    <RaceLayout race={race}>
      {feature(traits, "Draconic Ancestry", "draconic-ancestry")}
      {table(undefined, headers, rows, true)}

      {feature(traits, "Breath Weapon", "breath-weapon")}

      {feature(traits, "Damage Resistance", "damage-resistance")}
    </RaceLayout>
  );
}
