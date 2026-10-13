"use client";

import { useEffect, useRef, useState } from "react";
import { useTypewriter } from "@/hooks/use-typewriter";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, CornerDownLeft, Sparkles, User } from "lucide-react";
import { routeIntent, type AssistantReply } from "@/lib/intent";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { SERVICES } from "@/lib/services";
import { getIcon } from "@/lib/icons";
import { ActionLink } from "./action-link";
import { Badge } from "@/components/ui/badge";

type Message =
  | { id: number; role: "user"; text: string }
  | { id: number; role: "assistant"; reply: AssistantReply }
  | { id: number; role: "typing" };

const SUGGESTIONS = [
  "I got invited to speak at a conference.",
  "I want to showcase my project.",
  "I need a company-wide announcement.",
  "I need media exposure.",
];

const CONFIDENCE_LABEL = { high: "Strong match", medium: "Likely match", low: "Possible match" } as const;

interface AIAssistantProps {
  className?: string;
  onNavigate?: () => void;
  compact?: boolean;
  /** Auto-ask once on mount (used by the command palette hand-off). */
  initialQuery?: string;
}

/** Frontend-only simulated assistant that routes free text to the right service. */
export function AIAssistant({ className, onNavigate, compact, initialQuery }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const idRef = useRef(0);
  const logRef = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const seeded = useRef(false);
  useEffect(() => () => clearTimeout(timer.current), []);
  useEffect(() => {
    // Scroll the chat log only (never the page), and only once a conversation exists.
    const log = logRef.current;
    if (log && messages.length) log.scrollTo({ top: log.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const ask = (text: string) => {
    const q = text.trim();
    if (!q || busy) return;
    const uid = ++idRef.current;
    const tid = ++idRef.current;
    setMessages((m) => [...m, { id: uid, role: "user", text: q }, { id: tid, role: "typing" }]);
    setInput("");
    setBusy(true);
    timer.current = setTimeout(() => {
      const reply = routeIntent(q);
      track("ai_assistant_recommendation", {
        service: reply.recommended?.id ?? "none",
        confidence: reply.confidence,
      });
      setMessages((m) => m.filter((x) => x.id !== tid).concat({ id: ++idRef.current, role: "assistant", reply }));
      setBusy(false);
    }, 700);
  };

  useEffect(() => {
    if (initialQuery && !seeded.current) { seeded.current = true; ask(initialQuery); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQuery]);

  return (
    <div className={cn("flex min-h-0 flex-col", className)}>
      <div ref={logRef} className={cn("flex-1 space-y-4 overflow-y-auto p-4 sm:p-5", compact ? "max-h-[26rem] min-h-[16rem]" : "min-h-[20rem]")} role="log" aria-live="polite" aria-label="Assistant conversation">
        {messages.length === 0 && (
          <div className="flex h-full flex-col justify-center gap-4">
            <p className="text-sm text-muted-foreground">Describe what you're trying to do and I'll point you to the right service. Try one of these:</p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button key={s} onClick={() => ask(s)} className="rounded-full border bg-white px-3 py-1.5 text-left text-[13px] text-foreground transition-colors hover:border-brand-300 hover:bg-brand-50">
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
        <AnimatePresence initial={false}>
          {messages.map((m) => (
            <motion.div key={m.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
              {m.role === "user" && (
                <div className="flex items-start justify-end gap-2">
                  <p className="max-w-[85%] rounded-2xl rounded-tr-md bg-brand-600 px-4 py-2.5 text-sm text-white">{m.text}</p>
                  <span className="mt-1 flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700"><User className="size-4" aria-hidden /></span>
                </div>
              )}
              {m.role === "typing" && (
                <div className="flex items-center gap-2">
                  <span className="flex size-7 items-center justify-center rounded-full bg-brand-gradient text-white"><Bot className="size-4" aria-hidden /></span>
                  <div className="flex gap-1 rounded-2xl bg-muted px-4 py-3" aria-label="Assistant is thinking">
                    {[0, 1, 2].map((i) => (
                      <span key={i} className="size-1.5 animate-dots rounded-full bg-muted-foreground" style={{ animationDelay: `${i * 0.15}s` }} />
                    ))}
                  </div>
                </div>
              )}
              {m.role === "assistant" && <ReplyBubble reply={m.reply} onNavigate={onNavigate} />}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); ask(input); }} className="border-t bg-white/80 p-3">
        <div className="flex items-center gap-2 rounded-xl border border-input bg-white px-3 focus-within:border-brand-400 focus-within:ring-4 focus-within:ring-brand-200/60">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. I was invited to speak at a webinar"
            aria-label="Describe what you need help with"
            className="h-11 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/70"
          />
          <button type="submit" disabled={!input.trim() || busy} aria-label="Send" className="flex size-8 items-center justify-center rounded-lg bg-brand-600 text-white transition-opacity disabled:opacity-40">
            <CornerDownLeft className="size-4" />
          </button>
        </div>
      </form>
    </div>
  );
}

const FOLLOWUPS: Record<string, { label: string; href: string }[]> = {
  bicaradana: [{ label: "Check eligibility", href: "/services/bicaradana#eligibility" }, { label: "See the process", href: "/services/bicaradana#process" }],
  "monday-demo": [{ label: "Monday Demo FAQs", href: "/services/monday-demo#faq" }],
  "internal-announcement": [{ label: "Prepare your request", href: "/services/internal-announcement#prepare" }],
  "communication-support": [{ label: "Browse the catalog", href: "/services/communication-support#catalog" }],
};

function ReplyBubble({ reply, onNavigate }: { reply: AssistantReply; onNavigate?: () => void }) {
  const svc = reply.recommended;
  const { text: streamed, done } = useTypewriter(reply.message);
  const Icon = svc ? getIcon(svc.icon) : Sparkles;
  return (
    <div className="flex items-start gap-2">
      <span className="mt-1 flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-gradient text-white"><Bot className="size-4" aria-hidden /></span>
      <div className="min-w-0 flex-1 space-y-3 rounded-2xl rounded-tl-md bg-muted p-4">
        {svc ? (
          <>
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Recommended Service</p>
              <Badge variant={reply.confidence === "high" ? "success" : "default"}>{CONFIDENCE_LABEL[reply.confidence]}</Badge>
            </div>
            <div className="flex items-center gap-3 rounded-xl border bg-white p-3">
              <span className="flex size-10 items-center justify-center rounded-lg bg-brand-gradient text-white"><Icon className="size-5" aria-hidden /></span>
              <p className="text-base font-semibold">{svc.title}</p>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground" aria-label={reply.message}>{streamed}{!done && <span aria-hidden className="ml-0.5 inline-block h-3.5 w-px animate-pulse bg-brand-600 align-middle" />}</p>
            <div className={cn("flex flex-wrap gap-2 transition-opacity duration-300", done ? "opacity-100" : "opacity-0")}>
              <ActionLink action={svc.primary} size="sm" onNavigate={onNavigate} analyticsProps={{ service: svc.id, source: "assistant" }} />
              {svc.primary.href !== svc.href && (
                <ActionLink action={{ label: "Learn more", href: svc.href, kind: "internal" }} size="sm" variant="outline" onNavigate={onNavigate} />
              )}
            </div>
            {done && (FOLLOWUPS[svc.id] ?? []).length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {FOLLOWUPS[svc.id].map((f) => (
                  <ActionLink key={f.href} action={{ label: f.label, href: f.href, kind: "internal" }} size="sm" variant="ghost" className="h-8 rounded-full border bg-white px-3 text-xs" onNavigate={onNavigate} />
                ))}
              </div>
            )}
            {reply.alternatives.length > 0 && (
              <p className="text-xs text-muted-foreground">
                Also consider: {reply.alternatives.map((a) => a.title).join(", ")}
              </p>
            )}
          </>
        ) : (
          <>
            <p className="text-sm leading-relaxed">{reply.message}</p>
            <div className="flex flex-wrap gap-2">
              {SERVICES.map((s) => (
                <ActionLink key={s.id} action={{ label: s.title, href: s.href, kind: "internal" }} size="sm" variant="outline" onNavigate={onNavigate} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
