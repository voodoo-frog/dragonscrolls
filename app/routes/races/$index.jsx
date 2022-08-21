import { useLoaderData } from "@remix-run/react";

import Divider from "@mui/material/Divider";

import RaceLayout from "~/components/races/RaceLayout";

import Race from "~/models/race";
import Trait from "~/models/trait";
import Subrace from "~/models/subrace";

import dbConnect from "~/lib/dbConnect";
import { feature } from "../../lib/common";

export const loader = async ({ params }) => {
  const { index } = params;
  await dbConnect();

  // Race
  const race = await Race.findOne({ index });

  // Subraces
  const raceSubraces = await Subrace.find({}).lean();
  const subraces = raceSubraces.filter((sr) => sr.race.index === params.index);

  // Traits
  const traitsArr = await Trait.find();

  const traits = traitsArr.filter((trait) =>
    trait.races.some((r) => r.index === race.index)
  );

  // Subrace Traits
  const subraceTraits = subraces.map((subrace) => {
    return traitsArr.filter((trait) => {
      return trait.subraces.some((c) => c.index === subrace.index);
    });
  });

  return { race, subraces, traits, subraceTraits: subraceTraits[0] };
};

export default function RacePage() {
  const { race, traits, subraces, subraceTraits } = useLoaderData();

  return (
    <RaceLayout race={race}>
      {traits.length > 0 &&
        traits.map((trait) => feature(traits, trait.name, trait.index))}

      {subraces.map((subrace, index) => (
        <>
          <Divider sx={{ margin: "12px auto" }} />
          <div key={index} className="pt-3">
            <h5 className="text-xl font-bold capitalize">{subrace.name}</h5>
            <p>{subrace.desc}</p>

            {subraceTraits[index].length > 0 &&
              subraceTraits[index].map((trait) =>
                feature(subraceTraits, trait.name, trait.index)
              )}
          </div>
        </>
      ))}
    </RaceLayout>
  );
}
