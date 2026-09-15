import { RewardCard } from "@/components/cards/RewardCard";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { leaderboard, rewardTiers, sprint } from "@/content/sprint";
import { cn } from "@/lib/cn";

const RANK_TONE = [
  "bg-accent text-white",
  "bg-white/15 text-on-spotlight",
  "bg-white/10 text-on-spotlight-muted",
] as const;

export function Sprint() {
  return (
    <Section id="sprint" tone="spotlight" aria-labelledby="sprint-heading">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          id="sprint-heading"
          eyebrow="Monthly Sprint"
          title="Monthly challenges. Real rewards."
          description="Every month a new Corporate Pathway contest goes live. Master the stack, top the leaderboard, claim the prize — and watch your PR Score move."
          onSpotlight
        />
        <Reveal delay={160} className="shrink-0">
          <Eyebrow tone="spotlight" live>
            {sprint.status}
          </Eyebrow>
        </Reveal>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-[1.5fr_1fr] lg:gap-8">
        <ul className="grid gap-5 sm:grid-cols-3">
          {rewardTiers.map((tier, index) => (
            <Reveal key={tier.id} as="li" delay={index * 90} className="h-full">
              <RewardCard tier={tier} />
            </Reveal>
          ))}
        </ul>

        <Reveal
          delay={180}
          className="flex flex-col gap-5 rounded-panel border border-line-spotlight bg-white/[0.045] p-6 sm:p-7"
        >
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-bold tracking-tight">Live leaderboard</h3>
            <span className="text-xs font-semibold text-on-spotlight-muted">
              {sprint.participants}
            </span>
          </div>

          <ol className="flex flex-col gap-2">
            {leaderboard.map((row, index) => (
              <li
                key={row.rank}
                className="flex items-center gap-3 rounded-xl bg-white/[0.04] px-3 py-2.5 transition-transform duration-200 ease-out hover:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none"
              >
                <span
                  className={cn(
                    "grid size-7 shrink-0 place-items-center rounded-lg text-xs font-bold tabular-nums",
                    RANK_TONE[index] ?? RANK_TONE[2],
                  )}
                >
                  {String(row.rank).padStart(2, "0")}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold">
                    {row.participant}
                  </span>
                  <span className="block truncate text-xs text-on-spotlight-muted">
                    {row.college}
                  </span>
                </span>
                <span className="text-sm font-bold tabular-nums">
                  {row.points.toFixed(1)}
                </span>
              </li>
            ))}
          </ol>

          <p className="flex items-center gap-2 text-xs text-on-spotlight-muted">
            <Icon name="clock" size={14} />
            {sprint.window}
          </p>

          <Button href="/explore" size="lg" fullWidth trailingIcon="arrowRight">
            Enter this sprint
          </Button>
        </Reveal>
      </div>
    </Section>
  );
}
