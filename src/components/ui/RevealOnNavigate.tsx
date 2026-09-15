"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

declare global {
  interface Window {
    /** Installed by `REVEAL_SCRIPT`; rescans for unrevealed elements. */
    __ctcReveal?: () => void;
  }
}

/**
 * Re-arms the scroll-reveal runtime after a client-side route change.
 *
 * The inline script in `app/layout.tsx` handles the initial document, which is
 * what matters for LCP. But a Next client navigation swaps the tree without
 * reloading, so the elements on the new page have never been observed — and
 * would otherwise sit at `opacity: 0` forever.
 *
 * This is the whole fix: an effect keyed on the pathname, calling back into
 * the same observer the inline script already created. No duplicated logic, no
 * second observer.
 */
export function RevealOnNavigate() {
  const pathname = usePathname();

  useEffect(() => {
    window.__ctcReveal?.();
  }, [pathname]);

  return null;
}
