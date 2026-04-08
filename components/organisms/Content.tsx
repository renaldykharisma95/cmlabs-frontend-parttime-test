"use client";

import { cn } from "@heroui/react";
import type { ComponentProps } from "@/types";
import { Navbar, NavbarLogo } from "./Navbar";

type ContentProps = ComponentProps & {
  showNavbar?: boolean;
  showFooter?: boolean;
  children?: React.ReactNode;
};

export function Content({
  showNavbar,
  children,
  className,
  ...props
}: ContentProps) {
  return (
    <div className={cn("min-h-screen flex flex-col", className)} {...props}>
      {showNavbar && (
        <Navbar logo={<NavbarLogo brandName="Mealapp" />} sticky />
      )}
      <main className="flex-1 w-full">{children}</main>
    </div>
  );
}
