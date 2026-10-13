"use client";

import { motion, useReducedMotion } from "framer-motion";
import { getIcon, type IconName } from "@/lib/icons";
import { cn } from "@/lib/utils";
import type { Service } from "@/lib/services";
import { ActionLink } from "./action-link";
import { CopyEmail } from "./copy-email";
import { ExternalServiceCard } from "./external-service-card";
import { Badge } from "@/components/ui/badge";
import { SpotlightLayers, useSpotlight } from "./spotlight";

export function CardShell({ children, className, highlight }: { children: React.ReactNode; className?: string; highlight?: boolean }) {
  const reduce = useReducedMotion();
  const { ref, onMouseMove } = useSpotlight<HTMLElement>();
  return (
    <motion.article
      ref={ref}
      onMouseMove={onMouseMove}
      whileHover={reduce ? undefined : { y: -3 }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-card p-6 shadow-card transition-shadow duration-300 hover:shadow-lift",
        highlight && "border-brand-300 ring-1 ring-brand-200",
        className
      )}
    >
      <SpotlightLayers />
      {children}
    </motion.article>
  );
}

export function IconTile({ name }: { name: IconName }) {
  const Icon = getIcon(name);
  return (
    <div className="flex size-12 items-center justify-center rounded-xl bg-brand-gradient text-white shadow-card transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-3">
      <Icon className="size-6" aria-hidden />
    </div>
  );
}

interface ServiceCardProps {
  service: Service;
  highlight?: boolean;
  badgeText?: string;
  onNavigate?: () => void;
}

export function ServiceCard({ service, highlight, badgeText, onNavigate }: ServiceCardProps) {
  return (
    <CardShell highlight={highlight}>
      <div className="relative flex items-start justify-between gap-3">
        <IconTile name={service.icon} />
        {badgeText && <Badge variant="solid">{badgeText}</Badge>}
      </div>
      <h3 className="relative mt-5 text-lg font-semibold tracking-tight">{service.title}</h3>
      <p className="relative mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
      <div className="relative mt-6 flex flex-wrap gap-2">
        <ActionLink action={service.primary} onNavigate={onNavigate} analyticsProps={{ service: service.id }} />
        {service.secondary && (
          <ActionLink action={service.secondary} variant="ghost" onNavigate={onNavigate} analyticsProps={{ service: service.id }} />
        )}
      </div>
      {service.primary.kind === "mailto" && <CopyEmail href={service.primary.href} />}
    </CardShell>
  );
}

/** Picks the right card for a service: external services get the ExternalServiceCard. */
export function ServiceRenderer({ service, highlight, badgeText, onNavigate }: ServiceCardProps) {
  if (service.external) {
    return (
      <ExternalServiceCard
        title={service.title}
        description={service.description}
        icon={service.icon}
        url={service.primary.href}
        badge={service.badge}
        externalLink
        ctaLabel={service.primary.label}
        event={service.primary.event}
        secondaryHref={service.secondary?.href}
        secondaryLabel={service.secondary?.label}
        highlight={highlight}
        highlightBadge={badgeText}
        onNavigate={onNavigate}
      />
    );
  }
  return <ServiceCard service={service} highlight={highlight} badgeText={badgeText} onNavigate={onNavigate} />;
}
