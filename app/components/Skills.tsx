"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  BarChart3,
  Blocks,
  Brain,
  Compass,
  Leaf,
  MousePointerClick,
  Palette,
  Search,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { GlowOrb, SkillLevelBadge } from "./ui/GamifiedUI";

const ease = [0.21, 0.47, 0.32, 0.98] as const;

const skillCardTitleClass =
  "text-[22px] font-bold leading-[1.15] tracking-[-0.02em] lg:text-[26px]";
const skillCardBodyClass = "text-base leading-[1.55] text-[rgba(255,255,255,0.78)]";

type SkillCard = {
  id: string;
  title: string;
  quote: string;
  methods: string;
  Icon: LucideIcon;
  level: number;
};

const SKILLS: SkillCard[] = [
  {
    id: "research",
    title: "UX Research",
    quote: "I uncover the real problem before designing the solution.",
    methods: "Interviews, Usability Testing, Synthesis",
    Icon: Search,
    level: 5,
  },
  {
    id: "product",
    title: "Product Design",
    quote:
      "I design end-to-end flows that balance user needs and business goals.",
    methods: "User Journeys, Flows, Strategy",
    Icon: Compass,
    level: 5,
  },
  {
    id: "ui",
    title: "UI Design",
    quote: "I create clean, accessible interfaces with strong visual hierarchy.",
    methods: "Layout, Typography, Interaction",
    Icon: Palette,
    level: 5,
  },
  {
    id: "dashboard",
    title: "Dashboard Design",
    quote: "I make complex data easier to scan, understand, and act on.",
    methods: "Data Viz, KPIs, Filters",
    Icon: BarChart3,
    level: 4,
  },
  {
    id: "systems",
    title: "Design Systems",
    quote: "I build reusable patterns that help teams move faster.",
    methods: "Components, Tokens, Guidelines",
    Icon: Blocks,
    level: 4,
  },
  {
    id: "prototype",
    title: "Prototyping",
    quote: "I test ideas quickly before they become expensive to build.",
    methods: "Figma, Framer, Interactive Flows",
    Icon: MousePointerClick,
    level: 5,
  },
  {
    id: "ai",
    title: "AI-assisted Design",
    quote:
      "I use AI to explore, prototype, and improve workflows faster.",
    methods: "Cursor, Prompting, Rapid Iteration",
    Icon: Brain,
    level: 4,
  },
  {
    id: "climate",
    title: "Climate-tech Products",
    quote:
      "I simplify sustainability and carbon data into meaningful product experiences.",
    methods: "Climate Tech, Dashboards, Storytelling",
    Icon: Leaf,
    level: 5,
  },
];

function SkillIcon({
  Icon,
  floating,
}: {
  Icon: LucideIcon;
  floating: boolean;
}) {
  return (
    <motion.div
      animate={floating ? { y: [0, -6, 0] } : {}}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      className="relative grid h-[72px] w-[72px] place-items-center rounded-[20px] border border-accent/20 bg-[linear-gradient(180deg,rgba(34,197,174,0.2),rgba(16,185,129,0.12))] shadow-[0_0_24px_rgba(94,234,212,0.12),inset_0_1px_0_rgba(255,255,255,0.08)] transition-[transform,box-shadow] duration-300 group-hover:scale-[1.04] group-hover:shadow-[0_0_32px_rgba(94,234,212,0.28)]"
    >
      <Icon className="relative h-8 w-8 text-white" strokeWidth={1.6} />
    </motion.div>
  );
}

