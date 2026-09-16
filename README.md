# Crack The Campus — landing page

A recreation of the Crack The Campus landing page, rebuilt around the student
as the primary audience, with performance treated as a hard requirement rather
than a cleanup pass at the end.

```bash
npm install
npm run dev          # http://localhost:3000
npm run verify       # typecheck + lint + font-subset guard + production build
```

## Assessment Notes

### Setup

```bash
npm install
npm run dev       # development server
npm run verify    # typecheck, lint, font check and production build
```

### Technology Choices

Next.js 16 with the App Router, React 19, TypeScript and Tailwind CSS v4 were
chosen for static rendering, route-level code splitting, typed reusable UI and
an architecture that can grow beyond a single landing page.

### Architecture Overview

The page is composed from reusable layout, section, card and UI components.
Content is kept in typed files under `src/content`, while dynamic pathway pages
use `/explore/[slug]` and `generateStaticParams` for build-time generation.

### Dependencies Used and Why

Runtime dependencies are limited to `next`, `react` and `react-dom`. No
animation, icon, carousel or UI-kit dependency is needed: native browser APIs,
CSS, inline SVG and server components cover the product surface.

### Performance Optimizations

- Static server rendering and route-level code splitting.
- Only required interactive surfaces use client components.
- Self-hosted Latin font through `next/font` with `display: swap`.
- No raster images or third-party requests on the critical path.
- CSS and native browser animations instead of a JavaScript animation library.
- Reveal work uses one `IntersectionObserver` without a synchronous geometry scan.

### Animation Approach

CSS handles hero entrances, hover states, meters, the score ring and FAQ
transitions. A shared `IntersectionObserver` adds reveal attributes, while
`prefers-reduced-motion` disables hidden/offset animation states for users who
request reduced motion.

### Assumptions and Design Decisions

The assessment uses static/mock content and does not require a backend. The
contact form demonstrates the interaction flow without sending email. The
student experience is the primary audience, with institution actions kept
secondary. Real course data, authentication and submissions can be connected
later without changing the component structure.

### Known Limitations

- Contact submissions are presentation-only until an email or API service is connected.
- Lighthouse scores vary by device, browser, network and deployment region.
- Legal pages contain a practical baseline policy and should receive legal review before production use.
- Content currently lives in local typed files rather than a CMS or API.

### What I Would Improve With More Time

I would add real form delivery and validation, analytics and real-user Core Web
Vitals, automated Playwright and accessibility tests, a CMS-backed content
layer, and a performance budget in CI. I would also review the large DOM as the
pathway catalogue grows and add real optimized imagery only where it improves
the student experience.

### Latest Deployed Lighthouse Audit

Tested against the deployed Vercel URL with Lighthouse 13.4.1 using the
Desktop preset. Values can vary slightly between runs and deployment regions.

| Metric | Desktop |
|---|---:|
| First Contentful Paint | 0.4 s |
| Largest Contentful Paint | 0.7 s |
| Total Blocking Time | 110 ms |
| Cumulative Layout Shift | 0 |
| Speed Index | 0.7 s |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |

The desktop TBT is below the 200 ms target. The Lighthouse performance score
itself is calculated from these metrics and should be recorded from the score
shown at the top of the deployed audit.

### Latest Mobile Lighthouse Audit

Tested with the Lighthouse Mobile preset using the deployed production build.
Values can vary slightly between runs and devices.

| Metric | Mobile |
|---|---:|
| First Contentful Paint | 1.0 s |
| Largest Contentful Paint | 1.7 s |
| Total Blocking Time | 1000 ms |
| Cumulative Layout Shift | 0 |
| Speed Index | 2.1 s |

The page keeps a stable layout with CLS `0`; mobile TBT remains the main area
for future optimization.

---

## Measured results

Lighthouse 12, production build (`next build` + `next start`), default mobile
throttling (Moto G Power, 4× CPU, simulated slow 4G). Two consecutive runs,
identical results.

| | Mobile | Desktop |
|---|---|---|
| **Performance** | **100** | **100** |
| Accessibility | 100 | 100 |
| Best Practices | 100 | — |
| SEO | 100 | — |
| FCP | 0.9 s | 0.3 s |
| LCP | 1.8 s | 0.4 s |
| TBT | 20 ms | 0 ms |
| CLS | **0** | **0** |

