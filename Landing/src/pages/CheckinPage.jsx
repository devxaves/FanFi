// src/pages/CheckinPage.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const CheckinPage = () => {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get("id");

    if (id) {
      // Redirect to external app on port 3000
      const targetUrl = `https://fanfi-tickets.vercel.app/nft-detail/${id}`;
      window.location.href = targetUrl; // OR use window.open(targetUrl, "_blank") for new tab
    }
  }, [location]);

  return null; // Optional: add spinner or "Redirecting..." text
};

export default CheckinPage;
