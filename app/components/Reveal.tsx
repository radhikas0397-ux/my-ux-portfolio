"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import {
  defaultViewport,
  fadeUp,
  staggerContainer,
  staggerItem,
} from "../lib/scrollAnimations";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
  as?: "div" | "section" | "li" | "span";
};

export function Reveal({
  children,
  className,
  delay = 0,
  y = 40,
  once = true,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();
  const base = fadeUp(reduce, y);
  const variants = {
    hidden: base.hidden,
    show: {
      ...base.show,
      transition: {
        ...(typeof base.show === "object" && "transition" in base.show
          ? base.show.transition
          : {}),
        delay,
      },
    },
  };
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ ...defaultViewport, once }}
    >
      {children}
    </MotionTag>
  );
}

export function StaggerGroup({
  children,
  className,
  delay = 0,
  stagger = 0.12,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      variants={staggerContainer(stagger, delay)}
      initial="hidden"
      whileInView="show"
      viewport={{ ...defaultViewport, once }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  y = 32,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div className={className} variants={staggerItem(reduce, y)}>
      {children}
    </motion.div>
  );
}

/** @deprecated Use staggerItem via StaggerItem or import from scrollAnimations */
export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};
