import { cn } from "@heroui/react";
import { ComponentProps } from "@/types";

type H1Props = {
  as?: "h1" | "p" | "span" | "div";
} & ComponentProps;

export function H1({ children, className, as: Component = "h1", ...props }: H1Props) {
  return (
    <Component
      className={cn(
        "scroll-m-20 text-4xl font-extrabold tracking-tight first:mt-0",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
