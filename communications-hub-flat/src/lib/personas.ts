import type { IconName } from "./icons";

export type PersonaId = "employee" | "manager" | "product" | "speaker" | "owner";

export interface Persona { id: PersonaId; label: string; description: string; icon: IconName }

export const PERSONAS: Persona[] = [
  { id: "employee", label: "Employee", description: "I want to learn what's available", icon: "Users" },
  { id: "manager", label: "Manager / Team Lead", description: "I'm supporting my team", icon: "Target" },
  { id: "product", label: "Product / Business Unit", description: "I'm launching or showcasing work", icon: "Rocket" },
  { id: "speaker", label: "Potential speaker", description: "I've been invited to speak", icon: "Mic" },
  { id: "owner", label: "Initiative owner", description: "I need to reach employees", icon: "Megaphone" },
];

export interface Situation { id: string; label: string; hint: string; href: string; icon: IconName }

export const SITUATIONS: Situation[] = [
  { id: "speak", label: "I got invited to speak somewhere", hint: "Check eligibility", href: "/services/bicaradana#eligibility", icon: "Mic" },
  { id: "present", label: "I want to present my team's work", hint: "Monday Demo", href: "/services/monday-demo", icon: "Presentation" },
  { id: "announce", label: "I need to tell employees something", hint: "Prepare your request", href: "/services/internal-announcement#prepare", icon: "Megaphone" },
  { id: "journalist", label: "A journalist contacted me", hint: "Media support", href: "/services/communication-support#catalog", icon: "Newspaper" },
  { id: "award", label: "I want to nominate us for an award", hint: "Awards support", href: "/services/communication-support#catalog", icon: "Trophy" },
  { id: "unsure", label: "I'm not sure what I need", hint: "Talk to the team", href: "/services/communication-support#request", icon: "Compass" },
];

/** Situation ids in priority order for each persona. */
export const PERSONA_PRIORITY: Record<PersonaId, string[]> = {
  employee: ["present", "speak", "unsure"],
  manager: ["announce", "present", "speak"],
  product: ["present", "journalist", "award"],
  speaker: ["speak", "journalist", "unsure"],
  owner: ["announce", "journalist", "unsure"],
};
