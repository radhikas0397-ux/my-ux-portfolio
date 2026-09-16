import type { Transition, Variants } from "framer-motion";

/** Shared easing — smooth, premium feel */
export const avatarEase = [0.21, 0.47, 0.32, 0.98] as const;

/** Cursor tracking limits (degrees) */
export const CURSOR_ROTATE_X = 4;
export const CURSOR_ROTATE_Y = 6;

/** Eye pupil offset limits (px) */
export const EYE_OFFSET_X = 5;
export const EYE_OFFSET_Y = 4;

/* -------------------------------------------------------------------------- */
/* Timing constants                                                            */
/* -------------------------------------------------------------------------- */

export const BREATH_DURATION = 4.5;
export const BREATH_SCALE_MIN = 1;
export const BREATH_SCALE_MAX = 1.015;

export const BLINK_DURATION = 0.15;
export const BLINK_INTERVAL_MIN = 5000;
export const BLINK_INTERVAL_MAX = 8000;

export const HAIR_SWAY_DURATION = 6;
export const HAIR_SWAY_DEG = 2;

export const HOVER_DURATION = 0.25;
export const HOVER_SCALE = 1.03;

export const ENTRANCE = {
  avatarDelay: 0,
  avatarDuration: 0.85,
  avatarY: 20,
  glowDelay: 0.2,
  glowDuration: 1,
  bubbleDelay: 0.5,
  bubbleDuration: 0.6,
} as const;

export const SPEECH_CYCLE_MS = 3500;
export const SPEECH_FADE_MS = 400;

/* -------------------------------------------------------------------------- */
/* Variants                                                                    */
/* -------------------------------------------------------------------------- */

export const avatarEntranceVariants: Variants = {
  hidden: { opacity: 0, y: ENTRANCE.avatarY },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: ENTRANCE.avatarDuration, ease: avatarEase },
  },
};

export const glowEntranceVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: ENTRANCE.glowDuration,
      delay: ENTRANCE.glowDelay,
      ease: avatarEase,
    },
  },
};

export const bubbleEntranceVariants: Variants = {
  hidden: { opacity: 0, y: 10, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: ENTRANCE.bubbleDuration,
      delay: ENTRANCE.bubbleDelay,
      ease: avatarEase,
    },
  },
};

export function breathTransition(reduce: boolean): Transition {
  if (reduce) return { duration: 0 };
  return {
    duration: BREATH_DURATION,
    repeat: Infinity,
    repeatType: "mirror",
    ease: "easeInOut",
  };
}

export function hairSwayTransition(reduce: boolean): Transition {
  if (reduce) return { duration: 0 };
  return {
    duration: HAIR_SWAY_DURATION,
    repeat: Infinity,
    repeatType: "mirror",
    ease: "easeInOut",
  };
}

export function hoverTransition(): Transition {
  return { duration: HOVER_DURATION, ease: avatarEase };
}

export function waveKeyframes(reduce: boolean) {
  if (reduce) return { rotate: 0 };
  return {
    rotate: [0, -10, 14, -6, 0],
    transition: { duration: 0.65, ease: avatarEase },
  };
}

export const speechMessageVariants: Variants = {
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: SPEECH_FADE_MS / 1000, ease: avatarEase },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: SPEECH_FADE_MS / 1000, ease: avatarEase },
  },
};

export const DEFAULT_SPEECH_MESSAGES = [
  "Currently designing...",
  "Solving UX problems...",
  "Building with Cursor...",
  "Exploring AI...",
  "Thinking in systems...",
  "Research first. Pixels second.",
] as const;
