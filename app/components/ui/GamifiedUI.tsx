"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

const ease = [0.21, 0.47, 0.32, 0.98] as const;

export function XPBadge({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border border-line bg-surface-2 px-2 py-0.5 text-[10px] font-semibold tracking-[0.14em] text-foreground uppercase ${className}`}
    >
      {children}
    </span>
  );
}

export function FloatingChip({
  label,
  icon: Icon,
  className = "",
  delay = 0,
}: {
  label: string;
  icon?: LucideIcon;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay, ease }}
      className={`chip-float group absolute z-20 ${className}`}
    >
      <motion.div
        animate={reduce ? {} : { y: [0, -5, 0] }}
        transition={{
          duration: 4 + delay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="chip-pulse flex items-center gap-2 rounded-full border border-white/15 bg-[rgba(14,14,18,0.85)] px-3.5 py-2 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.8)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-white/25"
      >
        {Icon && (
          <span className="grid h-6 w-6 place-items-center rounded-full bg-white/10 text-white transition-shadow duration-300">
            <Icon className="h-3.5 w-3.5" strokeWidth={2} />
          </span>
        )}
        <span className="text-xs font-medium tracking-wide text-white/90 whitespace-nowrap">
          {label}
        </span>
      </motion.div>
    </motion.div>
  );
}

export function AchievementCard({
  value,
  label,
  icon: Icon,
  index = 0,
}: {
  value: string;
  label: string;
  icon?: LucideIcon;
  index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.9 + index * 0.08, ease }}
      className="achievement-card group relative overflow-hidden rounded-2xl p-4 sm:p-5"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(94,234,212,0.08),transparent_60%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <div className="relative flex items-start gap-3">
        {Icon && (
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-white/15 bg-white/10 text-white transition-all duration-300 group-hover:scale-105">
            <Icon className="h-4 w-4" strokeWidth={2} />
          </span>
        )}
        <div>
          <p className="text-lg font-bold tracking-tight text-white sm:text-xl">
            {value}
          </p>
          <p className="mt-0.5 text-xs font-medium tracking-wide text-muted uppercase">
            {label}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function MissionBadge({
  level,
  status = "Active",
}: {
  level: number;
  status?: string;
}) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1">
      <span className="text-[10px] font-bold tracking-[0.16em] text-white uppercase">
        Mission {String(level).padStart(2, "0")}
      </span>
      <span className="h-1 w-1 rounded-full bg-white/60" />
      <span className="text-[10px] font-medium tracking-wide text-white/60 uppercase">
        {status}
      </span>
    </div>
  );
}

export function SkillLevelBadge({ level }: { level: number }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-md border border-purple-400/20 bg-purple-500/10 px-2 py-0.5 text-[10px] font-semibold tracking-wider text-purple-300 uppercase">
      Lvl {level}
    </span>
  );
}

export function GlowOrb({
  className = "",
  color = "teal",
}: {
  className?: string;
  color?: "teal" | "purple" | "blue";
}) {
  const colors = {
    teal: "rgba(94,234,212,0.12)",
    purple: "rgba(139,92,246,0.14)",
    blue: "rgba(59,130,246,0.10)",
  };

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute rounded-full blur-[100px] ${className}`}
      style={{ background: colors[color] }}
    />
  );
}
