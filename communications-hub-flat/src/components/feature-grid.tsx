import { getIcon } from "@/lib/icons";
import type { Feature } from "@/lib/content";
import { Reveal } from "./reveal";
import { cn } from "@/lib/utils";
import { SpotlightCard } from "./spotlight";

export function FeatureGrid({ items, columns = 3 }: { items: Feature[]; columns?: 2 | 3 | 4 }) {
  const cols = { 2: "md:grid-cols-2", 3: "sm:grid-cols-2 lg:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" }[columns];
  return (
    <ul className={cn("grid gap-4", cols)}>
      {items.map((f, i) => {
        const Icon = getIcon(f.icon);
        return (
          <Reveal as="li" key={f.title} delay={Math.min(i, 5) * 0.05}>
            <SpotlightCard className="h-full p-5">
              <span className="flex size-10 items-center justify-center rounded-lg bg-brand-100 text-brand-700 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3"><Icon className="size-5" aria-hidden /></span>
              <h3 className="mt-4 font-semibold">{f.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{f.description}</p>
            </SpotlightCard>
          </Reveal>
        );
      })}
    </ul>
  );
}

export function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((t) => (
        <li key={t} className="flex gap-3 text-[15px] leading-relaxed text-muted-foreground">
          <svg aria-hidden viewBox="0 0 20 20" className="mt-1 size-4 shrink-0 text-brand-600" fill="currentColor"><path fillRule="evenodd" d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 9.7a1 1 0 1 1 1.4-1.4l3.8 3.8 6.8-6.8a1 1 0 0 1 1.4 0Z" clipRule="evenodd" /></svg>
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}
