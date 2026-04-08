"use client";

import React, { useRef, useState, useEffect, useId } from "react";
import { cn } from "@heroui/react";

export interface AutocompleteOption {
  id: string | number;
  label: string;
  disabled?: boolean;
}

export interface AutocompleteOptionSection {
  title: string;
  options: AutocompleteOption[];
}

export interface ListBoxItemProps {
  label: string;
  isHighlighted?: boolean;
  isDisabled?: boolean;
  className?: string;
  onMouseDown?: (e: React.MouseEvent) => void;
  onMouseEnter?: () => void;
}

export function ListBoxItem({
  label,
  isHighlighted,
  isDisabled,
  className,
  onMouseDown,
  onMouseEnter,
}: ListBoxItemProps) {
  return (
    <li
      role="option"
      aria-selected={isHighlighted}
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
      className={cn(
        "px-4 py-2 text-sm cursor-pointer rounded-lg mx-1 transition-colors duration-150",
        isHighlighted
          ? "bg-white/5 text-[#FF6B35]"
          : "text-white hover:bg-white/5",
        isDisabled && "opacity-40 pointer-events-none",
        className
      )}
    >
      {label}
    </li>
  );
}

export interface AutocompleteProps {
  options?: AutocompleteOption[];
  sections?: AutocompleteOptionSection[];
  placeholder?: string;
  label?: string;
  description?: string;
  errorMessage?: string;
  defaultValue?: string;
  value?: string;
  isRequired?: boolean;
  isInvalid?: boolean;
  isDisabled?: boolean;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  onSelectionChange?: (key: string | number | null) => void;
  onInputChange?: (value: string) => void;
  onClear?: () => void;
  className?: string;
}

