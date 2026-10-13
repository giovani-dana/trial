"use client";

import { useState } from "react";
import { ArrowUpRight, Globe, Monitor, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/analytics";
import { MONDAY_DEMO_URL } from "@/lib/constants";

/**
 * Embedded preview of the official playbook.
 * The iframe is loaded on demand (the host may restrict framing); a preview card is always available as fallback.
 */
export function MondayDemoPreview() {
  const [live, setLive] = useState(false);
  const host = new URL(MONDAY_DEMO_URL).host;

  return (
    <div className="overflow-hidden rounded-3xl border bg-card shadow-card">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b bg-muted/50 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="flex gap-1.5" aria-hidden><i className="size-2.5 rounded-full bg-rose-300" /><i className="size-2.5 rounded-full bg-amber-300" /><i className="size-2.5 rounded-full bg-emerald-300" /></span>
          <span className="ml-2 flex items-center gap-1.5 rounded-lg bg-white px-3 py-1 text-xs text-muted-foreground"><Globe className="size-3" aria-hidden />{host}</span>
        </div>
        <Badge><ShieldCheck aria-hidden /> Official Source of Truth</Badge>
      </div>

      {live ? (
        <div className="aspect-[4/3] w-full bg-muted sm:aspect-[16/10]">
          <iframe src={MONDAY_DEMO_URL} title="Official Monday Demo Playbook preview" loading="lazy" className="size-full border-0" referrerPolicy="no-referrer" sandbox="allow-scripts allow-same-origin allow-popups allow-forms" />
        </div>
      ) : (
        <div className="relative flex aspect-[4/3] w-full flex-col items-center justify-center gap-4 bg-hero-gradient p-6 text-center sm:aspect-[16/10]">
          <div aria-hidden className="grid-bg absolute inset-0" />
          <span className="relative flex size-14 items-center justify-center rounded-2xl bg-brand-gradient text-white shadow-lift"><Monitor className="size-7" aria-hidden /></span>
          <div className="relative max-w-md">
            <h3 className="text-lg font-semibold">Monday Demo Playbook</h3>
            <p className="mt-1 text-sm text-muted-foreground">The official guide to submitting and presenting at Monday Demo. Preview it here or open it in a new tab.</p>
          </div>
          <div className="relative flex flex-wrap justify-center gap-2">
            <Button variant="outline" onClick={() => setLive(true)}>Load live preview</Button>
          </div>
        </div>
      )}

      <div className="flex flex-col items-start justify-between gap-3 border-t p-4 sm:flex-row sm:items-center">
        <p className="text-xs text-muted-foreground">
          {live ? "Preview not loading? Some sites restrict embedding. " : ""}Always follow the instructions on the official playbook.
        </p>
        <div className="flex gap-2">
          {live && <Button variant="ghost" size="sm" onClick={() => setLive(false)}>Hide preview</Button>}
          <Button asChild size="sm">
            <a href={MONDAY_DEMO_URL} target="_blank" rel="noopener noreferrer" onClick={() => track("open_monday_demo_playbook", { source: "preview" })}>
              Open in new tab <ArrowUpRight aria-hidden />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
