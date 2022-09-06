import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function Default({
  traits,
  selectedRace,
  handleChangeExpanded,
  expanded,
}) {
  return traits
    .filter((trait) => trait.races.some((r) => r.index === selectedRace.index))
    .map((trait) => (
      <Accordion
        className="mb-3"
        key={trait.name}
        expanded={expanded === trait.name}
        onChange={handleChangeExpanded(trait.name)}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`${trait.name}-content`}
          id={`${trait.name}-header`}
        >
          <p>
            <strong>{trait.name}</strong>
          </p>
        </AccordionSummary>
        <AccordionDetails>
          <p>{traits.find((t) => t.index === trait.index).desc}</p>
        </AccordionDetails>
      </Accordion>
    ));
}
