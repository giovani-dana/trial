"use client";

import { useEffect, useRef, useState } from "react";
import { History } from "lucide-react";
import { useServiceSearch } from "@/hooks/use-service-search";
import { openAssistant } from "@/lib/events";
import { addRecent, getRecents } from "@/lib/recent";
import { EXAMPLE_QUERIES } from "@/lib/services";
import { Kbd } from "./kbd";
import { SearchBar } from "./search-bar";
import { SearchResults } from "./search-results";

/** Hero search with recents, example chips and inline results. Press "/" to focus. */
export function HomeSearch() {
  const { query, setQuery, results, links } = useServiceSearch();
  const [recents, setRecents] = useState<string[]>([]);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => setRecents(getRecents()), []);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = document.activeElement as HTMLElement | null;
      const typing = el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable);
      if (e.key === "/" && !typing) { e.preventDefault(); ref.current?.focus(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const remember = () => { addRecent(query); setRecents(getRecents()); };

  return (
    <div className="mx-auto w-full max-w-3xl">
      <SearchBar ref={ref} value={query} onChange={setQuery} onSubmit={remember} resultsId="home-results" />
      <div className="mt-4 flex flex-wrap justify-center gap-2" aria-label="Example searches">
        {recents.slice(0, 2).map((q) => (
          <button key={`r-${q}`} onClick={() => { setQuery(q); ref.current?.focus(); }} className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-brand-50/80 px-3 py-1.5 text-[13px] text-brand-800 transition-colors hover:bg-brand-100">
            <History className="size-3" aria-hidden /> {q}
          </button>
        ))}
        {EXAMPLE_QUERIES.map((q) => (
          <button key={q} onClick={() => { setQuery(q); ref.current?.focus(); }} className="rounded-full border bg-white/80 px-3 py-1.5 text-[13px] text-muted-foreground backdrop-blur transition-all hover:-translate-y-px hover:border-brand-300 hover:bg-brand-50 hover:text-brand-800">
            {q}
          </button>
        ))}
      </div>
      <p className="mt-4 hidden items-center justify-center gap-1.5 text-xs text-muted-foreground sm:flex">Press <Kbd>/</Kbd> to search here, or <Kbd>⌘K</Kbd> from anywhere</p>
      {query.trim().length >= 2 && (
        <div className="mt-10 text-left">
          <SearchResults id="home-results" query={query} results={results} links={links} onNavigate={remember} onAskAssistant={() => openAssistant(query)} />
        </div>
      )}
    </div>
  );
}
