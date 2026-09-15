import type { Metadata } from "next";
import type { CSSProperties } from "react";

import { FinalCta } from "@/components/sections/FinalCta";
import { Pathways } from "@/components/sections/Pathways";
import { TrustedBy } from "@/components/sections/TrustedBy";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { pathways } from "@/content/pathways";

export const metadata: Metadata = {
  title: "Explore Corporate Pathways",
  description:
    "Browse every Corporate Pathway on Crack The Campus — company-mapped tracks covering DSA, aptitude, full-stack, data, cloud and interview preparation.",
};

/**
 * A second route that exists to prove the architecture: it reuses `Pathways`,
 * `TrustedBy` and `FinalCta` unchanged, and Next code-splits it away from the
 * landing page automatically.
 */
export default function ExplorePage() {
  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-line">
        <div aria-hidden className="absolute inset-0 -z-10 backdrop-glow opacity-70" />
        <Container>
          <div className="flex flex-col items-start gap-5 py-14 sm:py-20">
            <div className="anim-rise">
              <Eyebrow>{pathways.length} pathways available</Eyebrow>
            </div>
            <h1 className="anim-lift text-display max-w-[40rem] font-extrabold text-balance">
              Every pathway, one catalogue.
            </h1>
            {/* Transform-only, like the landing hero: this paragraph is the
                LCP candidate on a phone, and fading it in delays the metric. */}
            <p
              className="anim-lift text-subtitle max-w-[38rem] text-pretty text-muted"
              style={{ "--anim-delay": "90ms" } as CSSProperties}
            >
              Pick by target company, by branch, or by how many weeks you have left
              before the drive. Every track is free to start.
            </p>
          </div>
        </Container>
      </section>

      <Pathways showCta={false} id="catalogue" />
      <TrustedBy />
      <FinalCta />
    </>
  );
}
