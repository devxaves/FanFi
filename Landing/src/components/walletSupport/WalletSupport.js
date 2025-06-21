import { Avatar } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { CCard, CTypography } from "../../utility";
// Replace with actual logos for BookMyShow, District, Spotify, Amazon eBooks, etc.
const dataSources = [
  {
    id: 1,
    src: require("../../assets/images/walletSupport1.png"),
    name: "BookMyShow",
  },
  {
    id: 2,
    src: require("../../assets/images/walletSupport2.png"),
    name: "District",
  },
  {
    id: 3,
    src: require("../../assets/images/walletSupport3.png"),
    name: "Spotify",
  },
  {
    id: 4,
    src: require("../../assets/images/walletSupport4.png"),
    name: "Paytm Events",
  },
  {
    id: 5,
    src: require("../../assets/images/walletSupport5.png"),
    name: "and more...",
  },
];

export default function WalletSupport() {
  return (
    <Stack spacing={5} py={{ sm: 10, xs: 0 }}>
      <CTypography
        fontSize={25}
        fontWeight={400}
        textAlign="center"
        fontFamily="Poppins"
        sx={{
          background: "linear-gradient(90.13deg, #FFFFFF 0%, #F81DFB 99.96%);",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Platforms We Analyze For Your Fan Score
      </CTypography>
      <CTypography
        fontSize={{ lg: 80, md: 50, xs: 45 }}
        fontWeight={500}
        textAlign="center"
        color="white"
        fontFamily="Oxanium"
        textTransform="capitalize"
        mb={2}
      >
        Our Partners
      </CTypography>
      <Stack direction="row" flexWrap="wrap" justifyContent="center" gap={4}>
        {dataSources.map((item) => (
          <CCard
            key={item.id}
            p={3}
            background={
              "linear-gradient(147.75deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);"
            }
            backdropFilter="blur(18px)"
            borderRadius="15px"
            borderWidth="0px"
            noHover
          >
            <CCard
              background={
                "linear-gradient(147.75deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);"
              }
              backdropFilter="blur(10px)"
              borderRadius={50}
              p={4}
              borderWidth="0px"
            >
              <Avatar
                src={item.src}
                alt={item.name}
                sx={{ width: 100, height: 100 }}
              />
            </CCard>
            <CTypography
              fontSize={20}
              fontWeight={500}
              textAlign="center"
              color="white"
              fontFamily="Oxanium"
              pt={2}
            >
              {item.name}
            </CTypography>
          </CCard>
        ))}
      </Stack>
      <CTypography
        fontSize={18}
        fontWeight={400}
        textAlign="center"
        color="white"
        fontFamily="Poppins"
        pt={4}
      >
        We aggregate your activity from top platforms to generate a dynamic Fan
        Score, ensuring you get the tickets you truly deserve.
      </CTypography>
    </Stack>
  );
}
