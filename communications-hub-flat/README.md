# Communications Hub

Internal service portal for DANA Communications. Next.js 15 (App Router), TypeScript, Tailwind CSS, Radix/shadcn-style UI, Framer Motion, Lucide.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Structure

```
src/
├─ app/                      layout, template (page transitions), pages, sitemap, robots
│  ├─ page.tsx               Home
│  └─ services/{monday-demo,bicaradana,internal-announcement,communication-support}/page.tsx
├─ components/               Navbar, Footer, ServiceCard, ExternalServiceCard, SearchBar, SearchResults,
│  │                         AIAssistant, Timeline, FAQAccordion, EligibilityChecker, SectionHeader,
│  │                         CTABanner, ContactCard, EmailTemplate, SupportCatalog, MondayDemoPreview ...
│  └─ ui/                    button, badge, accordion, input (shadcn-style primitives)
├─ hooks/use-service-search.ts
└─ lib/
   ├─ services.ts            service registry (single source for cards, search, assistant)
   ├─ search.ts / intent.ts  client-side intent search and assistant routing
   ├─ content.ts             page copy and FAQs
   ├─ constants.ts           emails, URLs, nav
   ├─ analytics.ts           track() helper + event names
   └─ mailto.ts, icons.ts, utils.ts
```

## Extending
- **New service**: add an entry to `SERVICES` in `lib/services.ts` (set `external: true` to render the
  "Official Source of Truth" `ExternalServiceCard`), then add a page under `app/services/<id>`.
- **Analytics**: edit `dispatch` logic in `lib/analytics.ts` (dataLayer, CustomEvent, optional beacon endpoint).
- **Contacts**: BicaraDANA requests default to `comms.crew@dana.id` in `lib/constants.ts`; change if a dedicated alias exists.
