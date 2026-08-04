"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useSpring } from "framer-motion";
import { Leaf, Trophy, Zap } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionHeading";
import { site } from "../lib/site";
import { GlowOrb } from "./ui/GamifiedUI";

const ease = [0.21, 0.47, 0.32, 0.98] as const;
const MAX_TILT = 3;

const stats: {
  label: string;
  value: string;
  icon: typeof Trophy;
}[] = [
  { label: "Years Experience", value: "5+", icon: Trophy },
  { label: "Products Shipped", value: "30+", icon: Zap },
  { label: "Currently", value: "Climate Tech", icon: Leaf },
];

function PortraitFrame() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useSpring(0, { stiffness: 260, damping: 28, mass: 0.6 });
  const rotateY = useSpring(0, { stiffness: 260, damping: 28, mass: 0.6 });
  const scale = useSpring(1, { stiffness: 260, damping: 28, mass: 0.6 });

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(Math.max(-MAX_TILT, Math.min(MAX_TILT, x * MAX_TILT * 2)));
    rotateX.set(Math.max(-MAX_TILT, Math.min(MAX_TILT, -y * MAX_TILT * 2)));
    scale.set(1.02);
  };

  const handleLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    scale.set(1);
  };

  return (
    <div className="group/portrait relative mx-auto w-full max-w-[420px] md:max-w-[380px] lg:mx-0 lg:max-w-none">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-4 rounded-[32px] bg-[radial-gradient(ellipse_at_50%_38%,rgba(94,234,212,0.24),transparent_72%)] opacity-70 blur-2xl transition-opacity duration-500 group-hover/portrait:opacity-100"
      />

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease }}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{
          rotateX: reduce ? 0 : rotateX,
          rotateY: reduce ? 0 : rotateY,
          scale: reduce ? 1 : scale,
          transformPerspective: 1200,
          transformStyle: "preserve-3d",
        }}
        className="panel-glow glow-ring relative aspect-[4/5] overflow-hidden rounded-[30px] will-change-transform transition-shadow duration-500 group-hover/portrait:shadow-[0_28px_70px_-22px_rgba(94,234,212,0.28)]"
      >
        <Image
          src="/Images/hero-section.jpeg"
          alt={`${site.name}, Product Designer`}
          fill
          sizes="(max-width: 1024px) 90vw, 40vw"
          className="object-cover object-[center_12%]"
        />
      </motion.div>
    </div>
  );
}

export function AboutMe() {
  return (
    <section
      id="about-me"
      className="relative mt-before-about-me scroll-mt-24 overflow-visible bg-background"
    >
      <GlowOrb className="left-0 bottom-0 h-64 w-64 opacity-30" color="purple" />

      <div className="container-shell relative">
        <div className="mx-auto grid max-w-[1200px] items-center gap-12 lg:grid-cols-[2fr_3fr] lg:gap-16">
          <Reveal>
            <div className="flex flex-col gap-5">
              <PortraitFrame />

              <div className="panel-glow rounded-2xl px-5 py-4">
                <p className="text-base font-medium tracking-tight text-white">
                  {site.role}
                </p>
                <p className="mt-0.5 text-sm text-faint">{site.location}</p>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <SectionLabel>About Me</SectionLabel>
            </Reveal>

            <Reveal delay={0.05}>
              <h2 className="type-section-title mt-5 text-balance">
                Designing with curiosity, psychology, and a{" "}
                <span className="text-foreground">bias for clarity.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="type-body mt-6 space-y-4">
                <p>
                  I&apos;m Radhika, a Product Designer with a background in
                  Psychology and experience designing products in climate tech.
                </p>
                <p>
                  I enjoy turning complex systems into experiences that feel
                  intuitive and effortless. My approach combines research,
                  product thinking, business understanding, and visual design to
                  create solutions that are both useful and meaningful.
                </p>
                <p>
                  Outside of design, I enjoy learning about human behavior,
                  emerging technology, fitness, and building side projects.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <dl className="mt-content grid grid-cols-3 gap-3">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="achievement-card group p-4"
                  >
                    <span className="grid h-8 w-8 place-items-center rounded-lg border border-line bg-surface-2 text-foreground transition-all duration-300">
                      <s.icon className="h-4 w-4" strokeWidth={2} />
                    </span>
                    <dt className="mt-3 text-[10px] tracking-wide text-faint uppercase">
                      {s.label}
                    </dt>
                    <dd className="mt-1 text-lg font-bold tracking-tight text-foreground sm:text-xl">
                      {s.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
