"use client";

import { cn, Link } from "@heroui/react";

export interface NavbarLogoProps {
  brandName: string;
  href?: string;
  className?: string;
}

export function NavbarLogo({
  brandName,
  href = "/",
  className,
}: NavbarLogoProps) {
  return (
    <Link href={href} className={cn("gap-2", className)}>
      <span className="font-bold text-xl text-[#FF6B35]">{brandName}</span>
    </Link>
  );
}

export interface NavbarProps {
  logo?: React.ReactNode;
  sticky?: boolean;
  className?: string;
}

export function Navbar({ logo, sticky, className }: NavbarProps) {
  return (
    <nav
      className={cn(
        "h-16 px-6 border-b flex items-center transition-colors duration-200",
        "bg-white border-gray-100 text-gray-900",
        "dark:bg-[#1a1a1a] dark:border-white/10 dark:text-white",
        sticky && "sticky top-0 z-50",
        className,
      )}
    >
      <div className="w-full max-w-7xl mx-auto flex items-center justify-center">
        <div>{logo}</div>
      </div>
    </nav>
  );
}
