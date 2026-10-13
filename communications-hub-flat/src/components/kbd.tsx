import { cn } from "@/lib/utils";

export function Kbd({ children, className }: { children: React.ReactNode; className?: string }) {
  return <kbd className={cn("inline-flex min-w-5 items-center justify-center rounded-md border border-b-2 bg-white px-1.5 py-0.5 font-sans text-[11px] font-medium text-muted-foreground", className)}>{children}</kbd>;
}
