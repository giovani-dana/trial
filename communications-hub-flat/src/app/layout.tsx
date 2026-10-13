import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { AssistantPanel } from "@/components/assistant-panel";
import { Onboarding } from "@/components/onboarding";
import { ScrollProgress } from "@/components/scroll-progress";
import { Toaster } from "@/components/toaster";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} | DANA`, template: `%s | ${SITE.name}` },
  description: SITE.description,
  applicationName: SITE.name,
  openGraph: { title: SITE.name, description: SITE.description, siteName: SITE.name, type: "website", locale: "en_ID" },
  robots: { index: false, follow: false }, // internal portal
};

export const viewport: Viewport = { themeColor: "#108ee9", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-dvh font-sans">
        <a href="#main" className="sr-only z-[60] rounded-lg bg-white px-4 py-2 text-sm font-medium shadow focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
          Skip to content
        </a>
        <ScrollProgress />
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <AssistantPanel />
        <Onboarding />
        <Toaster />
      </body>
    </html>
  );
}
