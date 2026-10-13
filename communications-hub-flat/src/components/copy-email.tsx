"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "@/lib/events";

/** Fallback for people without a default mail app (e.g. webmail users). */
export function CopyEmail({ href }: { href: string }) {
  const [copied, setCopied] = useState(false);
  const address = href.replace(/^mailto:/, "").split("?")[0];
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      toast("Email address copied");
      setTimeout(() => setCopied(false), 1800);
    } catch { /* clipboard unavailable */ }
  };
  return (
    <button type="button" onClick={copy} aria-live="polite" className="relative mt-3 inline-flex items-center gap-1.5 self-start text-xs text-muted-foreground hover:text-foreground">
      {copied ? <Check className="size-3" aria-hidden /> : <Copy className="size-3" aria-hidden />}
      {copied ? "Copied" : `Copy ${address}`}
    </button>
  );
}
