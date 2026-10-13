"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Command, Compass, Search, Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { usePersona } from "@/hooks/use-persona";
import { getIcon } from "@/lib/icons";
import { PERSONAS } from "@/lib/personas";
import { cn } from "@/lib/utils";
import { Kbd } from "./kbd";

const KEY = "comms-hub:onboarded";
const STEPS = ["Welcome", "About you", "Shortcuts"] as const;

/** First-visit tour: value proposition → persona → shortcuts. Skippable and re-openable from the footer. */
export function Onboarding() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [persona, setPersona] = usePersona();

  useEffect(() => {
    let seen = true;
    try { seen = localStorage.getItem(KEY) === "1"; } catch { /* treat as seen to avoid nagging */ }
    const t = seen ? undefined : setTimeout(() => setOpen(true), 900);
    const onOpen = () => { setStep(0); setOpen(true); };
    window.addEventListener("comms-hub:open-tour", onOpen);
    return () => { clearTimeout(t); window.removeEventListener("comms-hub:open-tour", onOpen); };
  }, []);

  const finish = () => {
    try { localStorage.setItem(KEY, "1"); } catch { /* ignore */ }
    setOpen(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={(o) => (o ? setOpen(true) : finish())}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[90] bg-brand-950/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
        <Dialog.Content onOpenAutoFocus={(e) => { e.preventDefault(); (e.currentTarget as HTMLElement).focus(); }} className="fixed left-1/2 top-1/2 z-[90] w-[calc(100%-1.5rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl border bg-background shadow-2xl data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0">
          <div aria-hidden className="absolute inset-x-0 top-0 h-32 bg-hero-gradient" />
          <Dialog.Close className="absolute right-3 top-3 z-10 rounded-lg p-2 text-muted-foreground hover:bg-muted" aria-label="Skip tour"><X className="size-4" /></Dialog.Close>

          <div className="relative p-6 sm:p-8">
            <div className="mb-6 flex items-center gap-1.5" aria-label={`Step ${step + 1} of ${STEPS.length}: ${STEPS[step]}`} role="img">
              {STEPS.map((s, i) => <span key={s} className={cn("h-1 rounded-full transition-all duration-300", i === step ? "w-8 bg-brand-600" : i < step ? "w-4 bg-brand-300" : "w-4 bg-brand-100")} />)}
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.22 }} className="min-h-[18rem]">
                {step === 0 && (
                  <>
                    <Dialog.Title className="text-2xl font-semibold tracking-tight">Welcome to Communications Hub</Dialog.Title>
                    <Dialog.Description className="mt-2 text-sm leading-relaxed text-muted-foreground">One place to find the right Communications service, understand the process, and reach the right team. It's a guide, not a document library.</Dialog.Description>
                    <ul className="mt-6 space-y-3">
                      {[
                        { i: Search, t: "Describe what you need", d: "Search in plain language. We route you to the right service." },
                        { i: Compass, t: "Know the process", d: "Eligibility, steps, and what to prepare, at a glance." },
                        { i: Sparkles, t: "Get unstuck fast", d: "Ask the assistant when you're not sure where to start." },
                      ].map((x) => (
                        <li key={x.t} className="flex gap-3">
                          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-100 text-brand-700"><x.i className="size-4" aria-hidden /></span>
                          <span className="text-sm"><span className="block font-medium">{x.t}</span><span className="text-muted-foreground">{x.d}</span></span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
                {step === 1 && (
                  <>
                    <Dialog.Title className="text-2xl font-semibold tracking-tight">Which fits you best?</Dialog.Title>
                    <Dialog.Description className="mt-2 text-sm text-muted-foreground">We'll surface the most relevant situations first. You can change this any time.</Dialog.Description>
                    <div role="radiogroup" aria-label="Your role" className="mt-5 grid gap-2">
                      {PERSONAS.map((p) => {
                        const Icon = getIcon(p.icon);
                        const on = persona === p.id;
                        return (
                          <button key={p.id} role="radio" aria-checked={on} onClick={() => setPersona(p.id)} className={cn("flex items-center gap-3 rounded-xl border p-3 text-left transition-all", on ? "border-brand-500 bg-brand-50 ring-2 ring-brand-200" : "hover:border-brand-300 hover:bg-brand-50/50")}>
                            <span className={cn("flex size-9 items-center justify-center rounded-lg", on ? "bg-brand-gradient text-white" : "bg-brand-100 text-brand-700")}><Icon className="size-4" aria-hidden /></span>
                            <span className="text-sm"><span className="block font-medium">{p.label}</span><span className="text-xs text-muted-foreground">{p.description}</span></span>
                          </button>
                        );
                      })}
                    </div>
                  </>
                )}
                {step === 2 && (
                  <>
                    <Dialog.Title className="text-2xl font-semibold tracking-tight">Move faster with shortcuts</Dialog.Title>
                    <Dialog.Description className="mt-2 text-sm text-muted-foreground">Everything is reachable from the keyboard.</Dialog.Description>
                    <ul className="mt-6 divide-y rounded-2xl border bg-card text-sm">
                      {[
                        { k: ["⌘", "K"], d: "Open search from anywhere" },
                        { k: ["/"], d: "Focus the search box on the home page" },
                        { k: ["↑", "↓", "↵"], d: "Navigate and open results" },
                        { k: ["Y", "N"], d: "Answer the BicaraDANA eligibility questions" },
                      ].map((r) => (
                        <li key={r.d} className="flex items-center justify-between gap-4 px-4 py-3"><span className="text-muted-foreground">{r.d}</span><span className="flex gap-1">{r.k.map((k) => <Kbd key={k}>{k}</Kbd>)}</span></li>
                      ))}
                    </ul>
                    <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground"><Command className="size-3" aria-hidden /> On Windows, use Ctrl instead of ⌘.</p>
                  </>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="mt-6 flex items-center justify-between">
              <button onClick={finish} className="text-sm text-muted-foreground hover:text-foreground">Skip</button>
              <div className="flex gap-2">
                {step > 0 && <Button variant="ghost" onClick={() => setStep(step - 1)}>Back</Button>}
                {step < STEPS.length - 1
                  ? <Button onClick={() => setStep(step + 1)}>{step === 1 && !persona ? "Skip for now" : "Continue"} <ArrowRight aria-hidden /></Button>
                  : <Button onClick={finish}>Get started <ArrowRight aria-hidden /></Button>}
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
