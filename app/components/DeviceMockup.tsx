"use client";

import { useReducedMotion } from "framer-motion";
import type { MotionValue } from "framer-motion";
import { motion } from "framer-motion";
import type { Project } from "../lib/projects";
import { ProjectScreenPreview } from "./ProjectScreenPreview";

const deviceTransition =
  "transition-[transform,box-shadow] duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none motion-reduce:group-hover/visual:transform-none";

function ScreenReflection() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.12)_0%,transparent_38%,transparent_62%,rgba(255,255,255,0.04)_100%)]"
    />
  );
}

function DeviceScreen({
  project,
  variant,
}: {
  project: Project;
  variant: "desktop" | "mobile";
}) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#050506]">
      <ProjectScreenPreview project={project} variant={variant} />
      <ScreenReflection />
    </div>
  );
}

function LaptopMockup({ project }: { project: Project }) {
  return (
    <div className="relative w-full max-w-[380px] [perspective:1200px] lg:max-w-[520px]">
      <div
        className={`relative origin-center [transform:rotateX(2deg)_rotateY(-2deg)] group-hover/visual:[transform:translateY(-8px)_rotateX(3deg)_rotateY(-3deg)] ${deviceTransition}`}
        style={
          {
            "--mockup-glow": `${project.accent}33`,
            transformStyle: "preserve-3d",
          } as React.CSSProperties
        }
      >
        <div className="rounded-[14px] border border-white/[0.08] bg-[#121214] p-[5px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.04)_inset,0_24px_48px_-12px_var(--mockup-glow)]">
          <div className="overflow-hidden rounded-[10px] border border-white/[0.06] bg-[#0a0a0b]">
            <div className="relative aspect-[16/10] w-full">
              <DeviceScreen project={project} variant="desktop" />
            </div>
          </div>
          <div className="mx-auto mt-[5px] h-[3px] w-[18%] rounded-full bg-[#1e1e22]" />
        </div>
      </div>
      <div
        aria-hidden
        className="absolute -bottom-4 left-1/2 h-8 w-[72%] -translate-x-1/2 rounded-[50%] bg-black/50 blur-2xl"
      />
    </div>
  );
}

function PhoneMockup({ project }: { project: Project }) {
  return (
    <div className="relative w-[118px] shrink-0 sm:w-[132px] md:w-[148px] [perspective:900px]">
      <div
        className={`relative origin-center [transform:rotateY(4deg)] group-hover/visual:[transform:translateY(-12px)_rotateY(7deg)] ${deviceTransition}`}
        style={
          {
            "--mockup-glow": `${project.accent}40`,
            transformStyle: "preserve-3d",
          } as React.CSSProperties
        }
      >
        <div className="rounded-[22px] border border-white/[0.1] bg-[#121214] p-[3px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.04)_inset,0_16px_40px_-8px_var(--mockup-glow)]">
          <div className="relative overflow-hidden rounded-[19px] border border-white/[0.06] bg-[#0a0a0b]">
            <div className="absolute left-1/2 top-1.5 z-10 h-[4px] w-[28%] -translate-x-1/2 rounded-full bg-[#0d0d0f]" />
            <div className="relative aspect-[9/19] w-full">
              <DeviceScreen project={project} variant="mobile" />
            </div>
          </div>
        </div>
      </div>
      <div
        aria-hidden
        className="absolute -bottom-3 left-1/2 h-5 w-[70%] -translate-x-1/2 rounded-[50%] bg-black/45 blur-xl"
      />
    </div>
  );
}

export function DeviceMockup({
  project,
  visualY,
}: {
  project: Project;
  visualY?: MotionValue<string>;
}) {
  const reduce = useReducedMotion();

  return (
    <div className="group/visual relative aspect-[16/10] overflow-hidden bg-[#0a0a0b] lg:aspect-auto lg:h-full">
      <motion.div
        style={visualY && !reduce ? { y: visualY } : undefined}
        className="absolute inset-0"
      >
        <div
          className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`}
        />
        <div
          className="absolute inset-0 opacity-80"
          style={{
            background: `radial-gradient(ellipse 70% 55% at 50% 42%, ${project.accent}28, transparent 68%)`,
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_35%,rgba(0,0,0,0.62)_100%)]" />
        <div className="grain absolute inset-0 opacity-[0.35]" />
      </motion.div>

      <div className="relative flex h-full min-h-[220px] items-center justify-center px-4 py-8 sm:min-h-[260px] sm:px-6 sm:py-10 lg:min-h-0 lg:py-12">
        <div className="flex justify-center md:hidden">
          <PhoneMockup project={project} />
        </div>

        <div className="relative hidden w-full max-w-[520px] items-end justify-center md:flex lg:max-w-[620px]">
          <LaptopMockup project={project} />
          <div className="absolute -right-1 bottom-[8%] z-20 sm:right-0 sm:bottom-[10%] lg:right-2 lg:bottom-[12%]">
            <PhoneMockup project={project} />
          </div>
        </div>
      </div>
    </div>
  );
}
