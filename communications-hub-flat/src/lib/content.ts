import type { IconName } from "./icons";

export interface FaqItem { q: string; a: string }
export interface Step { title: string; description: string; icon?: IconName }
export interface Feature { title: string; description: string; icon: IconName }

/* ------------------------------ Monday Demo ------------------------------ */
export const MONDAY_DEMO = {
  overview:
    "Monday Demo is DANA's recurring showcase where teams share what they have built, learned, and achieved. This page is a quick orientation; the official playbook is the single source of truth for rules, templates, and submission steps.",
  why: [
    "Make great work visible beyond the team that built it.",
    "Create a shared habit of learning in public across business units.",
    "Spark cross-team collaboration by surfacing reusable ideas and approaches.",
  ],
  benefits: [
    { title: "Visibility", description: "Put your team's work in front of leaders and peers across DANA.", icon: "Sparkles" },
    { title: "Shared learning", description: "Turn lessons and experiments into knowledge others can use.", icon: "Lightbulb" },
    { title: "Recognition", description: "Celebrate achievements and the people behind them.", icon: "Trophy" },
    { title: "Collaboration", description: "Find partners and unblock work through cross-team conversations.", icon: "Users" },
  ] satisfies Feature[],
  process: [
    { title: "Learn", description: "Understand what Monday Demo is and whether your topic fits.", icon: "Compass" },
    { title: "Open the Playbook", description: "Go to the official playbook for current guidance and templates.", icon: "FileText" },
    { title: "Follow the Official Process", description: "Submit using the steps described in the playbook.", icon: "Rocket" },
    { title: "Participate", description: "Present your work and share the outcome with the community.", icon: "Presentation" },
  ] satisfies Step[],
  eligibility: [
    "Individuals and teams across DANA with work worth sharing.",
    "Projects, experiments, learnings, or achievements at any stage that others can learn from.",
    "Exact criteria, formats, and slots are defined in the official playbook, so always check there first.",
  ],
  expect: [
    "A short, focused session where the audience is your fellow employees.",
    "Emphasis on outcomes, learnings, and what others can reuse.",
    "Scheduling, templates, and updates are published in the official playbook.",
  ],
  faqs: [
    { q: "Where do I find the official rules and templates?", a: "In the official Monday Demo Playbook. It is the source of truth and is always more current than any summary, including this page." },
    { q: "Does Communications Hub run Monday Demo submissions?", a: "No. Communications Hub only helps you understand the program and routes you to the playbook, where you follow the official submission process." },
    { q: "Can I present something that isn't finished?", a: "Learnings and work-in-progress can be valuable. Check the playbook for what qualifies and how to frame it." },
    { q: "I have a question the playbook doesn't answer.", a: "Reach out to the Communications team at comms.crew@dana.id and we'll point you in the right direction." },
  ] satisfies FaqItem[],
};

