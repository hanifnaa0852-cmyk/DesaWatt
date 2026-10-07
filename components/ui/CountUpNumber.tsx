import React, { useEffect, useState, useRef } from 'react';

export interface CountUpNumberProps {
  value: number | string;
  duration?: number; // duration in ms, default 900ms
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  useGrouping?: boolean; // Indonesian thousand separator (.)
}

export const CountUpNumber: React.FC<CountUpNumberProps> = ({
  value,
  duration = 900,
  decimals,
  prefix = '',
  suffix = '',
  className = '',
  useGrouping = true,
}) => {
  const numericValue = typeof value === 'number' ? value : parseFloat(value);
  const isNan = Number.isNaN(numericValue);

  // Auto-detect decimal places if not explicitly provided
  const targetDecimals =
    decimals !== undefined
      ? decimals
      : isNan || Number.isInteger(numericValue)
      ? 0
      : (numericValue.toString().split('.')[1] || '').length;

  const [displayValue, setDisplayValue] = useState<number>(0);
  const prevValueRef = useRef<number>(0);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (isNan) return;
    const startVal = prevValueRef.current;
    const targetVal = numericValue;
    prevValueRef.current = targetVal;

    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth easeOutCubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = startVal + (targetVal - startVal) * easeProgress;

      setDisplayValue(current);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayValue(targetVal);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [numericValue, duration, isNan]);

  if (isNan) {
    return (
      <span className={`inline-block tabular-nums ${className}`}>
        {prefix}
        {value}
        {suffix}
      </span>
    );
  }

  const formatted = useGrouping
    ? displayValue.toLocaleString('id-ID', {
        minimumFractionDigits: targetDecimals,
        maximumFractionDigits: targetDecimals,
      })
    : displayValue.toFixed(targetDecimals);

  return (
    <span className={`inline-block tabular-nums ${className}`}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
};

/**
 * Custom hook for counting numbers, e.g. for charts, gauges, or raw numeric interpolations
 */
export function useCountUp(value: number, duration: number = 900): number {
  const [displayValue, setDisplayValue] = useState<number>(0);
  const prevValueRef = useRef<number>(0);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const startVal = prevValueRef.current;
    const targetVal = value;
    prevValueRef.current = targetVal;

    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = startVal + (targetVal - startVal) * easeProgress;

      setDisplayValue(current);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayValue(targetVal);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [value, duration]);

  return displayValue;
}

export default CountUpNumber;
