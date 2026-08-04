import type { Variants } from "framer-motion";

/** Premium ease — shared across scroll animations */
export const motionEase = [0.21, 0.47, 0.32, 0.98] as const;

export const defaultViewport = {
  once: true,
  amount: 0.2,
} as const;

/** Fade up on scroll reveal */
export function fadeUp(reduce: boolean | null, distance = 40): Variants {
  return {
    hidden: { opacity: 0, y: reduce ? 0 : distance },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: motionEase },
    },
  };
}

/** Stagger parent for child reveals */
export function staggerContainer(
  stagger = 0.12,
  delayChildren = 0,
): Variants {
  return {
    hidden: {},
    show: {
      transition: { staggerChildren: stagger, delayChildren },
    },
  };
}

/** Stagger child — fade up */
export function staggerItem(reduce: boolean | null, distance = 32): Variants {
  return {
    hidden: { opacity: 0, y: reduce ? 0 : distance },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: motionEase },
    },
  };
}

/** Scale in with slight lift — project cards */
export function scaleIn(reduce: boolean | null): Variants {
  return {
    hidden: {
      opacity: 0,
      y: reduce ? 0 : 28,
      scale: reduce ? 1 : 0.96,
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.7, ease: motionEase },
    },
  };
}

/** Hero main title — fade up with slight scale */
export function heroTitleItem(reduce: boolean | null): Variants {
  return {
    hidden: {
      opacity: 0,
      y: reduce ? 0 : 24,
      scale: reduce ? 1 : 0.97,
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.85, ease: motionEase },
    },
  };
}

/** Hero load-in item */
export function heroItem(reduce: boolean | null, distance = 32): Variants {
  return {
    hidden: { opacity: 0, y: reduce ? 0 : distance },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.75, ease: motionEase },
    },
  };
}

export const heroStagger: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

export const heroCtaStagger: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.55 },
  },
};

/** Icon reveal — Services cards */
export function serviceIconReveal(reduce: boolean | null): Variants {
  return {
    hidden: {
      opacity: 0,
      y: reduce ? 0 : 8,
      scale: reduce ? 1 : 0.95,
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.55, ease: motionEase, delay: 0.08 },
    },
  };
}

export const serviceIconViewport = {
  once: true,
  amount: 0.3,
} as const;

export const heroCtaItem = (reduce: boolean | null): Variants => ({
  hidden: { opacity: 0, y: reduce ? 0 : 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: motionEase },
  },
});
