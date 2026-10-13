import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { RelatedServices } from "@/components/related-services";
import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import { FeatureGrid, CheckList } from "@/components/feature-grid";
import { FAQAccordion } from "@/components/faq-accordion";
import { EmailTemplate } from "@/components/email-template";
import { ActionLink } from "@/components/action-link";
import { CTABanner } from "@/components/cta-banner";
import { Reveal } from "@/components/reveal";
import { INTERNAL_ANNOUNCEMENT as C } from "@/lib/content";
import { CONTACTS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Internal Announcement",
  description: "Request support for internal company-wide communication and employee announcements.",
};

const SUBJECT = "Internal Announcement Request";
const action = { label: "Contact Internal Communications", href: `mailto:${CONTACTS.internalComms}?subject=Internal%20Announcement%20Request`, kind: "mailto", event: "contact_internal_comms" } as const;

export default function InternalAnnouncementPage() {
  return (
    <>
      <PageHero icon="Megaphone" title="Internal Announcement" description="Request support for internal company-wide communication and employee announcements.">
        <ActionLink action={action} size="lg" analyticsProps={{ source: "hero" }} />
      </PageHero>

      <Section labelledBy="overview">
        <div className="grid gap-10 lg:grid-cols-2">
          <SectionHeader id="overview" eyebrow="Overview" title="Reach employees clearly" description={C.overview} />
          <Reveal className="rounded-2xl border bg-brand-50/60 p-6">
            <h3 className="font-semibold">When to use</h3>
            <div className="mt-4"><CheckList items={C.whenToUse} /></div>
          </Reveal>
        </div>
      </Section>

      <Section className="bg-white/60" labelledBy="qualifies">
        <SectionHeader id="qualifies" eyebrow="What qualifies" title="What counts as an internal announcement" />
        <div className="mt-8"><FeatureGrid items={C.qualifies} /></div>
      </Section>

      <Section labelledBy="practices">
        <SectionHeader id="practices" eyebrow="Best practices" title="Make your announcement land" />
        <ol className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {C.bestPractices.map((b, i) => (
            <Reveal as="li" key={b.title} delay={i * 0.05}>
              <div className="h-full rounded-2xl border bg-card p-5 shadow-card">
                <span className="text-sm font-semibold text-brand-600">0{i + 1}</span>
                <h3 className="mt-1 font-semibold">{b.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{b.description}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section className="bg-white/60" labelledBy="prepare">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeader id="prepare" eyebrow="Prepare" title="Recommended information to prepare" description="Having these ready speeds up the review and helps us plan the right channel and timing." />
            <div className="mt-6"><CheckList items={C.prepare} /></div>
          </div>
          <Reveal>
            <EmailTemplate to={CONTACTS.internalComms} subject={SUBJECT} fields={C.template} cta="Open pre-filled email" event="contact_internal_comms" />
          </Reveal>
        </div>
      </Section>

      <Section labelledBy="faq">
        <SectionHeader id="faq" eyebrow="FAQs" title="Frequently asked questions" align="center" />
        <div className="mt-10"><FAQAccordion items={C.faqs} /></div>
      </Section>

      <Section className="pt-0 sm:pt-0">
        <CTABanner title="Have an announcement to share?" description="Send the Internal Communications team a few details and we'll take it from there.">
          <ActionLink action={action} variant="secondary" size="lg" analyticsProps={{ source: "cta_banner" }} />
        </CTABanner>
      </Section>
      <RelatedServices current="internal-announcement" />
    </>
  );
}
