"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  DEFAULT_SPEECH_MESSAGES,
  SPEECH_CYCLE_MS,
  avatarEase,
  bubbleEntranceVariants,
  speechMessageVariants,
} from "./avatarAnimations";

type SpeechBubbleProps = {
  messages?: readonly string[];
  paused?: boolean;
  className?: string;
};

export function SpeechBubble({
  messages = DEFAULT_SPEECH_MESSAGES,
  paused = false,
  className = "",
}: SpeechBubbleProps) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce || paused || messages.length <= 1) return;

    const timeout = window.setTimeout(() => {
      setIndex((i) => (i + 1) % messages.length);
    }, SPEECH_CYCLE_MS + Math.random() * 500);

    return () => window.clearTimeout(timeout);
  }, [index, messages.length, paused, reduce]);

  const current = messages[index];

  return (
    <motion.div
      variants={bubbleEntranceVariants}
      initial="hidden"
      animate="visible"
      className={`pointer-events-none absolute z-30 ${className}`}
    >
      <div
        className="relative rounded-xl border border-line bg-card px-4 py-3.5 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.65)] sm:px-[18px]"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        <AnimatePresence mode="wait">
          <motion.p
            key={current}
            variants={speechMessageVariants}
            initial={{ opacity: 0, y: 8 }}
            animate="enter"
            exit="exit"
            transition={{ duration: 0.4, ease: avatarEase }}
            className="text-sm font-medium leading-snug text-foreground"
          >
            <span aria-hidden className="mr-1.5">
              💬
            </span>
            <span className="sr-only">Status: </span>
            {current}
          </motion.p>
        </AnimatePresence>

        {/* Tail pointing toward avatar */}
        <span
          aria-hidden
          className="absolute -bottom-2 left-6 h-4 w-4 rotate-45 border-r border-b border-line bg-card"
        />
      </div>
    </motion.div>
  );
}
