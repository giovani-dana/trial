"use client";

import { useState } from "react";
import { Check, Copy, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { track, type AnalyticsEvent } from "@/lib/analytics";
import { toast } from "@/lib/events";
import { buildMailto, templateToBody } from "@/lib/mailto";

interface EmailTemplateProps {
  to: string;
  subject: string;
  fields: readonly string[];
  cta: string;
  event: AnalyticsEvent;
  /** Show the subject field as a pre-filled value. */
  title?: string;
}

/** Shows the email preparation template with copy + pre-filled mailto actions. */
export function EmailTemplate({ to, subject, fields, cta, event, title = "Email preparation template" }: EmailTemplateProps) {
  const [copied, setCopied] = useState(false);
  const body = templateToBody(fields.filter((f) => f !== "Subject"));
  const full = `To: ${to}\nSubject: ${subject}\n\n${body}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(full);
      setCopied(true);
      toast("Template copied to clipboard");
      setTimeout(() => setCopied(false), 1800);
    } catch { /* clipboard unavailable */ }
  };

  return (
    <div className="overflow-hidden rounded-2xl border bg-card shadow-card">
      <div className="flex items-center justify-between border-b bg-muted/50 px-5 py-3">
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-xs text-muted-foreground">To: {to}</p>
      </div>
      <dl className="divide-y font-mono text-[13px]">
        {fields.map((f) => (
          <div key={f} className="grid gap-1 px-5 py-3 sm:grid-cols-[11rem_1fr] sm:gap-4">
            <dt className="font-semibold text-brand-800">{f}:</dt>
            <dd className="text-muted-foreground">{f === "Subject" ? subject : <span className="opacity-60">…</span>}</dd>
          </div>
        ))}
      </dl>
      <div className="flex flex-wrap gap-2 border-t bg-muted/30 p-4">
        <Button asChild>
          <a href={buildMailto({ to, subject, body })} onClick={() => track(event, { source: "email_template" })}>
            <Mail aria-hidden /> {cta}
          </a>
        </Button>
        <Button variant="outline" onClick={copy} aria-live="polite">
          {copied ? <Check aria-hidden /> : <Copy aria-hidden />} {copied ? "Copied" : "Copy template"}
        </Button>
      </div>
    </div>
  );
}
