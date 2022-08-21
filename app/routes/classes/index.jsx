import { useLoaderData } from "@remix-run/react";
import ClassCard from "~/components/classes/ClassCard";
import dbConnect from "~/lib/dbConnect";
import Class from "~/models/class";
import { sorter } from "~/lib/common";

export const meta = () => {
  return {
    title: "Dragon Scrolls: Classes",
  };
};

export const loader = async ({ params }) => {
  await dbConnect();

  const classes = await Class.find({});

  return { classes: sorter(classes, "index"), params };
};

export default function ClassesPage() {
  const { classes } = useLoaderData();

  const cards = classes.map((classData) => (
    <ClassCard key={classData.index} classData={classData} />
  ));
  return (
    <>
      <h3 className="m-3	text-4xl">Classes</h3>
      <div className="container m-auto flex grid w-full grid-cols-1 justify-items-center gap-4 p-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {cards}
      </div>
    </>
  );
}
