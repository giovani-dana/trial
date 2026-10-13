"use client";

import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/empty-state";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="container py-24">
      <EmptyState title="Something went wrong" description="This page failed to load. Try again, and if it keeps happening let the Communications team know at comms.crew@dana.id.">
        <Button onClick={reset}><RotateCcw aria-hidden /> Try again</Button>
      </EmptyState>
    </div>
  );
}
