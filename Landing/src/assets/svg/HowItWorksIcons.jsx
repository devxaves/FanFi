import React from "react";

// Connect Icon
export const ConnectIcon = ({ color = "#AD1AAF" }) => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18 24C18 26.2091 16.2091 28 14 28C11.7909 28 10 26.2091 10 24C10 21.7909 11.7909 20 14 20C16.2091 20 18 21.7909 18 24Z"
      stroke={color}
      strokeWidth="2"
    />
    <path
      d="M38 24C38 26.2091 36.2091 28 34 28C31.7909 28 30 26.2091 30 24C30 21.7909 31.7909 20 34 20C36.2091 20 38 21.7909 38 24Z"
      stroke={color}
      strokeWidth="2"
    />
    <path d="M18 24H30" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// AI Analysis Icon
export const AIIcon = ({ color = "#AD1AAF" }) => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M24 10V38" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <rect
      x="18"
      y="14"
      width="12"
      height="20"
      rx="2"
      stroke={color}
      strokeWidth="2"
    />
    <path d="M12 18H16" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M12 24H16" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M12 30H16" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M32 18H36" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M32 24H36" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M32 30H36" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// Apply Icon
export const ApplyIcon = ({ color = "#AD1AAF" }) => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 16H36V34H12V16Z" stroke={color} strokeWidth="2" />
    <path d="M12 22H36" stroke={color} strokeWidth="2" />
    <path d="M20 28H28" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// NFT Ticket Icon
export const NFTIcon = ({ color = "#AD1AAF" }) => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="24" cy="24" r="14" stroke={color} strokeWidth="2" />
    <path
      d="M24 16V24L29 29"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// QR Check-in Icon
export const QRIcon = ({ color = "#AD1AAF" }) => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="12" y="12" width="10" height="10" stroke={color} strokeWidth="2" />
    <rect x="12" y="26" width="10" height="10" stroke={color} strokeWidth="2" />
    <rect x="26" y="12" width="10" height="10" stroke={color} strokeWidth="2" />
    <path
      d="M26 26H36V36"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M36 26L26 36"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

// Metaverse Icon
export const MetaverseIcon = ({ color = "#AD1AAF" }) => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 28L24 38L38 28"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 20L24 30L38 20"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 12L24 22L38 12"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