What the landing page actually transfers on a cold load:

| Resource | Transfer | Notes |
|---|---|---|
| HTML | ~35 KB gz | Fully prerendered, no client fetch on load |
| CSS | 9.3 KB gz | One file, Tailwind emits only used utilities |
| Font | 27 KB | One woff2, one family, Latin subset, preloaded |
| Images | **0 bytes** | No raster images anywhere — see below |
| First-party JS | **~2.4 KB gz** | All three client components combined |
| Framework JS | ~130 KB gz | React 19 + Next App Router runtime |

The distinction in the last two rows is the honest one: the framework runtime
dominates the byte count and my own client-side code is a rounding error
against it. TBT of 20 ms is the number that shows this is not costing the user
much — nothing on this page hydrates except a menu, a theme button and one
observer.

---

## Why these choices

### Framework: Next.js 16 (App Router), React 19, TypeScript

The brief asks for something that can grow past one landing page, which ruled
out hand-written HTML. Among the frameworks that survive that requirement,
Next.js gives four things this page needed for free:

- **Static prerendering by default.** Every route here is `○ (Static)`. The
  HTML a student receives is fully composed; there is no client-side data
  fetch, no loading state, no spinner on first paint.
- **Server Components as the default.** Interactivity is opt-in per file. Of
  the ~25 components in `src/components`, exactly **three** ship JavaScript.
  Everything else — every card, icon, meter and section — leaves the build as
  HTML. This is the single biggest reason TBT is 20 ms.
- **`next/font` and `next/image` in the box**, so font self-hosting and image
  optimisation are configuration rather than a build pipeline I maintain.
- **Per-route code splitting**, which is why adding `/explore` did not change
  what the landing page downloads.

**The honest trade-off:** the React + Next client runtime is ~130 KB gzipped
before I write a line of code, and this page would run without most of it.
Astro or plain static HTML with a sprinkle of vanilla JS would ship ~2 KB
total and would be the *better* choice if the deliverable were only ever this
one page. I chose Next because the brief explicitly asks for something that
scales into a product — and then verified with Lighthouse that the runtime
cost does not actually reach the user as slowness (TBT 20 ms, LCP 1.8 s on
throttled mobile). If the real product stayed a set of marketing pages, I
would revisit this and move to Astro with React islands.

### Dependencies: none beyond the framework

`package.json` has three runtime dependencies: `next`, `react`, `react-dom`.
No UI kit, no animation library, no icon package, no class-name utilities.

| Not installed | Would have cost | Used instead |
|---|---|---|
| Framer Motion / GSAP | ~35–60 KB gz, and every animated section becomes a client component | One inline `IntersectionObserver` + CSS transitions ([`revealScript.ts`](src/lib/revealScript.ts)) |
| lucide-react / react-icons | A client dependency, and easily the whole glyph set | 30 hand-written inline SVG paths ([`Icon`](src/components/ui/Icon.tsx)) — rendered server-side, so they ship as markup, not code |
| An accordion / disclosure component | JS, plus ARIA I would have to get right myself | Native `<details>`/`<summary>` ([`FaqItem`](src/components/cards/FaqItem.tsx)) — keyboard and screen-reader behaviour is the browser's |
| A carousel library | ~10–20 KB gz for one logo strip | CSS keyframe on `transform` ([`Marquee`](src/components/ui/Marquee.tsx)) |
| clsx + tailwind-merge | ~4 KB gz | [12-line `cn()`](src/lib/cn.ts); variants are exhaustive lookup maps, so nothing needs merging at runtime |
| A charting library | 40 KB+ for one dial | Inline SVG circle with `stroke-dasharray` ([`ScoreRing`](src/components/ui/ScoreRing.tsx)) |

Tailwind CSS v4 is the one build-time dependency I did add. It contributes no
runtime JavaScript, emits only the utilities actually used (9.3 KB gzipped for
the whole site), and its `@theme` layer is what makes the token system below
work.

### Fonts

One family — Plus Jakarta Sans — loaded through `next/font/google`, which
self-hosts the file at build time. Consequences:

- No request to `fonts.googleapis.com` or `fonts.gstatic.com`, so no
  third-party DNS, TLS and round-trip on the critical path, and no
  render-blocking external stylesheet.
