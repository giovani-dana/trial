"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, Mail } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { track, type AnalyticsProps } from "@/lib/analytics";
import type { ServiceAction } from "@/lib/services";

interface ActionLinkProps extends Pick<ButtonProps, "variant" | "size" | "className"> {
  action: ServiceAction;
  analyticsProps?: AnalyticsProps;
  onNavigate?: () => void;
}

/** Renders a CTA for internal / external / mailto actions and fires the analytics event. */
export function ActionLink({ action, analyticsProps, onNavigate, variant, size, className }: ActionLinkProps) {
  const onClick = () => {
    if (action.event) track(action.event, { href: action.href, ...analyticsProps });
    onNavigate?.();
  };
  const Icon = action.kind === "external" ? ArrowUpRight : action.kind === "mailto" ? Mail : ArrowRight;

  return (
    <Button asChild variant={variant} size={size} className={className}>
      {action.kind === "internal" ? (
        <Link href={action.href} onClick={onClick}>
          {action.label}
          <Icon aria-hidden />
        </Link>
      ) : (
        <a
          href={action.href}
          onClick={onClick}
          {...(action.kind === "external" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {action.label}
          <Icon aria-hidden />
          {action.kind === "external" && <span className="sr-only">(opens in a new tab)</span>}
        </a>
      )}
    </Button>
  );
}
