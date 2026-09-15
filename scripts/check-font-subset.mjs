/**
 * Fails if any user-facing string uses a glyph outside the font subset that
 * `next/font` preloads.
 *
 * Why this exists: a single out-of-subset character (a rupee sign in the hero
 * stats) made the browser discover and download a second 22 KB font file
 * *after* CSS had parsed, which measurably delayed LCP on mobile. That class
 * of regression is invisible in review and easy to reintroduce with a copy
 * change, so it is checked instead of remembered.
 *
 * Run: npm run check:fonts
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join } from "node:path";

/**
 * Unicode ranges in the `latin` subset of Plus Jakarta Sans — the only font
 * file listed in `<link rel="preload">`. Copied from the generated
 * `@font-face` rule; re-check if the font or its subsets change.
 */
const PRELOADED_RANGES = [
  [0x0, 0xff],
  [0x131, 0x131],
  [0x152, 0x153],
  [0x2bb, 0x2bc],
  [0x2c6, 0x2c6],
  [0x2da, 0x2da],
  [0x2dc, 0x2dc],
  [0x304, 0x304],
  [0x308, 0x308],
  [0x329, 0x329],
  [0x2000, 0x206f],
  [0x20ac, 0x20ac],
  [0x2122, 0x2122],
  [0x2191, 0x2191],
  [0x2193, 0x2193],
  [0x2212, 0x2212],
  [0x2215, 0x2215],
  [0xfeff, 0xfeff],
  [0xfffd, 0xfffd],
];

const isPreloaded = (codePoint) =>
  PRELOADED_RANGES.some(([start, end]) => codePoint >= start && codePoint <= end);

/** Comments never reach the browser, so they are stripped before checking. */
const stripComments = (source) =>
  source.replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|\s)\/\/.*$/gm, "$1");

function* sourceFiles(dir) {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) {
      yield* sourceFiles(path);
    } else if ([".ts", ".tsx"].includes(extname(path))) {
      yield path;
    }
  }
}

const findings = [];

for (const file of sourceFiles("src")) {
  const source = stripComments(readFileSync(file, "utf8"));
  const seen = new Set();

  for (const character of source) {
    const codePoint = character.codePointAt(0);
    if (codePoint <= 0x7f || isPreloaded(codePoint) || seen.has(character)) continue;
    seen.add(character);
    findings.push({ file, character, codePoint });
  }
}

if (findings.length === 0) {
  console.log("✓ All glyphs fall inside the preloaded font subset.");
  process.exit(0);
}

console.error("✗ Glyphs outside the preloaded font subset:\n");
for (const { file, character, codePoint } of findings) {
  const hex = codePoint.toString(16).toUpperCase().padStart(4, "0");
  console.error(`  ${file}: "${character}" (U+${hex})`);
}
console.error(
  "\nEach of these forces an extra font request at render time.\n" +
    "Either reword the copy, or add the required subset to the font in " +
    "src/app/layout.tsx and update PRELOADED_RANGES in this script.",
);
process.exit(1);