const AutocompleteBase: React.FC<AutocompleteProps> = ({
  options = [],
  sections = [],
  placeholder,
  label,
  description,
  errorMessage,
  defaultValue,
  value,
  isRequired,
  isInvalid,
  isDisabled,
  isOpen: isOpenProp,
  onOpenChange,
  onSelectionChange,
  onInputChange,
  onClear,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const listboxId = useId();

  // Track raw input string separately from selection
  const [inputValue, setInputValue] = useState(value ?? defaultValue ?? "");

  // isOpen: use controlled prop if provided, otherwise internal state
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = isOpenProp ?? internalIsOpen;

  // Keep onOpenChange in a ref so the outside-click effect reads the latest value without needing it as a dep
  const onOpenChangeRef = useRef(onOpenChange);

  const setIsOpen = (next: boolean) => {
    setInternalIsOpen(next);
    onOpenChangeRef.current?.(next);
  };

  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [popoverWidth, setPopoverWidth] = useState(0);

  // Measure container width for popover
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    setPopoverWidth(el.offsetWidth);
    const ro = new ResizeObserver(() => setPopoverWidth(el.offsetWidth));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setInternalIsOpen(false);
        onOpenChangeRef.current?.(false);
        setHighlightedIndex(-1);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(inputValue.toLowerCase())
  );

  const filteredSections = sections
    .map((section) => ({
      ...section,
      options: section.options.filter((opt) =>
        opt.label.toLowerCase().includes(inputValue.toLowerCase())
      ),
    }))
    .filter((section) => section.options.length > 0);

  const hasSections = filteredSections.length > 0;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    onInputChange?.(val);
    setHighlightedIndex(-1);
    setIsOpen(true);
  };

  const handleSelect = (option: AutocompleteOption) => {
    if (option.disabled) return;
    setInputValue(option.label);
    onInputChange?.(option.label);
    onSelectionChange?.(option.id);
    setIsOpen(false);
    setHighlightedIndex(-1);
    inputRef.current?.blur();
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setInputValue("");
    onInputChange?.("");
    onClear?.();
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen && e.key !== "Enter" && e.key !== "ArrowDown") return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setIsOpen(true);
        setHighlightedIndex((prev) =>
          prev < filteredOptions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : 0));
        break;
      case "Enter":
        e.preventDefault();
        if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
          handleSelect(filteredOptions[highlightedIndex]);
        }
        break;
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        setHighlightedIndex(-1);
        break;
      case "Tab":
        setIsOpen(false);
        break;
    }
  };

  const handleFocus = () => {
    if (inputValue) setIsOpen(true);
  };

  const handleBlur = () => {
    setIsOpen(false);
    setHighlightedIndex(-1);
  };

  const borderColor = isInvalid
    ? "border-danger"
    : isOpen
    ? "border-[#FF6B35]"
    : "border-white/10";

  const boxShadow = isInvalid
    ? "0 0 0 3px rgba(240,68,68,0.15)"
    : isOpen
    ? "0 0 0 3px rgba(255,107,53,0.15)"
    : "none";

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      {label && (
        <label className="text-sm font-medium text-[#8B8B99]">
          {label}
          {isRequired && <span className="text-danger ml-1">*</span>}
        </label>
      )}

      <div ref={containerRef} className="relative">
        {/* Input + icons */}
        <div
          className={cn(
            "bg-[#1A1C23] rounded-xl border px-4 py-3 min-h-[48px]",
            "flex items-center gap-2 transition-colors duration-150",
            "hover:border-white/20",
            borderColor,
            isDisabled && "opacity-50 pointer-events-none",
            isOpen && "border-[#FF6B35] rounded-b-none"
          )}
          style={{ boxShadow }}
          onClick={() => inputRef.current?.focus()}
        >
          <input
            ref={inputRef}
            id={listboxId}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            disabled={isDisabled}
            required={isRequired}
            className="bg-transparent outline-none text-white text-sm font-medium flex-1 placeholder:text-[#8B8B99]"
            autoComplete="off"
            role="combobox"
            aria-expanded={isOpen}
            aria-controls={listboxId}
            aria-haspopup="listbox"
          />

          <div className="flex items-center gap-1 shrink-0">
            {inputValue && (
              <button
                type="button"
                onClick={handleClear}
                className="text-[#8B8B99] hover:text-white transition-colors duration-200 p-1"
                aria-label="Clear"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            )}

            <span className={cn("text-[#8B8B99] transition-transform duration-200", isOpen && "rotate-180")}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </span>
          </div>
        </div>

        {/* Dropdown */}
        {isOpen && (
          <ul
            ref={listRef}
            id={listboxId}
            role="listbox"
            className={cn(
              "absolute z-50 left-0 top-full bg-[#1A1C23] border border-white/10 rounded-b-xl",
              "shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-y-auto max-h-60 w-full"
            )}
            style={{ width: popoverWidth }}
          >
            {filteredOptions.length === 0 && filteredSections.length === 0 ? (
              <li className="px-4 py-3 text-sm text-[#8B8B99]">No results found</li>
            ) : hasSections ? (
              filteredSections.map((section, sIdx) => (
                <li key={sIdx}>
                  <p className="px-4 pt-2 pb-1 text-xs text-[#8B8B99] font-semibold uppercase tracking-wide">
                    {section.title}
                  </p>
                  <ul>
                    {section.options.map((option, index) => (
                      <ListBoxItem
                        key={option.id}
                        label={option.label}
                        isHighlighted={highlightedIndex === index}
                        isDisabled={option.disabled}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          handleSelect(option);
                        }}
                        onMouseEnter={() => setHighlightedIndex(index)}
                      />
                    ))}
                  </ul>
                </li>
              ))
            ) : (
              filteredOptions.map((option, index) => (
                <ListBoxItem
                  key={option.id}
                  label={option.label}
                  isHighlighted={index === highlightedIndex}
                  isDisabled={option.disabled}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleSelect(option);
                  }}
                  onMouseEnter={() => setHighlightedIndex(index)}
                />
              ))
            )}
          </ul>
        )}
      </div>

      {description && !errorMessage && (
        <p className="text-xs text-[#8B8B99]">{description}</p>
      )}
      {errorMessage && <p className="text-xs text-danger">{errorMessage}</p>}
    </div>
  );
};

export default AutocompleteBase;
