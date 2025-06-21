import React, { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

const QRScanner = () => {
  const [scannedData, setScannedData] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [facingMode, setFacingMode] = useState("environment"); // rear camera by default
  const scannerRef = useRef(null);

  const scannerId = "qr-reader";

  useEffect(() => {
    startScanner();

    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop().catch(() => {});
      }
    };
  }, [facingMode]);

  const startScanner = () => {
    const html5QrCode = new Html5Qrcode(scannerId);
    Html5Qrcode.getCameras().then((devices) => {
      const cameraId = facingMode === "environment"
        ? devices.find(device => device.label.toLowerCase().includes("back"))?.id || devices[0].id
        : devices.find(device => device.label.toLowerCase().includes("front"))?.id || devices[0].id;

      html5QrCode
        .start(
          cameraId,
          { fps: 10, qrbox: { width: 250, height: 250 } },
          (decodedText) => {
            html5QrCode.stop().then(() => {
              if (decodedText.startsWith("https://fan-fi.vercel.app/")) {
                setScannedData(decodedText);
                setSuccess(true);
                setError(false);
              } else {
                setScannedData(decodedText);
                setSuccess(false);
                setError(true);
              }
            });
          },
          (err) => {
            // optional: console.log(err);
          }
        )
        .catch((err) => {
          console.error("Camera start error:", err);
        });

      scannerRef.current = html5QrCode;
    });
  };

  const toggleCamera = () => {
    if (scannerRef.current) {
      scannerRef.current.stop().then(() => {
        setFacingMode((prev) =>
          prev === "environment" ? "user" : "environment"
        );
      });
    } else {
      setFacingMode((prev) =>
        prev === "environment" ? "user" : "environment"
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 py-8">
      <h1 className="text-3xl font-bold text-purple-600 mb-6">Fan-Fi</h1>

      {!success && !error && (
        <>
          <div id={scannerId} className="w-full max-w-md rounded overflow-hidden border-4 border-purple-400 shadow-md mb-4"></div>
          <button
            onClick={toggleCamera}
            className="mt-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition"
          >
            Toggle Camera
          </button>
        </>
      )}

      {success && (
        <div className="mt-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded text-center shadow">
          <h2 className="text-xl font-semibold">✅ Successfully Checked In!</h2>
          <p className="mt-2 break-words">{scannedData}</p>
        </div>
      )}

      {error && (
        <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded text-center shadow">
          <h2 className="text-xl font-semibold">❌ Invalid Fan-Fi Ticket</h2>
          <p className="mt-2 break-words">{scannedData}</p>
          <button
            onClick={() => {
              setError(false);
              startScanner();
            }}
            className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};

export default QRScanner;