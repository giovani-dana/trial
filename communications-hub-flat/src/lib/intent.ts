import { searchServices } from "./search";
import { SERVICES, type Service } from "./services";

export interface AssistantReply {
  recommended: Service | null;
  alternatives: Service[];
  confidence: "high" | "medium" | "low";
  message: string;
}

const REASONS: Record<Service["id"], string> = {
  "monday-demo": "Monday Demo is where teams showcase projects, learnings, and achievements to the wider company.",
  bicaradana: "BicaraDANA covers employees who represent DANA externally as speakers, from invitation to post-event reporting.",
  "internal-announcement": "The Internal Communications team supports company-wide and employee-facing announcements.",
  "communication-support": "The Communications team supports media, awards, monitoring, profiling, and strategic communication needs.",
};

/** Frontend-only intent routing (no backend). */
export function routeIntent(input: string): AssistantReply {
  const results = searchServices(input);
  if (!results.length) {
    return {
      recommended: null,
      alternatives: SERVICES,
      confidence: "low",
      message:
        "I couldn't match that to a single service. Try mentioning what you want to do, such as speaking, presenting, announcing, or media support, or pick one of the services below.",
    };
  }
  const [top, second] = results;
  const close = second && second.score >= top.score * 0.8;
  const confidence = top.score >= 6 && !close ? "high" : top.score >= 3 ? "medium" : "low";
  return {
    recommended: top.service,
    alternatives: results.slice(1, 3).map((r) => r.service),
    confidence,
    message: REASONS[top.service.id],
  };
}
