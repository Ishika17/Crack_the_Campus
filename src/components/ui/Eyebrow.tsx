import type { ReactNode } from "react";

import { Icon, type IconName } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

/** Text tones use the `*-ink` variants so 12px labels clear 4.5:1 contrast. */
const TONES = {
  brand: "bg-brand-soft text-brand-ink",
  accent: "bg-accent-soft text-accent-ink",
  success: "bg-success-soft text-success-ink",
  neutral: "bg-surface-2 text-muted",
  spotlight: "bg-white/10 text-on-spotlight",
} as const;

type EyebrowProps = {
  children: ReactNode;
  icon?: IconName;
  tone?: keyof typeof TONES;
  className?: string;
  /** Adds a softly pulsing dot — used for live/limited-time states. */
  live?: boolean;
};

export function Eyebrow({
  children,
  icon,
  tone = "brand",
  className,
  live = false,
}: EyebrowProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold tracking-[0.06em] uppercase",
        TONES[tone],
        className,
      )}
    >
      {live ? (
        <span className="relative flex size-2 items-center justify-center">
          <span className="pulse-ring absolute size-2 rounded-full bg-current" />
          <span className="size-2 rounded-full bg-current" />
        </span>
      ) : null}
      {icon ? <Icon name={icon} size={14} /> : null}
      {children}
    </span>
  );
}
