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
    <div className={cn("bg-white rounded-2xl border border-[#E2E8F0] shadow-sm hover:shadow-md transition-shadow h-full", className)}>
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
};
