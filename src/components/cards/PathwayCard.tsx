import Link from "next/link";

import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import type { Pathway } from "@/content/pathways";

const LEVEL_TONE: Record<Pathway["level"], string> = {
  Beginner: "bg-success-soft text-success-ink",
  Intermediate: "bg-brand-soft text-brand-ink",
  Advanced: "bg-accent-soft text-accent-ink",
};

type PathwayCardProps = {
  pathway: Pathway;
};

/**
 * One card definition drives the homepage grid and the `/explore` listing.
 * Adding a program means appending to `content/pathways.ts` — no new markup.
 */
export function PathwayCard({ pathway }: PathwayCardProps) {
  return (
    <Card as="article" interactive padding="md" className="flex h-full flex-col gap-5">
      <div className="flex items-start justify-between gap-3">
        <span
          className={`rounded-full px-2.5 py-1 text-[0.6875rem] font-bold tracking-[0.06em] uppercase ${LEVEL_TONE[pathway.level]}`}
        >
          {pathway.level}
        </span>
        {pathway.flag ? (
          <span className="rounded-full border border-line px-2.5 py-1 text-[0.6875rem] font-semibold text-muted">
            {pathway.flag}
          </span>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-bold tracking-tight">
          {/* Stretched link: the whole card is clickable, but the accessible
              name stays on a single real link. */}
          <Link
            href={`/explore/${pathway.slug}`}
            className="before:absolute before:inset-0 before:rounded-card before:content-['']"
          >
            {pathway.title}
          </Link>
        </h3>
        <p className="text-[0.9375rem] leading-relaxed text-muted">{pathway.promise}</p>
      </div>

      <ul className="flex flex-wrap gap-1.5">
        {pathway.skills.map((skill) => (
          <li
            key={skill}
            className="rounded-md bg-surface-2 px-2 py-1 text-xs font-medium text-muted"
          >
            {skill}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-col gap-3 border-t border-line pt-4">
        <ul className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold text-muted">
          <li className="flex items-center gap-1.5">
            <Icon name="clock" size={15} />
            {pathway.weeks} weeks
          </li>
          <li className="flex items-center gap-1.5">
            <Icon name="layers" size={15} />
            {pathway.modules} modules
          </li>
        </ul>

        <p className="flex items-center gap-1.5 text-xs font-semibold text-muted">
          <Icon name="briefcase" size={15} />
          <span className="truncate">{pathway.targets.join(" · ")}</span>
        </p>

        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
          View pathway
          <Icon
            name="arrowRight"
            size={16}
            className="transition-transform duration-200 ease-out group-hover/card:translate-x-1 motion-reduce:transition-none"
          />
        </span>
      </div>
    </Card>
  );
}
