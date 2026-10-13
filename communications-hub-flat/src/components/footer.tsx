import Link from "next/link";
import { MessagesSquare } from "lucide-react";
import { TourButton } from "./tour-button";
import { CONTACTS, MONDAY_DEMO_URL, NAV_LINKS } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="mt-10 border-t bg-white/60">
      <div className="container grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5 font-semibold">
            <span className="flex size-8 items-center justify-center rounded-lg bg-brand-gradient text-white"><MessagesSquare className="size-4" aria-hidden /></span>
            Communications Hub
          </div>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
            The single entry point for communication services, programs, and support at DANA. Find the right process and the right team, quickly.
          </p>
        </div>
        <nav aria-label="Footer">
          <h2 className="text-sm font-semibold">Explore</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {NAV_LINKS.map((l) => (
              <li key={l.href}><Link href={l.href} className="hover:text-foreground">{l.label}</Link></li>
            ))}
            <li><a href={MONDAY_DEMO_URL} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">Monday Demo Playbook ↗</a></li>
          </ul>
        </nav>
        <div>
          <h2 className="text-sm font-semibold">Contact</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><span className="block text-xs">Internal Communications</span><a className="hover:text-foreground" href={`mailto:${CONTACTS.internalComms}`}>{CONTACTS.internalComms}</a></li>
            <li><span className="block text-xs">Communications Team</span><a className="hover:text-foreground" href={`mailto:${CONTACTS.commsCrew}`}>{CONTACTS.commsCrew}</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t">
        <div className="container flex flex-col gap-1 py-5 text-xs text-muted-foreground sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} DANA Indonesia. Internal use only.</p>
          <p className="flex items-center gap-4"><TourButton /><span>A service guide, not a document repository.</span></p>
        </div>
      </div>
    </footer>
  );
}
