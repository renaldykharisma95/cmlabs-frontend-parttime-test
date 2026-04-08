import { cn } from "@heroui/react";
import { ComponentProps } from "@/types";

type H2Props = {
  as?: "h2" | "p" | "span" | "div";
} & ComponentProps;

export function H2({ children, className, as: Component = "h2", ...props }: H2Props) {
  return (
    <Component
      className={cn(
        "scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
