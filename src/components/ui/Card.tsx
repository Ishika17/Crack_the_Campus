import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/cn";

const TONES = {
  default: "bg-surface border-line",
  muted: "bg-surface-2 border-line",
  brand: "bg-brand-soft border-brand/15",
  spotlight: "bg-white/[0.045] border-white/10 text-on-spotlight",
} as const;

const PADDING = {
  none: "",
  sm: "p-5",
  md: "p-6 sm:p-7",
  lg: "p-7 sm:p-9",
} as const;

type CardProps = {
  children: ReactNode;
  as?: ElementType;
  tone?: keyof typeof TONES;
  padding?: keyof typeof PADDING;
  /** Adds the hover lift used by every clickable card on the page. */
  interactive?: boolean;
  className?: string;
};

/**
 * Hover state animates `transform` and `border-color` only. Deliberately no
 * `box-shadow` transition: shadows repaint a blurred region every frame, which
 * is the most common source of jank on a card grid on mid-range Android.
 */
export function Card({
  children,
  as: Tag = "div",
  tone = "default",
  padding = "md",
  interactive = false,
  className,
}: CardProps) {
  return (
    <Tag
      className={cn(
        "relative rounded-card border shadow-soft",
        TONES[tone],
        PADDING[padding],
        interactive &&
          "group/card transition-[transform,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-brand/40 motion-reduce:transform-none motion-reduce:transition-none",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
