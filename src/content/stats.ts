export type Stat = {
  id: string;
  value: string;
  label: string;
  detail: string;
};

export const infrastructureStats: Stat[] = [
  {
    id: "drives",
    value: "1,300+",
    label: "Institutional drives",
    detail: "Large-scale campus recruitment drives delivered end to end.",
  },
  {
    id: "latency",
    value: "Zero-latency",
    label: "Proctoring engine",
    detail: "Integrity monitoring that never steals time from your test.",
  },
  {
    id: "uptime",
    value: "99.9%",
    label: "Assessment uptime",
    detail: "Built for concurrent peak loads on drive day.",
  },
];

/**
 * Compact proof points shown directly under the hero CTA.
 *
 * Note on "Free": this used to read with a rupee sign (U+20B9), which falls
 * outside the font's preloaded Latin subset. That one glyph triggered a
 * second, non-preloaded 22 KB font download inside the hero and pushed LCP
 * out. Rewording was cheaper than shipping the extra subset.
 *
 * `npm run check:fonts` guards against reintroducing an out-of-subset glyph.
 */
export const heroStats: Stat[] = [
  { id: "students", value: "180K+", label: "Students upskilling", detail: "" },
  { id: "colleges", value: "420+", label: "Partner colleges", detail: "" },
  { id: "free", value: "Free", label: "To get started", detail: "" },
];
