import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/userContext";

const styles = {
  title: {
    flexGrow: 1,
  },
  appbar: {
    // background: 'none',
  },
  button: {
    color: "white",
    fontSize: 18,
  },
  menuItem: {
    fontSize: 18,
    fontWeight: "bold",
  },
  welcome: {
    fontSize: 18,
    fontStyle: "italic",
  },
  // offset: theme.mixins.toolbar,
};

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const SiteHeader: React.FC = () => {
  const context = useContext(UserContext);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const menuOptions = [
    { label: "Home", path: "/" },
    { label: "Favorite Movies", path: "/movies/favourites" },
    { label: "Upcoming Movies", path: "/movies/upcoming" },
    { label: "Popular Movies", path: "/movies/popular" },
    { label: "Favorite TV Series", path: "/tv-series/favourites" },
    { label: "TV Series", path: "/tv-series" },
    { label: "Create Fantasy Movie", path: "/fantasy-movie" },
    { label: "Find Movie", path: "/find-movie" },
  ];

  const handleMenuSelect = (pageURL: string) => {
    navigate(pageURL);
    setAnchorEl(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar sx={styles.appbar} position="fixed" elevation={0} color="primary">
        <Toolbar>
          <Typography variant="h4" sx={styles.title}>
            TMDB Client
          </Typography>
          <Typography variant="h6" sx={styles.title}>
            All you ever wanted to know about Movies!
          </Typography>
          {context.username ? (
            <Typography sx={styles.welcome}>
              Welcome Back {context.username}
            </Typography>
          ) : (
            <></>
          )}
          {context.username ? (
            <MenuItem
              onClick={() => context.addUsername("")}
              sx={styles.menuItem}
            >
              Logout
            </MenuItem>
          ) : (
            <MenuItem onClick={() => navigate("/login")} sx={styles.menuItem}>
              Login
            </MenuItem>
          )}
          <div>
            <Button
              sx={styles.button}
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              Dashboard
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              {menuOptions.map((x) => (
                <MenuItem
                  key={x.label}
                  onClick={() => handleMenuSelect(x.path)}
                  sx={styles.menuItem}
                >
                  {x.label}
                </MenuItem>
              ))}
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
};

export default SiteHeader;
