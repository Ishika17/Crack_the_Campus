import { Button } from "@/components/ui/Button";
import { ContactFormButton } from "@/components/ui/ContactFormButton";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

const PROOF: { icon: IconName; label: string }[] = [
  { icon: "check", label: "Free forever plan" },
  { icon: "check", label: "No credit card" },
  { icon: "check", label: "Set up in 2 minutes" },
];

export function FinalCta() {
  return (
    <Section id="get-started" spacing="tight" aria-labelledby="get-started-heading">
      <Reveal className="relative isolate overflow-hidden rounded-panel border border-line-spotlight bg-surface-spotlight px-7 py-14 text-center text-on-spotlight sm:px-12 sm:py-20">
        <div aria-hidden className="absolute inset-0 -z-10 backdrop-glow opacity-70" />

        <div className="mx-auto flex max-w-[44rem] flex-col items-center gap-6">
          <Eyebrow tone="spotlight">Placement season starts now</Eyebrow>

          <h2 id="get-started-heading" className="text-title font-extrabold text-balance">
            Build the score that gets you shortlisted.
          </h2>

          <p className="text-subtitle text-pretty text-on-spotlight-muted">
            Join 180,000+ students preparing on Crack The Campus. Start with the free
            Web Hub today, and move to proctored assessments when you are ready.
          </p>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button href="/explore" size="lg" trailingIcon="arrowRight">
              Start upskilling — free
            </Button>
            <Button href="/#ecosystem" size="lg" variant="secondary" leadingIcon="download">
              Get the Pro-Suite
            </Button>
          </div>

          <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-on-spotlight-muted">
            {PROOF.map((item) => (
              <li key={item.label} className="inline-flex items-center gap-1.5">
                <Icon name={item.icon} size={15} className="text-success" />
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      {/* Secondary audience: placement cells. Kept visually subordinate so it
          never competes with the student CTA above. */}
      <Reveal
        id="institutions"
        delay={120}
        className="mt-5 flex flex-col items-start gap-5 rounded-panel border border-line bg-surface-2 p-7 sm:flex-row sm:items-center sm:justify-between sm:p-8"
      >
        <div className="flex items-start gap-4">
          <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand">
            <Icon name="building" size={22} />
          </span>
          <div className="flex flex-col gap-1">
            <h3 className="font-bold tracking-tight">Are you a college or placement cell?</h3>
            <p className="max-w-[40rem] text-sm leading-relaxed text-muted">
              Run AI-proctored drives, manage batches, and track placement readiness
              across every branch from one admin suite.
            </p>
          </div>
        </div>
        <ContactFormButton
          label="Talk to our team"
          subject="Institution enquiry"
          description="Tell us about your college, placement drive or assessment needs."
          className="shrink-0"
          trailingIcon="arrowRight"
        />
      </Reveal>
    </Section>
  );
}
