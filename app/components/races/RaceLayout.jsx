export default function RaceLayout({ race, children }) {
  const {
    index,
    name,
    age,
    ability_bonuses,
    alignment,
    brief,
    language_desc,
    size_description,
    speed,
    source_book,
  } = race;

  return (
    <div className="mx-auto w-[80%] pb-10">
      <h3 className="mt-3	text-4xl font-bold capitalize">{name}</h3>
      <img
        className="mx-auto my-8 w-full lg:w-1/2"
        src={`/images/${index}.png`}
        alt={`${index} class`}
      />
      <p className="text-sm">Source: {source_book}</p>

      <p className="my-5 font-bold">{brief}</p>

      <div id="class-features">
        <h4 className="mt-3	text-3xl capitalize">{name} Features:</h4>

        <p className="pt-3">
          <span className="font-bold capitalize">Ability Score Increase: </span>
          {/* TODO add ability_score_desc */}
          {index === "human"
            ? "Your ability scores each increase by 1."
            : ability_bonuses
                .map((ab) => `+${ab.bonus} ${ab.ability_score.name}`)
                .join(", ")}
        </p>

        <p className="pt-3">
          <span className="font-bold capitalize">Age: </span>
          {age}
        </p>

        <p className="pt-3">
          <span className="font-bold capitalize">Size: </span>
          {size_description}
        </p>

        <p className="pt-3">
          <span className="font-bold capitalize">Speed: </span>
          {speed} feet.
        </p>

        <p className="pt-3">
          <span className="font-bold capitalize">Languages: </span>
          {language_desc}
        </p>

        <p className="pt-3">
          <span className="font-bold capitalize">Alignment: </span>
          {alignment}
        </p>

        {children}
      </div>
    </div>
  );
}
