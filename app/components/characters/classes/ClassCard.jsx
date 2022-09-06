import React, { useState } from "react";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { classFeatures } from "~/lib/common";

export default function ClassCard({ mainClass, features }) {
  const [expanded, setExpanded] = useState(false);

  const handleChangeExpanded = (panel) => (e, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  let filteredFeatures = classFeatures(features, mainClass.index);

  if (
    mainClass.index === "fighter" ||
    mainClass.index === "paladin" ||
    mainClass.index === "ranger"
  ) {
    filteredFeatures = filteredFeatures.filter(
      (feature) => !feature.index.includes("fighting-style-")
    );
  } else if (mainClass.index === "sorcerer") {
    filteredFeatures = filteredFeatures.filter(
      (feature) =>
        !feature.index.includes("metamagic-") &&
        !feature.index.includes("flexible-casting-")
    );
  } else if (mainClass.index === "warlock") {
    filteredFeatures = filteredFeatures.filter(
      (feature) =>
        !feature.index.includes("eldritch-invocation-") &&
        !feature.index.includes("pact-of")
    );
  }

  return (
    <div className="text-black">
      <div className="justify-between-align-center flex w-full">
        <div className="grow">
          <h4 className="text-2xl">{mainClass.name}</h4>
          <p className="text-gray-500">{mainClass.source_book}</p>
          <p className="my-2">{mainClass.brief}</p>
        </div>
        <img
          className="ml-3 h-[100px] w-[100px]"
          name={mainClass.name}
          src={`/images/${mainClass.index}-emblem-color.jpeg`}
          alt={`${mainClass.name} Avatar`}
        />
      </div>
      <p className="my-2">{mainClass.desc}</p>

      <p>
        <strong>Hit die:</strong> d{mainClass.hit_die}
      </p>

      <p>
        <strong>Primary Ability: </strong>
        {mainClass.primary_ability.map((pa) => pa.name).join(", ")}
      </p>

      <p className="mb-3">
        <strong>Saves: </strong>
        {mainClass.saving_throws.map((st) => st.name).join(", ")}
      </p>

      {/* Class Features */}
      {filteredFeatures.map((feature) => (
        <Accordion
          className="mb-3"
          key={feature.name}
          expanded={expanded === feature.name}
          onChange={handleChangeExpanded(feature.name)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`${feature.name}d-content`}
            id={`${feature.name}d-header`}
          >
            <p>
              <strong>{feature.name}</strong>
            </p>
          </AccordionSummary>
          <AccordionDetails>
            {feature.desc.map((item) => (
              <p key={item} className="mb-3">
                {item}
              </p>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
