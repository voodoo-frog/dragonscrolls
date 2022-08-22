import { Form, Link } from "@remix-run/react";
import { useState } from "react";

import { SiDungeonsanddragons as Logo } from "react-icons/si";
import { GiHamburgerMenu } from "react-icons/gi";

import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import { useOptionalUser } from "~/utils";

export default function Navbar() {
  const user = useOptionalUser();
  const [open, setOpen] = useState(false);

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
          <li className="float-left h-full block self-center">
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
          {user ? (
            <>
              {/* FIGURE OUT PADDING ISSUE WITH THESE FUCKING BUTTONS */}
              <li className="float-right block self-center">
                <Link
                  className="self-center rounded p-3 uppercase bg-red-500 hover:bg-red-600"
                  to="/logout"
                >
                  Logout
                </Link>
              </li>
              <li className="float-right block self-center">
                <Link className="self-center rounded p-3 uppercase" to="/races">
                  {user?.display}
                </Link>
              </li>
            </>
          ) : (
            <Link
              className="mr-3 self-center rounded bg-red-500 p-3 capitalize text-white hover:bg-red-600"
              to="/login"
            >
              Login
            </Link>
          )}
        </ul>
      </nav>

      <IconButton className="xl:hidden" onClick={() => setOpen(true)}>
        <GiHamburgerMenu className="text-white xl:hidden" />
      </IconButton>

      <Drawer
        anchor='right'
        open={open}
        onClose={() => setOpen(false)}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => setOpen(false)}
          onKeyDown={() => setOpen(false)}
        >
          <List>
            {user ? (
              <ListItem disablePadding>
                <ListItemButton href='/dashboard'>
                  <ListItemIcon>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  <ListItemText primary={user?.display} />
                </ListItemButton>
              </ListItem>
            ) : (
              <ListItem disablePadding>
                <ListItemButton href='login'>
                  <ListItemText primary='Login' />
                </ListItemButton>
              </ListItem>
            )}
          </List>
          <Divider />
          <List>
            {['Classes', 'Spells', 'Races', 'Backgrounds', 'Equipment', 'Basic Rules', 'Monsters'].map((text) => (
              <ListItem key={text} disablePadding>
                <ListItemButton href={text === 'Basic Rules' ? 'rules' : text.toLowerCase()}>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          {user && (
            <List>
              <ListItem disablePadding>
                <ListItemButton href='logout'>
                  <ListItemText primary='Logout' />
                </ListItemButton>
              </ListItem>
            </List>
          )}
        </Box>
      </Drawer>
    </div>
  );
}
