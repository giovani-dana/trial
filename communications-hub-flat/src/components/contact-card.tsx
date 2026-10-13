"use client";

import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { track, type AnalyticsEvent } from "@/lib/analytics";
import { buildMailto } from "@/lib/mailto";
import { getIcon, type IconName } from "@/lib/icons";

interface ContactCardProps {
  title: string;
  description: string;
  email: string;
  subject: string;
  body?: string;
  cta?: string;
  icon?: IconName;
  event?: AnalyticsEvent;
}

export function ContactCard({ title, description, email, subject, body, cta = "Send email", icon = "Mail", event }: ContactCardProps) {
  const Icon = getIcon(icon);
  return (
    <div className="flex flex-col gap-4 rounded-2xl border bg-card p-6 shadow-card sm:flex-row sm:items-center">
      <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-brand-700"><Icon className="size-6" aria-hidden /></span>
      <div className="flex-1">
        <h3 className="font-semibold">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        <p className="mt-1 text-sm font-medium text-brand-700">{email}</p>
      </div>
      <Button asChild>
        <a href={buildMailto({ to: email, subject, body })} onClick={() => event && track(event, { source: "contact_card" })}>
          <Mail aria-hidden /> {cta}
        </a>
      </Button>
    </div>
  );
}
