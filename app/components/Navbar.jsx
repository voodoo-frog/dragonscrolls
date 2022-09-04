import { Form, Link } from "@remix-run/react";
import { useState } from "react";

import { SiDungeonsanddragons as Logo } from "react-icons/si";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import { useOptionalUser } from "~/utils";

const pages = [
  "Classes",
  "Spells",
  "Races",
  "Backgrounds",
  "Equipment",
  "Basic Rules",
  "Monsters",
];
const settings = ["Dashboard", "Account", "Characters"];

export default function Navbar() {
  const user = useOptionalUser();
  const [open, setOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  return (
    <div className="sticky top-0 z-40 flex grow bg-gray-900/50 p-2 font-bold text-red-500">
      <div className="flex w-full items-center">
        <Link to="/" className="mr-3 flex-none">
          <div className="flex content-center">
            <Logo className="m-2" size={50} color="red" />
            <p className="self-center bg-gradient-to-r from-red-500 to-black bg-clip-text text-2xl uppercase tracking-wide text-transparent">
              Dragon Scrolls
            </p>
          </div>
        </Link>
        <div className="relative flex w-full items-center justify-end">
          <div className="mr-3 flex lg:hidden">
            <div className="flex items-center">
              <div onClick={() => setOpen(true)}>
                {/* Hamburger Menu */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                  color="white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="hidden grow lg:flex">
            <div>
              {pages.map((page) => (
                <Link
                  to={
                    page === "Basic Rules" ? "rules" : `/${page.toLowerCase()}`
                  }
                  key={page}
                  className="self-center rounded p-3 uppercase text-white hover:bg-gray-900/50 hover:text-red-500"
                >
                  {page}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden grow-0 lg:flex">
            <div>
              {user ? (
                <IconButton
                  onClick={() => setUserOpen(true)}
                  sx={{ px: 3, color: "white", fontSize: 20 }}
                  className="capitalize"
                >
                  {/* User Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="mr-2 h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                  {user.display}
                </IconButton>
              ) : (
                <Link
                  to={"/login"}
                  className="self-center rounded bg-red-500 p-3 uppercase text-white hover:bg-red-600"
                >
                  Login
                </Link>
              )}
              <Menu
                sx={{ mt: "58px" }}
                id="menu-appbar"
                anchorEl={userOpen}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(userOpen)}
                onClose={() => setUserOpen(false)}
              >
                {settings.map((setting) => (
                  <MenuItem
                    sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.3)" }}
                    key={setting}
                    onClick={() => setUserOpen(false)}
                  >
                    <Link
                      to={
                        setting === "Basic Rules"
                          ? "rules"
                          : `/${setting.toLowerCase()}`
                      }
                      key={setting}
                    >
                      {setting}
                    </Link>
                  </MenuItem>
                ))}
                <MenuItem onClick={() => setUserOpen(false)}>
                  <Form action="/logout" method="post">
                    <button type="submit" className="rounded capitalize">
                      Logout
                    </button>
                  </Form>
                </MenuItem>
              </Menu>
            </div>
          </div>

          <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
            <Box
              sx={{ width: 200 }}
              role="presentation"
              onClick={() => setOpen(false)}
              onKeyDown={() => setOpen(false)}
            >
              <List>
                {user ? (
                  <>
                    <ListItem disablePadding>
                      <ListItemButton>
                        {/* User Icon */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="mr-2 h-6 w-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                          />
                        </svg>
                        <ListItemText
                          primary={user?.display}
                          className="capitalize"
                        />
                      </ListItemButton>
                    </ListItem>
                    <Divider />
                    {settings.map((setting) => (
                      <ListItem key={setting} disablePadding>
                        <ListItemButton
                          href={
                            setting === "Basic Rules"
                              ? "rules"
                              : `/${setting.toLowerCase()}`
                          }
                        >
                          <ListItemText primary={setting} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </>
                ) : (
                  <ListItem disablePadding>
                    <ListItemButton href="login">
                      <ListItemText primary="Login" />
                    </ListItemButton>
                  </ListItem>
                )}
              </List>
              <Divider />
              <List>
                {pages.map((text) => (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      href={
                        text === "Basic Rules" ? "rules" : text.toLowerCase()
                      }
                    >
                      <ListItemText primary={text} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
              <Divider />
              {user && (
                <List>
                  <ListItemButton>
                    <ListItem disablePadding>
                      <Form action="/logout" method="post">
                        <button
                          type="submit"
                          className="self-center rounded capitalize"
                        >
                          Logout
                        </button>
                      </Form>
                    </ListItem>
                  </ListItemButton>
                </List>
              )}
            </Box>
          </Drawer>
        </div>
      </div>
    </div>
  );
}
