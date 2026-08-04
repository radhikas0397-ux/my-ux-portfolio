"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import {
  BLINK_DURATION,
  BLINK_INTERVAL_MAX,
  BLINK_INTERVAL_MIN,
  BREATH_SCALE_MAX,
  BREATH_SCALE_MIN,
  HAIR_SWAY_DEG,
  HOVER_SCALE,
  avatarEntranceVariants,
  breathTransition,
  glowEntranceVariants,
  hairSwayTransition,
  hoverTransition,
  waveKeyframes,
} from "./avatarAnimations";
import {
  AVATAR_ALT,
  AVATAR_ASPECT,
  AVATAR_EYE_ANCHORS,
  AVATAR_LAYERS,
  type AvatarLayerConfig,
} from "./avatarConfig";
import { SpeechBubble } from "./SpeechBubble";
import { useCursorTracking } from "./useCursorTracking";

type HeroAvatarProps = {
  layers?: AvatarLayerConfig;
  alt?: string;
  className?: string;
};

function useBlink(enabled: boolean) {
  const [blinking, setBlinking] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    let timeoutId: ReturnType<typeof setTimeout>;

    const schedule = () => {
      const delay =
        BLINK_INTERVAL_MIN +
        Math.random() * (BLINK_INTERVAL_MAX - BLINK_INTERVAL_MIN);
      timeoutId = setTimeout(() => {
        setBlinking(true);
        setTimeout(() => {
          setBlinking(false);
          schedule();
        }, BLINK_DURATION * 1000);
      }, delay);
    };

    schedule();
    return () => clearTimeout(timeoutId);
  }, [enabled]);

  return blinking;
}

function useLowPerformance() {
  const [lowPerf, setLowPerf] = useState(false);

  useEffect(() => {
    const cores = navigator.hardwareConcurrency ?? 8;
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    const saveData = nav.connection?.saveData ?? false;
    setLowPerf(cores <= 4 || saveData);
  }, []);

  return lowPerf;
}

