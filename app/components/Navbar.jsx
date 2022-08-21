import { Form, Link } from "@remix-run/react";

import IconButton from "@mui/material/IconButton";
import { useOptionalUser } from "~/utils";

import { SiDungeonsanddragons as Logo } from "react-icons/si";
import { GiHamburgerMenu } from "react-icons/gi";

export default function Navbar() {
  const user = useOptionalUser();
  console.log("user", user);

  return (
    <div
      className="sticky top-0 z-40 flex grow justify-between bg-gray-900/50 p-2 font-bold text-red-500"
      style={{ height: 90 }}
    >
      <Link to="/" className="float-left flex-none p-2">
        <div className="flex content-center">
          <Logo className="m-1" size={50} />
          <p className="self-center bg-gradient-to-r from-red-500 to-black bg-clip-text text-2xl uppercase tracking-wide text-transparent">
            Dragon Scrolls
          </p>
        </div>
      </Link>
      <nav className="float-left hidden grow justify-around self-center text-white xl:block">
        <ul className="float-left block h-full w-full grow items-center justify-around">
          <li className="float-left block self-center">
            <Link
              className="self-center rounded p-3 uppercase hover:bg-gray-900/50 hover:text-red-500"
              to="/classes"
            >
              Classes
            </Link>
          </li>
          <li className="float-left block self-center">
            <Link
              className="self-center rounded p-3 uppercase hover:bg-gray-900/50 hover:text-red-500"
              to="/spells"
            >
              Spells
            </Link>
          </li>
          <li className="float-left block self-center">
            <Link
              className="self-center rounded p-3 uppercase hover:bg-gray-900/50 hover:text-red-500"
              to="/races"
            >
              Races
            </Link>
          </li>
          <li className="float-left block self-center">
            <Link
              className="self-center rounded p-3 uppercase hover:bg-gray-900/50 hover:text-red-500"
              to="/backgrounds"
            >
              Backgrounds
            </Link>
          </li>
          <li className="float-left block self-center">
            <Link
              className="self-center rounded p-3 uppercase hover:bg-gray-900/50 hover:text-red-500"
              to="/equipment"
            >
              Equipment
            </Link>
          </li>
          <li className="float-left block self-center">
            <Link
              className="self-center rounded p-3 uppercase hover:bg-gray-900/50 hover:text-red-500"
              to="/rules"
            >
              Basic Rules
            </Link>
          </li>
          <li className="float-left block self-center">
            <Link
              className="self-center rounded p-3 uppercase hover:bg-gray-900/50 hover:text-red-500"
              to="/monsters"
            >
              Monsters
            </Link>
          </li>
          <li className="float-right block self-center">
            {user ? (
              <>
                <Link className="self-center rounded p-3 uppercase" to="/races">
                  {user?.display}
                </Link>
                <Form action="/logout" method="post">
                  <button
                    type="submit"
                    className="mx-3 self-center rounded bg-red-500 p-3 capitalize text-white hover:bg-red-600"
                  >
                    Logout
                  </button>
                </Form>
              </>
            ) : (
              <Link
                className="mr-3 self-center rounded bg-red-500 p-3 capitalize text-white hover:bg-red-600"
                to="/login"
              >
                Login
              </Link>
            )}
          </li>
        </ul>
      </nav>

      <IconButton className="xl:hidden">
        <GiHamburgerMenu className="text-white xl:hidden" />
      </IconButton>
    </div>
  );
}
