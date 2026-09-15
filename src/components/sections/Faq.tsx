import { FaqItem } from "@/components/cards/FaqItem";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqs } from "@/content/faqs";
import { site } from "@/content/site";

export function Faq() {
  return (
    <Section id="faq" tone="muted" aria-labelledby="faq-heading">
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            id="faq-heading"
            eyebrow="FAQ"
            title="Common questions"
            description={`Everything students and placement cells ask before getting started on ${site.name}.`}
          />
          <Reveal delay={180}>
            <Button href={`mailto:${site.email}`} variant="secondary" trailingIcon="arrowUpRight">
              Ask us anything
            </Button>
          </Reveal>
        </div>

        <Reveal delay={90} className="rounded-panel border border-line bg-surface px-6 sm:px-8">
          <div className="[&>details:last-child]:border-b-0">
            {faqs.map((faq) => (
              <FaqItem key={faq.question} faq={faq} group="ctc-faq" />
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
