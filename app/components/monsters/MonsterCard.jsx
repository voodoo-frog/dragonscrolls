import { AccordionItem } from "~/lib/common";

export default function MonsterCard({
  monster,
  expanded,
  handleChangeExpanded,
}) {
  const {
    name,
    index,
    actions,
    alignment,
    armor_class,
    charisma,
    challenge_rating,
    constitution,
    dexterity,
    hit_points,
    hit_dice,
    intelligence,
    languages,
    legendary_actions,
    proficiencies,
    // proficiency_bonus,
    size,
    special_abilities,
    speed,
    strength,
    source_book,
    type,
    wisdom,
    xp,
  } = monster;

  const speeds = [];
  const senses = [];

  for (const [key, value] of Object.entries(speed)) {
    speeds.push(`${key}: ${value}`);
  }

  for (const [key, value] of Object.entries(monster.senses)) {
    senses.push(`${key}: ${value}`);
  }

  const saving_throws = proficiencies
    .filter((prof) => prof.proficiency?.index.includes("saving-throw"))
    .map((prof) => `${prof.proficiency.name} +${prof.value}`)
    .join(", ");

  const skills = proficiencies
    .filter((prof) => prof.proficiency?.index.includes("skill"))
    .map((prof) => `${prof.proficiency.name} +${prof.value}`)
    .join(", ");

  return (
    <AccordionItem
      title={
        <>
          <p className="w-[250px]">{name}</p>

          <div className="hidden lg:flex">
            <p className="w-[100px]">{challenge_rating}</p>

            <p className="w-[150px] capitalize">
              {type === "swarm of Tiny beasts" ? "beast" : type}
            </p>

            <p className="w-[150px]">{size}</p>

            <p className="capitalize">
              {alignment.includes("50%") ? "neutral" : alignment}
            </p>
          </div>
        </>
      }
      expanded={expanded === index}
      onClick={() => handleChangeExpanded(index)}
    >
      <h3 className="text-2xl font-bold">{name}</h3>
      <p className="mb-3 text-sm capitalize italic">
        {size} {type}, {alignment}
      </p>
      <p className="text-sm capitalize italic">
        <strong>Armor Class:</strong> {armor_class}
      </p>
      <p className="text-sm capitalize italic">
        <strong>Hit Points:</strong> {hit_points} ({hit_dice})
      </p>
      <p className="text-sm italic">
        <strong>Speed:</strong> {speeds.join(" / ")}
      </p>

      <div className="container flex grid w-full grid-cols-12 gap-1 py-5">
        <div>
          <p className="text-sm font-bold capitalize">STR</p>
          <p className="text-sm capitalize italic">{strength}</p>
        </div>
        <div>
          <p className="text-sm font-bold capitalize">DEX</p>
          <p className="text-sm capitalize italic">{dexterity}</p>
        </div>
        <div>
          <p className="text-sm font-bold capitalize">CON</p>
          <p className="text-sm capitalize italic">{constitution}</p>
        </div>
        <div>
          <p className="text-sm font-bold capitalize">INT</p>
          <p className="text-sm capitalize italic">{intelligence}</p>
        </div>
        <div>
          <p className="text-sm font-bold capitalize">WIS</p>
          <p className="text-sm capitalize italic">{wisdom}</p>
        </div>
        <div>
          <p className="text-sm font-bold capitalize">CHA</p>
          <p className="text-sm capitalize italic">{charisma}</p>
        </div>
      </div>

      <p className="text-sm capitalize">
        <span className="font-bold italic">Saving Throws:</span>{" "}
        {saving_throws}
      </p>
      <p className="text-sm capitalize">
        <span className="font-bold italic">Skills:</span> {skills}
      </p>
      <p className="text-sm capitalize">
        <span className="font-bold italic">Senses:</span>{" "}
        {senses.join(" / ").replace(/_/g, " ")}
      </p>
      <p className="text-sm capitalize">
        <span className="font-bold italic">Languages:</span> {languages}
      </p>
      <p className="text-sm capitalize">
        <span className="font-bold italic">Challenge Rating:</span>{" "}
        {challenge_rating} ({xp}XP)
      </p>
      <p className="text-sm capitalize text-red-600">
        <span className="font-bold italic">Proficiency Bonus:</span> TBD
      </p>

      {special_abilities.length > 0 && (
        <div className="my-3">
          {special_abilities.map((ability) => (
            <div key={ability.name} className="mb-3">
              <p className="text-sm">
                <span className="font-bold italic">{ability.name}</span>{" "}
                {ability.desc}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="my-3">
        <p className="font-bold">
          <strong>Actions</strong>
        </p>
        {actions.map((action) => (
          <div key={action.name} className="mb-3">
            <p className="text-sm">
              <span className="font-bold italic">{action.name}</span>{" "}
              {action.desc}
            </p>
          </div>
        ))}
      </div>

      {legendary_actions.length > 0 && (
        <div className="my-3">
          <p className="font-bold">
            <strong>Legendary Actions</strong>
          </p>
          {legendary_actions.map((action) => (
            <div key={action.name} className="mb-3">
              <p className="text-sm">
                <span className="font-bold italic">{action.name}</span>{" "}
                {action.desc}
              </p>
            </div>
          ))}
        </div>
      )}

      <p className="text-sm capitalize italic">Source: {source_book}</p>
    </AccordionItem>
  );
}
