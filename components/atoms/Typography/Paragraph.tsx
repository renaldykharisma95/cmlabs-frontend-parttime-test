import { cn } from "@heroui/react";
import { ComponentProps } from "@/types";

type ParagraphProps = {
  as?: "p" | "span" | "div";
  size?: "sm" | "md" | "lg";
} & ComponentProps;

export function Paragraph({
  children,
  className,
  as: Component = "p",
  size = "md",
  ...props
}: ParagraphProps) {
  return (
    <Component
      className={cn(
        "leading-7",
        size === "sm" && "text-sm",
        size === "md" && "text-base",
        size === "lg" && "text-lg",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
