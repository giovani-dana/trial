import { CONTACTS, MONDAY_DEMO_URL } from "./constants";
import type { AnalyticsEvent } from "./analytics";
import type { IconName } from "./icons";

export type ActionKind = "internal" | "external" | "mailto";

export interface ServiceAction {
  label: string;
  href: string;
  kind: ActionKind;
  event?: AnalyticsEvent;
}

export interface Service {
  id: "monday-demo" | "bicaradana" | "internal-announcement" | "communication-support";
  title: string;
  description: string;
  icon: IconName;
  href: string;
  /** True when an official external source of truth exists. */
  external: boolean;
  badge?: string;
  primary: ServiceAction;
  secondary?: ServiceAction;
  /** Normalised keywords. Words match as token prefixes; phrases match as substrings. */
  keywords: string[];
}

export const SERVICES: Service[] = [
  {
    id: "monday-demo",
    title: "Monday Demo",
    description: "Share your team's innovation, projects, learnings, and achievements across DANA.",
    icon: "Presentation",
    href: "/services/monday-demo",
    external: true,
    badge: "Official Source of Truth",
    primary: { label: "Open Monday Demo Playbook", href: MONDAY_DEMO_URL, kind: "external", event: "open_monday_demo_playbook" },
    secondary: { label: "Learn More", href: "/services/monday-demo", kind: "internal" },
    keywords: [
      "presentation", "present", "showcase", "demo", "monday", "innovation", "achievement", "learnings",
      "share my project", "my project", "team project", "show my work", "lightning talk",
    ],
  },
  {
    id: "bicaradana",
    title: "BicaraDANA",
    description:
      "Represent DANA as a speaker in public events, webinars, podcasts, conferences, and industry engagements.",
    icon: "Mic",
    href: "/services/bicaradana",
    external: false,
    primary: { label: "Explore BicaraDANA", href: "/services/bicaradana", kind: "internal" },
    keywords: [
      "speaker", "speak", "speaking", "webinar", "conferenc", "podcast", "invit", "keynote", "panel",
      "external event", "public event", "industry event", "guest", "talk at", "bicara",
    ],
  },
  {
    id: "internal-announcement",
    title: "Internal Announcement",
    description: "Request support for internal company-wide communication and employee announcements.",
    icon: "Megaphone",
    href: "/services/internal-announcement",
    external: false,
    primary: {
      label: "Contact Internal Communications",
      href: `mailto:${CONTACTS.internalComms}?subject=Internal%20Announcement%20Request`,
      kind: "mailto",
      event: "contact_internal_comms",
    },
    secondary: { label: "Learn More", href: "/services/internal-announcement", kind: "internal" },
    keywords: [
      "announcement", "announce", "employee communication", "internal communication", "company wide",
      "all hands", "town hall", "internal comms", "memo", "broadcast", "all employees", "all staff",
    ],
  },
  {
    id: "communication-support",
    title: "Communication Support",
    description:
      "Request support for media, strategic communications, executive profiling, awards, social listening, monitoring, thought leadership, and consultation.",
    icon: "Handshake",
    href: "/services/communication-support",
    external: false,
    primary: {
      label: "Request Support",
      href: `mailto:${CONTACTS.commsCrew}?subject=Communication%20Support%20Request`,
      kind: "mailto",
      event: "contact_comms_crew",
    },
    secondary: { label: "Learn More", href: "/services/communication-support", kind: "internal" },
    keywords: [
      "media", "press", "press release", "award", "monitoring", "monitor", "social listening", "listening",
      "exposure", "interview", "journalist", "reporter", "thought leadership", "profiling", "executive profile",
      "consult", "strategic communication", "pr support", "reputation", "article", "op ed",
    ],
  },
];

export const getService = (id: Service["id"]) => SERVICES.find((s) => s.id === id)!;

export const EXAMPLE_QUERIES = [
  "I received a speaking invitation",
  "I want to present at Monday Demo",
  "I need media support",
  "I need an internal announcement",
  "I need communication consultation",
] as const;
