import type { CSSProperties } from "react";

import { cn } from "@/lib/cn";

type MarqueeProps = {
  items: readonly string[];
  /** Lower = faster. Tuned per row so two rows never sync up. */
  durationSeconds?: number;
  reverse?: boolean;
  className?: string;
};

/**
 * Infinite logo strip built from a CSS keyframe on `transform` only — no
 * scroll listener, no rAF loop, no carousel dependency. The list is rendered
 * twice; translating the track by -50% lands exactly on the seam.
 *
 * The duplicate copy is `aria-hidden`, and the whole strip pauses on hover or
 * keyboard focus so it is not a distraction while reading.
 */
export function Marquee({
  items,
  durationSeconds = 46,
  reverse = false,
  className,
}: MarqueeProps) {
  const style = {
    "--marquee-duration": `${durationSeconds}s`,
    animationDirection: reverse ? "reverse" : undefined,
  } as CSSProperties;

  return (
    <div className={cn("marquee edge-fade-x overflow-hidden", className)}>
      <div className="marquee-track flex w-max items-center" style={style}>
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1 ? true : undefined}
            className="flex shrink-0 items-center"
          >
            {items.map((item) => (
              <li
                key={item}
                className="px-6 text-lg font-bold tracking-tight text-muted transition-colors duration-200 hover:text-text sm:px-8 sm:text-xl"
              >
                {item}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
