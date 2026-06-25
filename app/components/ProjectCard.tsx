"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "../lib/projects";

export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.7,
        delay: (index % 2) * 0.08,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      whileHover={reduce ? undefined : { y: -6 }}
      className="group relative"
    >
      <Link
        href={`/work/${project.slug}`}
        className="block overflow-hidden rounded-3xl border border-line bg-surface transition-all duration-500 group-hover:border-line-strong group-hover:ring-glow"
        aria-label={`View case study: ${project.title}`}
      >
        {/* Image placeholder */}
        <div className="relative aspect-[16/11] overflow-hidden">
          <div
            className={`absolute inset-0 bg-gradient-to-br ${project.gradient} transition-transform duration-700 ease-out group-hover:scale-105`}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.12),transparent_55%)]" />

          {/* faux UI mock */}
          <div className="absolute inset-0 grain p-6 sm:p-8">
            <div className="flex h-full flex-col">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
              </div>
              <div className="mt-auto space-y-3">
                <div className="h-2.5 w-2/3 rounded-full bg-white/20" />
                <div className="h-2.5 w-1/2 rounded-full bg-white/12" />
                <div className="flex gap-3 pt-2">
                  <div className="h-16 flex-1 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm" />
                  <div className="h-16 flex-1 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm" />
                  <div className="hidden h-16 flex-1 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm sm:block" />
                </div>
              </div>
            </div>
          </div>

          <span className="absolute top-5 right-5 rounded-full border border-white/15 bg-black/30 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur">
            {project.year}
          </span>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-medium tracking-wide text-faint uppercase">
                {project.category}
              </p>
              <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight">
                {project.title}
              </h3>
            </div>
            <span className="mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line-strong bg-surface-2 transition-all duration-300 group-hover:border-accent/60 group-hover:bg-accent group-hover:text-background">
              <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>

          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
            {project.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-line bg-surface-2/60 px-3 py-1 text-xs text-muted"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-4 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs text-faint">Role</p>
              <p className="mt-0.5 text-sm font-medium">{project.role}</p>
            </div>
            <div className="sm:text-right">
              <p className="text-xs text-faint">Outcome</p>
              <p className="mt-0.5 text-sm font-medium text-accent-gradient">
                {project.outcome}
              </p>
            </div>
          </div>

          <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-foreground">
            View Case Study
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
