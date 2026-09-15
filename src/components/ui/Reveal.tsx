import type { CSSProperties, ElementType, ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  /** Stagger in ms. Keep cumulative stagger under ~250ms so nothing feels slow. */
  delay?: number;
  /** Travel distance, e.g. "0px" to fade only. */
  offset?: string;
  className?: string;
  id?: string;
};

/**
 * Marks a subtree for scroll-reveal. This is a *server* component: it only
 * stamps `data-reveal` plus two custom properties into the HTML. The initial
 * state and the transition live in CSS, and a single client-side
 * IntersectionObserver (`RevealObserver`) flips `data-visible`.
 *
 * Cost per revealed element: zero JavaScript, zero React state, no re-render.
 */
export function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  offset,
  className,
  id,
}: RevealProps) {
  const style: Record<string, string> = {};
  if (delay) style["--reveal-delay"] = `${delay}ms`;
  if (offset) style["--reveal-y"] = offset;

  return (
    <Tag
      id={id}
      data-reveal=""
      suppressHydrationWarning
      className={className}
      style={Object.keys(style).length ? (style as CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
