import {
  Search,
  Lightbulb,
  Palette,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionHeading";

const pillars: { title: string; desc: string; Icon: LucideIcon }[] = [
  {
    title: "User Research",
    desc: "Understanding real user needs.",
    Icon: Search,
  },
  {
    title: "Product Thinking",
    desc: "Aligning design with goals.",
    Icon: Lightbulb,
  },
  {
    title: "Visual Design",
    desc: "Crafting clear, elegant interfaces.",
    Icon: Palette,
  },
  {
    title: "Business Understanding",
    desc: "Designing for measurable impact.",
    Icon: TrendingUp,
  },
];

export function About() {
  return (
    <section id="about" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-10 lg:px-20">
        {/* centered intro */}
        <div className="flex flex-col items-center text-center">
          <Reveal className="flex justify-center">
            <SectionLabel>About</SectionLabel>
          </Reveal>

          <Reveal delay={0.05}>
            <figure className="mx-auto mt-8 max-w-[1000px]">
              <blockquote className="font-display text-[1.9rem] leading-[1.25] font-medium tracking-tight text-balance text-white sm:text-4xl sm:leading-[1.2] md:text-[3.1rem] md:leading-[1.15]">
                &ldquo;If your only tool is a hammer, all your problems will be
                nails.&rdquo;
              </blockquote>
              <figcaption className="mt-6 text-sm font-medium text-faint">
                — Rolf Dobelli
              </figcaption>
            </figure>
          </Reveal>
        </div>

        {/* centered skill grid */}
        <Reveal delay={0.12}>
          <ul className="mx-auto mt-12 grid max-w-[1000px] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map(({ title, desc, Icon }) => (
              <li
                key={title}
                className="group rounded-[24px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-teal-400/30 hover:bg-white/[0.06] hover:shadow-[0_26px_60px_-24px_rgba(45,212,191,0.4)]"
              >
                {/* 3D-style icon tile */}
                <span className="grid h-14 w-14 place-items-center rounded-2xl border border-white/15 bg-gradient-to-br from-teal-400/30 to-emerald-500/10 text-teal-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_12px_28px_-12px_rgba(45,212,191,0.6)] transition-transform duration-300 group-hover:scale-105">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold tracking-tight">
                  {title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  {desc}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
