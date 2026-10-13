"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { ArrowRight, CornerDownLeft, History, Search, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Highlight } from "./highlight";
import { Kbd } from "./kbd";
import { track } from "@/lib/analytics";
import { openAssistant, openTour } from "@/lib/events";
import { getIcon, type IconName } from "@/lib/icons";
import { addRecent, clearRecents, getRecents } from "@/lib/recent";
import { queryTerms, searchLinks, searchServices } from "@/lib/search";
import { EXAMPLE_QUERIES, SERVICES } from "@/lib/services";
import { cn } from "@/lib/utils";

type Group = "Recent" | "Suggested" | "Services" | "Pages & actions" | "Assistant";
interface Item { id: string; group: Group; label: string; hint?: string; icon: IconName; matched?: string[]; run: () => void }

const GROUP_ORDER: Group[] = ["Recent", "Suggested", "Services", "Pages & actions", "Assistant"];

/** Global command palette: ⌘K / Ctrl+K. Keyboard-first search across services, sections, and actions. */
export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [recents, setRecents] = useState<string[]>([]);
  const listRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setOpen((o) => !o); }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("comms-hub:open-search", onOpen);
    return () => { window.removeEventListener("keydown", onKey); window.removeEventListener("comms-hub:open-search", onOpen); };
  }, []);

  useEffect(() => {
    if (open) { setRecents(getRecents()); } else { setQuery(""); setActive(0); }
  }, [open]);

  const go = useCallback((href: string, kind: "internal" | "external" | "mailto", event?: Parameters<typeof track>[0]) => {
    if (query.trim().length >= 3) addRecent(query);
    if (event) track(event, { source: "command_palette", href });
    close();
    if (kind === "internal") router.push(href);
    else if (kind === "external") window.open(href, "_blank", "noopener,noreferrer");
    else window.location.href = href;
  }, [close, query, router]);

  const items = useMemo<Item[]>(() => {
    const q = query.trim();
    const out: Item[] = [];
    if (q.length < 2) {
      recents.forEach((r) => out.push({ id: `r-${r}`, group: "Recent", label: r, icon: "Clock", run: () => setQuery(r) }));
      EXAMPLE_QUERIES.slice(0, 4).forEach((e) => out.push({ id: `e-${e}`, group: "Suggested", label: e, icon: "Search", run: () => setQuery(e) }));
      out.push({ id: "tour", group: "Suggested", label: "Take the product tour", hint: "Quick intro and personalization", icon: "Sparkles", run: () => { close(); openTour(); } });
      SERVICES.forEach((s) => out.push({ id: `s-${s.id}`, group: "Services", label: s.title, hint: s.description, icon: s.icon, run: () => go(s.href, "internal") }));
      return out;
    }
    searchServices(q).forEach((m) => out.push({ id: `s-${m.service.id}`, group: "Services", label: m.service.title, hint: m.service.description, icon: m.service.icon, matched: m.matched, run: () => go(m.service.href, "internal") }));
    searchLinks(q).forEach((m) => out.push({ id: m.entry.id, group: "Pages & actions", label: m.entry.title, hint: m.entry.description, icon: m.entry.icon, matched: m.matched, run: () => go(m.entry.href, m.entry.kind, m.entry.event) }));
    out.push({ id: "ask", group: "Assistant", label: `Ask the assistant: “${q.length > 48 ? q.slice(0, 48) + "…" : q}”`, hint: "Get a recommendation in plain language", icon: "Sparkles", run: () => { addRecent(q); close(); openAssistant(q); } });
    return out;
  }, [query, recents, go, close]);

  useEffect(() => setActive(0), [query]);
  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => (a + 1) % items.length); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => (a - 1 + items.length) % items.length); }
    else if (e.key === "Home") { e.preventDefault(); setActive(0); }
    else if (e.key === "End") { e.preventDefault(); setActive(items.length - 1); }
    else if (e.key === "Enter") { e.preventDefault(); items[active]?.run(); }
  };

  const terms = queryTerms(query);
  const noMatch = query.trim().length >= 2 && items.length === 1;
  let idx = -1;

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button variant="outline" size="sm" aria-label="Search services" className="gap-2 pr-2">
          <Search aria-hidden />
          <span className="hidden sm:inline">Search</span>
          <Kbd className="hidden lg:inline-flex">⌘K</Kbd>
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-brand-950/30 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
        <Dialog.Content onKeyDown={onKeyDown} className="fixed left-1/2 top-[10vh] z-50 flex max-h-[76vh] w-[calc(100%-1.5rem)] max-w-2xl -translate-x-1/2 flex-col overflow-hidden rounded-2xl border bg-background shadow-2xl data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-top-2">
          <Dialog.Title className="sr-only">Search Communications Hub</Dialog.Title>
          <Dialog.Description className="sr-only">Type to search services, pages, and actions. Use arrow keys to move and Enter to select.</Dialog.Description>
          <div className="flex items-center gap-3 border-b px-4">
            <Search className="size-5 shrink-0 text-brand-600" aria-hidden />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="What do you need help with today?"
              role="combobox"
              aria-expanded="true"
              aria-controls="palette-list"
              aria-activedescendant={items[active] ? `palette-${items[active].id}` : undefined}
              aria-label="What do you need help with today?"
              autoComplete="off"
              className="h-14 flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground/70"
            />
            <Kbd>esc</Kbd>
          </div>

          <div ref={listRef} id="palette-list" role="listbox" aria-label="Results" className="min-h-0 flex-1 overflow-y-auto p-2">
            {noMatch && (
              <p className="px-3 pb-1 pt-3 text-sm text-muted-foreground">No direct match for “{query.trim()}”. The assistant can help interpret it:</p>
            )}
            {GROUP_ORDER.map((g) => {
              const group = items.filter((i) => i.group === g);
              if (!group.length) return null;
              return (
                <div key={g} role="group" aria-label={g} className="mb-1">
                  <div className="flex items-center justify-between px-3 pb-1 pt-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {g}
                    {g === "Recent" && <button className="normal-case tracking-normal hover:text-foreground" onClick={() => { clearRecents(); setRecents([]); }}>Clear</button>}
                  </div>
                  {group.map((it) => {
                    idx++;
                    const i = idx;
                    const Icon = getIcon(it.icon);
                    const isActive = i === active;
                    return (
                      <div
                        key={it.id}
                        id={`palette-${it.id}`}
                        data-index={i}
                        role="option"
                        aria-selected={isActive}
                        onMouseMove={() => setActive(i)}
                        onClick={it.run}
                        className={cn("flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 transition-colors", isActive ? "bg-brand-50" : "")}
                      >
                        <span className={cn("flex size-9 shrink-0 items-center justify-center rounded-lg", it.group === "Assistant" ? "bg-brand-gradient text-white" : "bg-brand-100 text-brand-700")}>
                          {it.group === "Assistant" ? <Sparkles className="size-4" aria-hidden /> : it.group === "Recent" ? <History className="size-4" aria-hidden /> : <Icon className="size-4" aria-hidden />}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-medium"><Highlight text={it.label} terms={it.group === "Assistant" ? [] : terms} /></span>
                          {it.hint && <span className="block truncate text-xs text-muted-foreground">{it.hint}</span>}
                        </span>
                        {isActive && <span className="hidden items-center gap-1 text-xs text-muted-foreground sm:flex"><CornerDownLeft className="size-3" aria-hidden /> {it.group === "Services" || it.group === "Pages & actions" ? "Open" : "Select"}</span>}
                        {!isActive && it.group === "Services" && <ArrowRight className="size-4 text-muted-foreground/50" aria-hidden />}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between border-t bg-muted/40 px-4 py-2 text-[11px] text-muted-foreground">
            <span className="flex items-center gap-3"><span className="flex items-center gap-1"><Kbd>↑</Kbd><Kbd>↓</Kbd> navigate</span><span className="flex items-center gap-1"><Kbd>↵</Kbd> select</span></span>
            <span>{items.length} {items.length === 1 ? "result" : "results"}</span>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
