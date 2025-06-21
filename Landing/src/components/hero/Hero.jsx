import { Box, Grid } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import heroImage1 from "../../assets/images/hero1.png";
import heroImage2 from "../../assets/images/hero2.png";
import heroImage3 from "../../assets/images/hero3.png";
import aptosLogo from "../../assets/images/aptos1.png";
import { Link } from "react-router-dom"; // ✅ Import Link

import Card from "../../utility/Card";
import CButton from "../../utility/CButton";
import CTypography from "../../utility/CTypography";
import OutlinedBtn from "../../utility/OutlinedBtn";

export default function Hero() {
  const Card1 = () => {
    return (
      <Stack
        sx={
          {
            // position: 'absolute',
            // top: '50%',
            // bottom: '50%',
          }
        }
      >
        <Card
          borderRadius={{
            xs: "20px",
            sm: "41.6667px",
          }}
        >
          <Stack
            p={{
              xs: 2,
              // sm: 4,
            }}
            spacing={2}
          >
            <Box
              component="img"
              src={heroImage1}
              alt="hero-image"
              sx={{
                height: {
                  xs: "140px",
                  sm: "200px",
                  lg: "250px",
                },
                width: {
                  xs: "140px",
                  sm: "200px",
                  lg: "250px",
                },
              }}
            />
            <Stack>
              <CTypography
                fontSize={{
                  lg: "28px",
                  xs: "18px",
                }}
                fontWeight={400}
                textAlign="center"
                color="#fff"
                textTransform="capitalize"
              >
                Honey Singh Concert
              </CTypography>
              <CTypography
                fontSize="17px"
                fontWeight={400}
                textAlign="center"
                color="#fff"
                textTransform="capitalize"
              >
                5k+ tickets sold
              </CTypography>
            </Stack>
          </Stack>
        </Card>
      </Stack>
    );
  };
  const Card2 = () => {
    return (
      <Stack
        sx={{
          position: "absolute",
          left: {
            md: "25%",
            xs: "25%",
          },
          top: "-25%",
          zIndex: 1,
        }}
      >
        <Card
          borderRadius={{
            xs: "20px",
            sm: "41.6667px",
          }}
        >
          <Stack
            p={{
              xs: 2,
              //  sm: 4,
            }}
            spacing={2}
          >
            <Box
              component="img"
              src={heroImage2}
              alt="hero-image"
              sx={{
                height: {
                  xs: "140px",
                  sm: "200px",
                  lg: "250px",
                },
                width: {
                  xs: "140px",
                  sm: "200px",
                  lg: "250px",
                },
              }}
            />
            <Stack>
              <CTypography
                fontSize={{
                  lg: "28px",
                  xs: "18px",
                }}
                fontWeight={400}
                textAlign="center"
                color="#fff"
                textTransform="capitalize"
              >
                Khelo India Finals
              </CTypography>
              <CTypography
                fontSize="17px"
                fontWeight={400}
                textAlign="center"
                color="#fff"
                textTransform="capitalize"
              >
                10k+ tickets sold
              </CTypography>
            </Stack>
          </Stack>
        </Card>
      </Stack>
    );
  };
  const Card3 = () => {
    return (
      <Stack
        sx={{
          position: "absolute",
          left: {
            lg: "55%",
            sm: "55%",
          },
          right: {
            xs: "0%",
          },
          bottom: "-15%",
        }}
      >
        <Card
          borderRadius={{
            xs: "20px",
            sm: "41.6667px",
          }}
        >
          <Stack
            p={{
              xs: 2,
              // sm: 4,
            }}
            spacing={2}
          >
            <Box
              component="img"
              src={heroImage3}
              alt="hero-image"
              sx={{
                height: {
                  xs: "140px",
                  sm: "200px",
                  lg: "250px",
                },
                width: {
                  xs: "140px",
                  sm: "200px",
                  lg: "250px",
                },
              }}
            />
            <Stack>
              <CTypography
                fontSize={{
                  lg: "28px",
                  xs: "18px",
                }}
                fontWeight={400}
                textAlign="center"
                color="#fff"
                textTransform="capitalize"
              >
                RCB Fan Fest
              </CTypography>
              <CTypography
                fontSize="17px"
                fontWeight={400}
                textAlign="center"
                color="#fff"
                textTransform="capitalize"
              >
                20k+ tickets sold
              </CTypography>
            </Stack>
          </Stack>
        </Card>
      </Stack>
    );
  };
  return (
    <Stack
      sx={{
        px: {
          lg: 10,
          xs: 2,
        },
        py: {
          lg: 4,
          xs: 2,
        },
      }}
    >
      <Grid
        container
        alignItems="center"
        spacing={{
          xs: 10,
          lg: 0,
        }}
      >
        <Grid item xs={12} lg={6}>
          <Stack spacing={4}>
  <CTypography
    fontSize="60px"
    fontWeight={600}
    lineHeight="80px"
    // textTransform="uppercase"
  >
    SMART, FAN-FIRST TICKETING ON FANFi
  </CTypography>

  {/* Powered by Aptos line */}
  <Stack direction="row" spacing={1} alignItems="center">
    <CTypography
      fontSize={40}
      fontWeight={400}
      fontFamily="Poppins"
      color="#FF00FF" // You can adjust the color
    >
      Powered by
    </CTypography>
    <Box
      component="img"
      src={aptosLogo}
      alt="Aptos Logo"
      sx={{
        height: "42px",
        width: "auto",
      }}
    />
    {/* <CTypography
      fontSize={18}
      fontWeight={500}
      fontFamily="Poppins"
      color="#888"
    >
      Aptos
    </CTypography> */}
  </Stack>

  <CTypography
    fontSize={20}
    fontWeight={100}
    fontFamily="Poppins"
    // textTransform="capitalize"
  >
    FANFi is the next-gen, AI-powered ticketing platform on Aptos
    blockchain for fair, secure, and immersive for every fan.
  </CTypography>

  <Stack direction={"row"} spacing={2} py={4}> 
  <a 
    href="https://fanfi-tickets.vercel.app/" 
    target="_blank" 
    rel="noopener noreferrer" 
    style={{ textDecoration: "none" }}
  >
    <CButton size="small" btnTitle={"explore more"} />
  </a>

  <a 
    href="https://fanfi-tickets.vercel.app/admin/users" 
    target="_blank" 
    rel="noopener noreferrer" 
    style={{ textDecoration: "none" }}
  >
    <OutlinedBtn size="small" btnTitle={"Fan Score Leaderboard"} />
  </a>
</Stack>

</Stack>

        </Grid>
        <Grid item xs={12} lg={6} alignItems="center" justifyContent="center">
          <Box
            sx={{
              width: {
                md: 600,
                xs: "100%",
                sm: 500,
              },
              position: "relative",
            }}
          >
            <Card1 />
            <Card2 />
            <Card3 />
          </Box>
        </Grid>
      </Grid>
    </Stack>
  );
}