/* ------------------------------- BicaraDANA ------------------------------ */
export const BICARADANA = {
  overview:
    "BicaraDANA enables employees to represent DANA externally through speaking opportunities such as public events, webinars, podcasts, conferences, and industry engagements, in a consistent, safe, and well-supported way.",
  why: [
    "Protect DANA's reputation and ensure messages are accurate and aligned.",
    "Match the right speaker to the right opportunity.",
    "Keep confidential information and personal data safe.",
    "Give employees support, coaching, and recognition when they speak on DANA's behalf.",
  ],
  eligibilityNotes: [
    "You must be currently employed by DANA.",
    "Employees in a notice period are not eligible.",
    "Employees in probation require additional review.",
    "Speaking invitations must be reported to Communications, and your manager should be aware.",
  ],
  policies: [
    { title: "Represent DANA publicly", description: "Employees may represent DANA publicly as speakers.", icon: "Mic" },
    { title: "Suitability is decided by Communications", description: "The Communication Team determines suitability for each opportunity.", icon: "BadgeCheck" },
    { title: "Report every invitation", description: "Speaking invitations must be reported.", icon: "FileText" },
    { title: "Notice period", description: "Employees in notice period are not eligible.", icon: "Clock" },
    { title: "Probation", description: "Employees in probation require additional review.", icon: "Users" },
    { title: "No confidential information", description: "No confidential information can be disclosed.", icon: "Lock" },
    { title: "No personal data", description: "No personal data disclosure.", icon: "ShieldCheck" },
    { title: "Anti-bribery", description: "The anti-bribery policy applies to every engagement.", icon: "Gavel" },
    { title: "Day job comes first", description: "Daily job responsibilities remain the priority.", icon: "Target" },
  ] satisfies Feature[],
  steps: [
    { title: "Receive Invitation", description: "You are invited to speak at an external event, webinar, podcast, or conference.", icon: "Mail" },
    { title: "Submit Request", description: "Report the invitation to Communications with event details and your manager's acknowledgment.", icon: "FileText" },
    { title: "Communications Review", description: "The Communication Team assesses suitability, topic, audience, and risk.", icon: "BadgeCheck" },
    { title: "Speaker Confirmation", description: "Once approved, your participation is confirmed with you and the organizer.", icon: "Users" },
    { title: "Content Review", description: "Talking points and slides are reviewed for accuracy, confidentiality, and personal data.", icon: "ShieldCheck" },
    { title: "Preparation", description: "Prepare with guidance and coaching from Communications as needed.", icon: "Compass" },
    { title: "Speaking Engagement", description: "Deliver your session and represent DANA with confidence.", icon: "Mic" },
    { title: "Post Event Reporting", description: "Share outcomes, highlights, and learnings with Communications.", icon: "Trophy" },
  ] satisfies Step[],
  faqs: [
    { q: "I was invited to speak. What should I do first?", a: "Report the invitation to Communications before accepting, so suitability can be reviewed and you get the right support." },
    { q: "Do I need my manager's approval?", a: "Your manager should acknowledge the engagement, as your daily responsibilities remain the priority. Communications will ask about this during review." },
    { q: "Can I speak about a project I work on?", a: "Possibly, but content is reviewed to make sure no confidential information or personal data is disclosed." },
    { q: "I'm in probation. Can I still apply?", a: "Employees in probation require additional review, so submit a request and Communications will assess it." },
    { q: "Can I accept an honorarium or gift from the organizer?", a: "The anti-bribery policy applies. Please disclose any offer to Communications before accepting." },
  ] satisfies FaqItem[],
};

/* ------------------------- Internal Announcement ------------------------- */
export const INTERNAL_ANNOUNCEMENT = {
  overview:
    "The Internal Communications team helps you reach employees with clear, timely, and well-targeted announcements, from company-wide news to updates that affect specific teams.",
  whenToUse: [
    "You need to inform many employees or an entire business unit about something important.",
    "A change, launch, or policy needs a consistent, approved message.",
    "You want help choosing the right channel, timing, and tone.",
  ],
  qualifies: [
    { title: "Company-wide news", description: "Organizational updates, milestones, and leadership messages.", icon: "Megaphone" },
    { title: "Product & program launches", description: "New tools, programs, or initiatives employees should know about.", icon: "Rocket" },
    { title: "Policy & process changes", description: "Updates that change how employees work.", icon: "FileText" },
    { title: "Events & campaigns", description: "Internal events, campaigns, and calls to participate.", icon: "CalendarDays" },
    { title: "Recognition", description: "Celebrating teams, achievements, and employees.", icon: "Trophy" },
    { title: "Time-sensitive updates", description: "Operational notices that need rapid, clear communication.", icon: "Clock" },
  ] satisfies Feature[],
  bestPractices: [
    { title: "Lead with what changes", description: "Say what's happening and what employees need to do in the first lines." },
    { title: "Know your audience", description: "Target the people who are actually affected to avoid noise." },
    { title: "Plan the timing", description: "Share your preferred date early so the team can schedule the right channel." },
    { title: "Bring approved facts", description: "Confirm details and stakeholder sign-off before you submit." },
    { title: "Provide a next step", description: "Include a link, owner, or deadline so employees can act." },
  ] satisfies Step[],
  prepare: [
    "A clear subject line summarizing the announcement",
    "Business context: why this matters now",
    "The objective: what you want employees to know or do",
    "Target audience: all employees, a business unit, or a group",
    "Preferred date and any hard deadlines",
    "Supporting materials: drafts, links, visuals, FAQs",
  ],
  template: ["Subject", "Business Context", "Announcement Objective", "Target Audience", "Preferred Date", "Supporting Materials"] as const,
  faqs: [
    { q: "How early should I reach out?", a: "As early as possible. Sharing your preferred date upfront lets the team plan the channel and timing with you." },
    { q: "Do I need to write the announcement myself?", a: "A draft or key points help, but it isn't required. Internal Communications can help shape the message." },
    { q: "Is my topic appropriate for an announcement?", a: "If it affects many employees or needs a consistent message, it likely qualifies. Contact the team and they'll advise." },
    { q: "Who approves the final message?", a: "Your business owner and the Internal Communications team align on the final version before it is sent." },
  ] satisfies FaqItem[],
};

