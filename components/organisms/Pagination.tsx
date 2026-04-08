"use client";

import { Button, cn } from "@heroui/react";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({ currentPage, totalPages, onPageChange, className }: PaginationProps) {
  return (
    <div className={cn("flex justify-center pb-16", className)}>
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          onPress={() => onPageChange(Math.max(1, currentPage - 1))}
          isDisabled={currentPage === 1}
          className={cn(
            "px-4 py-2 rounded-xl bg-[#1A1C23] text-white font-medium text-sm",
            "transition-all duration-200",
            "data-[disabled]:opacity-30 data-[disabled]:bg-[#1A1C23] data-[disabled]:border-white/10",
            "hover:bg-[#FF6B35] hover:border-[#FF6B35]"
          )}
        >
          ← Prev
        </Button>

        <span className="px-4 py-2 rounded-xl bg-[#1A1C23] border border-white/10 text-[#8B8B99] text-sm font-medium">
          {currentPage} <span className="text-white/30">/</span> {totalPages}
        </span>

        <Button
          size="sm"
          onPress={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          isDisabled={currentPage === totalPages}
          className={cn(
            "px-4 py-2 rounded-xl bg-[#1A1C23] text-white font-medium text-sm",
            "transition-all duration-200",
            "data-[disabled]:opacity-30 data-[disabled]:bg-[#1A1C23] data-[disabled]:border-white/10",
            "hover:bg-[#FF6B35] hover:border-[#FF6B35]"
          )}
        >
          Next →
        </Button>
      </div>
    </div>
  );
}
