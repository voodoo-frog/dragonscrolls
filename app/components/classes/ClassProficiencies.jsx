function ClassProficiencies({
  name,
  proficiencies,
  proficiency_choices,
  saving_throws,
}) {
  const armors =
    proficiencies
      .filter((prof) => prof.category === "armor")
      .map((res) => res.name)
      .join(", ") || "None";

  const weapons =
    proficiencies
      .filter((prof) => prof.category === "weapon")
      .map((res) => res.name)
      .join(", ") || "None";

  let tools =
    proficiencies
      .filter((prof) => prof.category === "tool")
      .map((res) => res.name)
      .join(", ") || "None";

  const skills =
    name === "Bard"
      ? "Choose any three"
      : `Choose ${
          proficiency_choices[0].choose
        } from ${proficiency_choices[0].from
          .map((skill) => skill.name)
          .join(", ")}`;

  const throws = saving_throws.map((st) => st.name).join(", ");

  if (name === "Bard") tools = "Three musical instruments of your choice";
  if (name === "Monk")
    tools = "One type of artisan's tools or one musical instrument";

  return (
    <div id="proficiencies">
      <h5 className="mt-3 text-xl font-bold capitalize">Proficiencies</h5>
      <p>
        <strong>Armor:</strong> {armors}
      </p>
      <p>
        <strong>Weapons:</strong> {weapons}
      </p>
      <p>
        <strong>Tools:</strong> {tools}
      </p>
      <p>
        <strong>Saving Throws:</strong>
        {throws}
      </p>
      <p>
        <strong>Skills:</strong> {skills || "None"}
      </p>
    </div>
  );
}
export default ClassProficiencies;
