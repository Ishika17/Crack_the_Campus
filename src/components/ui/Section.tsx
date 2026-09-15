import type { ReactNode } from "react";

import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";

const TONES = {
  default: "bg-surface text-text",
  muted: "bg-surface-2 text-text",
  spotlight: "bg-surface-spotlight text-on-spotlight",
} as const;

const SPACING = {
  default: "py-16 sm:py-20 lg:py-28",
  tight: "py-10 sm:py-12 lg:py-16",
  loose: "py-20 sm:py-28 lg:py-36",
} as const;

type SectionProps = {
  children: ReactNode;
  /** Doubles as the in-page anchor target for the nav. */
  id?: string;
  tone?: keyof typeof TONES;
  spacing?: keyof typeof SPACING;
  className?: string;
  containerWidth?: "default" | "narrow" | "wide";
  /** Skip the container when a child needs to bleed to the viewport edge. */
  bleed?: boolean;
  "aria-labelledby"?: string;
};

export function Section({
  children,
  id,
  tone = "default",
  spacing = "default",
  className,
  containerWidth = "default",
  bleed = false,
  ...rest
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn("relative scroll-mt-24", TONES[tone], SPACING[spacing], className)}
      {...rest}
    >
      {bleed ? children : <Container width={containerWidth}>{children}</Container>}
    </section>
  );
}
