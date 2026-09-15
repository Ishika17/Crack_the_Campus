import type { CSSProperties } from "react";

import { cn } from "@/lib/cn";

const TONES = {
  brand: "bg-brand",
  accent: "bg-accent",
  success: "bg-success",
} as const;

const SIZES = {
  sm: "h-1.5",
  md: "h-2",
  lg: "h-2.5",
} as const;

type MeterProps = {
  value: number;
  max?: number;
  tone?: keyof typeof TONES;
  size?: keyof typeof SIZES;
  /** Delay before the fill animates, for staggered rows. */
  delay?: number;
  label?: string;
  className?: string;
};

/**
 * Progress bar that grows with `transform: scaleX()` rather than `width`.
 * Animating width would force layout + paint on every frame; scaleX runs
 * entirely on the compositor.
 *
 * The track carries its own `data-reveal`, so the fill animates when it
 * scrolls into view without the caller having to wire anything up.
 */
export function Meter({
  value,
  max = 10,
  tone = "brand",
  size = "md",
  delay = 0,
  label,
  className,
}: MeterProps) {
  const ratio = Math.min(Math.max(value / max, 0), 1);

  return (
    <div
      data-reveal=""
      suppressHydrationWarning
      role="meter"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={label}
      className={cn("meter-track w-full", SIZES[size], className)}
      style={{ "--reveal-y": "0px" } as CSSProperties}
    >
      <span
        className={cn("meter-fill", TONES[tone])}
        style={
          {
            "--meter-value": ratio,
            "--meter-delay": `${delay}ms`,
          } as CSSProperties
        }
      />
    </div>
  );
}
