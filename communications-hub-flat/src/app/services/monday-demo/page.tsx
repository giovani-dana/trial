import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { RelatedServices } from "@/components/related-services";
import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import { FeatureGrid, CheckList } from "@/components/feature-grid";
import { Timeline } from "@/components/timeline";
import { FAQAccordion } from "@/components/faq-accordion";
import { MondayDemoPreview } from "@/components/monday-demo-preview";
import { CTABanner } from "@/components/cta-banner";
import { ActionLink } from "@/components/action-link";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/reveal";
import { MONDAY_DEMO } from "@/lib/content";
import { MONDAY_DEMO_URL } from "@/lib/constants";
import { ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Monday Demo",
  description: "Learn about Monday Demo and jump to the official playbook to share your team's innovation, projects, and learnings across DANA.",
};

const playbook = { label: "Open Official Monday Demo Playbook", href: MONDAY_DEMO_URL, kind: "external", event: "open_monday_demo_playbook" } as const;

export default function MondayDemoPage() {
  return (
    <>
      <PageHero
        icon="Presentation"
        title="Monday Demo"
        description="Share your team's innovation, projects, learnings, and achievements across DANA."
        badge={<Badge><ShieldCheck aria-hidden /> Official Source of Truth</Badge>}
      >
        <ActionLink action={playbook} size="lg" analyticsProps={{ source: "hero" }} />
      </PageHero>

      <Section labelledBy="overview">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeader id="overview" eyebrow="Overview" title="What is Monday Demo?" description={MONDAY_DEMO.overview} />
          </div>
          <Reveal className="rounded-2xl border bg-brand-50/60 p-6">
            <h3 className="font-semibold">Why Monday Demo exists</h3>
            <div className="mt-4"><CheckList items={MONDAY_DEMO.why} /></div>
          </Reveal>
        </div>
      </Section>

      <Section className="bg-white/60" labelledBy="benefits">
        <SectionHeader id="benefits" eyebrow="Benefits" title="Why present at Monday Demo" />
        <div className="mt-8"><FeatureGrid items={MONDAY_DEMO.benefits} columns={4} /></div>
      </Section>

      <Section labelledBy="process">
        <SectionHeader id="process" eyebrow="High-level process" title="Your journey, at a glance" description="A lightweight view. The official playbook holds the detailed steps and templates." align="center" />
        <div className="mt-12"><Timeline steps={MONDAY_DEMO.process} label="Monday Demo user journey" /></div>
      </Section>

      <Section className="bg-white/60" labelledBy="eligibility">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeader id="eligibility" eyebrow="Eligibility" title="Who can take part" />
            <div className="mt-6"><CheckList items={MONDAY_DEMO.eligibility} /></div>
          </div>
          <div>
            <SectionHeader eyebrow="What to expect" title="On the day" />
            <div className="mt-6"><CheckList items={MONDAY_DEMO.expect} /></div>
          </div>
        </div>
      </Section>

      <Section labelledBy="preview">
        <SectionHeader id="preview" eyebrow="Preview" title="See the official playbook" description="This preview is for orientation. Open the playbook to follow the official submission process." />
        <Reveal className="mt-8"><MondayDemoPreview /></Reveal>
      </Section>

      <Section className="bg-white/60" labelledBy="faq">
        <SectionHeader id="faq" eyebrow="FAQs" title="Frequently asked questions" align="center" />
        <div className="mt-10"><FAQAccordion items={MONDAY_DEMO.faqs} /></div>
      </Section>

      <Section>
        <CTABanner title="Ready to share your work?" description="The official playbook has everything you need to submit and participate.">
          <ActionLink action={playbook} variant="secondary" size="lg" analyticsProps={{ source: "cta_banner" }} />
        </CTABanner>
      </Section>
      <RelatedServices current="monday-demo" />
    </>
  );
}
