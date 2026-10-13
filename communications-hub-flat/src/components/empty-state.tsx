import type { ReactNode } from "react";

export function EmptyState({ title, description, children }: { title: string; description: string; children?: ReactNode }) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed bg-white/60 px-6 py-12 text-center">
      <svg aria-hidden viewBox="0 0 120 96" className="mb-5 h-24 w-28">
        <defs>
          <linearGradient id="es" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#59b2ff" /><stop offset="1" stopColor="#0b5ca3" /></linearGradient>
        </defs>
        <ellipse cx="60" cy="86" rx="34" ry="5" fill="#d9edff" />
        <circle cx="60" cy="44" r="30" fill="#eef7ff" stroke="#bce0ff" strokeDasharray="3 5" />
        <circle cx="54" cy="40" r="15" fill="none" stroke="url(#es)" strokeWidth="5" />
        <path d="M65 51l13 13" stroke="url(#es)" strokeWidth="6" strokeLinecap="round" />
        <circle cx="96" cy="20" r="3" fill="#8eceff" /><circle cx="22" cy="28" r="2.5" fill="#bce0ff" /><circle cx="100" cy="62" r="2" fill="#bce0ff" />
      </svg>
      <h3 className="text-base font-semibold">{title}</h3>
      <p className="mt-1.5 max-w-sm text-sm text-muted-foreground">{description}</p>
      {children && <div className="mt-5 flex flex-wrap justify-center gap-2">{children}</div>}
    </div>
  );
}
