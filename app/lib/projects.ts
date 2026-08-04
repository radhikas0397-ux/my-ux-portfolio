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
  /** tailwind gradient classes used for the mockup backdrop */
  gradient: string;
  accent: string;
  mockups: {
    desktop?: string;
    mobile?: string;
    cover?: string;
    /** optional dedicated mobile crop, paired with `cover` via <picture> */
    coverMobile?: string;
    /** aspect ratio for the cover frame, e.g. "16/9" (defaults to 3/2) */
    coverAspect?: string;
    alt?: string;
  };
  caseStudy: CaseStudyBlock;
};

export const projects: Project[] = [
  {
    slug: "buyer-web-app",
    title: "Buyer Dashboard",
    category: "Product Design · Dashboard",
    year: "2025",
    description:
      "An end-to-end purchasing experience that turns a fragmented buying journey into a single, confident flow.",
    role: "Lead Product Designer",
    tags: ["Product Design", "User Journeys", "Design System", "Web"],
    outcome: "42% faster checkout · +18% completed orders",
    gradient: "from-indigo-500/30 via-violet-500/20 to-sky-500/20",
    accent: "#a78bfa",
    mockups: {
      desktop: "/images/projects/buyer-dashboard-card.png",
      cover: "/images/projects/buyer-dashboard-cover-desktop.webp",
      coverMobile: "/images/projects/buyer-dashboard-cover-mobile.webp",
      coverAspect: "16/9",
      alt: "Buyer Dashboard carbon marketplace and impact platform case study",
    },
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
      "A consumer climate-tech product that makes carbon footprint tracking, offsetting, and rewards easier to understand.",
    role: "Product & UI Designer",
    tags: ["Climate Tech", "Fintech", "UI Design", "Data Viz"],
    outcome: "4.8★ rated · 2.3× weekly engagement",
    gradient: "from-emerald-500/30 via-teal-500/20 to-lime-500/15",
    accent: "#5eead4",
    mockups: {},
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
    category: "SaaS · Dashboard",
    year: "2024",
    description:
      "A dashboard experience designed to help partners track project performance, insights, and operational progress.",
    role: "Senior Product Designer",
    tags: ["Dashboard", "SaaS", "Data", "UX"],
    outcome: "−35% time-to-insight · adopted by 200+ partners",
    gradient: "from-sky-500/30 via-blue-500/20 to-indigo-500/20",
    accent: "#60a5fa",
    mockups: {},
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
    title: "Carbon Project Virtual Tour",
    category: "Immersive Experience · Climate Tech",
    year: "2024",
    description:
      "A virtual storytelling experience that helps buyers understand carbon projects through an interactive field journey.",
    role: "Product Designer",
    tags: ["Storytelling", "Immersive UX", "Climate Tech", "Web"],
    outcome: "Cut site visits by 50% · faster decisions",
    gradient: "from-fuchsia-500/30 via-purple-500/20 to-rose-500/15",
    accent: "#e879f9",
    mockups: {
      desktop: "/images/projects/virtual-field-tour-card.png",
      cover: "/images/projects/carbon-project-virtual-tour-flat.png",
      alt: "Carbon Project Virtual Tour flat illustration cover",
    },
    caseStudy: {
      overview:
        "Carbon Project Virtual Tour replaces costly, slow on-site visits with guided, AI-assisted virtual walkthroughs — so distributed teams can assess sites together, remotely.",
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
  {
    slug: "pet-walking-app",
    title: "Pet Walking App",
    category: "Product Design · Mobile App",
    year: "2025",
    description:
      "A mobile booking experience that helps pet owners find trusted walkers, schedule walks, and track their pets in real time.",
    role: "Product Designer",
    tags: ["Product Design", "Mobile App", "UX", "UI Design"],
    outcome: "End-to-end booking flow · real-time walk tracking",
    gradient: "from-amber-500/30 via-orange-500/20 to-yellow-500/15",
    accent: "#fbbf24",
    mockups: {
      desktop: "/images/projects/pet-walk-app-card.png",
      cover: "/images/projects/dog-walking-app-cover-desktop.png",
      alt: "Dog Walking App mobile UX/UI case study cover",
    },
    caseStudy: {
      overview:
        "Pet Walking App connects busy pet owners with reliable walkers through a simple mobile booking flow, live walk updates, and clear communication at every step.",
      problem:
        "Pet owners struggled to book walks quickly, compare walker availability, and stay informed once a walk was in progress. Existing options felt fragmented and lacked transparency.",
      role: "I led product and UI design for the mobile experience — mapping user flows, designing key screens, and prototyping the booking and walk-tracking journey.",
      users:
        "Urban pet owners who need flexible, trustworthy walk scheduling and want visibility into their pet's care while they are away.",
      research: [
        "Interviews with 8 pet owners about booking habits and trust signals.",
        "Competitive review of 5 pet-care and on-demand service apps.",
        "Usability testing on the booking and checkout prototype.",
        "Journey mapping from discovery through post-walk feedback.",
      ],
      insights: [
        "Trust in the walker mattered more than the lowest price.",
        "Owners wanted confirmation and live updates without constant checking.",
        "Scheduling flexibility was a top reason to choose one app over another.",
        "Clear pet profiles reduced back-and-forth before booking.",
      ],
      decisions: [
        {
          title: "A guided booking flow",
          body: "Structured walk booking into clear steps — pet details, schedule, walker match, and confirmation — so owners could book with confidence.",
        },
        {
          title: "Live walk visibility",
          body: "Designed an in-progress walk view with status updates and key milestones so owners felt connected without micromanaging.",
        },
        {
          title: "Walker trust signals",
          body: "Surfaced ratings, reviews, and profile details early in the flow to help owners choose the right walker quickly.",
        },
      ],
      solution:
        "A warm, approachable mobile interface with a focused booking flow, transparent walker profiles, and real-time walk tracking — making pet care feel reliable and easy to manage.",
      impact: [
        { value: "4.6★", label: "Prototype usability rating" },
        { value: "−40%", label: "Steps to complete booking" },
        { value: "92%", label: "Found walk status clear" },
      ],
      learnings: [
        "For care-based products, trust signals belong early in the flow, not after checkout.",
        "Real-time updates work best when they show progress, not just location.",
      ],
    },
  },
  {
    slug: "farmer-wallet",
    title: "Farmer Wallet",
    category: "Product Design · Mobile App",
    year: "2025",
    description:
      "A mobile wallet experience that helps farmers manage balances, payments, and agricultural financial services in one clear place.",
    role: "Product Designer",
    tags: ["Product Design", "Mobile App", "Fintech", "Agriculture"],
    outcome: "Clearer wallet overview · faster everyday payments",
    gradient: "from-sky-500/30 via-blue-500/20 to-emerald-500/15",
    accent: "#3b82f6",
    mockups: {
      desktop: "/images/projects/farmer-wallet-card.png",
      cover: "/images/projects/farmer-app-cover-desktop.webp",
      coverMobile: "/images/projects/farmer-app-cover-mobile.webp",
      coverAspect: "16/9",
      alt: "Farmer App mobile product design case study",
    },
    caseStudy: {
      overview:
        "Farmer Wallet brings everyday payments, balances, and agri-financial services into a single mobile experience designed for clarity and trust.",
      problem:
        "Farmers often juggled multiple apps and offline processes to check balances, send money, and access loans or insurance — making financial decisions slower and harder to trust.",
      role: "I designed the mobile wallet experience — information architecture, key screens, and interaction patterns for balances, quick actions, and financial services.",
      users:
        "Farmers and rural users who need a simple, trustworthy way to manage money and access agriculture-specific financial tools on mobile.",
      research: [
        "Interviews with farmers about payment habits and trust barriers.",
        "Competitive review of rural fintech and agri-wallet products.",
        "Usability testing on wallet overview and quick-action flows.",
        "Journey mapping from check balance to send money and apply for services.",
      ],
      insights: [
        "Balance visibility and privacy controls needed to sit side by side.",
        "Quick actions mattered more than deep nested menus.",
        "Agri-specific services needed clear icons and plain language.",
        "Trust grew when earnings and available balance were separated clearly.",
      ],
      decisions: [
        {
          title: "A scannable wallet overview",
          body: "Led with available balance and lifetime earnings cards so users could understand money at a glance.",
        },
        {
          title: "Quick actions first",
          body: "Surfaced scan, transfer, bank, and history as primary actions to speed up everyday tasks.",
        },
        {
          title: "Agri-financial services grid",
          body: "Grouped crop insurance, loans, deposits, and gold into a simple tile grid with clear icons.",
        },
      ],
      solution:
        "A calm blue-and-white mobile wallet with clear hierarchy, quick actions, and agriculture-focused financial services — designed to feel reliable for everyday rural use.",
      impact: [
        { value: "−35%", label: "Time to complete a transfer" },
        { value: "4.7★", label: "Prototype clarity rating" },
        { value: "+28%", label: "Service discovery in testing" },
      ],
      learnings: [
        "In fintech for rural users, clarity beats feature density every time.",
        "Separating available cash from lifetime earnings reduced confusion immediately.",
      ],
    },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
