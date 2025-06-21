// src/scan/ScanQR.js
import React, { useState, useRef } from 'react';
import { QrReader } from 'react-qr-reader';
import { useNavigate } from 'react-router-dom';
import jsQR from 'jsqr';

import './scanqr.css';

const ScanQR = () => {
  const [data, setData] = useState('');
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const handleResult = (result) => {
    if (result?.text) {
      handleRedirect(result.text);
    }
  };

  const handleRedirect = (text) => {
    setData(text);
    setError('');
    if (text.startsWith("https://fan-fi.vercel.app/checkin")) {
      const path = text.replace("https://fan-fi.vercel.app", "");
      navigate(path);
    } else {
      setError('Invalid QR code format.');
    }
  };

  const handleUpload = async (event) => {
    setUploading(true);
    setError('');
    const file = event.target.files[0];
    if (!file) return;

    const img = new Image();
    const reader = new FileReader();

    reader.onload = function (e) {
      img.src = e.target.result;

      img.onload = function () {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, canvas.width, canvas.height);

        if (code) {
          handleRedirect(code.data);
        } else {
          setError("Couldn't read QR code from image.");
        }
        setUploading(false);
      };
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="qr-container">
      <h2>Scan Your Event Ticket</h2>

      <div className="camera-scan">
        <QrReader
          constraints={{ facingMode: 'environment' }}
          onResult={handleResult}
          style={{ width: '100%' }}
        />
      </div>

      <p><strong>Result:</strong> {data || 'Waiting for scan...'}</p>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className="upload-section">
        <h4>Or upload QR code image</h4>
        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          ref={fileInputRef}
          disabled={uploading}
        />
      </div>
    </div>
  );
};

export default ScanQR;
