import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { getIcon, type IconName } from "@/lib/icons";
import { Reveal } from "./reveal";

interface PageHeroProps {
  title: string;
  description: string;
  icon: IconName;
  badge?: ReactNode;
  children?: ReactNode;
}

export function PageHero({ title, description, icon, badge, children }: PageHeroProps) {
  const Icon = getIcon(icon);
  return (
    <div className="relative overflow-hidden border-b bg-hero-gradient">
      <div aria-hidden className="grid-bg absolute inset-0" />
      <div className="container relative py-12 sm:py-16">
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <ChevronRight className="size-3.5" aria-hidden />
          <span aria-current="page" className="text-foreground">{title}</span>
        </nav>
        <Reveal>
          <div className="flex items-start gap-5">
            <span className="hidden size-16 shrink-0 items-center justify-center rounded-2xl bg-brand-gradient text-white shadow-lift sm:flex"><Icon className="size-8" aria-hidden /></span>
            <div className="max-w-3xl">
              {badge && <div className="mb-3">{badge}</div>}
              <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">{title}</h1>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{description}</p>
              {children && <div className="mt-7 flex flex-wrap gap-3">{children}</div>}
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
