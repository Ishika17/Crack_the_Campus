import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/cn";

type ScoreRingProps = {
  value: number;
  max?: number;
  /** Outer diameter in px. */
  size?: number;
  thickness?: number;
  /**
   * `true` for above-the-fold rings: they play a keyframe on load instead of
   * waiting for the IntersectionObserver.
   */
  armed?: boolean;
  children?: ReactNode;
  className?: string;
  label: string;
};

/**
 * Circular progress drawn as a single inline SVG.
 *
 * `stroke-dashoffset` is the one non-composited property animated anywhere on
 * the page — it is used on exactly two small elements, once each, which is a
 * far better trade than shipping a chart library for one dial.
 */
export function ScoreRing({
  value,
  max = 10,
  size = 176,
  thickness = 12,
  armed = false,
  children,
  className,
  label,
}: ScoreRingProps) {
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  const ratio = Math.min(Math.max(value / max, 0), 1);
  const offset = circumference * (1 - ratio);

  return (
    <div
      data-reveal={armed ? undefined : ""}
      suppressHydrationWarning
      className={cn("relative grid place-items-center", armed && "ring-armed", className)}
      style={{ width: size, height: size, "--reveal-y": "0px" } as CSSProperties}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
        role="img"
        aria-label={`${label}: ${value} out of ${max}`}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={thickness}
          className="text-line"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={thickness}
          strokeLinecap="round"
          strokeDasharray={circumference}
          className="ring-progress text-brand"
          style={
            {
              "--ring-length": circumference,
              "--ring-offset": offset,
            } as CSSProperties
          }
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">{children}</div>
    </div>
  );
}
