"use client";

import { motion } from "framer-motion";
import {
  Search,
  Layers,
  Palette,
  LayoutDashboard,
  Component,
  PenTool,
  Brain,
  Leaf,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionHeading";

type Skill = { title: string; desc: string; Icon: LucideIcon };

const skills: Skill[] = [
  {
    title: "UX Research",
    desc: "Interviews, usability testing, and synthesis that drive decisions.",
    Icon: Search,
  },
  {
    title: "Product Design",
    desc: "End-to-end flows balancing user needs and business goals.",
    Icon: Layers,
  },
  {
    title: "UI Design",
    desc: "High-contrast, accessible interfaces with a refined visual craft.",
    Icon: Palette,
  },
  {
    title: "Dashboard Design",
    desc: "Data-dense screens that stay scannable and calm.",
    Icon: LayoutDashboard,
  },
  {
    title: "Design Systems",
    desc: "Scalable component libraries and tokens teams can trust.",
    Icon: Component,
  },
  {
    title: "Prototyping",
    desc: "Interactive prototypes to test and de-risk ideas early.",
    Icon: PenTool,
  },
  {
    title: "AI-assisted Design",
    desc: "Designing explainable, human-in-the-loop AI experiences.",
    Icon: Brain,
  },
  {
    title: "Climate-tech Products",
    desc: "Turning complex sustainability data into clear action.",
    Icon: Leaf,
  },
];

const tools = [
  "Figma",
  "FigJam",
  "Framer",
  "Protopie",
  "Notion",
  "Maze",
  "Dovetail",
  "Linear",
  "Storybook",
  "Webflow",
];

export function Skills() {
  return (
    <section id="skills" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="container-shell">
        <div className="max-w-2xl">
          <Reveal>
            <SectionLabel>Experience &amp; Skills</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 font-display text-[1.75rem] font-semibold leading-[1.2] tracking-tight sm:text-4xl sm:leading-[1.15] md:text-[2.6rem]">
              A versatile toolkit, sharpened on real products.
            </h2>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.5,
                delay: (i % 4) * 0.06,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
              className="group relative bg-surface p-6 transition-colors duration-300 hover:bg-surface-2"
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl border border-line-strong bg-surface-2 text-muted transition-all duration-300 group-hover:border-accent/50 group-hover:text-accent">
                <skill.Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold tracking-tight">
                {skill.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {skill.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Tools marquee */}
        <Reveal delay={0.1}>
          <div className="relative mt-12 overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
            <div className="flex w-max marquee-track gap-3">
              {[...tools, ...tools].map((tool, i) => (
                <span
                  key={`${tool}-${i}`}
                  className="rounded-full border border-line bg-surface px-5 py-2.5 text-sm text-muted"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
