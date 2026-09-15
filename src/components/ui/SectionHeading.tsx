import type { ReactNode } from "react";

import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  /** Required: every section heading is an anchor target and a11y label. */
  id: string;
  eyebrow?: string;
  eyebrowTone?: "brand" | "accent" | "success" | "neutral" | "spotlight";
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
  /** Set when the heading sits on the dark `spotlight` surface. */
  onSpotlight?: boolean;
};

export function SectionHeading({
  id,
  eyebrow,
  eyebrowTone = "brand",
  title,
  description,
  align = "left",
  className,
  onSpotlight = false,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start",
        className,
      )}
    >
      {eyebrow ? (
        <Reveal>
          <Eyebrow tone={onSpotlight ? "spotlight" : eyebrowTone}>{eyebrow}</Eyebrow>
        </Reveal>
      ) : null}

      <Reveal as="h2" id={id} delay={60} className="text-title max-w-[46rem] font-bold text-balance">
        {title}
      </Reveal>

      {description ? (
        <Reveal
          as="p"
          delay={120}
          className={cn(
            "text-subtitle max-w-[42rem] text-pretty",
            onSpotlight ? "text-on-spotlight-muted" : "text-muted",
          )}
        >
          {description}
        </Reveal>
      ) : null}
    </div>
  );
}
