import { Icon } from "@/components/ui/Icon";
import { Meter } from "@/components/ui/Meter";
import { Reveal } from "@/components/ui/Reveal";
import { ScoreRing } from "@/components/ui/ScoreRing";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { compositeScore, scoreSignals } from "@/content/score";

export function CtcScore() {
  return (
    <Section id="pr-score" aria-labelledby="pr-score-heading">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16">
        <div className="flex flex-col gap-8">
          <SectionHeading
            id="pr-score-heading"
            eyebrow="The credential"
            title="Beyond the resume: the PR Score."
            description="PR means Placement Readiness. A CGPA shows how you did in exams; the PR Score shows how ready you are for a job, based on learning, practice and proctored performance."
          />

          <ul className="flex flex-col gap-6">
            {scoreSignals.map((signal, index) => (
              <Reveal
                key={signal.id}
                as="li"
                delay={index * 90}
                className="flex flex-col gap-3 rounded-card border border-line bg-surface-2 p-5"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-brand-soft text-brand">
                    <Icon name={signal.icon} size={18} />
                  </span>
                  <h3 className="font-bold tracking-tight">{signal.label}</h3>
                  <span className="rounded-full border border-line bg-surface px-2.5 py-1 text-[0.6875rem] font-bold tracking-[0.04em] uppercase text-muted">
                    {signal.source}
                  </span>
                  <span className="ml-auto text-sm font-bold tabular-nums text-brand">
                    {signal.weight}% weight
                  </span>
                </div>

                <Meter
                  value={signal.weight}
                  max={50}
                  delay={index * 90}
                  label={`${signal.label} weighting`}
                />

                <p className="text-sm leading-relaxed text-pretty text-muted">
                  {signal.description}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal
          delay={120}
          className="flex flex-col items-center gap-7 rounded-panel border border-line bg-surface-2 p-8 text-center sm:p-10"
        >
          <ScoreRing value={compositeScore.value} size={208} thickness={14} label={compositeScore.label}>
            <span className="flex flex-col items-center">
              <span className="text-5xl font-extrabold tracking-tight tabular-nums">
                {compositeScore.value}
              </span>
              <span className="text-sm font-semibold text-muted">
                out of {compositeScore.scale}
              </span>
            </span>
          </ScoreRing>

          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-bold tracking-tight">
              One number recruiters can defend
            </h3>
            <p className="text-[0.9375rem] leading-relaxed text-pretty text-muted">
              {compositeScore.caption}
            </p>
          </div>

          <ul className="grid w-full gap-2 text-left">
            {[
              "Visible to every partner recruiter",
              "Re-scored after each proctored attempt",
              "Comparable across colleges and batches",
            ].map((item) => (
              <li
                key={item}
                className="flex items-center gap-2.5 rounded-xl bg-surface px-3.5 py-3 text-sm font-medium"
              >
                <Icon name="check" size={16} className="text-success" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