/* ------------------------- Communication Support ------------------------- */
export type SupportCategory = "Media" | "Reputation" | "Strategy";

export interface SupportService {
  id: string;
  title: string;
  category: SupportCategory;
  icon: IconName;
  description: string;
  useCases: string[];
  benefits: string[];
}

export const SUPPORT_SERVICES: SupportService[] = [
  { id: "press-release", title: "Press Release", category: "Media", icon: "Newspaper",
    description: "Drafting and distributing official announcements to the media.",
    useCases: ["Product or partnership launches", "Corporate milestones", "Official statements"],
    benefits: ["Consistent, on-brand messaging", "Wider earned media reach"] },
  { id: "media-interview", title: "Media Interview", category: "Media", icon: "Mic",
    description: "Coordination, briefing, and preparation for journalist interviews.",
    useCases: ["Journalist interview requests", "Feature stories", "Expert commentary"],
    benefits: ["Confident, prepared spokespeople", "Accurate representation in the press"] },
  { id: "media-event", title: "Media Event", category: "Media", icon: "CalendarDays",
    description: "Planning and running press conferences, briefings, and media gatherings.",
    useCases: ["Launch events", "Press briefings", "Media roundtables"],
    benefits: ["Strong media attendance", "Controlled, coordinated narrative"] },
  { id: "thought-leadership", title: "Thought Leadership", category: "Reputation", icon: "Lightbulb",
    description: "Positioning DANA experts through articles, op-eds, and commentary.",
    useCases: ["Op-ed and bylined articles", "Industry commentary", "Expert positioning"],
    benefits: ["Credibility in your domain", "Long-term brand authority"] },
  { id: "executive-profiling", title: "Executive Profiling", category: "Reputation", icon: "UserRound",
    description: "Building the public profile and voice of DANA leaders.",
    useCases: ["Leader visibility plans", "Profile features", "Speaking and media positioning"],
    benefits: ["Trusted leadership presence", "Stronger stakeholder confidence"] },
  { id: "awards-support", title: "Awards Support", category: "Reputation", icon: "Trophy",
    description: "Identifying, preparing, and submitting award nominations.",
    useCases: ["Industry award nominations", "Submission writing and review", "Award announcements"],
    benefits: ["Third-party validation", "Recognition for teams and products"] },
  { id: "social-listening", title: "Social Listening", category: "Strategy", icon: "Ear",
    description: "Understanding public conversation and sentiment around topics and campaigns.",
    useCases: ["Campaign sentiment tracking", "Topic and trend insights", "Emerging issues"],
    benefits: ["Early warning on issues", "Insight-led decisions"] },
  { id: "monitoring-support", title: "Monitoring Support", category: "Strategy", icon: "Activity",
    description: "Media and online monitoring for coverage and mentions.",
    useCases: ["Coverage tracking", "Competitor and industry watch", "Incident monitoring"],
    benefits: ["Visibility into coverage", "Faster, informed responses"] },
  { id: "communication-consultation", title: "Communication Consultation", category: "Strategy", icon: "MessagesSquare",
    description: "Advice on messaging, audiences, channels, and communication approach.",
    useCases: ["Message review", "Audience and channel advice", "Sensitive communication questions"],
    benefits: ["Clarity before you communicate", "Reduced risk and rework"] },
  { id: "strategic-communications", title: "Strategic Communications Support", category: "Strategy", icon: "Compass",
    description: "End-to-end communication planning for key initiatives and programs.",
    useCases: ["Initiative communication plans", "Stakeholder mapping", "Multi-channel campaigns"],
    benefits: ["Aligned messaging across channels", "Measurable communication outcomes"] },
];

export const SUPPORT_TEMPLATE = [
  "Request Type", "Business Objective", "Expected Outcome", "Timeline", "Business Owner", "Stakeholders", "Background", "Supporting Materials",
] as const;

export const SUPPORT_FAQS: FaqItem[] = [
  { q: "I'm not sure which service I need.", a: "Choose Communication Consultation or just describe your goal in the request. The team will help identify the right support." },
  { q: "How much detail should I include?", a: "The more context on objective, timeline, and stakeholders, the faster the team can respond. The template covers the essentials." },
  { q: "Can I request more than one type of support?", a: "Yes. Describe your overall objective and the team will recommend the right combination." },
];
