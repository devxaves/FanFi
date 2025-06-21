import React, { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

const QRScanner = () => {
  const [scannedData, setScannedData] = useState(null);
  const [success, setSuccess] = useState(false);
  const scannerRef = useRef(null);

  useEffect(() => {
    const scannerId = "qr-scanner";
    const html5QrCode = new Html5Qrcode(scannerId);

    Html5Qrcode.getCameras().then((devices) => {
      if (devices && devices.length) {
        const cameraId = devices[0].id;

        html5QrCode
          .start(
            cameraId,
            {
              fps: 10,
              qrbox: { width: 250, height: 250 },
              facingMode: "environment"
            },
            (decodedText) => {
              html5QrCode.stop().then(() => {
                setScannedData(decodedText);
                setSuccess(true);
              });
            },
            (errorMessage) => {
              // Optionally handle scan errors
            }
          )
          .catch((err) => {
            console.error("Error starting QR scanner:", err);
          });

        scannerRef.current = html5QrCode;
      }
    });

    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop().catch((e) => {});
      }
    };
  }, []);

  return (
    <div style={styles.container}>
      {!success ? (
        <>
          <h2>Scan QR Code to Check-In</h2>
          <div id="qr-scanner" style={styles.scanner}></div>
        </>
      ) : (
        <div style={styles.success}>
          <h2>✅ Successfully Checked In!</h2>
          <p>Scanned Data: <strong>{scannedData}</strong></p>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: 20,
    textAlign: "center",
    maxWidth: 400,
    margin: "0 auto",
  },
  scanner: {
    width: "100%",
    margin: "auto",
  },
  success: {
    padding: 20,
    backgroundColor: "#d4edda",
    color: "#155724",
    borderRadius: 10,
    border: "1px solid #c3e6cb",
  },
};

export default QRScanner;