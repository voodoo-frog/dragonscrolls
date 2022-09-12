import { table, AccordionItem } from "~/lib/common";

import { Remarkable } from "remarkable";
import { sorter } from "../../lib/common";
const md = new Remarkable("full", {
  html: true,
  typographer: true,
});

export default function BackgroundsCard({
  background,
  expanded,
  handleChangeExpanded,
}) {
  const {
    name,
    bonds,
    desc,
    feature,
    flaws,
    ideals,
    language_options,
    personality_traits,
    source_book,
    starting_equipment_desc,
    starting_proficiencies,
    suggested_characteristics,
  } = background;

  return (
    <AccordionItem
      title={name}
      expanded={expanded === name}
      onClick={() => handleChangeExpanded(name)}
    >
      <h3 className="text-2xl font-bold">{name}</h3>
      <p className="mb-3 text-sm italic">Source: {source_book}</p>

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

      <p>
        <strong>Skill Proficiencies:</strong>{" "}
        {sorter(
          starting_proficiencies.filter((prof) => prof.type === "skill")
        )
          .map((prof) => prof.name)
          .join(", ")}
      </p>
      <p>
        <strong>Tool Proficiencies:</strong> None
      </p>
      <p>
        <strong>Languages:</strong>{" "}
        {language_options.choose
          ? `Choose ${language_options.from.length === 16
            ? `any ${language_options.choose} language(s)`
            : `${language_options.choose
            } language from the following: ${language_options.from
              .map((lang) => lang.name)
              .join(", ")}`
          }`
          : "merp..."}{" "}
        {/* MAKE SURE MERP DOES NOT SHOW!!!*/}
      </p>
      <p>
        <strong>Equipment:</strong> {starting_equipment_desc}
      </p>

      <h4 className="my-3 text-xl font-bold">{feature.name}</h4>
      {feature.desc.map((text) => (
        <p key={text}>{text}</p>
      ))}

      <h4 className="my-3 text-xl font-bold">Suggested Characteristics</h4>
      {suggested_characteristics}

      <h5 className="mt-3 text-lg font-bold capitalize">
        Personality Traits
      </h5>
      {table(
        undefined,
        [`d${personality_traits.from.length}`, "Personality trait"],
        personality_traits.from.map((pt, idx) => [idx + 1, pt]),
        true
      )}

      <h5 className="mt-3 text-lg font-bold capitalize">Ideals</h5>
      {table(
        undefined,
        [`d${ideals.from.length}`, "Ideal"],
        ideals.from.map((ideal, idx) => [
          idx + 1,
          `${ideal.desc} (${ideal.alignments_desc})`,
        ]),
        true
      )}

      <h5 className="mt-3 text-lg font-bold capitalize">Bonds</h5>
      {table(
        undefined,
        [`d${bonds.from.length}`, "Bond"],
        bonds.from.map((bond, idx) => [idx + 1, bond]),
        true
      )}

      <h5 className="mt-3 text-lg font-bold capitalize">Flaws</h5>
      {table(
        undefined,
        [`d${flaws.from.length}`, "Flaw"],
        flaws.from.map((flaw, idx) => [idx + 1, flaw]),
        true
      )}
    </AccordionItem>
  );
}
