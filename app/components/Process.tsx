"use client";

import { motion } from "framer-motion";
import {
  Search,
  Compass,
  Lightbulb,
  PenTool,
  FlaskConical,
  Rocket,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionHeading";

type Step = {
  n: string;
  title: string;
  desc: string;
  Icon: LucideIcon;
};

const steps: Step[] = [
  {
    n: "01",
    title: "Research",
    desc: "Interviews, data, and context to understand the real problem.",
    Icon: Search,
  },
  {
    n: "02",
    title: "Define",
    desc: "Synthesise insights into a sharp, prioritised problem statement.",
    Icon: Compass,
  },
  {
    n: "03",
    title: "Ideate",
    desc: "Explore divergent directions before converging on the strongest.",
    Icon: Lightbulb,
  },
  {
    n: "04",
    title: "Prototype",
    desc: "Bring concepts to life at the right fidelity to learn fast.",
    Icon: PenTool,
  },
  {
    n: "05",
    title: "Test",
    desc: "Validate with real users and iterate on what the evidence shows.",
    Icon: FlaskConical,
  },
  {
    n: "06",
    title: "Launch",
    desc: "Ship with engineering, measure impact, and keep refining.",
    Icon: Rocket,
  },
];

export function Process() {
  return (
    <section
      id="process"
      className="relative scroll-mt-24 border-y border-line bg-surface/40 py-20 sm:py-28"
    >
      <div className="container-shell">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <Reveal>
              <SectionLabel>Design Process</SectionLabel>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 font-display text-[1.75rem] font-semibold leading-[1.2] tracking-tight sm:text-4xl sm:leading-[1.15] md:text-[2.6rem]">
                A repeatable path from
                <br className="hidden sm:block" /> ambiguity to impact.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-xs text-sm text-muted md:text-right">
              Structured enough to be reliable, flexible enough to follow the
              evidence.
            </p>
          </Reveal>
        </div>

        {/* connecting line */}
        <div className="relative mt-16">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute top-7 left-0 hidden h-px w-full origin-left bg-gradient-to-r from-accent/60 via-line-strong to-accent-2/40 lg:block"
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-6 lg:gap-4">
            {steps.map((step, i) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.08,
                  ease: [0.21, 0.47, 0.32, 0.98],
                }}
                className="group relative"
              >
                <div className="relative z-10 grid h-14 w-14 place-items-center rounded-2xl border border-line-strong bg-surface-2 text-muted transition-all duration-300 group-hover:-translate-y-1 group-hover:border-accent/50 group-hover:text-foreground">
                  <step.Icon className="h-6 w-6" />
                </div>
                <div className="mt-5">
                  <span className="font-display text-xs font-semibold tracking-widest text-faint">
                    {step.n}
                  </span>
                  <h3 className="mt-1 font-display text-lg font-semibold tracking-tight">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
