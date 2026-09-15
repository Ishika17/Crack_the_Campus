import type { IconName } from "@/components/ui/Icon";

export type ScoreSignal = {
  id: string;
  label: string;
  source: "Web Hub" | "Pro-Suite";
  /** Percentage of the composite score — also drives the bar width. */
  weight: number;
  /** Illustrative student value out of 10, used in the hero and score visual. */
  value: number;
  description: string;
  icon: IconName;
};

export const scoreSignals: ScoreSignal[] = [
  {
    id: "skills",
    label: "Skills",
    source: "Web Hub",
    weight: 30,
    value: 8.4,
    description: "Capability signal mapped from your courses, pathways and project work.",
    icon: "sparkles",
  },
  {
    id: "practice",
    label: "Practice",
    source: "Web Hub",
    weight: 25,
    value: 9.1,
    description: "Consistency and reps: mocks, drills and weekly readiness streaks.",
    icon: "target",
  },
  {
    id: "performance",
    label: "Proctored performance",
    source: "Pro-Suite",
    weight: 45,
    value: 8.2,
    description: "High-stakes, integrity-monitored results from the official hiring environment.",
    icon: "shield",
  },
];

export const compositeScore = {
  value: 8.6,
  scale: 10,
  label: "PR Score",
  caption:
    "The Web Hub contributes skills and practice telemetry. The Pro-Suite supplies proctored performance. Together they produce one credential recruiters can rely on.",
  percentile: "Top 8% of your batch",
};
