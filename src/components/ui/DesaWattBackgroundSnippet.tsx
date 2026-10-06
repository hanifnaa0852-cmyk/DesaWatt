import React from 'react';

interface DesaWattBackgroundProps {
  className?: string;
}

export const DesaWattBackgroundSnippet: React.FC<DesaWattBackgroundProps> = ({ className = '' }) => {
  return (
    <div className={`fixed inset-0 -z-10 bg-[#070D18] ${className}`}>
      {/* Upper radial glow: Solar Amber & Emerald Green fusion */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(20,122,75,0.45),transparent)]" />
      
      {/* Lower subtle warm amber energy glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_80%_80%,rgba(245,166,35,0.18),transparent)]" />

      {/* Center ambient glow centered on the login view */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_560px_at_50%_240px,rgba(20,122,75,0.25),transparent)]" />
      
      {/* Precise microgrid vector matrix overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#147A4B1A_1px,transparent_1px),linear-gradient(to_bottom,#147A4B1A_1px,transparent_1px)] bg-[size:24px_24px]" />
    </div>
  );
};

export default DesaWattBackgroundSnippet;
