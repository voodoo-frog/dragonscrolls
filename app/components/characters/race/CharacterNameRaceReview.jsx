import React from "react";

export default function CharacterNameRaceReview({
  race,
  subrace = [],
  traits,
  changeRace,
  children,
}) {
  const raceTraits = traits.filter((trait) =>
    trait.races.some((r) => r.index === race.index)
  );

  const subraceTraits = traits.filter((trait) =>
    trait.subraces.some((r) => r.index === subrace.index)
  );

  let racialTraits = [...raceTraits, ...subraceTraits];

  if (race.index === "dragonborn")
    racialTraits = racialTraits.filter(
      (trait) => !trait.index.includes("draconic-ancestry-")
    );

  return (
    <div className="text-black">
      <div className="justify-between-align-center flex w-full">
        <div className="grow">
          <h4 className="text-2xl">{subrace.name || race.name}</h4>
          <p className="text-gray-500">
            {subrace.source_book || race.source_book}
          </p>
          <p className="my-2">{race.brief}</p>
        </div>
        <div className="ml-3 flex shrink-0 flex-col items-center justify-center p-0">
          <img
            className="h-[100px] w-[100px]"
            name={subrace.name || race.name}
            src={`/images/${subrace.index || race.index}-avatar.jpeg`}
            alt={`${subrace.name || race.name} Avatar`}
          />
          <button
            className="text-sm text-blue-500 hover:underline"
            onClick={changeRace}
          >
            Change Race
          </button>
        </div>
      </div>
      <p className="my-2">{subrace.desc}</p>

      <p>
        <strong>Traits:</strong>{" "}
        {race.index === "human"
          ? "+1 to All Ability Scores, Extra Language"
          : racialTraits.map((trait) => trait.name).join(", ")}
      </p>
      <div className="mt-3">{children}</div>
    </div>
  );
}
