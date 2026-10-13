import type { ReactNode } from "react";
import { Reveal } from "./reveal";

export function CTABanner({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return (
    <Reveal>
      <div className="relative overflow-hidden rounded-3xl bg-brand-gradient px-6 py-12 text-white shadow-lift sm:px-12">
        <div aria-hidden className="absolute -right-20 -top-24 size-72 rounded-full bg-white/10 blur-2xl" />
        <div aria-hidden className="absolute -bottom-32 left-10 size-72 rounded-full bg-brand-300/20 blur-3xl" />
        <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="max-w-xl">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
            <p className="mt-2 text-brand-100">{description}</p>
          </div>
          <div className="flex flex-wrap gap-3">{children}</div>
        </div>
      </div>
    </Reveal>
  );
}
