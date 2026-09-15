import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import type { ReactNode } from "react";

import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { RevealOnNavigate } from "@/components/ui/RevealOnNavigate";
import { site } from "@/content/site";
import { REVEAL_SCRIPT } from "@/lib/revealScript";

import "./globals.css";

/**
 * One variable font, one weight axis, Latin only.
 *
 * `next/font` self-hosts the file at build time, so there is no request to
 * fonts.gstatic.com and no render-blocking stylesheet. `display: swap` plus
 * Next's automatic size-adjusted fallback metrics mean text is readable on the
 * first paint and barely shifts when the real font lands.
 */
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
  // Only the weights the design actually uses.
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Your fast track to top placements`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "campus placements",
    "placement preparation",
    "engineering placements India",
    "aptitude and coding practice",
    "AI proctored assessments",
    "PR Score",
  ],
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Your fast track to top placements`,
    description: site.description,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Your fast track to top placements`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#080b14" },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${jakarta.variable} h-full`} suppressHydrationWarning>
      <head>
        {/* Applies the saved theme before first paint so there is no flash of
            the wrong palette. Inlined and tiny by design — a React effect runs
            too late to prevent the flash. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("ctc-theme");if(t==="dark"||t==="light")document.documentElement.dataset.theme=t}catch(e){}`,
          }}
        />
      </head>
      <body className="flex min-h-full flex-col font-sans">
        {/* Without JS the reveal animations never trigger, so their initial
            hidden state is neutralised here. Content is never unreachable. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}.meter-fill{transform:scaleX(var(--meter-value,1))!important}.ring-progress{stroke-dashoffset:var(--ring-offset)!important}`}</style>
        </noscript>

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-brand-contrast"
        >
          Skip to content
        </a>

        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />

        <RevealOnNavigate />

        {/* The scroll-reveal runtime. Inline and at the end of <body> so it
            runs during HTML parse rather than after hydration — see
            lib/revealScript.ts for why that matters to LCP. */}
        <script dangerouslySetInnerHTML={{ __html: REVEAL_SCRIPT }} />
      </body>
    </html>
  );
}
