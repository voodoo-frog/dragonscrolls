import { Link } from "@remix-run/react";

export default function Characters() {
  return (
    <>
      <div className="m-5 flex justify-between">
        <h3 className="text-4xl">My Characters</h3>
        <Link
          to={"/characters/new"}
          className="self-center rounded bg-gray-700 p-3 uppercase text-white hover:bg-gray-800"
        >
          Create New Character
        </Link>
      </div>
    </>
  );
}
