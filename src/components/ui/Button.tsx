import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { Icon, type IconName } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "spotlight";
export type ButtonSize = "sm" | "md" | "lg";

/**
 * Exhaustive variant maps rather than runtime class merging: every possible
 * class string is statically present, so Tailwind can see them and no
 * `tailwind-merge` pass is needed at runtime.
 */
const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    "bg-brand text-brand-contrast shadow-brand hover:bg-brand-strong hover:-translate-y-0.5 active:translate-y-0",
  secondary:
    "bg-surface text-text border border-line-strong hover:border-brand hover:text-brand hover:-translate-y-0.5 active:translate-y-0",
  ghost: "text-text hover:bg-surface-2",
  spotlight:
    "bg-surface-spotlight text-on-spotlight hover:-translate-y-0.5 active:translate-y-0",
};

const SIZES: Record<ButtonSize, string> = {
  sm: "h-9 px-3.5 text-sm gap-1.5",
  md: "h-11 px-5 text-[0.9375rem] gap-2",
  lg: "h-13 px-6 text-base gap-2",
};

const BASE =
  "group/btn inline-flex items-center justify-center rounded-full font-semibold " +
  "whitespace-nowrap transition-[transform,background-color,border-color,color] " +
  "duration-200 ease-out will-change-transform motion-reduce:transform-none " +
  "motion-reduce:transition-none";

type CommonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  /** Trailing icon that nudges on hover — the site's standard CTA affordance. */
  trailingIcon?: IconName;
  leadingIcon?: IconName;
  fullWidth?: boolean;
};

type ButtonAsLink = CommonProps & {
  href: string;
} & Omit<ComponentPropsWithoutRef<"a">, keyof CommonProps | "href">;

type ButtonAsButton = CommonProps & {
  href?: never;
} & Omit<ComponentPropsWithoutRef<"button">, keyof CommonProps>;

export type ButtonProps = ButtonAsLink | ButtonAsButton;

function Inner({
  children,
  leadingIcon,
  trailingIcon,
}: Pick<CommonProps, "children" | "leadingIcon" | "trailingIcon">) {
  return (
    <>
      {leadingIcon ? <Icon name={leadingIcon} size={18} /> : null}
      {children}
      {trailingIcon ? (
        <Icon
          name={trailingIcon}
          size={18}
          className="transition-transform duration-200 ease-out group-hover/btn:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover/btn:translate-x-0"
        />
      ) : null}
    </>
  );
}

export function Button(props: ButtonProps) {
  const {
    children,
    variant = "primary",
    size = "md",
    className,
    leadingIcon,
    trailingIcon,
    fullWidth,
    ...rest
  } = props;

  const classes = cn(
    BASE,
    VARIANTS[variant],
    SIZES[size],
    fullWidth && "w-full",
    className,
  );

  if ("href" in props && props.href !== undefined) {
    const { href, ...anchorProps } = rest as ButtonAsLink;
    const isExternal = /^(https?:|mailto:|tel:)/.test(href);

    if (isExternal) {
      return (
        <a
          {...anchorProps}
          href={href}
          className={classes}
          rel="noreferrer"
          target={href.startsWith("http") ? "_blank" : undefined}
        >
          <Inner leadingIcon={leadingIcon} trailingIcon={trailingIcon}>
            {children}
          </Inner>
        </a>
      );
    }

    return (
      <Link {...anchorProps} href={href} className={classes}>
        <Inner leadingIcon={leadingIcon} trailingIcon={trailingIcon}>
          {children}
        </Inner>
      </Link>
    );
  }

  const buttonProps = rest as ComponentPropsWithoutRef<"button">;
  return (
    <button {...buttonProps} type={buttonProps.type ?? "button"} className={classes}>
      <Inner leadingIcon={leadingIcon} trailingIcon={trailingIcon}>
        {children}
      </Inner>
    </button>
  );
}
