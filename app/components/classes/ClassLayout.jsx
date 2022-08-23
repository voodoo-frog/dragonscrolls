import ClassEquipment from "./ClassEquipment";
import ClassHitPoints from "./ClassHitPoints";
import ClassProficiencies from "./ClassProficiencies";
import ClassSpellcasting from "./ClassSpellcasting";

export default function ClassLayout({ classData, children }) {
  const { singleClass, classFeatures } = classData;
  const {
    index,
    name,
    desc,
    hit_die,
    proficiencies,
    proficiency_choices,
    starting_equipment,
    starting_equipment_options,
    saving_throws,
    spellcasting,
  } = singleClass;

  return (
    <div className="mx-auto w-[80%] pb-10">
      <h3 className="mt-3	text-4xl font-bold capitalize">{index}</h3>
      <img
        className="mx-auto my-8 w-full lg:w-1/2"
        src={`/images/${index}-full.png`}
        alt={`${index} class`}
      />

      <p>{desc}</p>

      <div id="class-features">
        <h4 className="mt-3	text-3xl capitalize">Class Features</h4>
        <p>As a {index}, you gain the following class features:</p>

        {/* Hit Points */}
        <ClassHitPoints index={index} hit_die={hit_die} />

        {/* Proficiencies */}
        <ClassProficiencies
          name={name}
          proficiencies={proficiencies}
          proficiency_choices={proficiency_choices}
          saving_throws={saving_throws}
        />

        {/* Equipment */}
        <ClassEquipment
          starting_equipment={starting_equipment}
          starting_equipment_options={starting_equipment_options}
        />

        {/* Spellcasting */}
        {!!spellcasting && (
          <ClassSpellcasting
            spellDetails={classFeatures.find(
              (feature) =>
                feature.name === "Spellcasting" || feature.name === "Pact Magic"
            )}
            spellcasting={spellcasting}
          />
        )}

        {/* Class Features */}
        {children}
      </div>
    </div>
  );
}
