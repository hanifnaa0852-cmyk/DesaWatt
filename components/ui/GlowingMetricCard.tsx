import React from 'react';
import { cn } from '@/lib/utils';

interface GlowingMetricCardProps {
  children?: React.ReactNode;
  className?: string;
  glowColor?: 'green' | 'amber' | 'emerald';
}

export const GlowingMetricCard: React.FC<GlowingMetricCardProps> = ({
  children,
  className = '',
}) => {
  return (
    <div className={cn("bg-[#F3F5EA] rounded-[14px] border border-[#C5CCAE] shadow-xs hover:border-[#4B5D2A] transition-all h-full", className)}>
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
};
