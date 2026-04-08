import { cn } from "@heroui/react";
import NextLink from "next/link";
import { ComponentProps } from "@/types";

type TextLinkProps = {
  href: string;
  isExternal?: boolean;
  color?: "primary" | "secondary" | "success" | "warning" | "danger";
  size?: "sm" | "md" | "lg";
  underline?: "none" | "hover" | "always" | "active";
} & Omit<ComponentProps, "onClick">;

const colorMap = {
  primary: "text-primary",
  secondary: "text-secondary",
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
};

export function TextLink({
  children,
  className,
  href,
  isExternal = false,
  color = "primary",
  size = "md",
  underline = "hover",
  ...props
}: TextLinkProps) {
  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  const underlineClasses = {
    none: "no-underline",
    hover: "hover:underline",
    always: "underline",
    active: "active:underline",
  };

  const linkClasses = cn(
    "transition-colors",
    colorMap[color],
    sizeClasses[size],
    underlineClasses[underline],
    className
  );

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClasses}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <NextLink href={href} className={linkClasses} {...props}>
      {children}
    </NextLink>
  );
}
