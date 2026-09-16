"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  useMotionValue,
  useReducedMotion,
  useSpring,
  type MotionValue,
} from "framer-motion";
import {
  CURSOR_ROTATE_X,
  CURSOR_ROTATE_Y,
  EYE_OFFSET_X,
  EYE_OFFSET_Y,
} from "./avatarAnimations";

type CursorTrackingResult = {
  containerRef: React.RefObject<HTMLDivElement | null>;
  rotateX: MotionValue<number>;
  rotateY: MotionValue<number>;
  eyeX: MotionValue<number>;
  eyeY: MotionValue<number>;
  isPointerFine: boolean;
  isActive: boolean;
  setActive: (active: boolean) => void;
  bindPointer: {
    onPointerMove: (e: React.PointerEvent) => void;
    onPointerLeave: () => void;
    onPointerEnter: () => void;
  };
};

const springConfig = { stiffness: 120, damping: 22, mass: 0.35 };

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function useCursorTracking(): CursorTrackingResult {
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPointerFine, setIsPointerFine] = useState(false);
  const [isActive, setActive] = useState(false);

  const normX = useMotionValue(0);
  const normY = useMotionValue(0);

  const rotateY = useSpring(0, springConfig);
  const rotateX = useSpring(0, springConfig);
  const eyeX = useSpring(0, { ...springConfig, stiffness: 140 });
  const eyeY = useSpring(0, { ...springConfig, stiffness: 140 });

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const update = () => setIsPointerFine(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const updateFromPoint = useCallback(
    (clientX: number, clientY: number) => {
      if (reduce || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = (clientX - rect.left) / rect.width - 0.5;
      const y = (clientY - rect.top) / rect.height - 0.5;

      const cx = clamp(x * 2, -1, 1);
      const cy = clamp(y * 2, -1, 1);

      normX.set(cx);
      normY.set(cy);

      rotateY.set(cx * CURSOR_ROTATE_Y);
      rotateX.set(-cy * CURSOR_ROTATE_X);
      eyeX.set(cx * EYE_OFFSET_X);
      eyeY.set(cy * EYE_OFFSET_Y);
    },
    [reduce, normX, normY, rotateX, rotateY, eyeX, eyeY],
  );

  const reset = useCallback(() => {
    normX.set(0);
    normY.set(0);
    rotateX.set(0);
    rotateY.set(0);
    eyeX.set(0);
    eyeY.set(0);
  }, [normX, normY, rotateX, rotateY, eyeX, eyeY]);

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (e.pointerType === "mouse" && !isPointerFine) return;
      updateFromPoint(e.clientX, e.clientY);
    },
    [isPointerFine, updateFromPoint],
  );

  const onPointerLeave = useCallback(() => {
    reset();
  }, [reset]);

  const onPointerEnter = useCallback(() => {
    /* tracking resumes on move */
  }, []);

  return {
    containerRef,
    rotateX,
    rotateY,
    eyeX,
    eyeY,
    isPointerFine,
    isActive,
    setActive,
    bindPointer: { onPointerMove, onPointerLeave, onPointerEnter },
  };
}
