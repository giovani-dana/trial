"use client";

import { Sparkles } from "lucide-react";
import { openTour } from "@/lib/events";

export function TourButton() {
  return (
    <button onClick={openTour} className="inline-flex items-center gap-1.5 hover:text-foreground">
      <Sparkles className="size-3.5" aria-hidden /> Take the tour
    </button>
  );
}
