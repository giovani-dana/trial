export const SITE = {
  name: "Communications Hub",
  description:
    "Your one-stop destination for communication support, speaking opportunities, internal announcements, and employee showcases at DANA.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://comms-hub.dana.id",
};

export const CONTACTS = {
  internalComms: "icoms@dana.id",
  commsCrew: "comms.crew@dana.id",
  /** BicaraDANA requests are handled by the Communications team. */
  bicaradana: "comms.crew@dana.id",
} as const;

export const MONDAY_DEMO_URL = "https://mondaydemoplaybook.vercel.app/";

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Monday Demo", href: "/services/monday-demo" },
  { label: "BicaraDANA", href: "/services/bicaradana" },
  { label: "Internal Announcement", href: "/services/internal-announcement" },
  { label: "Communication Support", href: "/services/communication-support" },
] as const;
