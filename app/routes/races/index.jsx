import { useLoaderData } from "@remix-run/react";
import RaceCard from "~/components/races/RaceCard";
import dbConnect from "~/lib/dbConnect";
import Race from "~/models/race";
import { sorter } from "~/lib/common";

export const meta = () => {
  return {
    title: "Dragon Scrolls: Classes",
  };
};

export const loader = async ({ params }) => {
  await dbConnect();

  const races = await Race.find({});

  return { races: sorter(races, "index"), params };
};

export default function RacesPage() {
  const { races } = useLoaderData();

  const cards = races.map((raceData) => (
    <RaceCard key={raceData.index} raceData={raceData} />
  ));
  return (
    <>
      <h3 className="m-3	text-4xl">Races</h3>
      <div className="container m-auto flex grid w-full grid-cols-1 justify-items-center gap-4 p-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {cards}
      </div>
    </>
  );
}
