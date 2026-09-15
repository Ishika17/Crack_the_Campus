import type { CSSProperties } from "react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { Meter } from "@/components/ui/Meter";
import { ScoreRing } from "@/components/ui/ScoreRing";
import { compositeScore, scoreSignals } from "@/content/score";
import { heroStats } from "@/content/stats";

/** Staggered entrance helper — keeps the delay values readable inline. */
const delay = (ms: number) => ({ "--anim-delay": `${ms}ms` }) as CSSProperties;

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Backdrop is gradients only — no hero image, so nothing competes with
          the LCP text and there is no image weight to download. */}
      <div aria-hidden className="absolute inset-0 -z-10 backdrop-grid opacity-[0.35]" />
      <div aria-hidden className="absolute inset-0 -z-10 backdrop-glow" />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-linear-to-b from-transparent to-surface"
      />

      <Container>
        <div className="grid items-center gap-14 py-16 sm:py-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-28">
          <div className="flex flex-col items-start gap-6">
            <div className="anim-rise" style={delay(0)}>
              <Eyebrow tone="accent" live>
                Monthly Sprint is live
              </Eyebrow>
            </div>

            {/* LCP element. `anim-lift` animates transform only and starts at
                full opacity, so the entrance never postpones the LCP paint. */}
            <h1 className="anim-lift text-display max-w-[38rem] font-extrabold text-balance">
              Your fast track to{" "}
              <span className="relative whitespace-nowrap text-brand">
                top placements
                <svg
                  aria-hidden
                  viewBox="0 0 300 12"
                  preserveAspectRatio="none"
                  className="absolute -bottom-1 left-0 h-2.5 w-full text-brand/30"
                >
                  <path
                    d="M2 9C60 3 150 2 298 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              .
            </h1>

            {/* `anim-lift`, not `anim-rise`: on a phone this paragraph is
                marginally larger than the headline, which makes *it* the LCP
                candidate. Fading it in from `opacity: 0` pushed measured LCP
                from 1.1s to 2.5s. Transform-only keeps the motion and the
                metric. */}
            <p
              className="anim-lift text-subtitle max-w-[34rem] text-pretty text-muted"
              style={delay(90)}
            >
              Upskill with industry-expert courses, master the Corporate Pathway for
              your dream company, and build a{" "}
              <strong className="font-semibold text-text">PR Score</strong> that
              gets you noticed by recruiters.
            </p>

            <div
              className="anim-rise flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center"
              style={delay(170)}
            >
              <Button href="/explore" size="lg" trailingIcon="arrowRight">
                Start upskilling — free
              </Button>
              <Button href="#pr-score" size="lg" variant="secondary">
                How the score works
              </Button>
            </div>

            <p
              className="anim-rise flex items-center gap-2 text-sm text-muted"
              style={delay(230)}
            >
              <Icon name="check" size={16} className="text-success" />
              No credit card. Free student plan with no time limit.
            </p>

            <dl
              className="anim-rise grid w-full grid-cols-3 gap-4 border-t border-line pt-6"
              style={delay(290)}
            >
              {heroStats.map((stat) => (
                <div key={stat.id} className="flex flex-col gap-0.5">
                  <dt className="order-2 text-xs font-medium text-muted sm:text-sm">
                    {stat.label}
                  </dt>
                  <dd className="order-1 text-2xl font-extrabold tracking-tight tabular-nums sm:text-3xl">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* --- Score preview card --- */}
          <div className="anim-rise relative mx-auto w-full max-w-md" style={delay(150)}>
            <div className="relative rounded-panel border border-line bg-surface p-6 shadow-float sm:p-7">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold tracking-[0.08em] uppercase text-muted">
                    Placement readiness
                  </p>
                  <p className="text-lg font-bold tracking-tight">Priya R.</p>
                </div>
                <Eyebrow tone="success" live>
                  Verified
                </Eyebrow>
              </div>

              <div className="mt-5 flex items-center justify-center gap-2 rounded-xl border border-accent/20 bg-accent/10 px-3 py-2.5 text-xs font-bold text-text">
                <Icon name="trophy" size={15} className="text-accent" />
                Rank 01 this sprint
              </div>

              <div className="my-7 flex justify-center">
                <ScoreRing value={compositeScore.value} armed label={compositeScore.label}>
                  <span className="flex flex-col items-center">
                    <span className="text-4xl font-extrabold tracking-tight tabular-nums">
                      {compositeScore.value}
                    </span>
                    <span className="text-xs font-semibold text-muted">
                      / {compositeScore.scale} · {compositeScore.label}
                    </span>
                  </span>
                </ScoreRing>
              </div>

              <ul className="flex flex-col gap-4">
                {scoreSignals.map((signal, index) => (
                  <li key={signal.id} className="flex flex-col gap-2">
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="flex items-center gap-2 text-sm font-semibold">
                        <Icon name={signal.icon} size={15} className="text-brand" />
                        {signal.label}
                      </span>
                      <span className="text-sm font-bold tabular-nums text-muted">
                        {signal.value.toFixed(1)}
                      </span>
                    </div>
                    <Meter
                      value={signal.value}
                      delay={index * 110}
                      size="sm"
                      label={`${signal.label} score`}
                    />
                  </li>
                ))}
              </ul>

              <p className="mt-6 flex items-center gap-2 rounded-xl bg-surface-2 px-3.5 py-3 text-xs font-semibold text-muted">
                <Icon name="shield" size={15} className="text-success" />
                {compositeScore.percentile} · proctored by the Pro-Suite
              </p>
            </div>

            {/* Floating proof chips — hidden on small screens where they would
                crowd the card rather than add to it. */}
            <div
              className="anim-rise absolute -bottom-5 -right-6 hidden items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-2 text-xs font-bold shadow-card lg:flex"
              style={delay(640)}
            >
              <Icon name="trending" size={15} className="text-success" />
              +1.4 in 6 weeks
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
