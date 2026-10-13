import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Section({ children, className, id, labelledBy }: { children: ReactNode; className?: string; id?: string; labelledBy?: string }) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn("py-14 sm:py-20", className)}>
      <div className="container">{children}</div>
    </section>
  );
}
