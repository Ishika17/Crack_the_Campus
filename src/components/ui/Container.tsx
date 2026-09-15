import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/cn";

const WIDTHS = {
  default: "max-w-[76rem]",
  narrow: "max-w-[48rem]",
  wide: "max-w-[88rem]",
} as const;

type ContainerProps = {
  children: ReactNode;
  as?: ElementType;
  width?: keyof typeof WIDTHS;
  className?: string;
};

/** The single place the page gutter is defined. */
export function Container({
  children,
  as: Tag = "div",
  width = "default",
  className,
}: ContainerProps) {
  return (
    <Tag className={cn("mx-auto w-full px-5 sm:px-6 lg:px-8", WIDTHS[width], className)}>
      {children}
    </Tag>
  );
}
