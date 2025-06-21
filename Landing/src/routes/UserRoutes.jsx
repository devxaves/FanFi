import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Home from "../components/home/Home";
import Navbar from "../components/navbar/Navbar";
import ScrollToTop from "./ScrollToTop";
import { CTypography } from "../utility";
import ScanQR from "./scanqr"; // ✅ Import your QR scanner page

import CheckinPage from "../pages/CheckinPage"; // Import CheckinPage if needed


export default function UserRoutes() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkin" element={<CheckinPage />} />

        <Route path="/scan" element={<ScanQR />} /> {/* ✅ New scan route */}
        <Route
          path="*"
          element={
            <CTypography
              align={"center"}
              fontSize={{
                lg: 80,
                md: 60,
                sm: 30,
                xs: 25,
              }}
            >
              Path Not Found. Back to{" "}
              <a href="/" style={{ color: "blue" }}>
                Home
              </a>
            </CTypography>
          }
        />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}
