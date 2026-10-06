import React from 'react';
import { MeshGradient } from '@paper-design/shaders-react';

interface DesaWattShaderBackgroundProps {
  className?: string;
  distortion?: number;
  swirl?: number;
  speed?: number;
  colors?: string[];
}

export const DesaWattShaderBackground: React.FC<DesaWattShaderBackgroundProps> = ({
  className = '',
  distortion = 0.75,
  swirl = 0.15,
  speed = 0.7,
  // Deep Forest Green #147A4B, Midnight Navy #0B192C, Rich Emerald #10B981, and Solar Amber #F5A623
  colors = [
    'hsl(153, 72%, 22%)', // #147A4B Deep Green
    'hsl(215, 60%, 12%)', // Midnight Deep Slate/Navy
    'hsl(158, 64%, 38%)', // Vibrant Emerald
    'hsl(37, 92%, 52%)',  // #F5A623 Solar Amber
  ],
}) => {
  return (
    <div className={`fixed inset-0 -z-10 overflow-hidden bg-[#07131D] ${className}`}>
      {/* Dynamic WebGL Fluid Mesh Shader */}
      <div className="absolute inset-0 opacity-85">
        <MeshGradient
          style={{ height: '100vh', width: '100vw' }}
          distortion={distortion}
          swirl={swirl}
          offsetX={0}
          offsetY={0}
          scale={1}
          rotation={0}
          speed={speed}
          colors={colors}
        />
      </div>

      {/* Subtle Dark Vignette & Depth Overlay to maintain readable contrast */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/75" />

      {/* High-tech Microgrid vector coordinate lines */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:32px_32px]" />
    </div>
  );
};

export default DesaWattShaderBackground;
