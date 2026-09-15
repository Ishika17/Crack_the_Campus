import { cn } from "@/lib/cn";

/**
 * Hand-rolled inline icon set.
 *
 * An icon library (lucide-react, react-icons) would add a client dependency
 * and, in the worst case, ship every glyph. These render inside server
 * components, so each icon leaves the build as plain inline SVG markup — no
 * runtime JavaScript, no extra request, and it inherits `currentColor` so the
 * dark theme needs no per-icon work.
 */
const ICON_PATHS = {
  sparkles:
    "M12 3l1.9 4.6 4.6 1.9-4.6 1.9L12 16l-1.9-4.6L5.5 9.5l4.6-1.9L12 3M18 16.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7.7-1.8",
  route:
    "M6.5 19.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5M17.5 9.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5M15 7H10a3 3 0 000 6h4a3 3 0 010 6H9",
  file:
    "M14 3v5h5M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8l-5-5M9 13h6M9 17h4",
  target:
    "M12 21a9 9 0 100-18 9 9 0 000 18M12 16.5a4.5 4.5 0 100-9 4.5 4.5 0 000 9M12 13.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3",
  briefcase:
    "M4 8h16a1 1 0 011 1v9a1 1 0 01-1 1H4a1 1 0 01-1-1V9a1 1 0 011-1M9 8V6a2 2 0 012-2h2a2 2 0 012 2v2M3 12.5h18",
  monitor:
    "M4 4h16a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V5a1 1 0 011-1M9 20h6M12 16v4",
  shield:
    "M12 3l7 3v5.5c0 4.2-2.9 7.9-7 9.5-4.1-1.6-7-5.3-7-9.5V6l7-3M9 12l2 2 4-4",
  link:
    "M10.5 13.5a4 4 0 005.7 0l2.6-2.6a4 4 0 00-5.7-5.7L11.8 6.5M13.5 10.5a4 4 0 00-5.7 0l-2.6 2.6a4 4 0 005.7 5.7l1.3-1.3",
  trophy:
    "M8 4h8v5a4 4 0 01-8 0V4M8 6H5.5A2.5 2.5 0 008 10.5M16 6h2.5A2.5 2.5 0 0116 10.5M10 20h4M12 13v7",
  ticket:
    "M4 9V7a1 1 0 011-1h14a1 1 0 011 1v2a2.5 2.5 0 000 5v2a1 1 0 01-1 1H5a1 1 0 01-1-1v-2a2.5 2.5 0 000-5M14 6v12",
  badge:
    "M12 3l2.2 1.6 2.7-.3 1 2.5 2.3 1.4-.7 2.6.7 2.6-2.3 1.4-1 2.5-2.7-.3L12 21l-2.2-1.6-2.7.3-1-2.5L3.8 15l.7-2.6-.7-2.6 2.3-1.4 1-2.5 2.7.3L12 3M9.5 12l1.8 1.8 3.2-3.4",
  arrowRight: "M5 12h14M13 6l6 6-6 6",
  arrowUpRight: "M7 17L17 7M8 7h9v9",
  check: "M5 12.5l4.5 4.5L19 7",
  menu: "M4 7h16M4 12h16M4 17h16",
  close: "M6 6l12 12M18 6L6 18",
  sun:
    "M12 17a5 5 0 100-10 5 5 0 000 10M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4",
  moon: "M20 14.5A8.5 8.5 0 019.5 4a8.5 8.5 0 1010.5 10.5",
  quote:
    "M8 7c-2.2 0-4 1.8-4 4s1.8 4 4 4c0 2.2-1.3 3.6-3 4.3M19 7c-2.2 0-4 1.8-4 4s1.8 4 4 4c0 2.2-1.3 3.6-3 4.3",
  star: "M12 3.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8-5.3-2.8-5.3 2.8 1-5.8L3.5 9.7l5.9-.9L12 3.5",
  chevronDown: "M6 9.5l6 6 6-6",
  bolt: "M13 3L5 13.5h5l-1 7.5 8-10.5h-5l1-7.5",
  users:
    "M16 20v-1.5A3.5 3.5 0 0012.5 15h-5A3.5 3.5 0 004 18.5V20M10 12a3.5 3.5 0 100-7 3.5 3.5 0 000 7M20 20v-1.5a3.5 3.5 0 00-2.6-3.4M15.5 5.2a3.5 3.5 0 010 6.6",
  building:
    "M4 21V5a1 1 0 011-1h8a1 1 0 011 1v16M14 21V10h5a1 1 0 011 1v10M3 21h18M7.5 8h3M7.5 12h3M7.5 16h3",
  clock: "M12 21a9 9 0 100-18 9 9 0 000 18M12 7.5V12l3 2",
  layers: "M12 3l8 4.5-8 4.5-8-4.5L12 3M4 12l8 4.5 8-4.5M4 16.5L12 21l8-4.5",
  download: "M12 4v10M8 10.5l4 4 4-4M4 19h16",
  globe:
    "M12 21a9 9 0 100-18 9 9 0 000 18M3.5 9h17M3.5 15h17M12 3c2.5 2.4 3.8 5.5 3.8 9s-1.3 6.6-3.8 9M12 3C9.5 5.4 8.2 8.5 8.2 12s1.3 6.6 3.8 9",
  mail: "M4 6h16a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V7a1 1 0 011-1M3.5 7.5l8.5 6 8.5-6",
  pin: "M12 21s6.5-5.2 6.5-10a6.5 6.5 0 10-13 0c0 4.8 6.5 10 6.5 10M12 13.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5",
  trending: "M4 17l5-5 3 3 7-7M15 8h5v5",
} as const;

export type IconName = keyof typeof ICON_PATHS;

type IconProps = {
  name: IconName;
  className?: string;
  /** Rendered size in px. Defaults to 20. */
  size?: number;
  /** Provide only when the icon is the sole carrier of meaning. */
  title?: string;
};

export function Icon({ name, className, size = 20, title }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("shrink-0", className)}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
    >
      {title ? <title>{title}</title> : null}
      <path d={ICON_PATHS[name]} />
    </svg>
  );
}
