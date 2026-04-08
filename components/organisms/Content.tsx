"use client";

import { cn } from "@heroui/react";

type ContentProps = {
  children?: React.ReactNode;
  className?: string;
};

export function Content({ children, className }: ContentProps) {
  return (
    <div className={cn("min-h-screen flex flex-col", className)}>
      <main className="flex-1 w-full">{children}</main>
    </div>
  );
}
