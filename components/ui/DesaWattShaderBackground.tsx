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
  // Army green #3F4E2C, Olive green #4B5D2A, Forest Olive #5E7336, and Warm Amber #E0A526
  colors = [
    'hsl(86, 28%, 24%)', // #3F4E2C Army Green
    'hsl(81, 38%, 26%)', // #4B5D2A Olive Green
    'hsl(81, 36%, 33%)', // #5E7336 Lighter Olive
    'hsl(41, 76%, 51%)', // #E0A526 Warm Amber
  ],
}) => {
  return (
    <div className={`fixed inset-0 -z-10 overflow-hidden bg-[#2C381E] ${className}`}>
      {/* Dynamic WebGL Fluid Mesh Shader in Army/Olive & Warm Amber */}
      <div className="absolute inset-0 opacity-90">
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

      {/* Subtle Warm Olive Vignette & Depth Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#2C381E]/40 via-transparent to-[#1F2A14]/70" />

      {/* Microgrid coordinate lines */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(247,248,238,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(247,248,238,0.06)_1px,transparent_1px)] bg-[size:32px_32px]" />
    </div>
  );
};

export default DesaWattShaderBackground;