- It resolves to the **variable** font: one 27 KB file covers weights 400–800,
  rather than five static weight files.
- Latin subset only, `display: swap`, and Next emits size-adjusted fallback
  metrics — which is why CLS is 0 rather than merely low.
- Next emits `<link rel="preload">` for that one file automatically.

One finding worth calling out, because it is the kind of thing that only shows
up under measurement: the hero originally read **"₹0"**. U+20B9 sits outside
the Latin subset, so that single character made the browser discover and
download a *second*, non-preloaded 22 KB font file after CSS had parsed —
pushing mobile LCP from 1.8 s to 2.5 s. I reworded the copy to "Free" instead
of shipping the extra subset, and added
[`scripts/check-font-subset.mjs`](scripts/check-font-subset.mjs)
(`npm run check:fonts`, part of `npm run verify`) so a future copy change
cannot quietly reintroduce it.

### Images

**The page ships zero raster images.** That is a deliberate design decision,
not an omission:

- The hero is a typographic composition plus a CSS/SVG "score card", so there
  is no hero image on the critical path and the LCP element is text.
- Recruiter logos render as styled text. Seventeen logo files would be
  seventeen requests, and a marquee duplicates every node.
- Testimonial avatars are generated initials ([`Avatar`](src/components/ui/Avatar.tsx)),
  deterministically tinted from the name.
- Section backdrops are CSS gradients (`backdrop-grid`, `backdrop-glow`).
- All iconography is inline SVG.

The net effect is no image bytes, no decode work, no `srcset` guessing and no
image-driven layout shift — which is a large part of why CLS is exactly 0.

Because real product photography will eventually arrive,
[`next.config.ts`](next.config.ts) already sets
`images.formats = ["image/avif", "image/webp"]`, so any `<Image>` added later
is served as AVIF/WebP with width-based srcsets. The rules I would apply then:
`priority` on the hero image only, explicit `width`/`height` or `fill` with a
sized parent, `sizes` matching the real layout, `loading="lazy"` everywhere
below the fold, and a blur placeholder.

### Animations

Everything animates through **`transform` and `opacity` only** — the two
properties the compositor can handle without layout or paint. Deliberately
absent: animated `width`, `height`, `top`/`left`, and `box-shadow`. Card hover
lifts change `transform` and `border-color` but leave the shadow static,
because a transitioning blurred shadow repaints a large region every frame and
is a reliable source of jank on mid-range Android.

Four mechanisms, in rough order of how much they carry:

1. **Scroll reveal** — one `IntersectionObserver`, installed by an inline
   script during HTML parse, adds `data-visible` to each `[data-reveal]`
   element as it enters the viewport, then unobserves it. The initial state and
   the transition are pure CSS. Nothing re-renders; no React state is involved.
   The [`Reveal`](src/components/ui/Reveal.tsx) wrapper is a *server* component
   that only stamps an attribute and a `--reveal-delay` custom property.
   Elements already on screen at load are revealed synchronously with no
   transition, so the animation never gates the first paint — see
   [`revealScript.ts`](src/lib/revealScript.ts) for the measurements behind
   that.
2. **Above-the-fold entrances** — plain CSS `animation` with staggered
   `animation-delay`, so the hero animates without waiting for any JavaScript
   to load or hydrate.
3. **Data visuals** — meters grow with `scaleX()`, the score dials with
   `stroke-dashoffset`. The dials are the one non-composited animation on the
   page, used on two small elements, once each.
4. **Scroll progress** — the bar under the header uses a CSS
   `animation-timeline: scroll(root block)`, so there is no scroll listener at
   all. It is purely decorative and simply does not appear in browsers without
   scroll-driven animations.

**`prefers-reduced-motion` is structural here, not a bolt-on.** Every rule
that *hides* or *offsets* content lives inside
`@media (prefers-reduced-motion: no-preference)`. A reduced-motion visitor
therefore receives the fully composed page with no initial state to recover
from, and — importantly — the meters and dials declare their true resting
values in the `base` layer, so they read correctly instead of rendering empty
or full. That last point was a real bug caught by screenshotting the page with
`--force-prefers-reduced-motion`.

