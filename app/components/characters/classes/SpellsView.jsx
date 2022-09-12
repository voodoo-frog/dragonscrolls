import { Accordion } from "~/lib/common";

export default function SpellsView({
  character,
  levels,
  spells,
  expanded,
  handleChangeExpanded,
}) {
  console.log("SpellsView: Spells", spells);
  console.log("SpellsView: Levels", levels);

  const availableSpells = spells.filter((spell) => {
    return spell.level <= character.level;
  });

  return (
    <>
      <Accordion
        title='Known Spells'
        expanded={expanded === 'Known Spells'}
        onClick={() => handleChangeExpanded('Known Spells')}
      >
        <p>Lorem Ipsum</p>
      </Accordion>
    </>
  );
}