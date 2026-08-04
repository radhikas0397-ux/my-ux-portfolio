"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";

/**
 * A soft radial light that trails the cursor on pointer-capable devices.
 * Purely decorative and pointer-events-none so it never blocks interaction.
 */
export function CursorGlow() {
  const reduce = useReducedMotion();
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const springX = useSpring(x, { stiffness: 120, damping: 25, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 120, damping: 25, mass: 0.4 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine || reduce) return;

    const move = (e: MouseEvent) => {
      x.set(e.clientX - 250);
      y.set(e.clientY - 250);
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [x, y, reduce]);

  if (reduce) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-30 hidden h-[500px] w-[500px] rounded-full md:block"
      style={{
        x: springX,
        y: springY,
        background:
          "radial-gradient(circle, rgba(157,191,174,0.1) 0%, rgba(16,18,15,0.35) 40%, transparent 70%)",
      }}
    />
  );
}
