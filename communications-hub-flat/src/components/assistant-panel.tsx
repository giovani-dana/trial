"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AIAssistant } from "./ai-assistant";

/** Floating launcher + slide-over panel. Other components open it via `openAssistant(query?)`. */
export function AssistantPanel() {
  const [open, setOpen] = useState(false);
  const [seed, setSeed] = useState<{ key: number; query?: string }>({ key: 0 });

  useEffect(() => {
    const onAsk = (e: Event) => {
      setSeed((s) => ({ key: s.key + 1, query: (e as CustomEvent<{ query?: string }>).detail?.query }));
      setOpen(true);
    };
    window.addEventListener("comms-hub:ask-assistant", onAsk);
    return () => window.removeEventListener("comms-hub:ask-assistant", onAsk);
  }, []);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="fixed bottom-5 right-5 z-40 flex h-12 items-center gap-2 rounded-full bg-brand-gradient px-5 text-sm font-medium text-white shadow-lift ring-1 ring-inset ring-white/20 transition-transform hover:scale-105 active:scale-95"
          aria-label="Open assistant"
        >
          <Sparkles className="size-4" aria-hidden /> Ask assistant
        </motion.button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-brand-950/30 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed bottom-0 right-0 z-50 flex h-[85dvh] w-full flex-col overflow-hidden rounded-t-3xl border bg-background shadow-2xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom sm:bottom-5 sm:right-5 sm:h-[36rem] sm:max-h-[calc(100dvh-2.5rem)] sm:w-[26rem] sm:rounded-3xl">
          <header className="flex items-center justify-between gap-3 border-b bg-white/80 px-5 py-4">
            <div className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-xl bg-brand-gradient text-white"><Sparkles className="size-4" aria-hidden /></span>
              <div>
                <Dialog.Title className="text-[15px] font-semibold">What do you need help with?</Dialog.Title>
                <Dialog.Description className="text-xs text-muted-foreground">Communications Assistant</Dialog.Description>
              </div>
            </div>
            <Dialog.Close className="rounded-lg p-2 text-muted-foreground hover:bg-muted" aria-label="Close assistant"><X className="size-4" /></Dialog.Close>
          </header>
          <AIAssistant key={seed.key} initialQuery={seed.query} className="flex-1" onNavigate={() => setOpen(false)} />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