function AmbientParticles({ enabled }: { enabled: boolean }) {
  if (!enabled) return null;

  const particles = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    left: `${12 + i * 14}%`,
    top: `${20 + (i % 3) * 22}%`,
    size: 2 + (i % 2),
    delay: i * 0.8,
    duration: 5 + i * 0.6,
  }));

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-foreground/20"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            opacity: 0.08,
          }}
          animate={{
            y: [0, -12, 0],
            opacity: [0.06, 0.12, 0.06],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function EyelidFallback({ blinking }: { blinking: boolean }) {
  return (
    <>
      {[AVATAR_EYE_ANCHORS.left, AVATAR_EYE_ANCHORS.right].map((eye, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="pointer-events-none absolute z-20 rounded-full bg-[#0d1206]"
          style={{
            left: `${eye.x}%`,
            top: `${eye.y}%`,
            width: "8%",
            height: "3%",
            transform: "translate(-50%, -50%)",
          }}
          animate={{ scaleY: blinking ? 1 : 0.05, opacity: blinking ? 0.85 : 0 }}
          transition={{ duration: BLINK_DURATION, ease: "easeInOut" }}
        />
      ))}
    </>
  );
}

function EyePupils({
  eyeX,
  eyeY,
  pupilsSrc,
}: {
  eyeX: MotionValue<number>;
  eyeY: MotionValue<number>;
  pupilsSrc?: string;
}) {
  if (pupilsSrc) {
    return (
      <motion.div
        className="pointer-events-none absolute inset-0 z-[15]"
        style={{ x: eyeX, y: eyeY }}
      >
        <Image src={pupilsSrc} alt="" fill sizes="420px" className="object-contain" />
      </motion.div>
    );
  }

  return (
    <>
      {[AVATAR_EYE_ANCHORS.left, AVATAR_EYE_ANCHORS.right].map((eye, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="pointer-events-none absolute z-[15] rounded-full bg-[#1a1408]"
          style={{
            left: `${eye.x}%`,
            top: `${eye.y}%`,
            width: "2.5%",
            height: "2.5%",
            x: eyeX,
            y: eyeY,
            translateX: "-50%",
            translateY: "-50%",
          }}
        />
      ))}
    </>
  );
}

export function HeroAvatar({
  layers = AVATAR_LAYERS,
  alt = AVATAR_ALT,
  className = "",
}: HeroAvatarProps) {
  const reduce = useReducedMotion();
  const lowPerf = useLowPerformance();
  const ambientEnabled = !reduce && !lowPerf;

  const {
    containerRef,
    rotateX,
    rotateY,
    eyeX,
    eyeY,
    isActive,
    setActive,
    bindPointer,
  } = useCursorTracking();

  const blinking = useBlink(!reduce);
  const showEyelidFallback = !layers.blink;

  const handleActivate = useCallback(() => setActive(true), [setActive]);
  const handleDeactivate = useCallback(() => setActive(false), [setActive]);

  const breathScale = reduce ? 1 : [BREATH_SCALE_MIN, BREATH_SCALE_MAX];
  const hairRotate = reduce ? 0 : [-HAIR_SWAY_DEG, HAIR_SWAY_DEG];

  return (
    <div
      className={`relative mx-auto w-full max-w-[380px] lg:max-w-none ${className}`}
    >
      <SpeechBubble
        paused={isActive}
        className="right-0 top-0 max-w-[200px] sm:-right-2 sm:max-w-[220px] lg:-right-4"
      />

      <motion.div
        aria-hidden
        variants={glowEntranceVariants}
        initial="hidden"
        animate="visible"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <motion.div
          className="absolute left-1/2 top-[55%] h-[75%] w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(200,255,0,0.12)_0%,transparent_68%)] blur-2xl"
          animate={
            ambientEnabled
              ? {
                  opacity: isActive ? [0.65, 0.85, 0.65] : [0.5, 0.75, 0.5],
                  scale: isActive ? [1.05, 1.1, 1.05] : [1, 1.04, 1],
                }
              : { opacity: isActive ? 0.7 : 0.55 }
          }
          transition={
            ambientEnabled
              ? { duration: 5, repeat: Infinity, ease: "easeInOut" }
              : undefined
          }
        />
        <AmbientParticles enabled={ambientEnabled} />
      </motion.div>

      <motion.div
        variants={avatarEntranceVariants}
        initial="hidden"
        animate="visible"
        className="relative"
      >
        <motion.div
          ref={containerRef}
          tabIndex={0}
          role="img"
          aria-label={alt}
          className="relative rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          onPointerMove={bindPointer.onPointerMove}
          onPointerLeave={() => {
            bindPointer.onPointerLeave();
            handleDeactivate();
          }}
          onPointerEnter={bindPointer.onPointerEnter}
          onMouseEnter={handleActivate}
          onMouseLeave={handleDeactivate}
          onFocus={handleActivate}
          onBlur={handleDeactivate}
          animate={{ scale: isActive && !reduce ? HOVER_SCALE : 1 }}
          transition={hoverTransition()}
          style={{ transformStyle: "preserve-3d", perspective: 900 }}
        >
          <motion.div
            animate={{ scale: breathScale }}
            transition={breathTransition(!!reduce)}
            className="relative w-full"
            style={{ aspectRatio: AVATAR_ASPECT }}
          >
            <motion.div
              className="relative h-full w-full"
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            >
              {/* Subtle head sway when no separate hair layer */}
              <motion.div
                className="relative h-full w-full"
                animate={!layers.hair && !reduce ? { rotate: hairRotate } : { rotate: 0 }}
                transition={hairSwayTransition(!!reduce)}
                style={{ transformOrigin: "50% 15%" }}
              >
              <div className="relative h-full w-full overflow-hidden rounded-xl bg-surface-2">
                <Image
                  src={layers.base}
                  alt=""
                  aria-hidden
                  fill
                  priority
                  sizes="(max-width: 1024px) 85vw, 40vw"
                  className="object-cover object-[center_12%] select-none"
                  draggable={false}
                />

                {layers.hair && (
                  <motion.div
                    className="pointer-events-none absolute inset-0 z-10 origin-[50%_18%]"
                    animate={{ rotate: hairRotate }}
                    transition={hairSwayTransition(!!reduce)}
                  >
                    <Image
                      src={layers.hair}
                      alt=""
                      fill
                      sizes="420px"
                      className="object-cover object-[center_12%]"
                    />
                  </motion.div>
                )}

                {layers.blink && (
                  <motion.div
                    className="pointer-events-none absolute inset-0 z-[18]"
                    animate={{ opacity: blinking ? 1 : 0 }}
                    transition={{ duration: BLINK_DURATION, ease: "easeInOut" }}
                  >
                    <Image
                      src={layers.blink}
                      alt=""
                      fill
                      sizes="420px"
                      className="object-cover object-[center_12%]"
                    />
                  </motion.div>
                )}

                {showEyelidFallback && <EyelidFallback blinking={blinking} />}

                {layers.smile && (
                  <motion.div
                    className="pointer-events-none absolute inset-0 z-[19]"
                    animate={{ opacity: isActive ? 1 : 0 }}
                    transition={hoverTransition()}
                  >
                    <Image
                      src={layers.smile}
                      alt=""
                      fill
                      sizes="420px"
                      className="object-cover object-[center_12%]"
                    />
                  </motion.div>
                )}

                <EyePupils eyeX={eyeX} eyeY={eyeY} pupilsSrc={layers.pupils} />

                {layers.hand && (
                  <motion.div
                    className="pointer-events-none absolute inset-0 z-[25] origin-[72%_68%]"
                    animate={
                      isActive && !reduce ? waveKeyframes(false) : { rotate: 0 }
                    }
                  >
                    <Image
                      src={layers.hand}
                      alt=""
                      fill
                      sizes="420px"
                      className="object-cover object-[center_12%]"
                    />
                  </motion.div>
                )}

                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 z-[5] rounded-xl"
                  animate={{
                    boxShadow: isActive
                      ? "inset 0 0 60px -20px rgba(200,255,0,0.15)"
                      : "inset 0 0 0 transparent",
                  }}
                  transition={hoverTransition()}
                />
              </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
