import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { Box, Stack } from "@mui/material";
import React from "react";
import Slider from "react-slick";
import collection2 from "../../assets/images/poster.png";
import collection3 from "../../assets/images/poster.png";
import collection4 from "../../assets/images/poster.png";
import collection5 from "../../assets/images/poster.png";
import collection6 from "../../assets/images/poster.png";
import collection7 from "../../assets/images/poster.png";

import { CTypography } from "../../utility";
import "./collection.css";
const events = [
  {
    img: collection2,
    name: "Sunburn Goa",
    date: "2025-12-20",
    location: "Goa",
    cta: "Apply for Ticket",
  },
  {
    img: collection3,
    name: "IPL Final",
    date: "2025-05-28",
    location: "Mumbai",
    cta: "Apply for Ticket",
  },
  {
    img: collection4,
    name: "Comic Con India",
    date: "2025-11-10",
    location: "Delhi",
    cta: "Apply for Ticket",
  },
  {
    img: collection5,
    name: "NH7 Weekender",
    date: "2025-09-15",
    location: "Pune",
    cta: "Apply for Ticket",
  },
  {
    img: collection6,
    name: "Lakme Fashion Week",
    date: "2025-08-05",
    location: "Mumbai",
    cta: "Apply for Ticket",
  },
  {
    img: collection7,
    name: "Pro Kabaddi League",
    date: "2025-07-22",
    location: "Bangalore",
    cta: "Apply for Ticket",
  },
];
export default function Collection() {
  const NextArrow = ({ onClick }) => {
    return (
      <div className="arrow next" onClick={onClick}>
        <ArrowRightIcon />
      </div>
    );
  };

  const PrevArrow = ({ onClick }) => {
    return (
      <div className="arrow prev" onClick={onClick}>
        <ArrowLeftIcon />
      </div>
    );
  };

  const [imgIndex, setImgIndex] = React.useState(0);

  const settings = {
    infinite: true,
    lazyLoad: true,
    speed: 300,
    slidesToShow: 5,
    centerMode: true,
    centerPadding: 0,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 1500,
    beforeChange: (current, next) => setImgIndex(next),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Stack
      py={{
        sm: 10,
        xs: 0,
      }}
      spacing={4}
    >
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
        Top Featured Events in India
      </CTypography>
      <CTypography
        fontWeight={500}
        textAlign="center"
        color="white"
        fontFamily="Oxanium"
        textTransform="capitalize"
        mb={2}
        fontSize={{
          md: 100,
          sm: 80,
          xs: 60,
        }}
      >
        Featured Events
      </CTypography>
      <Slider {...settings}>
        {events.map((event, idx) => (
          <Stack className={idx === imgIndex ? "slide activeSlide" : "slide"}>
            <Box
              component="img"
              src={event.img}
              alt={event.name}
              sx={{
                border: "2px solid #F81DFB",
                borderRadius: "15px",
                width: {
                  xs: "90%",
                  sm: "100%",
                },
              }}
            />
            <CTypography
              fontWeight={600}
              color="#fff"
              textAlign="center"
              mt={2}
            >
              {event.name}
            </CTypography>
            <CTypography color="#AD1AAF" textAlign="center">
              {event.date} | {event.location}
            </CTypography>
            <Box textAlign="center" mt={1}>
              <button
                style={{
                  background: "#AD1AAF",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  padding: "8px 20px",
                  cursor: "pointer",
                }}
              >
                {event.cta}
              </button>
            </Box>
          </Stack>
        ))}
      </Slider>
    </Stack>
  );
}
