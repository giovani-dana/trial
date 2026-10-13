"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, ArrowLeft, CheckCircle2, RotateCcw, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Kbd } from "./kbd";
import { track } from "@/lib/analytics";
import { buildMailto } from "@/lib/mailto";
import { CONTACTS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const QUESTIONS = [
  { id: "employed", text: "Are you currently employed by DANA?" },
  { id: "notice", text: "Have you resigned or are you currently serving a notice period?" },
  { id: "probation", text: "Are you currently in probation?" },
  { id: "invitation", text: "Have you received a speaking invitation?" },
  { id: "manager", text: "Do you have manager acknowledgment?" },
] as const;

type Id = (typeof QUESTIONS)[number]["id"];
type Answers = Partial<Record<Id, boolean>>;
type Outcome = "eligible" | "review" | "not-eligible";

function evaluate(a: Answers): { outcome: Outcome; reasons: string[] } {
  if (a.employed === false) {
    return { outcome: "not-eligible", reasons: ["BicaraDANA is available to current DANA employees only."] };
  }
  if (a.notice === true) {
    return { outcome: "not-eligible", reasons: ["Employees in a notice period are not eligible for BicaraDANA."] };
  }
  const reasons: string[] = [];
  if (a.probation) reasons.push("Employees in probation require additional review.");
  if (a.invitation === false) reasons.push("No speaking invitation yet. Speaking invitations must be reported once received.");
  if (a.manager === false) reasons.push("Manager acknowledgment is needed before a request can move forward.");
  return reasons.length ? { outcome: "review", reasons } : { outcome: "eligible", reasons: ["You meet the basic requirements. Communications will confirm suitability for the specific opportunity."] };
}

const OUTCOME = {
  eligible: { label: "Eligible", Icon: CheckCircle2, tone: "border-emerald-200 bg-emerald-50 text-emerald-900", icon: "text-emerald-600" },
  review: { label: "Needs Further Review", Icon: AlertCircle, tone: "border-amber-200 bg-amber-50 text-amber-900", icon: "text-amber-600" },
  "not-eligible": { label: "Not Eligible", Icon: XCircle, tone: "border-rose-200 bg-rose-50 text-rose-900", icon: "text-rose-600" },
} as const;

export function EligibilityChecker() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const ended = answers.employed === false || answers.notice === true;
  const done = step >= QUESTIONS.length || ended;
  const q = QUESTIONS[Math.min(step, QUESTIONS.length - 1)];

  const answer = (value: boolean) => {
    if (step === 0) track("start_bicaradana", { source: "eligibility_checker" });
    const next = { ...answers, [q.id]: value };
    setAnswers(next);
    setStep(next.employed === false || next.notice === true ? QUESTIONS.length : step + 1);
  };
  const back = () => {
    const prev = Math.max(0, (ended ? Object.keys(answers).length : step) - 1);
    setAnswers((a) => Object.fromEntries(Object.entries(a).filter(([k]) => QUESTIONS.findIndex((x) => x.id === k) < prev)) as Answers);
    setStep(prev);
  };
  const reset = () => { setAnswers({}); setStep(0); };

  const result = done ? evaluate(answers) : null;
  const O = result ? OUTCOME[result.outcome] : null;

  return (
    <div
      className="glass mx-auto w-full max-w-2xl overflow-hidden rounded-3xl p-6 sm:p-8"
      onKeyDown={(e) => {
        if (done || e.metaKey || e.ctrlKey || e.altKey) return;
        const k = e.key.toLowerCase();
        if (k === "y") { e.preventDefault(); answer(true); } else if (k === "n") { e.preventDefault(); answer(false); }
      }}
    >
      {!done ? (
        <>
          <div className="mb-6">
            <div className="mb-2 flex items-center justify-between text-xs font-medium text-muted-foreground">
              <span>Question {step + 1} of {QUESTIONS.length}</span>
              <span>{Math.round((step / QUESTIONS.length) * 100)}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-brand-100" role="progressbar" aria-valuemin={0} aria-valuemax={QUESTIONS.length} aria-valuenow={step} aria-label="Eligibility progress">
              <motion.div className="h-full rounded-full bg-brand-gradient" initial={false} animate={{ width: `${(step / QUESTIONS.length) * 100}%` }} transition={{ type: "spring", stiffness: 160, damping: 24 }} />
            </div>
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={q.id} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.25 }}>
              <fieldset>
                <legend className="text-xl font-semibold tracking-tight">{q.text}</legend>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <Button size="lg" onClick={() => answer(true)}>Yes <Kbd className="border-white/30 bg-white/15 text-white">Y</Kbd></Button>
                  <Button size="lg" variant="outline" onClick={() => answer(false)}>No <Kbd>N</Kbd></Button>
                </div>
              </fieldset>
            </motion.div>
          </AnimatePresence>
          {step > 0 && (
            <button onClick={back} className="mt-5 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="size-3.5" aria-hidden /> Back
            </button>
          )}
        </>
      ) : (
        result && O && (
          <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} role="status" aria-live="polite">
            <div className={cn("flex items-center gap-3 rounded-2xl border p-4", O.tone)}>
              <motion.span initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.1 }}><O.Icon className={cn("size-7", O.icon)} aria-hidden /></motion.span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider opacity-70">Result</p>
                <p className="text-xl font-semibold">{O.label}</p>
              </div>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {result.reasons.map((r) => <li key={r} className="flex gap-2"><span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-400" />{r}</li>)}
            </ul>
            <div className="mt-6 flex flex-wrap gap-2">
              {result.outcome !== "not-eligible" && (
                <Button asChild>
                  <a
                    href={buildMailto({ to: CONTACTS.bicaradana, subject: "BicaraDANA Speaking Request", body: "Event / Organizer:\n\nDate:\n\nTopic:\n\nManager acknowledged: " + (answers.manager ? "Yes" : "No") })}
                    onClick={() => track("start_bicaradana", { source: "eligibility_result", outcome: result.outcome })}
                  >
                    Submit a speaking request
                  </a>
                </Button>
              )}
              <Button variant="outline" onClick={reset}><RotateCcw aria-hidden /> Start over</Button>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">This checker is guidance only. Communications makes the final suitability decision.</p>
          </motion.div>
        )
      )}
    </div>
  );
}
