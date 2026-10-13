"use client";

import { forwardRef } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  value: string;
  onChange: (v: string) => void;
  onSubmit?: () => void;
  autoFocus?: boolean;
  className?: string;
  size?: "lg" | "md";
  resultsId?: string;
}

export const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(function SearchBar(
  { value, onChange, onSubmit, autoFocus, className, size = "lg", resultsId },
  ref
) {
  return (
    <form
      role="search"
      aria-label="Search Communications services"
      onSubmit={(e) => { e.preventDefault(); onSubmit?.(); }}
      className={cn(
        "glass group flex items-center gap-3 rounded-2xl px-4 transition-all focus-within:border-brand-400 focus-within:ring-4 focus-within:ring-brand-200/60",
        size === "lg" ? "h-16" : "h-12",
        className
      )}
    >
      <Search className="size-5 shrink-0 text-brand-600" aria-hidden />
      <input
        ref={ref}
        type="search"
        value={value}
        autoFocus={autoFocus}
        onChange={(e) => onChange(e.target.value)}
        placeholder="What do you need help with today?"
        aria-label="What do you need help with today?"
        aria-controls={resultsId}
        autoComplete="off"
        className={cn(
          "h-full flex-1 bg-transparent outline-none placeholder:text-muted-foreground/70 [&::-webkit-search-cancel-button]:hidden",
          size === "lg" ? "text-base sm:text-lg" : "text-sm"
        )}
      />
      {value && (
        <button type="button" onClick={() => onChange("")} aria-label="Clear search" className="rounded-full p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground">
          <X className="size-4" />
        </button>
      )}
      <kbd className="hidden rounded-md border bg-white/80 px-1.5 py-0.5 text-[11px] font-medium text-muted-foreground sm:block">/</kbd>
    </form>
  );
});
