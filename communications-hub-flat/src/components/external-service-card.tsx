"use client";

import Link from "next/link";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import type { IconName } from "@/lib/icons";
import { track, type AnalyticsEvent } from "@/lib/analytics";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardShell, IconTile } from "./service-card";

export interface ExternalServiceCardProps {
  title: string;
  description: string;
  icon: IconName;
  url: string;
  /** Defaults to "Official Source of Truth" whenever the service is external. */
  badge?: string;
  externalLink?: boolean;
  ctaLabel?: string;
  event?: AnalyticsEvent;
  secondaryHref?: string;
  secondaryLabel?: string;
  highlight?: boolean;
  highlightBadge?: string;
  onNavigate?: () => void;
}

/**
 * Generic card for services whose canonical content lives on another site
 * (Monday Demo today; Awards Portal / Speaker Portal tomorrow).
 */
export function ExternalServiceCard({
  title, description, icon, url, badge = "Official Source of Truth", externalLink = true,
  ctaLabel = "Open", event, secondaryHref, secondaryLabel, highlight, highlightBadge, onNavigate,
}: ExternalServiceCardProps) {
  const external = externalLink ? { target: "_blank", rel: "noopener noreferrer" } : {};
  return (
    <CardShell highlight={highlight}>
      <div className="relative flex items-start justify-between gap-3">
        <IconTile name={icon} />
        <div className="flex flex-col items-end gap-1.5">
          {badge && (
            <Badge>
              <ShieldCheck aria-hidden /> {badge}
            </Badge>
          )}
          {highlightBadge && <Badge variant="solid">{highlightBadge}</Badge>}
        </div>
      </div>
      <h3 className="relative mt-5 text-lg font-semibold tracking-tight">{title}</h3>
      <p className="relative mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{description}</p>
      <div className="relative mt-6 flex flex-wrap gap-2">
        <Button asChild>
          <a
            href={url}
            {...external}
            onClick={() => {
              if (event) track(event, { href: url });
              onNavigate?.();
            }}
          >
            {ctaLabel}
            <ArrowUpRight aria-hidden />
            {externalLink && <span className="sr-only">(opens in a new tab)</span>}
          </a>
        </Button>
        {secondaryHref && (
          <Button asChild variant="ghost">
            <Link href={secondaryHref} onClick={onNavigate}>{secondaryLabel ?? "Learn More"}</Link>
          </Button>
        )}
      </div>
    </CardShell>
  );
}
