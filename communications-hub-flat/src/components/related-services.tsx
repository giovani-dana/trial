import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SERVICES, type Service } from "@/lib/services";
import { getIcon } from "@/lib/icons";
import { Section } from "./section";

const HINT: Record<Service["id"], string> = {
  "monday-demo": "Want to showcase a project?",
  bicaradana: "Invited to speak externally?",
  "internal-announcement": "Need to inform employees?",
  "communication-support": "Need media or PR help?",
};

export function RelatedServices({ current }: { current: Service["id"] }) {
  return (
    <Section className="pt-0 sm:pt-0">
      <h2 className="text-sm font-semibold">Not the right place?</h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-3">
        {SERVICES.filter((s) => s.id !== current).map((s) => {
          const Icon = getIcon(s.icon);
          return (
            <li key={s.id}>
              <Link href={s.href} className="group flex items-center gap-3 rounded-xl border bg-card p-4 transition-all hover:border-brand-300 hover:shadow-card">
                <span className="flex size-9 items-center justify-center rounded-lg bg-brand-100 text-brand-700"><Icon className="size-4" aria-hidden /></span>
                <span className="flex-1 text-sm"><span className="block font-medium">{s.title}</span><span className="text-xs text-muted-foreground">{HINT[s.id]}</span></span>
                <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" aria-hidden />
              </Link>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
