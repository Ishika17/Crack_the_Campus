import Link from "next/link";

import { cn } from "@/lib/cn";

type LogoProps = {
  className?: string;
};

/**
 * Inline SVG mark — no logo file, no request, scales to any DPI.
 *
 * Deliberately no `aria-label`: the visible wordmark already names the link,
 * and an aria-label that does not contain the visible text breaks voice
 * control ("click Crack The Campus" would not match).
 */
export function Logo({ className }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn("group/logo inline-flex items-center gap-2.5", className)}
    >
      <span className="grid size-9 place-items-center rounded-xl bg-brand text-brand-contrast transition-transform duration-300 ease-out group-hover/logo:-rotate-6 motion-reduce:transform-none motion-reduce:transition-none">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M14.5 3L6 13.5h4.6L9.5 21 18 10.5h-4.6L14.5 3z"
            fill="currentColor"
          />
        </svg>
      </span>
      <span className="text-[0.9375rem] font-extrabold tracking-[-0.02em] sm:text-[1.0625rem]">
        Crack<span className="text-brand">The</span>Campus
      </span>
    </Link>
  );
}
