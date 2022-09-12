import { table, AccordionItem } from "~/lib/common";

import { Remarkable } from "remarkable";
const md = new Remarkable("full", {
  html: true,
  typographer: true,
});

export default function EquipmentCard({
  item,
  expanded,
  handleChangeExpanded,
}) {
  const {
    name,
    index,
    cost,
    desc,
    equipment_category,
    weight,
    armor_category,
    gear_category,
    tool_category,
    vehicle_category,
    weapon_category,
  } = item;

  let category_name;
  switch (equipment_category.index) {
    case "armor":
      category_name = `${armor_category} Armor`;
      break;
    case "adventuring-gear":
      category_name = gear_category.name;
      break;
    case "tools":
      category_name = tool_category;
      break;
    case "mounts-and-vehicles":
      category_name = vehicle_category;
      break;
    case "weapon":
      category_name = `${weapon_category} Weapon`;
      break;

    default:
      break;
  }

  return (
    <AccordionItem
      title={
        <>
          <div className="w-[250px]">
            <p>{name}</p>
            <p className="text-xs">{equipment_category.name}</p>
          </div>

          <div className="hidden lg:flex">
            <p className="w-[150px]">
              {cost.quantity ? `${cost.quantity} ${cost.unit}` : "--"}
            </p>

            <p className="w-[150px]">
              {weight ? `${weight} ${weight === 1 ? "lb" : "lbs"}` : "--"}
            </p>

            <p>{category_name}</p>
          </div>
        </>
      }
      expanded={expanded === index}
      onClick={() => handleChangeExpanded(index)}
    >
      <>
        {desc.map((descItem, index) => {
          if (descItem instanceof Array) {
            const rows = [];
            const cols = [];
            descItem.map((item) => {
              const rowGroup = [];
              Object.entries(item).map(([key, value]) => {
                rowGroup.push(value);
                !cols.includes(key) && cols.push(key);
              });
              rows.push(rowGroup);
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
      </>
    </AccordionItem>
  );
}
