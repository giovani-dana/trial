"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export function Toaster() {
  const [items, setItems] = useState<{ id: number; message: string }[]>([]);
  useEffect(() => {
    let n = 0;
    const onToast = (e: Event) => {
      const id = ++n;
      const message = (e as CustomEvent<{ message: string }>).detail.message;
      setItems((x) => [...x.slice(-2), { id, message }]);
      setTimeout(() => setItems((x) => x.filter((i) => i.id !== id)), 2400);
    };
    window.addEventListener("comms-hub:toast", onToast);
    return () => window.removeEventListener("comms-hub:toast", onToast);
  }, []);
  return (
    <div role="status" aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-20 z-[80] flex flex-col items-center gap-2 px-4">
      <AnimatePresence>
        {items.map((t) => (
          <motion.div key={t.id} initial={{ opacity: 0, y: 12, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 6, scale: 0.98 }} className="flex items-center gap-2 rounded-full border bg-brand-950 px-4 py-2 text-sm text-white shadow-lift">
            <CheckCircle2 className="size-4 text-emerald-400" aria-hidden /> {t.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
