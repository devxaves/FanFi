import { Avatar, Box } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { CCard, CTypography, OutlinedBtn } from "../../utility";
// Example categories: Entertainment, Music, Conferences, etc.
const trendingEvents = [
  {
    id: 1,
    img: require("../../assets/images/trending1.png"),
    name: "Bollywood Music Fest",
    category: "Entertainment",
    fanScore: 80,
  },
  {
    id: 2,
    img: require("../../assets/images/trending2.png"),
    name: "TEDx Youth",
    category: "Conferences",
    fanScore: 70,
  },
  {
    id: 3,
    img: require("../../assets/images/trending3.png"),
    name: "Standup Comedy Night",
    category: "Entertainment",
    fanScore: 65,
  },
  {
    id: 4,
    img: require("../../assets/images/trending4.png"),
    name: "Startup India Summit",
    category: "Conferences",
    fanScore: 90,
  },
];

export default function TendingNFts() {
  const TopSection = () => (
    <Stack spacing={4}>
      <CTypography
        fontSize={18}
        fontWeight={100}
        fontFamily="Poppins"
        textTransform="capitalize"
      >
        Trending Events by Category
      </CTypography>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        my={2}
      >
        <CTypography
          fontWeight={600}
          fontFamily="Oxanium"
          textTransform="capitalize"
          fontSize={{ md: 70, sm: 30, xs: 25 }}
        >
          Hot Trending Events
        </CTypography>
        <OutlinedBtn btnTitle={"view all"} btnHeight="35px" />
      </Stack>
    </Stack>
  );

  const CardSection = () => (
    <Stack
      direction="row"
      gap={2}
      flexWrap="wrap"
      alignItems="center"
      justifyContent="center"
      rowGap={4}
    >
      {trendingEvents.map((item) => (
        <CCard
          key={item.id}
          className="tending-card"
          background={
            "linear-gradient(147.75deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);"
          }
          backdropFilter={"blur(10px)"}
          borderRadius={"15px"}
          p={1}
          noHover
          borderWidth={"0px"}    
     
        >
          <Box sx={{ position: "relative" }}>
            <Box
              component="img"
              src={item.img}
              alt={item.name}
              sx={{ width: 310, height: 200, borderRadius: "15px" }}
            />
          </Box>
          <Stack px={2}>
            <CTypography
              fontSize={18}
              fontWeight={400}
              fontFamily="Oxanium"
              textTransform="capitalize"
            >
              {item.name}
            </CTypography>
            <CTypography
              fontSize={14}
              fontWeight={200}
              fontFamily="Poppins"
              textTransform="capitalize"
              color="#CBCBCB"
            >
              Category: {item.category}
            </CTypography>
            <CTypography fontSize={14} fontWeight={200} fontFamily="Oxanium">
              Fan Score Required: {item.fanScore}
            </CTypography>
            <OutlinedBtn fullWidth btnTitle={"Apply Now"} btnHeight="45px" />
          </Stack>
        </CCard>
      ))}
    </Stack>
  );

  return (
    <Stack px={{ md: 10, sm: 5, xs: 2 }} py={{ sm: 10, xs: 0 }} spacing={8}>
      <TopSection />
      <CardSection />
    </Stack>
  );
}
