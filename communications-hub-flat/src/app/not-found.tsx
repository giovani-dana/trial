import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-brand-600">404</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">We couldn't find that page</h1>
      <p className="mt-3 max-w-md text-muted-foreground">Try searching from the home page to find the right Communications service.</p>
      <Button asChild className="mt-6"><Link href="/">Back to home</Link></Button>
    </div>
  );
}
