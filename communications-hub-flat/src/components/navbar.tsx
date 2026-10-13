"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, MessagesSquare, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { CommandPalette } from "./command-palette";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className={cn("sticky top-0 z-40 w-full transition-all duration-300", scrolled ? "glass border-x-0 border-t-0 shadow-sm" : "border-b border-transparent bg-transparent")}>
      <nav aria-label="Primary" className="container flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5 font-semibold tracking-tight">
          <span className="flex size-8 items-center justify-center rounded-lg bg-brand-gradient text-white shadow-card"><MessagesSquare className="size-4" aria-hidden /></span>
          <span className="hidden sm:inline">Communications Hub</span>
          <span className="sm:hidden">Comms Hub</span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                aria-current={isActive(l.href) ? "page" : undefined}
                className={cn("relative rounded-lg px-3 py-2 text-sm font-medium transition-colors", isActive(l.href) ? "text-brand-800" : "text-muted-foreground hover:text-foreground")}
              >
                {isActive(l.href) && <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-lg bg-brand-100/80" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <CommandPalette />
          <button
            className="inline-flex size-9 items-center justify-center rounded-lg border bg-white/70 lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-b bg-white/95 backdrop-blur-xl lg:hidden"
          >
            <ul className="container flex flex-col gap-1 py-3">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} aria-current={isActive(l.href) ? "page" : undefined} className={cn("block rounded-xl px-4 py-3 text-[15px] font-medium", isActive(l.href) ? "bg-brand-100 text-brand-800" : "hover:bg-muted")}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
