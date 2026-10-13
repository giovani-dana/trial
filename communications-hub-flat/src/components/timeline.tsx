"use client";

import { motion, useInView, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { getIcon } from "@/lib/icons";
import type { Step } from "@/lib/content";
import { cn } from "@/lib/utils";

function TimelineItem({ step, index }: { step: Step; index: number }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLLIElement>(null);
  const active = useInView(ref, { margin: "-42% 0px -42% 0px" });
  const seen = useInView(ref, { once: true, margin: "-10% 0px" });
  const Icon = getIcon(step.icon ?? "Sparkles");
  const right = index % 2 === 1;
  return (
    <motion.li
      ref={ref}
      initial={reduce ? false : { opacity: 0, x: right ? 28 : -28 }}
      animate={seen ? { opacity: 1, x: 0 } : undefined}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="relative mb-8 flex gap-5 last:mb-0 md:mb-12 md:grid md:grid-cols-2 md:gap-16"
    >
      <span className={cn("relative z-10 flex size-11 shrink-0 items-center justify-center rounded-full border-4 border-background text-white shadow-lift transition-all duration-500 md:absolute md:left-1/2 md:-translate-x-1/2", active ? "scale-110 bg-brand-gradient animate-pulse-ring" : seen ? "bg-brand-500" : "bg-brand-200")}>
        <Icon className="size-4" aria-hidden />
      </span>
      <div className={right ? "md:col-start-2" : "md:col-start-1 md:text-right"}>
        <div className={cn("rounded-2xl border bg-card p-5 shadow-card transition-all duration-500", active ? "border-brand-300 shadow-lift" : "opacity-90")}>
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">Step {index + 1}</p>
          <h3 className="mt-1 text-base font-semibold">{step.title}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
        </div>
      </div>
    </motion.li>
  );
}

/** Scroll-linked vertical timeline: the line fills as you read, the current step lights up. */
export function Timeline({ steps, label = "Process steps" }: { steps: Step[]; label?: string }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 65%", "end 55%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 110, damping: 26, mass: 0.4 });
  return (
    <ol ref={ref} aria-label={label} className="relative mx-auto max-w-3xl">
      <span aria-hidden className="absolute bottom-6 left-[1.4rem] top-6 w-0.5 bg-brand-100 md:left-1/2 md:-translate-x-1/2" />
      <motion.span aria-hidden style={{ scaleY }} className="absolute bottom-6 left-[1.4rem] top-6 w-0.5 origin-top bg-gradient-to-b from-brand-500 to-brand-300 md:left-1/2 md:-translate-x-1/2" />
      {steps.map((s, i) => <TimelineItem key={s.title} step={s} index={i} />)}
    </ol>
  );
}