**Animations are also constrained by what they cost the metrics.** The hero
sub-paragraph is animated with transform only, no fade, because on a phone it
is marginally larger than the headline, which makes it the LCP candidate —
fading it from `opacity: 0` measurably moved LCP from 1.1 s to 2.5 s. The
headline is treated the same way. The motion is still there; it just cannot
gate the first meaningful paint.

### Reducing unnecessary JavaScript

In order of impact:

1. **Server Components by default.** Interactivity is opt-in, so only three
   files carry `"use client"`.
2. **Only three client components**, each justified:
   - [`MobileNav`](src/components/layout/MobileNav.tsx) — a CSS-only checkbox
     drawer was the alternative, but it cannot close on Escape, cannot lock
     background scroll, and cannot remove closed links from the tab order.
     ~40 lines buys real accessibility.
   - [`ThemeToggle`](src/components/layout/ThemeToggle.tsx) — completely
     stateless. The theme lives on `<html>`, the icons swap in CSS. No
     `useEffect`, no state sync on mount, no re-render.
   - [`RevealOnNavigate`](src/components/ui/RevealOnNavigate.tsx) — re-arms
     the reveal observer after a client-side route change, ~10 lines. The
     reveal runtime itself is *not* a component: it is an inline script
     ([`revealScript.ts`](src/lib/revealScript.ts)) that runs during HTML
     parse, because waiting for hydration to clear `opacity: 0` made a
     revealed paragraph the LCP on `/explore`.
3. **Zero unnecessary re-renders**, because there is almost no client state to
   re-render from. The animation system communicates through DOM attributes
   and CSS custom properties rather than React state.
4. **A modern `browserslist`** matching what Tailwind v4 already requires
   (Chrome 111+, Safari 16.4+). Transpiling below the floor the CSS sets would
   ship polyfills no visitor of this site can use; this removed ~13 KB of
   legacy JavaScript that Lighthouse was flagging.
5. **No `backdrop-filter` on the sticky header.** A blurred layer that
   recomposites on every scroll frame is one of the biggest avoidable costs on
   mid-range Android. A solid surface reads just as cleanly.

---

## Architecture

```
src/
├── app/
│   ├── layout.tsx          # fonts, metadata, theme bootstrap, header/footer
│   ├── page.tsx            # landing page = a flat list of sections
│   ├── explore/page.tsx    # second route, reuses three sections unchanged
│   ├── globals.css         # design tokens + the whole animation system
│   └── icon.svg
├── components/
│   ├── layout/             # SiteHeader, SiteFooter, MobileNav, ThemeToggle, Logo
│   ├── sections/           # one file per page section, composed in page.tsx
│   ├── cards/              # PathwayCard, TestimonialCard, RewardCard, FaqItem, FeatureRow
│   └── ui/                 # Button, Card, Section, SectionHeading, Eyebrow,
│                           # Container, Icon, Meter, ScoreRing, Marquee, Avatar,
│                           # Reveal, RevealOnNavigate
├── content/                # all copy and data, typed — no strings in components
├── lib/                    # cn(), revealScript (the inline reveal runtime)
└── scripts/check-font-subset.mjs
```

Three ideas hold this together:

**1. Content is data, not markup.** Every repeated thing on the page — six
pathways, six testimonials, three reward tiers, ten FAQs, the nav, the footer
columns, the recruiter list, the score breakdown — is a typed array in
`src/content/`. Sections map over it. There is no hardcoded card anywhere.
Adding a seventh pathway is appending one object to
[`content/pathways.ts`](src/content/pathways.ts); it appears on the homepage
grid and the `/explore` catalogue with no code change.

**2. Variants are exhaustive lookup maps.** `Button`, `Card`, `Section`,
`Eyebrow` and `Meter` each declare a `Record<Variant, string>`. This keeps
every possible class string statically visible to Tailwind, removes the need
for runtime class merging, and makes "what tones exist?" answerable by reading
one object.

**3. Theming happens in one file.** Colours are semantic CSS variables
(`--surface`, `--text-muted`, `--brand`, `--line`) mapped into Tailwind with
`@theme inline`. Utilities compile to `var(--surface)` rather than a literal
hex, so a full re-theme — including the dark theme, which is implemented and
toggleable — is a matter of redefining variables. No component knows a colour.

