import { Link } from "@remix-run/react";

export default function ClassCard({ classData }) {
  const { name, index, hit_die, brief, primary_ability } = classData;

  let abilities = primary_ability
    .map((ability) => ability.index.toUpperCase())
    .sort();
  abilities =
    index === "fighter" ? abilities.join(" or ") : abilities.join(" & ");

  return (
    <div className="col-span-1 flex w-full max-w-md flex-col rounded border-2 border-2 border-solid border-white shadow-lg">
      <div className="relative h-96 overflow-hidden bg-gray-900/25">
        <img
          className="absolute top-2 left-2 z-10 rounded-full"
          src={`/images/${index}-emblem-color.jpeg`}
          alt={`${name} Class Emblem`}
          style={{ height: "100px" }}
        />
        <img
          className={`absolute top-0 right-0 w-full`}
          src={`/images/${index}-full.png`}
          alt={`${name} Class`}
        />
      </div>
      <div className="relative bg-white py-4" style={{ minHeight: 220 }}>
        <div className="flex justify-between p-2">
          <p className="text-xl font-bold">{name}</p>
          <p className="self-center rounded-full bg-red-600 px-1 text-sm text-white">
            d{hit_die}
          </p>
        </div>
        <p className="px-2 text-lg">
          Primary Abilities: <span>{abilities}</span>
        </p>
        <p className="px-2 text-base text-gray-700">{brief}</p>
        <Link to={index} className="absolute bottom-0 w-full p-2">
          <button className="w-full rounded bg-red-600 p-3 capitalize text-white hover:bg-red-700">
            View {name} Details
          </button>
        </Link>
      </div>
    </div>
  );
}
