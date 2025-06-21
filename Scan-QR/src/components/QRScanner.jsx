// src/components/QRScanner.js
import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';

const QRScanner = () => {
  const [qrData, setQrData] = useState('No result');

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>QR Code Scanner</h2>
      <div style={{ width: '300px', margin: 'auto' }}>
        <QrReader
          constraints={{ facingMode: 'environment' }}
          onResult={(result, error) => {
            if (!!result) {
              setQrData(result?.text);
            }
          }}
          style={{ width: '100%' }}
        />
      </div>
      <p style={{ marginTop: '20px', fontWeight: 'bold' }}>
        Scanned Result: <span style={{ color: '#333' }}>{qrData}</span>
      </p>
    </div>
  );
};

export default QRScanner;
