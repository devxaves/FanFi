import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar, Box, Drawer, IconButton, Stack } from "@mui/material";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.png"; // TODO: Replace with FanFi logo
import UserProfile from "../../assets/images/UserProfile.png";
import CButton from "../../utility/CButton";
import CTypography from "../../utility/CTypography";
import { CivicAuthProvider, UserButton } from "@civic/auth/react";

const navbarData = {
  routes: [
    { id: 1, name: "Home", path: "/" },
    { id: 2, name: "Featured Events", path: "/featured-events" },
    { id: 3, name: "Live Auctions", path: "/live-auctions" },
    { id: 4, name: "Sports", path: "/sports" },
    { id: 5, name: "How It Works", path: "/how-it-works" },
    { id: 6, name: "About", path: "/about" },
  ],
  logo: logo,
  logoTitle: "FanFi",
};

export default function Navbar() {
  const [open, setOpen] = React.useState(false);
  const { routes, logo, logoTitle } = navbarData;

  return (
    <Box>
      {/* nav bar here */}

      <Stack
        direction={{
          lg: "row",
          xs: "column",
        }}
        display={{
          xs: "none",
          md: "flex",
        }}
        alignItems="center"
        justifyContent="space-between"
        px={10}
        py={4}
        spacing={2}
      >
        {/* navbar logo */}
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{
            cursor: "pointer",
          }}
          component={Link}
          to="/"
        >
          <img
            src={logo}
            alt="logo"
            style={{
              width: 80,
              height: 80,
            }}
          />
          <CTypography
            fontSize="50px"
            fontWeight="700"
            textTransform="uppercase"
          >
            FanFi
          </CTypography>
        </Stack>

        {/* navbar section */}
        <Stack
          sx={{
            background:
              "linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%)",
            backdropFilter: "blur(20.8333px)",
          }}
          direction="row"
          spacing={2}
          p={3}
        >
          {routes.map((route, index) => {
            return (
              <NavLink
                to={route.path}
                key={route.id}
                style={({ isActive }) =>
                  isActive
                    ? {
                        color: "#fff",
                        // color: "#fff",
                        fontSize: "16px",
                        fontWeight: 400,
                        borderBottom: "2px solid #AD1AAF",
                      }
                    : {
                        color: "#fff",
                        fontSize: "16px",
                        fontWeight: 400,
                      }
                }
              >
                <Box
                  component="span"
                  sx={{
                    "&:hover": {
                      color: "#AD1AAF",
                    },
                  }}
                >
                  {route.name}
                </Box>
              </NavLink>
            );
          })}
        </Stack>
        {/* button and avater  */}
        <Stack direction="row" alignItems="center" spacing={4}>
          <div className="my-button-container">
            <UserButton
              className="login-button"
              dropdownButtonClassName="internal-button"
            />
          </div>
          <Avatar
            alt="User Profile"
            src={UserProfile}
            sx={{
              width: 40,
              height: 40,
              cursor: "pointer",
              "&:hover": {
                transform: "scale(1.1)",
                transition: "all 0.3s ease-in-out",
              },
            }}
          />
        </Stack>
      </Stack>
      {/* Mobile menu icon */}
      <IconButton
        onClick={() => setOpen(true)}
        sx={{ mr: 2, display: { md: "none" }, color: "#fff" }}
      >
        <MenuIcon />
      </IconButton>
      {/* Drawer for mobile */}
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        anchor="left"
        sx={{
          ".MuiDrawer-paper": {
            width: "70%",
            backgroundColor: "#140C1F",
          },
          display: { xs: "block", md: "none" },
        }}
      >
        {/* navmenu logo */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent={"space-around"}
        >
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{
              cursor: "pointer",
            }}
            component={Link}
            to="/"
          >
            <img
              src={logo}
              alt="logo"
              style={{
                width: 50,
                height: 50,
              }}
            />
            <CTypography
              fontSize="30px"
              fontWeight="700"
              textTransform="uppercase"
            >
              FanFi
            </CTypography>
          </Stack>
          <IconButton onClick={() => setOpen(false)} sx={{ color: "#fff" }}>
            <CloseIcon />
          </IconButton>
        </Stack>
        {/* navmenu section */}
        <Stack spacing={2} p={3} textAlign="center">
          {routes.map((route, index) => {
            return (
              <NavLink
                to={route.path}
                key={route.id}
                style={({ isActive }) =>
                  isActive
                    ? {
                        color: "#fff",
                        // color: "#fff",
                        fontSize: "16px",
                        fontWeight: 400,
                        padding: "10px 0",
                        borderRadius: "4px",
                        background:
                          "linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%)",
                        backdropFilter: "blur(20.8333px)",
                      }
                    : {
                        color: "#fff",
                        fontSize: "16px",
                        fontWeight: 400,
                      }
                }
                onClick={() => setOpen(false)}
              >
                <Box
                  component="span"
                  sx={{
                    "&:hover": {
                      color: "#AD1AAF",
                      borderBottom: "2px solid #AD1AAF",
                    },
                  }}
                >
                  {route.name}
                </Box>
              </NavLink>
            );
          })}
        </Stack>
      </Drawer>
    </Box>
  );
}
