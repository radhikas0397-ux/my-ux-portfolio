export type CaseStudyBlock = {
  overview: string;
  problem: string;
  role: string;
  users: string;
  research: string[];
  insights: string[];
  decisions: { title: string; body: string }[];
  solution: string;
  impact: { value: string; label: string }[];
  learnings: string[];
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  year: string;
  description: string;
  role: string;
  tags: string[];
  outcome: string;
  /** tailwind gradient classes used for the large image placeholder */
  gradient: string;
  accent: string;
  caseStudy: CaseStudyBlock;
};

export const projects: Project[] = [
  {
    slug: "buyer-web-app",
    title: "Buyer Web App",
    category: "Product Design · Web App",
    year: "2025",
    description:
      "An end-to-end purchasing experience that turns a fragmented buying journey into a single, confident flow — from discovery to checkout.",
    role: "Lead Product Designer",
    tags: ["Product Design", "User Journeys", "Design System", "Web"],
    outcome: "42% faster checkout · +18% completed orders",
    gradient: "from-indigo-500/30 via-violet-500/20 to-sky-500/20",
    accent: "#a78bfa",
    caseStudy: {
      overview:
        "The Buyer Web App is the primary surface where customers discover, evaluate, and purchase products. I redesigned the journey to reduce friction and build trust at every step.",
      problem:
        "The legacy flow was stitched together from multiple internal tools. Buyers dropped off at evaluation and checkout because pricing, availability, and order status were scattered across disconnected screens.",
      role: "I led product design end-to-end: discovery research, journey mapping, IA, interaction design, prototyping, and design-system contributions, partnering closely with PM and two engineers.",
      users:
        "Procurement managers and small-business owners who buy in bulk, often comparing several suppliers under time pressure and needing predictable delivery.",
      research: [
        "12 moderated interviews with active and churned buyers.",
        "Funnel analysis across 90 days of checkout behaviour.",
        "Competitive teardown of 6 B2B purchasing platforms.",
        "Unmoderated tree-testing to validate a simplified IA.",
      ],
      insights: [
        "Buyers abandoned when they couldn't trust delivery timelines.",
        "Hidden fees at the last step were the single biggest drop-off cause.",
        "Power users wanted to re-order in two clicks, not re-discover.",
        "Mobile was 38% of traffic but treated as an afterthought.",
      ],
      decisions: [
        {
          title: "Surface trust early",
          body: "Pricing, availability, and delivery estimates moved to the product surface so decisions happen before checkout, not during it.",
        },
        {
          title: "A single, linear checkout",
          body: "Collapsed a 5-step process into a focused 2-step flow with a persistent order summary and zero surprise fees.",
        },
        {
          title: "Re-order shortcuts",
          body: "Introduced saved carts and one-tap re-ordering for repeat procurement workflows.",
        },
      ],
      solution:
        "A calm, content-first interface with a consistent component language. The journey now reads as one continuous story: discover, build confidence, and check out — fully responsive across desktop and mobile.",
      impact: [
        { value: "42%", label: "Faster checkout time" },
        { value: "+18%", label: "Completed orders" },
        { value: "−27%", label: "Support tickets" },
      ],
      learnings: [
        "Trust is a design material — exposing the right information early did more than any visual polish.",
        "Designing the re-order path first reframed the entire IA around real buyer rhythms.",
      ],
    },
  },
  {
    slug: "carbon-wallet",
    title: "Carbon Wallet",
    category: "Climate-tech · Fintech",
    year: "2025",
    description:
      "A consumer climate-tech product that makes carbon footprint legible — tracking, offsetting, and rewarding low-carbon choices in one elegant wallet.",
    role: "Product & UI Designer",
    tags: ["Climate-tech", "Fintech", "UI Design", "Data Viz"],
    outcome: "4.8★ rated · 2.3× weekly engagement",
    gradient: "from-emerald-500/30 via-teal-500/20 to-lime-500/15",
    accent: "#5eead4",
    caseStudy: {
      overview:
        "Carbon Wallet helps everyday people understand and reduce their carbon footprint. I designed a system that translates abstract emissions data into clear, motivating actions.",
      problem:
        "Carbon is invisible and intimidating. Existing tools either over-simplified to the point of being meaningless or buried users in charts they couldn't act on.",
      role: "I owned product and UI design — defining the data model with engineering, designing the visual language, and building an interactive prototype for user testing.",
      users:
        "Climate-conscious individuals aged 22–40 who want to act but feel overwhelmed by guilt-driven, jargon-heavy sustainability apps.",
      research: [
        "Diary study with 9 participants over two weeks.",
        "Card sorting to define meaningful footprint categories.",
        "Reviewed peer-reviewed methodology for emissions estimates.",
        "A/B concept tests on framing: 'reduce' vs 'reward'.",
      ],
      insights: [
        "Positive framing outperformed guilt-based messaging 3:1.",
        "Users trusted the number more when the method was visible.",
        "Small, repeatable actions sustained engagement better than big pledges.",
        "A 'wallet' metaphor made carbon feel ownable and trackable.",
      ],
      decisions: [
        {
          title: "Carbon as a balance",
          body: "Framed emissions as a balance you actively manage — earn green credits, spend on verified offsets.",
        },
        {
          title: "Readable data viz",
          body: "Designed a restrained chart system: one hero metric, progressive disclosure for detail seekers.",
        },
        {
          title: "Streaks that respect users",
          body: "Gentle nudges and streaks that reward consistency without manipulative dark patterns.",
        },
      ],
      solution:
        "A warm, trustworthy wallet interface where the headline footprint, weekly trends, and verified offset marketplace live together — turning climate anxiety into momentum.",
      impact: [
        { value: "4.8★", label: "Average store rating" },
        { value: "2.3×", label: "Weekly active engagement" },
        { value: "61%", label: "Took a low-carbon action" },
      ],
      learnings: [
        "Transparency of method built more trust than a prettier dashboard ever could.",
        "Designing for hope, not guilt, fundamentally changed retention.",
      ],
    },
  },
  {
    slug: "partner-dashboard",
    title: "Partner Dashboard",
    category: "Dashboard · B2B SaaS",
    year: "2024",
    description:
      "A data-dense operations dashboard that gives partners real-time visibility and control — designed to scan in seconds, drill in when needed.",
    role: "Senior Product Designer",
    tags: ["Dashboard Design", "Data Viz", "Design System", "B2B"],
    outcome: "−35% time-to-insight · adopted by 200+ partners",
    gradient: "from-sky-500/30 via-blue-500/20 to-indigo-500/20",
    accent: "#60a5fa",
    caseStudy: {
      overview:
        "The Partner Dashboard is the daily control center for business partners managing performance, payouts, and inventory. I redesigned it to be scannable, fast, and trustworthy at scale.",
      problem:
        "Partners managed their business across spreadsheets and emails. The original dashboard showed everything at once, so nothing stood out and key decisions were slow.",
      role: "I led the redesign as senior designer — establishing a dashboard framework, data-viz guidelines, and a scalable component library used across the platform.",
      users:
        "Operations leads and account managers who live in the product all day and need to act on anomalies before they become problems.",
      research: [
        "Contextual inquiry with 7 partner teams in their workflow.",
        "Heatmap and session-replay analysis of the legacy dashboard.",
        "Prioritisation workshops to define the 'first five seconds'.",
        "Iterative usability testing across three prototype rounds.",
      ],
      insights: [
        "Partners checked the same 3 metrics before anything else.",
        "Anomalies needed to find the user — not the other way around.",
        "Density was fine; lack of hierarchy was the real problem.",
        "Customisation mattered, but smart defaults mattered more.",
      ],
      decisions: [
        {
          title: "A clear visual hierarchy",
          body: "Built a strict typographic and spacing scale so the most important numbers always win attention.",
        },
        {
          title: "Insight, not just data",
          body: "Added contextual deltas, thresholds, and proactive alerts so the dashboard interprets, not just reports.",
        },
        {
          title: "Composable widgets",
          body: "A modular grid of widgets with sensible defaults and optional per-team customisation.",
        },
      ],
      solution:
        "A calm, high-contrast dashboard with a confident grid, a disciplined chart palette, and alerting that surfaces what needs attention first — all responsive down to tablet.",
      impact: [
        { value: "−35%", label: "Time to insight" },
        { value: "200+", label: "Partners onboarded" },
        { value: "+24%", label: "Daily active usage" },
      ],
      learnings: [
        "In dense interfaces, hierarchy is the feature — restraint outperformed more data.",
        "A shared component library kept quality high as the surface area grew.",
      ],
    },
  },
  {
    slug: "virtual-field-tour",
    title: "Virtual Field Tour",
    category: "AI-assisted · Immersive",
    year: "2024",
    description:
      "An AI-assisted immersive experience that lets teams explore remote sites virtually — guided walkthroughs, smart annotations, and shared context.",
    role: "Product Designer",
    tags: ["AI-assisted Design", "Immersive", "Prototyping", "UX Research"],
    outcome: "Cut site visits by 50% · faster decisions",
    gradient: "from-fuchsia-500/30 via-purple-500/20 to-rose-500/15",
    accent: "#e879f9",
    caseStudy: {
      overview:
        "Virtual Field Tour replaces costly, slow on-site visits with guided, AI-assisted virtual walkthroughs — so distributed teams can assess sites together, remotely.",
      problem:
        "Physical site visits were expensive, slow to schedule, and hard to share. By the time stakeholders aligned, conditions had often changed.",
      role: "I designed the product experience: the walkthrough interaction model, AI annotation flows, and the collaborative review layer, prototyping heavily to de-risk novel interactions.",
      users:
        "Field engineers, project leads, and remote stakeholders who need shared, accurate context to make confident go/no-go decisions.",
      research: [
        "Ride-alongs on 4 real site visits to map the current workflow.",
        "Wizard-of-Oz tests for AI-generated annotations.",
        "Concept testing on spatial navigation patterns.",
        "Trust & explainability interviews around AI suggestions.",
      ],
      insights: [
        "Users trusted AI annotations only when they could verify the source.",
        "Orientation was the hardest part of any virtual space.",
        "Shared, persistent comments mattered more than live presence.",
        "Decisions stalled without a clear 'what changed since last time'.",
      ],
      decisions: [
        {
          title: "Always-oriented navigation",
          body: "A persistent mini-map and guided paths so users never feel lost in the virtual space.",
        },
        {
          title: "Explainable AI annotations",
          body: "Every AI insight links to its source frame and confidence, keeping humans in control.",
        },
        {
          title: "Asynchronous collaboration",
          body: "Threaded, location-anchored comments and a change-log so teams align across time zones.",
        },
      ],
      solution:
        "An immersive yet legible interface where AI does the heavy lifting — spotting issues and drafting notes — while people stay firmly in the decision seat.",
      impact: [
        { value: "−50%", label: "On-site visits required" },
        { value: "3×", label: "Faster stakeholder alignment" },
        { value: "92%", label: "Found AI notes trustworthy" },
      ],
      learnings: [
        "AI earns trust through explainability, not magic — sourcing every suggestion was non-negotiable.",
        "For novel interactions, prototyping early saved months of misalignment.",
      ],
    },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
