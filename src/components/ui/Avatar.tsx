import { cn } from "@/lib/cn";

const TINTS = [
  "bg-brand-soft text-brand",
  "bg-accent-soft text-accent",
  "bg-success-soft text-success",
  "bg-surface-3 text-text",
] as const;

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

/** Deterministic so server and client render identically (no hydration drift). */
function tintFor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i += 1) hash = (hash * 31 + name.charCodeAt(i)) | 0;
  return TINTS[Math.abs(hash) % TINTS.length];
}

type AvatarProps = {
  name: string;
  className?: string;
};

/**
 * Initials instead of photographs. Six testimonial avatars as images would be
 * six extra requests and a guaranteed CLS risk; initials cost nothing and
 * never fail to load.
 */
export function Avatar({ name, className }: AvatarProps) {
  return (
    <span
      aria-hidden
      className={cn(
        "grid size-11 shrink-0 place-items-center rounded-full text-sm font-bold",
        tintFor(name),
        className,
      )}
    >
      {initials(name)}
    </span>
  );
}
