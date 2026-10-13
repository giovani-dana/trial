"use client";

import { useRef, type ElementType, type HTMLAttributes, type MouseEvent } from "react";
import { cn } from "@/lib/utils";

/** Writes pointer position to CSS vars on the target element. */
export function useSpotlight<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const onMouseMove = (e: MouseEvent<T>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return { ref, onMouseMove };
}

/** Fill + hairline glow layers. Place inside a `group relative overflow-hidden rounded-*` parent. */
export function SpotlightLayers({ radius = "rounded-2xl" }: { radius?: string }) {
  return (
    <>
      <div aria-hidden className={cn("spot-fill pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100", radius)} />
      <div aria-hidden className={cn("spot-border pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100", radius)} />
    </>
  );
}

type Props = HTMLAttributes<HTMLElement> & { as?: ElementType };

/** Generic card with cursor spotlight (Linear/Stripe style). */
export function SpotlightCard({ as: Comp = "div", className, children, ...rest }: Props) {
  const { ref, onMouseMove } = useSpotlight<HTMLElement>();
  return (
    <Comp ref={ref} onMouseMove={onMouseMove} className={cn("group relative overflow-hidden rounded-2xl border bg-card shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift", className)} {...rest}>
      <SpotlightLayers />
      <div className="relative flex h-full flex-col">{children}</div>
    </Comp>
  );
}
