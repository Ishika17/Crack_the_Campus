/**
 * Minimal class-name joiner.
 *
 * Deliberately not `clsx` + `tailwind-merge`: this project never merges
 * conflicting Tailwind classes at runtime (variants are exhaustive lookup
 * maps, see `components/ui/Button.tsx`), so a 12-line helper replaces ~4 KB
 * of dependencies.
 */
export type ClassValue = string | false | null | undefined;

export function cn(...values: ClassValue[]): string {
  let out = "";
  for (const value of values) {
    if (!value) continue;
    out = out ? `${out} ${value}` : value;
  }
  return out;
}
