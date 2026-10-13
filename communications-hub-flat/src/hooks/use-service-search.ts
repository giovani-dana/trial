"use client";

import { useEffect, useMemo, useState } from "react";
import { searchLinks, searchServices } from "@/lib/search";
import { track } from "@/lib/analytics";

/** Client-side intent search with debounced analytics. */
export function useServiceSearch(initial = "") {
  const [query, setQuery] = useState(initial);
  const results = useMemo(() => searchServices(query), [query]);
  const links = useMemo(() => searchLinks(query), [query]);

  useEffect(() => {
    const q = query.trim();
    if (q.length < 3) return;
    const t = setTimeout(
      () => track("search_service", { query: q.slice(0, 80), result_count: results.length, top_service: results[0]?.service.id }),
      700
    );
    return () => clearTimeout(t);
  }, [query, results]);

  return { query, setQuery, results, links };
}
