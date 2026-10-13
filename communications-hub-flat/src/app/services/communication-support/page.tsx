import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { RelatedServices } from "@/components/related-services";
import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import { SupportCatalog } from "@/components/support-catalog";
import { EmailTemplate } from "@/components/email-template";
import { FAQAccordion } from "@/components/faq-accordion";
import { CTABanner } from "@/components/cta-banner";
import { ActionLink } from "@/components/action-link";
import { Reveal } from "@/components/reveal";
import { SUPPORT_FAQS, SUPPORT_TEMPLATE } from "@/lib/content";
import { CONTACTS } from "@/lib/constants";
import { buildMailto, templateToBody } from "@/lib/mailto";

export const metadata: Metadata = {
  title: "Communication Support",
  description: "Request support for media, strategic communications, executive profiling, awards, social listening, monitoring, thought leadership, and consultation.",
};

const SUBJECT = "Communication Support Request";
const action = {
  label: "Request Support",
  href: buildMailto({ to: CONTACTS.commsCrew, subject: SUBJECT, body: templateToBody(SUPPORT_TEMPLATE) }),
  kind: "mailto",
  event: "contact_comms_crew",
} as const;

export default function CommunicationSupportPage() {
  return (
    <>
      <PageHero
        icon="Handshake"
        title="Communication Support"
        description="Request support for media, strategic communications, executive profiling, awards, social listening, monitoring, thought leadership, and consultation."
      >
        <ActionLink action={action} size="lg" analyticsProps={{ source: "hero" }} />
      </PageHero>

      <Section labelledBy="catalog">
        <SectionHeader id="catalog" eyebrow="Service catalog" title="Find the support you need" description="Browse what the Communications team offers and start a pre-filled request in one click." className="mb-8" />
        <SupportCatalog />
      </Section>

      <Section className="bg-white/60" labelledBy="request">
        <div className="grid items-start gap-10 lg:grid-cols-2">
          <SectionHeader id="request" eyebrow="Request" title="What to include in your request" description="The request email is pre-filled with these fields. The more context you give, the faster we can respond." />
          <Reveal>
            <EmailTemplate to={CONTACTS.commsCrew} subject={SUBJECT} fields={SUPPORT_TEMPLATE} cta="Request Support" event="contact_comms_crew" title="Request email template" />
          </Reveal>
        </div>
      </Section>

      <Section labelledBy="faq">
        <SectionHeader id="faq" eyebrow="FAQs" title="Frequently asked questions" align="center" />
        <div className="mt-10"><FAQAccordion items={SUPPORT_FAQS} /></div>
      </Section>

      <Section className="pt-0 sm:pt-0">
        <CTABanner title="Let's plan your communication" description="Share your objective and timeline, and the Communications team will take it from there.">
          <ActionLink action={action} variant="secondary" size="lg" analyticsProps={{ source: "cta_banner" }} />
        </CTABanner>
      </Section>
      <RelatedServices current="communication-support" />
    </>
  );
}
