import { AccordionItem } from "~/lib/common";

export default function Default({
  traits,
  selectedRace,
  handleChangeExpanded,
  expanded,
}) {
  return (
    <div className="accordion">
      {traits
        .filter((trait) => trait.races.some((r) => r.index === selectedRace.index))
        .map((trait) => (
          <AccordionItem
            key={trait.name}
            title={trait.name}
            expanded={expanded === trait.name}
            onClick={() => handleChangeExpanded(trait.name)}
          >
            <p>{traits.find((t) => t.index === trait.index).desc}</p>
          </AccordionItem>

        ))}
    </div>
  );
}
