import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

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
          <Typography>{name}</Typography>
          <Typography variant="caption">{levelText}</Typography>
        </div>
      }
      expanded={expanded === index}
      onClick={() => handleChangeExpanded(index)}
    >
      <Grid container spacing={2} mb={3}>
        <Grid item xs={6} sm={3}>
          <Typography sx={{ fontWeight: "bold" }}>Level</Typography>
          <Typography>{level}</Typography>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Typography sx={{ fontWeight: "bold" }}>Casting Time</Typography>
          <Typography>{casting_time}</Typography>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Typography sx={{ fontWeight: "bold" }}>Range / Area</Typography>
          <Typography>{range}</Typography>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Typography sx={{ fontWeight: "bold" }}>Components</Typography>
          <Typography>
            {components.join(", ")}
            {components.includes("M") && "*"}
          </Typography>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Typography sx={{ fontWeight: "bold" }}>Duration</Typography>
          <Typography>{duration}</Typography>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Typography sx={{ fontWeight: "bold" }}>School</Typography>
          <Typography>{school.name}</Typography>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Typography sx={{ fontWeight: "bold" }}>Attack / Save</Typography>
          <Typography className="capitalize">
            {attack_type || dc?.dc_type.name || ""}
          </Typography>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Typography sx={{ fontWeight: "bold" }}>Damage / Effect</Typography>
          <Typography>{damage?.damage_type.name}</Typography>
        </Grid>
      </Grid>
      <Divider sx={{ margin: "12px auto" }} />
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
        <Typography key={text} className="pb-3">
          {text}
        </Typography>
      ))}
      <Typography>
        <strong>Classes:</strong> {classes.map((c) => c.name).join(", ")}
      </Typography>
      {material && (
        <Typography variant="caption" sx={{ fontWeight: "bold" }}>
          * {material}
        </Typography>
      )}
    </AccordionItem>
  );
}
