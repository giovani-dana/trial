import { CONTACTS, MONDAY_DEMO_URL } from "./constants";
import { SUPPORT_SERVICES } from "./content";
import type { AnalyticsEvent } from "./analytics";
import type { IconName } from "./icons";
import type { ActionKind, Service } from "./services";

export interface IndexEntry {
  id: string;
  title: string;
  description: string;
  href: string;
  kind: ActionKind;
  icon: IconName;
  service: Service["id"];
  keywords: string[];
  event?: AnalyticsEvent;
}

const STOP = new Set(["the", "and", "for", "with", "your", "from"]);
const words = (t: string) => t.toLowerCase().split(/[^a-z0-9]+/).filter((w) => w.length >= 4 && !STOP.has(w));


const entries: (Omit<IndexEntry, "keywords"> & { keywords: string[] })[] = [
  { id: "bd-eligibility", title: "Check BicaraDANA eligibility", description: "Four quick questions to see if you can speak", href: "/services/bicaradana#eligibility", kind: "internal", icon: "BadgeCheck", service: "bicaradana", keywords: ["eligible", "eligibility", "can i speak", "probation", "notice period", "qualify"] },
  { id: "bd-process", title: "BicaraDANA process", description: "Eight steps from invitation to post-event reporting", href: "/services/bicaradana#process", kind: "internal", icon: "Compass", service: "bicaradana", keywords: ["process", "steps", "journey", "how does it work", "timeline", "workflow"] },
  { id: "bd-policy", title: "BicaraDANA policy highlights", description: "Confidentiality, personal data, anti-bribery, and more", href: "/services/bicaradana#policy", kind: "internal", icon: "ShieldCheck", service: "bicaradana", keywords: ["policy", "rules", "confidential", "personal data", "bribery", "gift", "honorarium"] },
  { id: "md-playbook", title: "Open Monday Demo Playbook", description: "Official source of truth (opens in a new tab)", href: MONDAY_DEMO_URL, kind: "external", icon: "Presentation", service: "monday-demo", keywords: ["playbook", "submit", "submission", "template", "official"], event: "open_monday_demo_playbook" },
  { id: "md-faq", title: "Monday Demo FAQs", description: "Common questions about taking part", href: "/services/monday-demo#faq", kind: "internal", icon: "MessagesSquare", service: "monday-demo", keywords: ["faq", "questions", "how to"] },
  { id: "ia-template", title: "Internal announcement email template", description: "What to prepare before you write to Internal Communications", href: "/services/internal-announcement#prepare", kind: "internal", icon: "FileText", service: "internal-announcement", keywords: ["template", "prepare", "email", "request format", "checklist"] },
  { id: "ia-email", title: "Email Internal Communications", description: `Opens your mail app to ${CONTACTS.internalComms}`, href: `mailto:${CONTACTS.internalComms}?subject=Internal%20Announcement%20Request`, kind: "mailto", icon: "Mail", service: "internal-announcement", keywords: ["email", "contact", "icoms", "write to"], event: "contact_internal_comms" },
  { id: "cs-email", title: "Request Communication Support", description: `Opens your mail app to ${CONTACTS.commsCrew}`, href: `mailto:${CONTACTS.commsCrew}?subject=Communication%20Support%20Request`, kind: "mailto", icon: "Mail", service: "communication-support", keywords: ["email", "contact", "comms crew", "request support", "write to"], event: "contact_comms_crew" },
  ...SUPPORT_SERVICES.map((s) => ({
    id: `cs-${s.id}`, title: s.title, description: s.description, href: "/services/communication-support#catalog", kind: "internal" as const,
    icon: s.icon, service: "communication-support" as const, keywords: [s.title.toLowerCase(), ...s.useCases.map((u) => u.toLowerCase())],
  })),
];

export const SEARCH_INDEX: IndexEntry[] = entries.map((e) => ({
  ...e,
  keywords: [...new Set([...e.keywords, ...words(e.title)])],
}));
