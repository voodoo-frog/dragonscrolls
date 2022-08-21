import { Link } from "@remix-run/react";

export default function RaceCard({ raceData }) {
  const { name, index, brief, traits } = raceData;

  return (
    <div className="col-span-1 flex w-full max-w-md flex-col rounded border-2 border-2 border-solid border-white shadow-lg">
      <div className="relative h-96 overflow-hidden bg-gray-900/25">
        <img
          className={`absolute top-0 right-0 w-full`}
          src={`/images/${index}.png`}
          alt={`${name} Class`}
        />
      </div>
      <div className="relative bg-white py-4" style={{ minHeight: 300 }}>
        <div className="flex justify-between p-2">
          <p className="text-xl font-bold">{name}</p>
        </div>
        <p className="px-2 text-sm font-bold">
          Traits:{" "}
          {index === "human"
            ? "+1 to All Ability Scores, Extra Language"
            : traits.map((trait) => trait.name).join(", ")}
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
