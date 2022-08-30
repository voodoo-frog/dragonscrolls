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

    // <div>
    //   <nav className="shadow sticky top-0 z-40 flex grow bg-gray-900/50 p-2 font-bold text-red-500">
    //     <div className="max-w-7xl mx-auto px-8">
    //       <div className="flex items-center justify-between h-16">
    //         <div className=" flex items-center">
    //           <a className="flex-shrink-0" href="/">
    //             <Logo className="m-1" size={50} color="red" />
    //             <p className="self-center bg-gradient-to-r from-red-500 to-black bg-clip-text text-2xl uppercase tracking-wide text-transparent">
    //               Dragon Scrolls
    //             </p>
    //           </a>
    //           <div className="hidden md:block">
    //             <div className="hidden grow lg:flex">
    //               <div>
    //                 {pages.map((page) => (
    //                   <Link
    //                     to={
    //                       page === "Basic Rules" ? "rules" : `/${page.toLowerCase()}`
    //                     }
    //                     key={page}
    //                     className="self-center rounded p-2 uppercase text-white hover:bg-gray-900/50 hover:text-red-500"
    //                   >
    //                     {page}
    //                   </Link>
    //                 ))}
    //               </div>
    //             </div>

    //           </div>
    //         </div>
    //         <div className="block">
    //           <div className="ml-4 flex items-center md:ml-6">
    //             <div className="ml-3 relative">
    //               <div className="relative inline-block text-left">
    //                 <div>
    //                   <button type="button" className="  flex items-center justify-center w-full rounded-md  px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-50 hover:bg-gray-50 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500" id="options-menu">
    //                     <svg width="20" fill="currentColor" height="20" className="text-gray-800" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
    //                       <path d="M1523 1339q-22-155-87.5-257.5t-184.5-118.5q-67 74-159.5 115.5t-195.5 41.5-195.5-41.5-159.5-115.5q-119 16-184.5 118.5t-87.5 257.5q106 150 271 237.5t356 87.5 356-87.5 271-237.5zm-243-699q0-159-112.5-271.5t-271.5-112.5-271.5 112.5-112.5 271.5 112.5 271.5 271.5 112.5 271.5-112.5 112.5-271.5zm512 256q0 182-71 347.5t-190.5 286-285.5 191.5-349 71q-182 0-348-71t-286-191-191-286-71-348 71-348 191-286 286-191 348-71 348 71 286 191 191 286 71 348z">
    //                       </path>
    //                     </svg>
    //                   </button>
    //                 </div>
    //                 <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
    //                   <div className="py-1 " role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
    //                     <a href="#" className="block block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600" role="menuitem">
    //                       <span className="flex flex-col">
    //                         <span>
    //                           Settings
    //                         </span>
    //                       </span>
    //                     </a>
    //                     <a href="#" className="block block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600" role="menuitem">
    //                       <span className="flex flex-col">
    //                         <span>
    //                           Account
    //                         </span>
    //                       </span>
    //                     </a>
    //                     <a href="#" className="block block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600" role="menuitem">
    //                       <span className="flex flex-col">
    //                         <span>
    //                           Logout
    //                         </span>
    //                       </span>
    //                     </a>
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //         <div className="-mr-2 flex md:hidden">
    //           <button className="text-gray-800 dark:text-white hover:text-gray-300 inline-flex items-center justify-center p-2 rounded-md focus:outline-none">
    //             <svg width="20" height="20" fill="currentColor" className="h-8 w-8" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
    //               <path d="M1664 1344v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45z">
    //               </path>
    //             </svg>
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="md:hidden">
    //       <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
    //         <a className="text-gray-300 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium" href="/#">
    //           Home
    //         </a>
    //         <a className="text-gray-800 dark:text-white block px-3 py-2 rounded-md text-base font-medium" href="/#">
    //           Gallery
    //         </a>
    //         <a className="text-gray-300 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium" href="/#">
    //           Content
    //         </a>
    //         <a className="text-gray-300 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium" href="/#">
    //           Contact
    //         </a>
    //       </div>
    //     </div>
    //   </nav>
    // </div>

    <div className="sticky top-0 z-40 flex grow bg-gray-900/50 p-2 font-bold text-red-500">
      <div className="flex w-full items-center">
        <Link to="/" className="mr-3 flex-none">
          <div className="flex content-center">
            <Logo className="m-1" size={50} color="red" />
            <p className="self-center bg-gradient-to-r from-red-500 to-black bg-clip-text text-2xl uppercase tracking-wide text-transparent">
              Dragon Scrolls
            </p>
          </div>
        </Link>
        <div className="flex w-full relative items-center justify-end">
          <div className="flex lg:hidden">
            <div className="flex items-center">
              <div
                onClick={() => setOpen(true)}
              >
                {/* Hamburger Menu */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" color="white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </div>
            </div>
          </div>

          <div className="hidden grow lg:flex">
            <Box>
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
            </Box>
          </div>
          <div className="hidden grow-0 lg:flex">
            <Box>
              {user ? (
                <IconButton
                  onClick={() => setUserOpen(true)}
                  sx={{ px: 3, color: "white", fontSize: 20 }}
                  className="capitalize"
                >
                  {/* User Icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
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
                  <MenuItem sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.3)' }} key={setting} onClick={() => setUserOpen(false)}>
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
            </Box>
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
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
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
