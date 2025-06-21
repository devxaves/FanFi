import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar, Box, Drawer, IconButton, Stack } from "@mui/material";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.png"; // ✅ FANFi logo
import UserProfile from "../../assets/images/UserProfile.png";
import CTypography from "../../utility/CTypography";
import { UserButton, useUser } from "@civic/auth/react";

const navbarData = {
  routes: [
    { id: 1, name: "Home", path: "/" },
    { id: 5, name: "How FanFi Works", path: "#workflow" },
    { id: 2, name: "Featured Events", path: "#featured" },
    { id: 4, name: "Sports", path: "#sports" },
    { id: 6, name: "Community Stars", path: "#community" },
  ],
  logo: logo,
  logoTitle: "FANFi",
};

export default function Navbar() {
  const [open, setOpen] = React.useState(false);
  const { user } = useUser();
  const isLoggedIn = Boolean(user?.id);
  const { routes, logo, logoTitle } = navbarData;

  return (
    <Box>
      {/* Desktop Navbar */}
      <Stack
        direction={{ lg: "row", xs: "column" }}
        display={{ xs: "none", md: "flex" }}
        alignItems="center"
        justifyContent="space-between"
        px={10}
        py={4}
        spacing={2}
      >
        {/* Logo */}
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{ cursor: "pointer" }}
          component={Link}
          to="/"
        >
          <img src={logo} alt="logo" style={{ width: 80, height: 80 }} />
          <CTypography fontSize="50px" fontWeight="700">
            FANFi
          </CTypography>
        </Stack>

        {/* Navigation Links (only if logged in) */}
        {isLoggedIn && (
          <Stack
            direction="row"
            spacing={2}
            p={3}
            sx={{
              background:
                "linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%)",
              backdropFilter: "blur(20.8333px)",
            }}
          >
            {routes.map((route) => (
              <a href={route.path} key={route.id}>
                <Box
                  component="span"
                  sx={{
                    color: "#fff",
                    fontSize: "16px",
                    fontWeight: 400,
                    "&:hover": {
                      color: "#AD1AAF",
                    },
                  }}
                >
                  {route.name}
                </Box>
              </a>
            ))}
          </Stack>
        )}

        {/* Right Side: Login or Avatar */}
        <Stack direction="row" alignItems="center" spacing={4}>
          <div className="my-button-container">
            <UserButton
              className="login-button"
              dropdownButtonClassName="internal-button"
            />
          </div>
          {isLoggedIn && (
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
          )}
        </Stack>
      </Stack>

      {/* Mobile Menu Icon */}
      <IconButton
        onClick={() => setOpen(true)}
        sx={{ mr: 2, display: { md: "none" }, color: "#fff" }}
      >
        <MenuIcon />
      </IconButton>

      {/* Mobile Drawer */}
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
        {/* Drawer Header */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent={"space-around"}
          py={2}
        >
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{ cursor: "pointer" }}
            component={Link}
            to="/"
          >
            <img src={logo} alt="logo" style={{ width: 50, height: 50 }} />
            <CTypography fontSize="30px" fontWeight="700" textTransform="uppercase">
              FANFi
            </CTypography>
          </Stack>
          <IconButton onClick={() => setOpen(false)} sx={{ color: "#fff" }}>
            <CloseIcon />
          </IconButton>
        </Stack>

        {/* Drawer Links */}
        <Stack spacing={2} p={3} textAlign="center">
          {isLoggedIn ? (
            routes.map((route) => (
              <NavLink
                to={route.path}
                key={route.id}
                style={({ isActive }) =>
                  isActive
                    ? {
                      color: "#fff",
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
            ))
          ) : (
            <Box color="#fff" fontSize="16px">
              Please login to access the menu.
            </Box>
          )}
        </Stack>
      </Drawer>
    </Box>
  );
}
