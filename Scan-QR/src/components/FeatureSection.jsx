import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
import jsQR from "jsqr";

const FanFiScanner = () => {
  const [qrResult, setQrResult] = useState(null);
  const [facingMode, setFacingMode] = useState("environment"); // "environment" = back camera

  const handleScan = (result) => {
    if (result && result !== qrResult) {
      setQrResult(result);
      if (isValidFanFiUrl(result)) {
        window.open(result, "_blank");
      } else {
        alert("Scan FanFi Codes only.");
      }
    }
  };

  const isValidFanFiUrl = (string) => {
    try {
      const url = new URL(string);
      return url.href.startsWith("https://fanfi-tickets.vercel.app/");
    } catch (_) {
      return false;
    }
  };

  const handleImageUpload = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.src = reader.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);
        if (code) {
          handleScan(code.data);
        } else {
          alert("Could not detect a QR code in the image.");
        }
      };
    };
    reader.readAsDataURL(file);
  };

  const toggleCamera = () => {
    setFacingMode((prev) => (prev === "environment" ? "user" : "environment"));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br  text-white px-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg">
          The Official FanFi Scanner
        </h1>
        <p className="mt-4 text-sm md:text-lg text-gray-300 max-w-xl mx-auto">
          Verify your FanFi Tickets encrypted and authenticated with the APTOS Blockchain.
        </p>
      </div>

      {/* Scanner Box */}
      <div className="relative w-full max-w-md aspect-square rounded-2xl border border-gray-700 shadow-2xl bg-white/10 backdrop-blur-md overflow-hidden">
        <div className="absolute inset-0 z-10 border-4 border-dashed border-cyan-400 rounded-2xl pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500 animate-scan z-20" />

        <QrReader
          constraints={{ facingMode }}
          onResult={(result, error) => {
            if (!!result) {
              handleScan(result?.text);
            }
          }}
          containerStyle={{ width: "100%", height: "100%" }}
          videoStyle={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* Upload QR Fallback */}
      <div className="mt-6 flex flex-col items-center space-y-4">
        <label className="inline-block px-6 py-2 bg-cyan-500 text-white font-medium text-sm leading-tight rounded shadow-md hover:bg-cyan-600 hover:shadow-lg focus:bg-cyan-600 focus:shadow-lg focus:outline-none focus:ring-0 transition duration-200 cursor-pointer">
          Upload QR Code
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                handleImageUpload(file);
              }
            }}
            className="hidden"
          />
        </label>

        <button
          onClick={toggleCamera}
          className="px-6 py-2 bg-purple-500 text-white font-medium text-sm leading-tight rounded shadow-md hover:bg-purple-600 hover:shadow-lg focus:bg-purple-600 focus:shadow-lg focus:outline-none focus:ring-0 transition duration-200"
        >
          Toggle Camera
        </button>
      </div>
    </div>
  );
};

export default FanFiScanner;
