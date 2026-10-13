/**
 * Analytics helper (placeholder).
 *
 * Fans every event out to:
 *  1. window.dataLayer (GTM / GA4 compatible)
 *  2. a `comms-hub:analytics` CustomEvent (for any in-page listener)
 *  3. NEXT_PUBLIC_ANALYTICS_ENDPOINT via sendBeacon, when configured
 *  4. console.debug in development
 *
 * Swap the body of `dispatch` to integrate the real DANA analytics SDK.
 */
export type AnalyticsEvent =
  | "open_monday_demo_playbook"
  | "contact_internal_comms"
  | "contact_comms_crew"
  | "start_bicaradana"
  | "search_service"
  | "ai_assistant_recommendation";

export type AnalyticsProps = Record<string, string | number | boolean | null | undefined>;

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function track(event: AnalyticsEvent, props: AnalyticsProps = {}) {
  if (typeof window === "undefined") return;
  const payload = { event, ...props, path: window.location.pathname, ts: Date.now() };

  try {
    window.dataLayer?.push(payload);
    window.dispatchEvent(new CustomEvent("comms-hub:analytics", { detail: payload }));

    const endpoint = process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT;
    if (endpoint && typeof navigator.sendBeacon === "function") {
      navigator.sendBeacon(endpoint, JSON.stringify(payload));
    }
    if (process.env.NODE_ENV !== "production") {
      console.debug("[analytics]", payload);
    }
  } catch {
    /* analytics must never break the UI */
  }
}
