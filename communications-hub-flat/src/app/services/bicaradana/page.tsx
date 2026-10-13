import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { RelatedServices } from "@/components/related-services";
import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import { FeatureGrid, CheckList } from "@/components/feature-grid";
import { Timeline } from "@/components/timeline";
import { FAQAccordion } from "@/components/faq-accordion";
import { EligibilityChecker } from "@/components/eligibility-checker";
import { ContactCard } from "@/components/contact-card";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { BICARADANA } from "@/lib/content";
import { CONTACTS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "BicaraDANA",
  description: "Represent DANA as a speaker in public events, webinars, podcasts, conferences, and industry engagements. Check eligibility, policy, and the process.",
};

export default function BicaraDanaPage() {
  return (
    <>
      <PageHero
        icon="Mic"
        title="BicaraDANA"
        description="Represent DANA as a speaker in public events, webinars, podcasts, conferences, and industry engagements."
      >
        <Button asChild size="lg"><a href="#eligibility">Check your eligibility</a></Button>
        <Button asChild size="lg" variant="outline"><a href="#process">See the process</a></Button>
      </PageHero>

      <Section labelledBy="overview">
        <div className="grid gap-10 lg:grid-cols-2">
          <SectionHeader id="overview" eyebrow="Overview" title="Speak for DANA, with support" description={BICARADANA.overview} />
          <Reveal className="rounded-2xl border bg-brand-50/60 p-6">
            <h3 className="font-semibold">Why BicaraDANA exists</h3>
            <div className="mt-4"><CheckList items={BICARADANA.why} /></div>
          </Reveal>
        </div>
      </Section>

      <Section id="eligibility" className="bg-white/60" labelledBy="elig-title">
        <SectionHeader id="elig-title" eyebrow="Eligibility" title="Are you eligible to speak?" description="Answer four quick questions to see where you stand." align="center" />
        <div className="mt-10"><EligibilityChecker /></div>
        <div className="mx-auto mt-10 max-w-2xl rounded-2xl border bg-card p-6">
          <h3 className="text-sm font-semibold">Eligibility at a glance</h3>
          <div className="mt-4"><CheckList items={BICARADANA.eligibilityNotes} /></div>
        </div>
      </Section>

      <Section labelledBy="policy">
        <SectionHeader id="policy" eyebrow="Policy highlights" title="What to keep in mind" description="A summary of the key rules that apply to every speaking engagement." />
        <div className="mt-8"><FeatureGrid items={BICARADANA.policies} /></div>
      </Section>

      <Section id="process" className="bg-white/60" labelledBy="process-title">
        <SectionHeader id="process-title" eyebrow="Process journey" title="From invitation to impact" description="Eight steps, with Communications alongside you throughout." align="center" />
        <div className="mt-12"><Timeline steps={BICARADANA.steps} label="BicaraDANA process" /></div>
      </Section>

      <Section labelledBy="faq">
        <SectionHeader id="faq" eyebrow="FAQ" title="Frequently asked questions" align="center" />
        <div className="mt-10"><FAQAccordion items={BICARADANA.faqs} /></div>
      </Section>

      <Section className="bg-white/60" labelledBy="contact">
        <SectionHeader id="contact" eyebrow="Contact" title="Talk to the Communications team" />
        <Reveal className="mt-8">
          <ContactCard
            title="BicaraDANA requests"
            description="Report a speaking invitation or ask a question about the program."
            email={CONTACTS.bicaradana}
            subject="BicaraDANA Speaking Request"
            body={"Event / Organizer:\n\nDate:\n\nTopic:\n\nAudience:\n\nManager acknowledged (Yes/No):"}
            cta="Submit a request"
            icon="Mic"
            event="start_bicaradana"
          />
        </Reveal>
      </Section>
      <RelatedServices current="bicaradana" />
    </>
  );
}
