import { useLoaderData } from "@remix-run/react";

import React, { useState } from "react";

import BackgroundsCard from "~/components/backgrounds/BackgroundsCard";

import { sorter, pagination } from "~/lib/common";
import dbConnect from "~/lib/dbConnect";

import Background from "~/models/background";

export const meta = () => {
  return {
    title: "Dragon Scrolls: Backgrounds",
  };
};

export const loader = async () => {
  await dbConnect();

  // Backgrounds
  const bgResults = await Background.find({});
  const backgrounds = sorter(bgResults);

  return { backgrounds };
};

export default function BackgroundsPage() {
  const { backgrounds } = useLoaderData();

  const [expanded, setExpanded] = useState("");
  const [page, setPage] = useState(1);

  const handleChangeExpanded = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  return (
    <>
      <h3 className="m-3	text-4xl">Backgrounds</h3>

      <div className="m-3">
        {backgrounds
          .map((bg) => (
            <BackgroundsCard
              key={bg.index}
              background={bg}
              expanded={expanded === bg.index}
              handleChangeExpanded={handleChangeExpanded}
            />
          ))
          .splice((page - 1) * 10, 10)}
      </div>

      {pagination(backgrounds, page, handleChangePage)}
    </>
  );
}