function FlipCard({
  skill,
  index,
  reduce,
  hoverFlip,
}: {
  skill: SkillCard;
  index: number;
  reduce: boolean | null;
  hoverFlip: boolean;
}) {
  const [flipped, setFlipped] = useState(false);

  const handleEnter = () => {
    if (hoverFlip && !reduce) setFlipped(true);
  };
  const handleLeave = () => {
    if (hoverFlip && !reduce) setFlipped(false);
  };
  const handleClick = () => {
    if (!hoverFlip) setFlipped((f) => !f);
  };

  if (reduce) {
    return (
      <motion.article
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.55, delay: index * 0.06, ease }}
        className="skill-collectible group rounded-[28px] p-6 transition-transform duration-300 hover:-translate-y-1"
      >
        <div className="flex items-start justify-between">
          <SkillIcon Icon={skill.Icon} floating={false} />
          <SkillLevelBadge level={skill.level} />
        </div>
        <h3 className={`mt-5 text-white ${skillCardTitleClass}`}>
          {skill.title}
        </h3>
        <p className={`mt-3 ${skillCardBodyClass}`}>
          &ldquo;{skill.quote}&rdquo;
        </p>
        <p className="mt-4 text-xs font-medium tracking-wide text-faint uppercase">
          Methods
        </p>
        <p className="mt-1 text-sm text-body">{skill.methods}</p>
      </motion.article>
    );
  }

  const outerClass = [
    "group h-[280px] [perspective:1000px] transition-transform duration-300 sm:h-[300px]",
    !hoverFlip ? "cursor-pointer" : "hover:-translate-y-2",
  ].join(" ");

  const innerClass = [
    "relative h-full w-full [transform-style:preserve-3d] transition-[transform,box-shadow] duration-[600ms] ease-[cubic-bezier(0.21,0.47,0.32,0.98)]",
    flipped
      ? "[transform:rotateY(180deg)] shadow-[0_0_40px_-8px_rgba(94,234,212,0.4)]"
      : "shadow-[0_20px_60px_-24px_rgba(0,0,0,0.85)]",
    hoverFlip ? "hover:shadow-[0_28px_70px_-20px_rgba(0,0,0,0.9)]" : "",
  ].join(" ");

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.07, ease }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setFlipped((f) => !f);
        }
      }}
      role="button"
      tabIndex={0}
      aria-pressed={flipped}
      aria-label={`${skill.title} skill card`}
      className={outerClass}
    >
      <div className={innerClass}>
        <div className="skill-collectible absolute inset-0 flex flex-col items-center justify-center rounded-[28px] p-6 [backface-visibility:hidden]">
          <div className="absolute right-4 top-4">
            <SkillLevelBadge level={skill.level} />
          </div>
          <SkillIcon Icon={skill.Icon} floating />
          <h3 className={`mt-6 text-white ${skillCardTitleClass}`}>
            {skill.title}
          </h3>
        </div>

        <div className="skill-collectible absolute inset-0 flex flex-col justify-center rounded-[28px] border border-accent/20 p-6 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div className="absolute inset-0 rounded-[28px] bg-[radial-gradient(circle_at_80%_20%,rgba(94,234,212,0.1),transparent_55%)]" />
          <div className="relative">
            <div className="flex items-center justify-between gap-2">
              <h3 className={`text-white ${skillCardTitleClass}`}>
                {skill.title}
              </h3>
              <SkillLevelBadge level={skill.level} />
            </div>
            <p className={`mt-3 ${skillCardBodyClass}`}>
              &ldquo;{skill.quote}&rdquo;
            </p>
            <p className="mt-5 text-[11px] font-medium tracking-wide text-faint uppercase">
              Methods
            </p>
            <p className="mt-1.5 text-base text-body">{skill.methods}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Skills() {
  const reduce = useReducedMotion();
  const [hoverFlip, setHoverFlip] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setHoverFlip(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <section id="skills" className="relative scroll-mt-24 overflow-visible bg-background">
      <GlowOrb className="right-0 top-1/3 h-72 w-72 opacity-35" color="blue" />

      <div className="container-shell relative">
        <SectionHeading
          centered
          label="Experience & Skills"
          title={
            <>
              Skills that go{" "}
              <span className="text-foreground">beyond screens.</span>
            </>
          }
          description="A mix of research, product thinking, visual craft, and AI-assisted workflows that help me turn complexity into clarity."
        />

        <div className="mx-auto mt-content grid max-w-[1200px] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SKILLS.map((skill, i) => (
            <FlipCard
              key={skill.id}
              skill={skill}
              index={i}
              reduce={reduce}
              hoverFlip={hoverFlip}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
