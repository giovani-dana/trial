"use client";

import { useCallback, useSyncExternalStore } from "react";
import type { PersonaId } from "@/lib/personas";

const KEY = "comms-hub:persona";
const EVT = "comms-hub:persona-change";

function read(): PersonaId | null {
  try { return (localStorage.getItem(KEY) as PersonaId | null) || null; } catch { return null; }
}
function subscribe(cb: () => void) {
  window.addEventListener(EVT, cb);
  window.addEventListener("storage", cb);
  return () => { window.removeEventListener(EVT, cb); window.removeEventListener("storage", cb); };
}

/** Persisted persona (per-browser convenience; never required for any feature). */
export function usePersona() {
  const persona = useSyncExternalStore(subscribe, read, () => null);
  const setPersona = useCallback((p: PersonaId | null) => {
    try { p ? localStorage.setItem(KEY, p) : localStorage.removeItem(KEY); } catch { /* storage unavailable */ }
    window.dispatchEvent(new Event(EVT));
  }, []);
  return [persona, setPersona] as const;
}
