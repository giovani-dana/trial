import { ArrowRight, Compass, MousePointerClick, Route, Sparkles } from "lucide-react";
import { HeroBackground } from "@/components/hero-background";
import { Situations } from "@/components/situations";
import { SpotlightCard } from "@/components/spotlight";
import { HomeSearch } from "@/components/home-search";
import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import { ServiceRenderer } from "@/components/service-card";
import { Reveal } from "@/components/reveal";
import { AIAssistant } from "@/components/ai-assistant";
import { CTABanner } from "@/components/cta-banner";
import { ActionLink } from "@/components/action-link";
import { Badge } from "@/components/ui/badge";
import { SERVICES } from "@/lib/services";
import { CONTACTS } from "@/lib/constants";
import { buildMailto } from "@/lib/mailto";
import { Button } from "@/components/ui/button";

const HOW = [
  { icon: Compass, title: "Tell us what you need", text: "Search or ask the assistant in your own words." },
  { icon: Route, title: "Get routed", text: "We point you to the right service, process, and team." },
  { icon: MousePointerClick, title: "Take action", text: "Open the playbook or send a pre-filled request." },
];

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-hero-gradient" aria-labelledby="hero-title">
        <HeroBackground />
        <div className="container relative pb-16 pt-14 text-center sm:pb-24 sm:pt-24">
          <Reveal>
            <Badge className="mb-6 bg-white/80 backdrop-blur"><Sparkles aria-hidden /> DANA internal service portal</Badge>
            <h1 id="hero-title" className="text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
              <span className="text-shimmer">Communications</span> Hub
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-balance text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Your one-stop destination for communication support, speaking opportunities, internal announcements, and employee showcases.
            </p>
          </Reveal>
          <Reveal delay={0.15} className="mt-10">
            <HomeSearch />
          </Reveal>
        </div>
      </section>

      <Section className="pb-0 sm:pb-0" labelledBy="situations-title">
        <SectionHeader id="situations-title" eyebrow="Common situations" title="Start with what's happening" description="Jump straight to the right step." />
        <Situations />
      </Section>

      <Section labelledBy="services-title">
        <SectionHeader id="services-title" eyebrow="Services" title="Everything Communications, in one place" description="Pick a service to understand the process, requirements, and who to talk to." />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {SERVICES.map((s, i) => (
            <Reveal key={s.id} delay={(i % 2) * 0.08} className="h-full">
              <ServiceRenderer service={s} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="bg-white/60" labelledBy="how-title">
        <SectionHeader id="how-title" eyebrow="How it works" title="From question to the right channel in seconds" align="center" />
        <ol className="mt-10 grid gap-5 md:grid-cols-3">
          {HOW.map((h, i) => (
            <Reveal as="li" key={h.title} delay={i * 0.08} className="h-full">
              <SpotlightCard className="h-full p-6">
                <span className="absolute right-5 top-4 text-4xl font-semibold text-brand-100" aria-hidden>{i + 1}</span>
                <span className="flex size-11 items-center justify-center rounded-xl bg-brand-100 text-brand-700"><h.icon className="size-5" aria-hidden /></span>
                <h3 className="mt-4 font-semibold">{h.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{h.text}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section labelledBy="assistant-title">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHeader id="assistant-title" eyebrow="Assistant" title="What do you need help with?" description="Describe your situation in a sentence. The assistant recommends the right service and the next step. It runs entirely in your browser." />
            <Reveal delay={0.1} className="mt-6 flex flex-wrap gap-3">
              <Button asChild variant="outline"><a href="#services-title">Browse services <ArrowRight aria-hidden /></a></Button>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <div className="glass overflow-hidden rounded-3xl">
              <AIAssistant compact />
            </div>
          </Reveal>
        </div>
      </Section>

      <Section className="pt-0 sm:pt-0">
        <CTABanner title="Not sure where to start?" description="Tell the Communications team about your goal and we'll point you in the right direction.">
          <ActionLink
            variant="secondary"
            size="lg"
            action={{ label: "Request Support", href: buildMailto({ to: CONTACTS.commsCrew, subject: "Communication Support Request" }), kind: "mailto", event: "contact_comms_crew" }}
          />
        </CTABanner>
      </Section>
    </>
  );
}
