import { styled } from "@mui/material/styles";

import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";

import { table } from "~/lib/common";

import { Remarkable } from "remarkable";
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
    <Accordion expanded={expanded} onChange={handleChangeExpanded(index)}>
      <AccordionSummary
        aria-controls={`${index}d-content`}
        id={`${index}d-header`}
      >
        <div className="w-[250px]">
          <Typography>{name}</Typography>
          <Typography variant="caption">{equipment_category.name}</Typography>
        </div>

        <div className="hidden lg:flex">
          <Typography className="w-[150px]">
            {cost.quantity ? `${cost.quantity} ${cost.unit}` : "--"}
          </Typography>

          <Typography className="w-[150px]">
            {weight ? `${weight} ${weight === 1 ? "lb" : "lbs"}` : "--"}
          </Typography>

          <Typography>{category_name}</Typography>
        </div>
      </AccordionSummary>
      <AccordionDetails>
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
      </AccordionDetails>
    </Accordion>
  );
}
