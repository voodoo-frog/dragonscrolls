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
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';

import { useOptionalUser } from "~/utils";

const pages = ['Classes', 'Spells', 'Races', 'Backgrounds', 'Equipment', 'Basic Rules', 'Monsters'];
const settings = ['Dashboard', 'Account', 'Characters'];

export default function Navbar() {
  const user = useOptionalUser();
  const [open, setOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  return (
    <div className="sticky top-0 z-40 flex grow bg-gray-900/50 p-2 font-bold text-red-500">
      <Container maxWidth="false">
        <Toolbar disableGutters>
          <Link to="/" className="flex-none mr-3">
            <div className="flex content-center">
              <Logo className="m-1" size={50} color="red" />
              <p className="self-center bg-gradient-to-r from-red-500 to-black bg-clip-text text-2xl uppercase tracking-wide text-transparent">
                Dragon Scrolls
              </p>
            </div>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', lg: 'none' }, justifyContent: 'flex-end' }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={() => setOpen(true)}
              color="inherit"
            >
              <MenuIcon className="text-white" />
            </IconButton>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', lg: 'flex' } }}>
            {pages.map((page) => (
              <Link
                to={page === 'Basic Rules' ? 'rules' : `/${page.toLowerCase()}`}
                key={page}
                className="self-center rounded p-3 uppercase text-white hover:bg-gray-900/50 hover:text-red-500"
              >
                {page}
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0, display: { xs: 'none', lg: 'flex' } }}>
            {user ? (<Tooltip title="Open settings">
              <IconButton onClick={() => setUserOpen(true)} sx={{ px: 3, color: 'white', fontSize: 20 }} className="capitalize">
                <AccountCircleIcon sx={{ minWidth: 0, marginRight: 1 }} />
                {user.display}
              </IconButton>
            </Tooltip>) : (<Link
              to={'/login'}
              className="self-center rounded p-3 uppercase text-white bg-red-500 hover:bg-red-600"
            >
              Login
            </Link>)}
            <Menu
              sx={{ mt: '65px', mr: '200px' }}
              id="menu-appbar"
              anchorEl={userOpen}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(userOpen)}
              onClose={() => setUserOpen(false)}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={() => setUserOpen(false)}>
                  <Link
                    to={setting === 'Basic Rules' ? 'rules' : `/${setting.toLowerCase()}`}
                    key={setting}
                  >
                    {setting}
                  </Link>
                </MenuItem>
              ))}
              <MenuItem onClick={() => setUserOpen(false)}>
                <Form action="/logout" method="post">
                  <button
                    type="submit"
                    className="rounded capitalize"
                  >
                    Logout
                  </button>
                </Form>
              </MenuItem>
            </Menu>
          </Box>

          <Drawer
            anchor='right'
            open={open}
            onClose={() => setOpen(false)}
          >
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
                        <ListItemAvatar sx={{ minWidth: 0, marginRight: 1 }}>
                          <AccountCircleIcon />
                        </ListItemAvatar>
                        <ListItemText primary={user?.display} className="capitalize" />
                      </ListItemButton>
                    </ListItem>
                    <Divider />
                    {settings.map((setting) => (
                      <ListItem key={setting} disablePadding>
                        <ListItemButton href={setting === 'Basic Rules' ? 'rules' : `/${setting.toLowerCase()}`}>
                          <ListItemText primary={setting} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </>
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
                {pages.map((text) => (
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
        </Toolbar>
      </Container>
    </div >);
}
