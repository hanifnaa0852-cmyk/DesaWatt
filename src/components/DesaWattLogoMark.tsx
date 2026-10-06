import React from 'react';

interface LogoMarkProps {
  className?: string;
  size?: number;
}

export const DesaWattLogoMark: React.FC<LogoMarkProps> = ({ className = '', size = 36 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="DesaWatt Logo Mark"
    >
      {/* Outer subtle container / badge background */}
      <rect width="100" height="100" rx="22" fill="#147A4B" />

      {/* Sun Ray Beams (Rising Half-Sun) - Solar Amber */}
      {/* 45-deg Left beam */}
      <line x1="28" y1="28" x2="35" y2="35" stroke="#F5A623" strokeWidth="4.5" strokeLinecap="round" />
      {/* Top beam */}
      <line x1="50" y1="17" x2="50" y2="27" stroke="#F5A623" strokeWidth="4.5" strokeLinecap="round" />
      {/* 45-deg Right beam */}
      <line x1="72" y1="28" x2="65" y2="35" stroke="#F5A623" strokeWidth="4.5" strokeLinecap="round" />

      {/* Rising Half-Sun Arc (Solar Amber) */}
      <path
        d="M 28 52 A 22 22 0 0 1 72 52 Z"
        fill="#F5A623"
      />

      {/* Center Monitoring & Microgrid Node (White circle + connection ring) */}
      <circle cx="50" cy="52" r="6.5" fill="#FFFFFF" />
      <circle cx="50" cy="52" r="2.5" fill="#147A4B" />

      {/* Village Pitched Roof & Solar Cell Grid Matrix */}
      {/* Pitched Roof outline */}
      <path
        d="M 18 64 L 50 40 L 82 64"
        stroke="#FFFFFF"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Solar Panel Cells under roof / house base */}
      {/* Left cell */}
      <rect x="27" y="65" width="12" height="15" rx="2" fill="#FFFFFF" fillOpacity="0.95" />
      {/* Center cell (with microgrid divider) */}
      <rect x="44" y="65" width="12" height="15" rx="2" fill="#FFFFFF" fillOpacity="0.95" />
      {/* Right cell */}
      <rect x="61" y="65" width="12" height="15" rx="2" fill="#FFFFFF" fillOpacity="0.95" />

      {/* Solar Grid Internal Horizontal Line */}
      <line x1="27" y1="72.5" x2="39" y2="72.5" stroke="#147A4B" strokeWidth="1.5" />
      <line x1="44" y1="72.5" x2="56" y2="72.5" stroke="#147A4B" strokeWidth="1.5" />
      <line x1="61" y1="72.5" x2="73" y2="72.5" stroke="#147A4B" strokeWidth="1.5" />

      {/* Foundation Ground Line (Firm Stability) */}
      <line x1="22" y1="84" x2="78" y2="84" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.75" />
    </svg>
  );
};

export const DesaWattStandaloneMark: React.FC<{ size?: number; className?: string }> = ({ size = 200, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Pure vector mark on white / transparent */}
      {/* Sun Ray Beams */}
      <line x1="32" y1="30" x2="40" y2="38" stroke="#F5A623" strokeWidth="5" strokeLinecap="round" />
      <line x1="60" y1="18" x2="60" y2="29" stroke="#F5A623" strokeWidth="5" strokeLinecap="round" />
      <line x1="88" y1="30" x2="80" y2="38" stroke="#F5A623" strokeWidth="5" strokeLinecap="round" />

      {/* Rising Half-Sun Arc (Amber #F5A623) */}
      <path
        d="M 32 58 A 28 28 0 0 1 88 58 Z"
        fill="#F5A623"
      />

      {/* Data Monitoring Node at Sun's Center */}
      <circle cx="60" cy="58" r="7.5" fill="#FFFFFF" />
      <circle cx="60" cy="58" r="3.5" fill="#147A4B" />

      {/* Pitched Roof (Deep Green #147A4B) */}
      <path
        d="M 18 72 L 60 42 L 102 72"
        stroke="#147A4B"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Solar Panel Cells Base Structure */}
      {/* Cell Column 1 */}
      <rect x="29" y="74" width="16" height="20" rx="3" fill="#147A4B" />
      <line x1="29" y1="84" x2="45" y2="84" stroke="#FFFFFF" strokeWidth="2" />

      {/* Cell Column 2 */}
      <rect x="52" y="74" width="16" height="20" rx="3" fill="#147A4B" />
      <line x1="52" y1="84" x2="68" y2="84" stroke="#FFFFFF" strokeWidth="2" />

      {/* Cell Column 3 */}
      <rect x="75" y="74" width="16" height="20" rx="3" fill="#147A4B" />
      <line x1="75" y1="84" x2="91" y2="84" stroke="#FFFFFF" strokeWidth="2" />

      {/* Stable Ground Line */}
      <line x1="22" y1="99" x2="98" y2="99" stroke="#147A4B" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
};
