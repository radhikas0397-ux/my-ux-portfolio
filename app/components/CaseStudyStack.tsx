"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowUpRight, Target } from "lucide-react";
import type { Project } from "../lib/projects";
import { DeviceMockup } from "./DeviceMockup";
import { MissionBadge } from "./ui/GamifiedUI";

const ease = [0.21, 0.47, 0.32, 0.98] as const;
const FADE = 0.06;

function stackDepthStyle(depth: number) {
  if (depth <= 0) return { scale: 1, offsetY: 0 };
  if (depth === 1) return { scale: 0.98, offsetY: 14 };
  if (depth === 2) return { scale: 0.96, offsetY: 18 };
  return { scale: 0.94, offsetY: 22 };
}

function getContentOpacity(progress: number, index: number, total: number) {
  const start = index / total;
  const end = (index + 1) / total;
  const isLast = index === total - 1;

  if (progress < start - FADE) return 0;

  if (progress < start + FADE) {
    if (index === 0) return 1;
    return Math.min(1, (progress - (start - FADE)) / (FADE * 2));
  }

  if (isLast) return 1;

  if (progress <= end - FADE) return 1;

  if (progress < end + FADE) {
    return Math.max(0, (end + FADE - progress) / (FADE * 2));
  }

  return 0;
}

function CardVisual({
  project,
  visualY,
}: {
  project: Project;
  visualY?: MotionValue<string>;
}) {
  return <DeviceMockup project={project} visualY={visualY} />;
}

function CardContent({
  project,
  missionLevel,
}: {
  project: Project;
  missionLevel: number;
}) {
  return (
    <>
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <MissionBadge level={missionLevel} />
          <p className="type-section-label text-faint">{project.category}</p>
        </div>
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/[0.12] bg-surface-elevated text-white transition-all duration-300 group-hover:border-white/25 group-hover:bg-white/10">
          <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>

      <h3 className="type-card-title text-balance text-white sm:text-[2rem]">
        {project.title}
      </h3>

      <p className="type-body max-w-xl text-body">{project.description}</p>

      <div className="flex flex-wrap gap-2 pt-1">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-white/[0.12] bg-surface-elevated px-3 py-1 text-xs text-body transition-colors duration-300 group-hover:border-white/20"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-2 inline-flex items-center gap-1.5 text-base font-medium text-white/80">
        <Target className="h-4 w-4" />
        View Case Study
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
    </>
  );
}

function StackCardFace({
  project,
  visualY,
  contentOpacity,
  showContent,
  missionLevel,
}: {
  project: Project;
  visualY?: MotionValue<string>;
  contentOpacity: MotionValue<number>;
  showContent: boolean;
  missionLevel: number;
}) {
  const contentVisibility = useTransform(contentOpacity, (o) =>
    o < 0.05 ? "hidden" : "visible",
  );
  const pointerEvents = useTransform(contentOpacity, (o) =>
    o > 0.5 ? "auto" : "none",
  );

  return (
    <div className="mission-card relative grid h-full w-full overflow-hidden rounded-[32px] lg:grid-cols-2">
      <CardVisual project={project} visualY={visualY} />

      {showContent ? (
        <motion.div
          style={{ opacity: contentOpacity, visibility: contentVisibility }}
          className="relative flex flex-col justify-center gap-4 p-6 sm:gap-5 sm:p-8 lg:p-10"
        >
          <motion.div style={{ pointerEvents }} className="contents">
            <Link
              href={`/work/${project.slug}`}
              aria-label={`View case study: ${project.title}`}
              className="group absolute inset-0 z-10 rounded-[32px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/50"
            />
            <CardContent project={project} missionLevel={missionLevel} />
          </motion.div>
        </motion.div>
      ) : (
        <div className="hidden lg:block" aria-hidden />
      )}

      {showContent && (
        <motion.span
          style={{ opacity: contentOpacity, visibility: contentVisibility }}
          className="absolute top-5 right-5 z-20 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-white/80"
        >
          {project.year}
        </motion.span>
      )}
    </div>
  );
}

function PlainCard({ project, index }: { project: Project; index: number }) {
  const contentOpacity = useMotionValue(1);

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 2) * 0.06, ease }}
      className="group min-h-[480px] w-full sm:min-h-[500px] lg:min-h-[520px]"
    >
      <div className="mission-card relative min-h-[480px] w-full overflow-hidden rounded-[32px] transition-transform duration-300 hover:-translate-y-1 sm:min-h-[500px] lg:grid lg:min-h-[520px] lg:grid-cols-2">
        <CardVisual project={project} />
        <div className="relative flex flex-col justify-center gap-4 p-6 sm:gap-5 sm:p-8 lg:p-10">
          <Link
            href={`/work/${project.slug}`}
            aria-label={`View case study: ${project.title}`}
            className="group absolute inset-0 z-10 rounded-[32px]"
          />
          <CardContent project={project} missionLevel={index + 1} />
        </div>
        <span className="absolute top-5 right-5 z-20 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-white/80">
          {project.year}
        </span>
      </div>
    </motion.article>
  );
}

function StackCard({
  project,
  index,
  total,
  progress,
}: {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const maxDepth = total - 1 - index;
  const target = stackDepthStyle(maxDepth);

  const activeStart = index / total;

  const scale = useTransform(progress, [activeStart, 1], [1, target.scale]);
  const stackOffsetY = useTransform(
    progress,
    [activeStart, 1],
    [0, target.offsetY],
  );

  const contentOpacity = useTransform(progress, (p) =>
    getContentOpacity(p, index, total),
  );

  const zIndex = useTransform(contentOpacity, (o) =>
    o > 0.5 ? 20 + index : index + 1,
  );

  const { scrollYProgress: cardProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const visualY = useTransform(cardProgress, [0, 1], ["-4%", "4%"]);

  const peekOffset = index * 12;

  return (
    <div
      ref={cardRef}
      className="sticky top-20 flex h-screen items-start overflow-visible sm:top-24"
    >
      <motion.article
        style={{
          scale,
          y: stackOffsetY,
          top: peekOffset,
          zIndex,
        }}
        className="relative isolate min-h-[480px] w-full origin-top overflow-hidden will-change-transform sm:min-h-[500px] lg:min-h-[520px] lg:h-[clamp(520px,70vh,680px)]"
      >
        <StackCardFace
          project={project}
          visualY={visualY}
          contentOpacity={contentOpacity}
          showContent
          missionLevel={index + 1}
        />
      </motion.article>
    </div>
  );
}

export function CaseStudyStack({
  projects,
  className = "mt-content",
}: {
  projects: Project[];
  className?: string;
}) {
  const reduce = useReducedMotion();
  const [enhanced, setEnhanced] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setEnhanced(mq.matches && !reduce);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [reduce]);

  if (!enhanced) {
    return (
      <div className={`${className} flex w-full flex-col gap-6 sm:gap-8`}>
        {projects.map((project, i) => (
          <PlainCard key={project.slug} project={project} index={i} />
        ))}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative ${className} w-full overflow-visible`}
    >
      {projects.map((project, i) => (
        <StackCard
          key={project.slug}
          project={project}
          index={i}
          total={projects.length}
          progress={scrollYProgress}
        />
      ))}
      {/* Scroll runway so the last sticky card releases before the next section */}
      <div
        className="pointer-events-none h-[40vh] shrink-0 lg:h-[50vh]"
        aria-hidden
      />
    </div>
  );
}
