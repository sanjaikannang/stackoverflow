import * as React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  List,
  ListItem,
  ListItemIcon,
  Drawer,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import LabelIcon from "@mui/icons-material/Label";
import PeopleIcon from "@mui/icons-material/People";
import { useNavigate } from "react-router";

const Base = ({ title, children }) => {
  const Navigate = useNavigate();

  const [isDrawerOpen, setDrawerOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const toggleDrawer = (open) => {
    setDrawerOpen(open);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    localStorage.removeItem("token");
    Navigate("/Login");
  };
  const handlemyProfile = () => {
    Navigate("/MyProfile");
  };

  return (
    <>
      <div>
        <AppBar
          position="static"
          sx={{ background: "#F48024", color: "white" }}
        >
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              StackOverflow
            </Typography>

            <Button color="inherit" onClick={() => Navigate("/Login")}>
              Login
            </Button>
            <Button color="inherit" onClick={() => Navigate("/Signup")}>
              SignUp
            </Button>

            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenuClick}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Toolbar>
        </AppBar>

        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          color="inherit"
        ></IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem
            onClick={handleLogout}
            style={{
              backgroundColor: "#F48024",
              color: "white",
            }}
          >
            Logout
          </MenuItem>
          <MenuItem
            onClick={handlemyProfile}
            style={{
              backgroundColor: "#F48024",
              color: "white",
            }}
          >
            My Profile
          </MenuItem>
        </Menu>

        <Drawer
          anchor="left"
          open={isDrawerOpen}
          onClose={() => toggleDrawer(false)}
        >
          <List variant="contained">
            <ListItem>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <Button
                color="inherit"
                style={{
                  backgroundColor: "#F48024",
                  color: "white",
                }}
                onClick={() => Navigate("/Home")}
              >
                Home
              </Button>
            </ListItem>
            <ListItem>
              <Typography
                color="inherit"
                onClick={() => Navigate("/Questions")}
              >
                Questions
              </Typography>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <LabelIcon />
              </ListItemIcon>
              <Button
                color="inherit"
                style={{
                  backgroundColor: "#F48024",
                  color: "white",
                }}
                onClick={() => Navigate("/Tags")}
              >
                Tags
              </Button>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <Button
                color="inherit"
                style={{
                  backgroundColor: "#F48024",
                  color: "white",
                }}
                onClick={() => Navigate("/Users")}
              >
                Users
              </Button>
            </ListItem>
          </List>
        </Drawer>
        <main>
          <h1>{title}</h1>
          <div>{children}</div>
        </main>
      </div>
    </>
  );
};

export default Base;
