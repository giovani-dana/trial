import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  id?: string;
  className?: string;
}

export function SectionHeader({ eyebrow, title, description, align = "left", id, className }: SectionHeaderProps) {
  return (
    <Reveal className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-brand-600">{eyebrow}</p>}
      <h2 id={id} className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">{title}</h2>
      {description && <p className="mt-3 text-base leading-relaxed text-muted-foreground">{description}</p>}
    </Reveal>
  );
}
