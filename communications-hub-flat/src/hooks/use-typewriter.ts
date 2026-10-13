"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/** Reveals text progressively (instant with reduced motion). */
export function useTypewriter(text: string, cps = 90) {
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? text.length : 0);
  useEffect(() => {
    if (reduce) { setN(text.length); return; }
    setN(0);
    const id = setInterval(() => setN((c) => (c >= text.length ? (clearInterval(id), c) : c + 2)), 1000 / (cps / 2));
    return () => clearInterval(id);
  }, [text, cps, reduce]);
  return { text: text.slice(0, n), done: n >= text.length };
}
