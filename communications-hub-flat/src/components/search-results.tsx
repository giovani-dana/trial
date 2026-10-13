"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Mail, Sparkles } from "lucide-react";
import type { LinkMatch, ServiceMatch } from "@/lib/search";
import { track } from "@/lib/analytics";
import { getIcon } from "@/lib/icons";
import { EmptyState } from "./empty-state";
import { ServiceRenderer } from "./service-card";
import { Button } from "@/components/ui/button";

interface SearchResultsProps {
  id?: string;
  query: string;
  results: ServiceMatch[];
  links?: LinkMatch[];
  onNavigate?: () => void;
  onAskAssistant?: () => void;
  columns?: 1 | 2;
}

function JumpLink({ m, onNavigate }: { m: LinkMatch; onNavigate?: () => void }) {
  const Icon = getIcon(m.entry.icon);
  const e = m.entry;
  const body = (
    <>
      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand-100 text-brand-700"><Icon className="size-4" aria-hidden /></span>
      <span className="min-w-0 flex-1 text-left"><span className="block truncate text-sm font-medium">{e.title}</span><span className="block truncate text-xs text-muted-foreground">{e.description}</span></span>
      {e.kind === "external" ? <ArrowUpRight className="size-4 text-muted-foreground" aria-hidden /> : e.kind === "mailto" ? <Mail className="size-4 text-muted-foreground" aria-hidden /> : <ArrowRight className="size-4 text-muted-foreground" aria-hidden />}
    </>
  );
  const cls = "flex w-full items-center gap-3 rounded-xl border bg-white/80 p-3 transition-all hover:border-brand-300 hover:bg-white hover:shadow-card";
  const click = () => { if (e.event) track(e.event, { source: "search_jump", href: e.href }); onNavigate?.(); };
  return e.kind === "internal"
    ? <Link href={e.href} className={cls} onClick={click}>{body}</Link>
    : <a href={e.href} className={cls} onClick={click} {...(e.kind === "external" ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{body}</a>;
}

export function SearchResults({ id, query, results, links = [], onNavigate, onAskAssistant, columns = 2 }: SearchResultsProps) {
  if (query.trim().length < 2) return null;
  const shownLinks = links;
  return (
    <div id={id} className="w-full" aria-live="polite">
      <p className="mb-4 text-sm text-muted-foreground">
        {results.length
          ? `${results.length} recommended ${results.length === 1 ? "service" : "services"} for “${query.trim()}”`
          : links.length ? `Matches for “${query.trim()}”` : `No services matched “${query.trim()}”`}
      </p>
      <AnimatePresence mode="popLayout">
        {results.length > 0 && (
          <div className={columns === 2 ? "grid gap-4 md:grid-cols-2" : "grid gap-4"}>
            {results.map((r, i) => (
              <motion.div key={r.service.id} layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.3, delay: i * 0.05 }}>
                <ServiceRenderer service={r.service} highlight={i === 0} badgeText={i === 0 ? "Best match" : undefined} onNavigate={onNavigate} />
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
      {shownLinks.length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Jump straight to</p>
          <div className={columns === 2 ? "grid gap-2 md:grid-cols-2" : "grid gap-2"}>
            {shownLinks.map((m) => <JumpLink key={m.entry.id} m={m} onNavigate={onNavigate} />)}
          </div>
        </motion.div>
      )}
      {!results.length && !links.length && (
        <EmptyState title="We couldn't find a match" description="Try words like speaker, demo, announcement, or media, or describe your situation to the assistant.">
          {onAskAssistant && <Button onClick={onAskAssistant}><Sparkles aria-hidden /> Ask the assistant</Button>}
        </EmptyState>
      )}
    </div>
  );
}
