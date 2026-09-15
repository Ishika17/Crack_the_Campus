import Link from "next/link";

import { Logo } from "@/components/layout/Logo";
import { MobileNav } from "@/components/layout/MobileNav";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { primaryNav } from "@/content/navigation";

/**
 * Server component. Only `MobileNav` and `ThemeToggle` hydrate; the bar, the
 * links and the CTA are static HTML.
 *
 * No `backdrop-filter` on the sticky bar: a blurred layer that recomposites on
 * every scroll frame is one of the biggest avoidable costs on mid-range
 * Android. A solid surface reads just as cleanly.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-surface">
      {/* Reading progress, driven purely by a CSS scroll timeline where
          supported — decorative, so no fallback is needed. */}
      <span
        aria-hidden
        className="scroll-progress absolute inset-x-0 bottom-0 h-0.5 origin-left bg-brand"
      />

      <Container>
        <div className="flex h-16 items-center gap-3 sm:gap-4">
          <Logo />

          <nav aria-label="Primary" className="ml-auto hidden lg:block">
            <ul className="flex items-center gap-0.5">
              {primaryNav.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group/nav relative inline-flex h-10 items-center rounded-full px-3 text-sm font-semibold text-muted transition-colors duration-200 hover:text-text"
                  >
                    {link.label}
                    <span className="absolute inset-x-3 bottom-1.5 h-0.5 origin-left scale-x-0 rounded-full bg-brand transition-transform duration-300 ease-out group-hover/nav:scale-x-100 motion-reduce:transition-none" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <span className="hidden sm:block">
              <ThemeToggle />
            </span>
            <Button href="/explore" size="sm" trailingIcon="arrowRight">
              Start free
            </Button>
            <MobileNav />
          </div>
        </div>
      </Container>
    </header>
  );
}
