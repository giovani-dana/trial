"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/analytics";
import { CONTACTS } from "@/lib/constants";
import { buildMailto, templateToBody } from "@/lib/mailto";
import { getIcon } from "@/lib/icons";
import { SUPPORT_SERVICES, SUPPORT_TEMPLATE, type SupportCategory } from "@/lib/content";
import { cn } from "@/lib/utils";
import { IconTile } from "./service-card";
import { EmptyState } from "./empty-state";
import { SpotlightCard } from "./spotlight";

const FILTERS: ("All" | SupportCategory)[] = ["All", "Media", "Reputation", "Strategy"];

export function SupportCatalog() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [text, setText] = useState("");
  const items = useMemo(() => {
    const t = text.trim().toLowerCase();
    return SUPPORT_SERVICES.filter((s) => (filter === "All" || s.category === filter) && (!t || [s.title, s.description, ...s.useCases, ...s.benefits].join(" ").toLowerCase().includes(t)));
  }, [filter, text]);

  return (
    <div>
      <div className="mb-4 flex h-11 max-w-md items-center gap-2 rounded-xl border bg-white px-3 focus-within:border-brand-400 focus-within:ring-4 focus-within:ring-brand-200/60">
        <Search className="size-4 text-muted-foreground" aria-hidden />
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Filter services, e.g. interview, award" aria-label="Filter support services" className="h-full flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/70" />
        {text && <button onClick={() => setText("")} aria-label="Clear filter" className="rounded p-1 text-muted-foreground hover:bg-muted"><X className="size-3.5" /></button>}
      </div>
      <div role="group" aria-label="Filter services by category" className="mb-8 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className={cn("rounded-full border px-4 py-1.5 text-sm font-medium transition-colors", filter === f ? "border-brand-600 bg-brand-600 text-white" : "bg-white text-muted-foreground hover:border-brand-300 hover:text-foreground")}
          >
            {f}
          </button>
        ))}
      </div>
      <motion.ul layout className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {items.map((s) => {
            const Icon = getIcon(s.icon);
            return (
              <motion.li
                key={s.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
              >
                <SpotlightCard as="article" className="flex h-full flex-col p-6">
                  <div className="flex items-start justify-between">
                    <IconTile name={s.icon} />
                    <Badge variant="outline">{s.category}</Badge>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold tracking-tight">{s.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{s.description}</p>

                  <h4 className="mt-5 text-xs font-semibold uppercase tracking-wider text-brand-700">Typical use cases</h4>
                  <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                    {s.useCases.map((u) => <li key={u} className="flex gap-2"><span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-brand-400" />{u}</li>)}
                  </ul>
                  <h4 className="mt-5 text-xs font-semibold uppercase tracking-wider text-brand-700">Business benefits</h4>
                  <ul className="mt-2 flex-1 space-y-1 text-sm text-muted-foreground">
                    {s.benefits.map((b) => <li key={b} className="flex gap-2"><span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-emerald-400" />{b}</li>)}
                  </ul>

                  <Button asChild variant="outline" size="sm" className="mt-6 w-full">
                    <a
                      href={buildMailto({
                        to: CONTACTS.commsCrew,
                        subject: "Communication Support Request",
                        body: templateToBody(SUPPORT_TEMPLATE, { "Request Type": s.title }),
                      })}
                      onClick={() => track("contact_comms_crew", { source: "catalog", request_type: s.id })}
                    >
                      <Icon aria-hidden /> Request {s.title}
                    </a>
                  </Button>
                </SpotlightCard>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </motion.ul>
      {items.length === 0 && (
        <EmptyState title="No matching services" description="Try a different keyword, or send a general request and the team will route it for you.">
          <Button variant="outline" onClick={() => { setText(""); setFilter("All"); }}>Reset filters</Button>
        </EmptyState>
      )}
      <p className="sr-only" aria-live="polite">{items.length} services shown</p>
    </div>
  );
}
