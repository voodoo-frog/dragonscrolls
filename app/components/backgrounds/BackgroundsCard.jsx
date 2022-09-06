import { styled } from "@mui/material/styles";

import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";

import { table } from "~/lib/common";

import { Remarkable } from "remarkable";
import { sorter } from "../../lib/common";
const md = new Remarkable("full", {
  html: true,
  typographer: true,
});

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    sx={{ bgcolor: "rgba(0,0,0,0.2)" }}
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function BackgroundsCard({
  background,
  expanded,
  handleChangeExpanded,
}) {
  const {
    name,
    index,
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
    <Accordion expanded={expanded} onChange={handleChangeExpanded(index)}>
      <AccordionSummary
        aria-controls={`${index}d-content`}
        id={`${index}d-header`}
      >
        <Typography>{name}</Typography>
      </AccordionSummary>
      <AccordionDetails>
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
            : "merp..."} {/* MAKE SURE MERP DOES NOT SHOW!!!*/}
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
      </AccordionDetails>
    </Accordion>
  );
}
