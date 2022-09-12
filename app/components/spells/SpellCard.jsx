import { table, AccordionItem } from "~/lib/common";

import { Remarkable } from "remarkable";
const md = new Remarkable("full", {
  html: true,
  typographer: true,
});

export default function SpellCard({ spell, expanded, handleChangeExpanded }) {
  const {
    name,
    index,
    attack_type,
    dc,
    higher_level,
    classes,
    level,
    school,
    casting_time,
    range,
    components,
    duration,
    material,
    desc,
    damage,
  } = spell;

  let levelText = "";
  if (level === 0) {
    levelText = "Cantrip";
  } else if (level === 1) {
    levelText = "1st Level";
  } else if (level === 2) {
    levelText = "2nd Level";
  } else if (level === 3) {
    levelText = "3rd Level";
  } else {
    levelText = `${level}th Level`;
  }
  return (
    <AccordionItem
      title={
        <div>
          <p>{name}</p>
          <p className="text-xs">{levelText}</p>
        </div>
      }
      expanded={expanded === index}
      onClick={() => handleChangeExpanded(index)}
    >
      <div class="divide-y divide-solid">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mx-auto">
          <div class="py-4 whitespace-nowrap">
            <p className="font-bold">Level</p>
            <p>{level}</p>
          </div>
          <div class="py-4 whitespace-nowrap">
            <p className="font-bold">Casting Time</p>
            <p>{casting_time}</p>
          </div>
          <div class="py-4 whitespace-nowrap">
            <p className="font-bold">Range / Area</p>
            <p>{range}</p>
          </div>
          <div class="py-4 whitespace-nowrap">
            <p className="font-bold">Components</p>
            <p>
              {components.join(", ")}
              {components.includes("M") && "*"}
            </p>
          </div>
          <div class="py-4 whitespace-nowrap">
            <p className="font-bold">Duration</p>
            <p>{duration}</p>
          </div>
          <div class="py-4 whitespace-nowrap">
            <p className="font-bold">School</p>
            <p>{school.name}</p>
          </div>
          <div class="py-4 whitespace-nowrap">
            <p className="font-bold">Attack / Save</p>
            <p className="capitalize">
              {attack_type || dc?.dc_type.name || ""}
            </p>
          </div>
          <div class="py-4 whitespace-nowrap">
            <p className="font-bold">Damage / Effect</p>
            <p>{damage?.damage_type.name}</p>
          </div>
        </div>
        <div className="pt-5">
          {desc.map((descItem, index) => {
            if (descItem instanceof Array) {
              const rows = [];
              const cols = [];
              descItem.map((item) => {
                const rowGroup = [];
                Object.entries(item).map(([key, value]) => {
                  rowGroup.push(value);
                  return !cols.includes(key) && cols.push(key);
                });
                return rows.push(rowGroup);
              });

              return table(undefined, cols, rows, true);
            }
            return (
              <div
                key={index}
                className="pb-3"
                dangerouslySetInnerHTML={{
                  __html: md.render(descItem),
                }}
              />
            );
          })}
          {higher_level?.map((text) => (
            <p key={text} className="pb-3">
              {text}
            </p>
          ))}
          <p>
            <strong>Classes:</strong> {classes.map((c) => c.name).join(", ")}
          </p>
          {material && (
            <p className="text-xs font-bold">
              * {material}
            </p>
          )}
        </div>
      </div>
    </AccordionItem>
  );
}
