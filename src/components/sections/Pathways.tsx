import { PathwayCard } from "@/components/cards/PathwayCard";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pathways, type Pathway } from "@/content/pathways";

type PathwaysProps = {
  /** Lets `/explore` render the full catalogue and the homepage render a slice. */
  items?: Pathway[];
  showCta?: boolean;
  id?: string;
};

export function Pathways({ items = pathways, showCta = true, id = "pathways" }: PathwaysProps) {
  return (
    <Section id={id} tone="muted" aria-labelledby={`${id}-heading`}>
      <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          id={`${id}-heading`}
          eyebrow="Corporate Pathways"
          title="Pick the track your dream company actually screens for."
          description="Each pathway mirrors a real recruiter's round structure — aptitude cut-offs, coding patterns, tech stack, interview style."
        />
        {showCta ? (
          <Reveal delay={160} className="shrink-0">
            <Button href="/explore" variant="secondary" trailingIcon="arrowRight">
              All pathways
            </Button>
          </Reveal>
        ) : null}
      </div>

      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((pathway, index) => (
          <Reveal
            key={pathway.slug}
            as="li"
            id={pathway.slug}
            /* Stagger by column, not by index: row 2 should not wait for row 1
               to finish, or the last card feels a second late. */
            delay={(index % 3) * 90}
            className="h-full"
          >
            <PathwayCard pathway={pathway} />
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
