"use client";

import { cn } from "@heroui/react";
import Image from "next/image";
export interface CategoryCardProps {
  name: string;
  image: string;
  className?: string;
  onClick?: () => void;
}

export function CategoryCard({ name, image, className, onClick }: CategoryCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group relative h-44 w-full rounded-2xl overflow-hidden cursor-pointer",
        "transition-all duration-300",
        "hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(255,107,53,0.15)]",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35]",
        className
      )}
    >
      <Image
        src={image}
        alt={name}
        fill
        sizes="(max-width: 768px) 100vw, 176px"
        className="object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition-colors duration-300" />
      <div className="absolute inset-0 rounded-2xl border border-white/10 pointer-events-none" />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-white font-semibold text-lg tracking-wide drop-shadow-lg select-none">
          {name}
        </span>
      </div>
    </button>
  );
}
