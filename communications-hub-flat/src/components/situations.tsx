"use client";

import Link from "next/link";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { usePersona } from "@/hooks/use-persona";
import { getIcon } from "@/lib/icons";
import { PERSONAS, PERSONA_PRIORITY, SITUATIONS } from "@/lib/personas";
import { cn } from "@/lib/utils";
import { SpotlightCard } from "./spotlight";

/** Task-based entry points. Ordering adapts to the persona chosen during onboarding. */
export function Situations() {
  const [persona, setPersona] = usePersona();
  const priority = persona ? PERSONA_PRIORITY[persona] : [];
  const items = useMemo(() => {
    const rank = (id: string) => { const i = priority.indexOf(id); return i === -1 ? 99 : i; };
    return [...SITUATIONS].sort((a, b) => rank(a.id) - rank(b.id));
  }, [priority]);

  return (
    <div>
      <div role="group" aria-label="Personalize suggestions" className="mt-6 flex flex-wrap items-center gap-2">
        <span className="mr-1 text-xs font-medium text-muted-foreground">I am a</span>
        {PERSONAS.map((p) => (
          <button
            key={p.id}
            aria-pressed={persona === p.id}
            onClick={() => setPersona(persona === p.id ? null : p.id)}
            className={cn("rounded-full border px-3 py-1 text-xs font-medium transition-colors", persona === p.id ? "border-brand-600 bg-brand-600 text-white" : "bg-white text-muted-foreground hover:border-brand-300 hover:text-foreground")}
          >
            {p.label}
          </button>
        ))}
      </div>
      <motion.ul layout className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((x, i) => {
          const Icon = getIcon(x.icon);
          const suggested = persona && priority.includes(x.id);
          return (
            <motion.li layout key={x.id} transition={{ type: "spring", stiffness: 380, damping: 34 }}>
              <SpotlightCard className="h-full">
                <Link href={x.href} className="flex h-full items-center gap-3 rounded-2xl p-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand-100 text-brand-700 transition-transform duration-300 group-hover:scale-105"><Icon className="size-5" aria-hidden /></span>
                  <span className="flex-1 text-sm">
                    <span className="block font-medium">{x.label}</span>
                    <span className="text-xs text-muted-foreground">{x.hint}</span>
                  </span>
                  {suggested && i < 3 ? <Badge variant="solid">For you</Badge> : <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" aria-hidden />}
                </Link>
              </SpotlightCard>
            </motion.li>
          );
        })}
      </motion.ul>
    </div>
  );
}
