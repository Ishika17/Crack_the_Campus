"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { primaryNav } from "@/content/navigation";
import { cn } from "@/lib/cn";

/**
 * The only interactive client component in the header.
 *
 * A CSS-only checkbox drawer was the alternative, but it cannot close on
 * Escape, cannot lock background scroll and cannot remove the closed links
 * from the tab order. ~40 lines of state buys real accessibility, so the
 * trade is worth it here and nowhere else on the page.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={open ? "Close menu" : "Open menu"}
        className="grid size-10 place-items-center rounded-full border border-line text-text transition-colors duration-200 hover:border-brand hover:text-brand lg:hidden"
      >
        <Icon name={open ? "close" : "menu"} size={20} />
      </button>

      {/* Scrim */}
      <div
        onClick={() => setOpen(false)}
        aria-hidden
        className={cn(
          "fixed inset-0 top-16 z-40 bg-black/40 transition-opacity duration-300 lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      <div
        id="mobile-nav-panel"
        inert={!open}
        className={cn(
          "fixed inset-x-0 top-16 z-40 max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-line bg-surface px-5 pb-8 pt-4 transition-[opacity,transform] duration-300 ease-out lg:hidden",
          "motion-reduce:transition-none",
          open
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-3 opacity-0",
        )}
      >
        <nav aria-label="Mobile">
          <ul className="flex flex-col">
            {primaryNav.map((link, index) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  style={{ transitionDelay: open ? `${index * 35}ms` : "0ms" }}
                  className={cn(
                    "flex items-center justify-between gap-4 border-b border-line py-4 transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none",
                    open ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0",
                  )}
                >
                  <span>
                    <span className="block font-semibold">{link.label}</span>
                    {link.hint ? (
                      <span className="block text-sm text-muted">{link.hint}</span>
                    ) : null}
                  </span>
                  <Icon name="arrowRight" size={18} className="text-muted" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-6 flex flex-col gap-3">
          <Button
            href="/explore"
            size="lg"
            fullWidth
            trailingIcon="arrowRight"
            onClick={() => setOpen(false)}
          >
            Start upskilling — free
          </Button>
          <Button
            href="/#institutions"
            variant="secondary"
            size="lg"
            fullWidth
            onClick={() => setOpen(false)}
          >
            For institutions
          </Button>

          <div className="mt-2 flex items-center justify-between rounded-full border border-line px-4 py-2 sm:hidden">
            <span className="text-sm font-semibold text-muted">Appearance</span>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </>
  );
}