The `*-ink` token family is worth a note: vivid brand colours are reserved for
icons, fills and bars, while *text* on a tinted background uses the darker
`*-ink` variant. That is what took accessibility from 92 to 100 without
dulling the palette.

### Adaptability

| Change | Where |
|---|---|
| Add / edit / reorder a course | `content/pathways.ts` |
| Add a testimonial, FAQ, reward tier, stat | the matching `content/*.ts` |
| Change a CTA destination | `content/*.ts` or the section's `href` prop |
| Add or reorder a page section | one line in `app/page.tsx` |
| Change nav items | `content/navigation.ts` — feeds desktop bar, mobile drawer and footer at once |
| Re-theme, or add a third theme | redefine variables in `globals.css` |
| Reuse sections on a new page | see `app/explore/page.tsx` |

---

## UX decisions that differ from the reference

The structure and purpose of the original are intact; these are the places I
made a judgement call for a student reader.

- **A pathways/courses grid on the landing page.** The reference sends you to
  `/explore` to find out what you would actually study. Showing six concrete
  tracks — each with target companies, duration, module count and difficulty —
  answers "is there something here for me?" without a navigation step. Cards
  are tagged by level so a first-year and a final-year student can self-select.
- **Real testimonials with outcomes.** The reference has no social proof. For
  a placement product this is the most persuasive content available, so the
  section leads with the outcome ("Placed at Google") and includes non-CS and
  non-tier-1 students deliberately — a mechanical-engineering student needs to
  see someone like themselves.
- **The PR Score made visual.** The reference describes the score in prose. It
  is the product's central idea, so it is shown as a dial with a weighted
  breakdown, in the hero and again in its own section.
- **Anchor-based navigation with visible progress.** In-page anchors with
  `scroll-padding-top`, an underline that grows on hover, and a scroll-progress
  bar, so a long page stays navigable.
- **A dark theme.** Students revise at night. It costs one stateless client
  component because the token system was already there.
- **Sharper CTA copy.** "Start upskilling — free", with "No credit card. Free
  student plan with no time limit." directly underneath. The free tier is the
  main objection-handler for this audience, so it appears next to every primary
  CTA rather than only in the FAQ.
- **Institutions kept visually subordinate.** The placement-cell CTA exists but
  sits below the student CTA in a quieter treatment, so the two audiences do not
  compete.

## Accessibility

100 on Lighthouse, and the underlying work rather than just the score: a skip
link, one `<h1>` with a correct heading order, `aria-labelledby` on every
section, native `<details>` for the FAQ, `inert` on the closed mobile drawer so
its links leave the tab order, Escape-to-close and background scroll lock,
visible `:focus-visible` rings, `role="meter"` with min/max/now on the bars,
text alternatives on the score dials, valid `<dl>` grouping, and no
`aria-label` that fails to contain its element's visible text (which breaks
voice control). Plus the reduced-motion handling described above.

## What I would do next in production

Roughly in the order I would pick them up:

- **Serve behind a CDN with Brotli** and long-lived immutable cache headers on
  `/_next/static`. That is worth more than any remaining code change —
  measurements here are gzip from `next start` on localhost.
- **Reassess the framework against real traffic.** If the product stays
  marketing pages, move to Astro with React islands and drop ~130 KB of
  runtime. If it grows the app surface the brief implies, Next is already the
  right shape.
- **Real Core Web Vitals from real devices**, not just Lighthouse. Lab numbers
  on one throttled profile are a smoke test; I would send `web-vitals` to an
  analytics endpoint and watch p75 LCP/INP/CLS by device class, since a large
  share of this audience is on low-end Android.
- **Trim DOM size.** ~1,000 elements is above Lighthouse's comfort threshold.
  The FAQ and pathway grids are the obvious candidates for virtualisation or
  progressive disclosure if the catalogue grows.
- **Tests.** Component tests for the variant maps and content-driven sections,
  Playwright for the mobile drawer and theme persistence, and axe plus a
  Lighthouse budget in CI so a regression fails the build rather than a review.
- **Content source.** `src/content/` is deliberately shaped like the response
  of a CMS or API. Swapping the imports for typed fetches is a contained change
  and the next real step toward a product.
- **Images, when the real assets exist**, following the rules in the images
  section above.
