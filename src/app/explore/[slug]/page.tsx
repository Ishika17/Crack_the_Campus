import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { pathways } from "@/content/pathways";

type PathwayPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return pathways.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PathwayPageProps): Promise<Metadata> {
  const { slug } = await params;
  const pathway = pathways.find((item) => item.slug === slug);

  return pathway
    ? {
        title: pathway.title,
        description: pathway.promise,
      }
    : {};
}

export default async function PathwayPage({ params }: PathwayPageProps) {
  const { slug } = await params;
  const pathway = pathways.find((item) => item.slug === slug);

  if (!pathway) notFound();

  return (
    <>
      <section className="border-b border-line bg-surface-2 py-14 sm:py-20 lg:py-24">
        <Container>
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted transition-colors hover:text-brand"
          >
            Back to all pathways
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-end lg:gap-16">
            <div className="flex flex-col items-start gap-5">
              <Eyebrow tone="brand">{pathway.level} pathway</Eyebrow>
              <h1 className="text-display max-w-[48rem] font-extrabold text-balance">
                {pathway.title}
              </h1>
              <p className="text-subtitle max-w-[42rem] text-pretty text-muted">
                {pathway.promise}
              </p>
              <p className="max-w-[42rem] text-[0.9375rem] leading-relaxed text-muted">
                {pathway.overview}
              </p>
            </div>

            <Card padding="lg" className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-2">
              <div>
                <p className="text-2xl font-extrabold tabular-nums">{pathway.weeks}</p>
                <p className="mt-1 text-sm text-muted">weeks to complete</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold tabular-nums">{pathway.modules}</p>
                <p className="mt-1 text-sm text-muted">guided modules</p>
              </div>
              <div className="col-span-2 border-t border-line pt-5">
                <p className="text-xs font-bold tracking-[0.08em] uppercase text-muted">
                  Target recruiters
                </p>
                <p className="mt-2 font-semibold">{pathway.targets.join(" · ")}</p>
              </div>
            </Card>
          </div>
        </Container>
      </section>

      <Section aria-labelledby="curriculum-heading">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.82fr] lg:gap-16">
          <div>
            <Eyebrow>Learning roadmap</Eyebrow>
            <h2 id="curriculum-heading" className="mt-4 text-title font-extrabold text-balance">
              What you will learn, practise and show.
            </h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {pathway.curriculum.map((module, index) => (
                <li
                  key={module.title}
                  className="rounded-xl border border-line bg-surface-2 p-5"
                >
                  <span className="grid size-7 place-items-center rounded-lg bg-brand-soft text-xs font-bold text-brand">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 font-bold">{module.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{module.description}</p>
                </li>
              ))}
            </ul>
          </div>

          <Card padding="lg" className="flex flex-col items-start gap-5 self-start">
            <span className="grid size-11 place-items-center rounded-xl bg-brand-soft text-brand">
              <Icon name="briefcase" size={22} />
            </span>
            <div>
              <h2 className="text-xl font-bold tracking-tight">Ready to start?</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Start this pathway free, practise at your pace, and use your results to build a stronger placement profile.
              </p>
            </div>
            <Button href="mailto:info@crackthecampus.com?subject=Pathway%20enquiry" trailingIcon="arrowRight">
              Start this pathway
            </Button>
            <p className="text-xs text-muted">Free student plan. No credit card required.</p>
          </Card>
        </div>

        <div className="mt-14 rounded-panel border border-line bg-surface-2 p-7 sm:p-9">
          <Eyebrow>By the end of this pathway</Eyebrow>
          <h2 className="mt-4 text-2xl font-extrabold tracking-tight">You will be able to:</h2>
          <ul className="mt-7 grid gap-4 md:grid-cols-3">
            {pathway.outcomes.map((outcome) => (
              <li key={outcome} className="flex gap-3 rounded-xl bg-surface p-4 text-sm font-medium leading-relaxed">
                <Icon name="check" size={18} className="mt-0.5 shrink-0 text-success" />
                {outcome}
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </>
  );
}
