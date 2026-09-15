import { Container } from "@/components/ui/Container";
import { Marquee } from "@/components/ui/Marquee";
import { Reveal } from "@/components/ui/Reveal";
import { recruiters } from "@/content/companies";

export function TrustedBy() {
  return (
    <section
      aria-labelledby="trusted-by-heading"
      className="border-y border-line bg-surface-2 py-12 sm:py-14"
    >
      <Container>
        <Reveal
          as="h2"
          id="trusted-by-heading"
          className="text-center text-sm font-semibold tracking-[0.04em] text-muted"
        >
          Empowering students to crack recruitment at
        </Reveal>
      </Container>

      <Reveal delay={80} className="mt-8">
        <Marquee items={recruiters} durationSeconds={52} />
      </Reveal>
    </section>
  );
}
