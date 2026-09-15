import { FeatureRow } from "@/components/cards/FeatureRow";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ecosystemPillars } from "@/content/ecosystem";
import { cn } from "@/lib/cn";

/**
 * The "one ecosystem, two ways to win" block. Both pillars render from the
 * same component, differing only by the `tone` field in the data — a third
 * pillar would need no code change.
 */
export function Ecosystem() {
  return (
    <Section id="ecosystem" aria-labelledby="ecosystem-heading">
      <SectionHeading
        id="ecosystem-heading"
        eyebrow="The ecosystem"
        title="One ecosystem. Two ways to win."
        description="Start with open-access learning on the web, then prove those skills in a professional, proctored hiring environment."
        align="center"
        className="mx-auto"
      />

      <div className="mt-12 grid gap-6 lg:mt-16 lg:grid-cols-2 lg:gap-8">
        {ecosystemPillars.map((pillar, pillarIndex) => {
          const onSpotlight = pillar.tone === "spotlight";

          return (
            <Reveal
              key={pillar.id}
              delay={pillarIndex * 120}
              className={cn(
                "flex flex-col gap-7 rounded-panel border p-7 sm:p-9",
                onSpotlight
                  ? "border-line-spotlight bg-surface-spotlight text-on-spotlight"
                  : "border-line bg-surface-2",
              )}
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "rounded-lg px-2.5 py-1 text-xs font-bold tabular-nums",
                      onSpotlight ? "bg-white/10 text-on-spotlight" : "bg-brand text-brand-contrast",
                    )}
                  >
                    {pillar.index}
                  </span>
                  <span
                    className={cn(
                      "text-xs font-bold tracking-[0.1em] uppercase",
                      onSpotlight ? "text-on-spotlight-muted" : "text-muted",
                    )}
                  >
                    {pillar.kicker}
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
                    {pillar.title}
                  </h3>
                  <p
                    className={cn(
                      "text-base font-semibold",
                      onSpotlight ? "text-on-spotlight-muted" : "text-brand",
                    )}
                  >
                    {pillar.tagline}
                  </p>
                  <p
                    className={cn(
                      "text-[0.9375rem] leading-relaxed text-pretty",
                      onSpotlight ? "text-on-spotlight-muted" : "text-muted",
                    )}
                  >
                    {pillar.description}
                  </p>
                </div>
              </div>

              <ul className="flex flex-col gap-5">
                {pillar.features.map((feature) => (
                  <FeatureRow key={feature.title} {...feature} onSpotlight={onSpotlight} />
                ))}
              </ul>

              <Button
                href={pillar.cta.href}
                variant={onSpotlight ? "primary" : "secondary"}
                size="lg"
                className="mt-auto self-start"
                trailingIcon="arrowRight"
              >
                {pillar.cta.label}
              </Button>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
