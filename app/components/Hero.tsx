"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const ease = [0.21, 0.47, 0.32, 0.98] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};

const stars = [
  "left-[10%] top-[12%]",
  "left-[24%] top-[20%]",
  "left-[38%] top-[9%]",
  "left-[52%] top-[16%]",
  "left-[68%] top-[11%]",
  "left-[82%] top-[22%]",
  "left-[90%] top-[14%]",
  "left-[16%] top-[30%]",
];

export function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  // gentle scroll parallax — foreground scene and sky move at different rates
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const skyY = useTransform(scrollYProgress, [0, 1], [0, 24]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Full-bleed landscape background (fades in on load) */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.3, ease }}
        className="absolute inset-0 -z-10"
      >
        {/* the scene — subtle scroll parallax + slow living drift */}
        <motion.div
          style={{ y: reduce ? 0 : sceneY }}
          className="absolute inset-0"
        >
          <motion.div
            animate={
              reduce
                ? {}
                : {
                    y: [0, -6, 0],
                    scale: [1.06, 1.075, 1.06],
                  }
            }
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
            className="absolute inset-0 scale-[1.06]"
          >
            <Image
              src="/Images/hero-landscape-female-v2.png"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-bottom brightness-95"
            />
          </motion.div>
        </motion.div>

        {/* faint drifting fog band between mountain layers (depth) */}
        {!reduce && (
          <motion.div
            animate={{ x: [-20, 20, -20], opacity: [0.25, 0.45, 0.25] }}
            transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-x-[-10%] top-[52%] h-32 bg-[linear-gradient(to_bottom,transparent,rgba(150,190,205,0.10),transparent)] blur-2xl"
          />
        )}

        {/* slow drifting stars (sky layer) */}
        <motion.div
          style={{ y: reduce ? 0 : skyY }}
          className="absolute inset-0"
        >
          {!reduce &&
            stars.map((s, i) => (
              <motion.span
                key={s}
                animate={{ x: [0, 6, 0], opacity: [0.25, 0.85, 0.25] }}
                transition={{
                  duration: 7 + i * 1.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.7,
                }}
                className={`absolute h-[3px] w-[3px] rounded-full bg-white/80 ${s}`}
              />
            ))}
        </motion.div>

        {/* glowing-path pulse near the horizon (kept right of the text, dimmer) */}
        <motion.div
          aria-hidden
          animate={reduce ? {} : { opacity: [0.35, 0.6, 0.35] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute left-[64%] top-[56%] h-24 w-40 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(53,224,224,0.22),transparent_70%)] blur-2xl"
        />

        {/* atmospheric glow around the horizon (toned down, pushed off-center) */}
        <div className="absolute inset-0 bg-[radial-gradient(34%_24%_at_66%_56%,rgba(120,190,210,0.12),transparent_70%)]" />
        {/* vertical gradient — darker top & bottom */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.34)_45%,rgba(0,0,0,0.46)_72%,rgba(0,0,0,0.62)_100%)]" />
        {/* foreground depth */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/55 to-transparent" />
        {/* darker radial scrim directly behind the text content */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_44%,rgba(0,0,0,0.65)_0%,rgba(0,0,0,0.45)_40%,rgba(0,0,0,0)_80%)]" />
      </motion.div>

      {/* welcome sequence — "she notices you" cue + greeting bubble (desktop) */}
      {!reduce && (
        <>
          <motion.div
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.85, 0] }}
            transition={{ duration: 1.6, delay: 1, ease }}
            className="absolute left-[20%] top-[40%] z-[1] hidden h-16 w-16 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(53,224,224,0.4),transparent_70%)] blur-xl lg:block"
          />
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.92 }}
            animate={{
              opacity: [0, 1, 1, 0],
              y: [8, 0, 0, -4],
              scale: [0.92, 1, 1, 0.98],
            }}
            transition={{
              duration: 3.8,
              times: [0, 0.16, 0.72, 1],
              delay: 1.3,
              ease,
            }}
            className="absolute left-[13%] top-[30%] z-10 hidden lg:block"
          >
            <div className="relative rounded-2xl border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-medium whitespace-nowrap text-white shadow-[0_16px_40px_-16px_rgba(0,0,0,0.85)] backdrop-blur-md">
              👋 Hi, I&apos;m Radhika
              <span className="absolute -bottom-1.5 left-7 h-3 w-3 rotate-45 border-r border-b border-white/15 bg-white/10" />
            </div>
          </motion.div>
        </>
      )}

      <div className="container-shell w-full">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mx-auto flex max-w-[800px] flex-col items-center pt-28 pb-20 text-center sm:pt-32"
        >
          <motion.div variants={item}>
            <span className="text-xs font-medium tracking-[0.22em] text-white/60 uppercase">
              Product Designer{" "}
              <span className="mx-1.5 text-accent">•</span> UI/UX Designer
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-6 font-display text-[2.75rem] leading-[1.05] font-semibold tracking-tight text-white text-balance [text-shadow:0_4px_20px_rgba(0,0,0,0.5)] sm:text-6xl lg:text-[4.5rem]"
          >
            Less confusion.{" "}
            <span className="font-semibold text-accent">More clarity.</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-[700px] text-base leading-relaxed text-white/90 [text-shadow:0_2px_16px_rgba(0,0,0,0.6)] sm:text-lg"
          >
            I design digital products that help users move from{" "}
            <span className="font-medium text-white">
              &ldquo;What am I supposed to do?&rdquo;
            </span>{" "}
            to{" "}
            <span className="font-medium text-white">
              &ldquo;That was easy.&rdquo;
            </span>
          </motion.p>

          <motion.div
            variants={item}
            className="mt-9 flex flex-col items-center gap-3 sm:flex-row"
          >
            <Link
              href="/#work"
              className="cta-glow group inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-semibold text-background transition-transform duration-300 hover:-translate-y-0.5"
            >
              View Work
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/#contact"
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[0.06] px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/10"
            >
              Contact Me
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-10 flex items-center justify-center gap-6 text-sm text-white/50"
          >
            <span>
              <span className="font-display text-base font-semibold text-white">
                5+
              </span>{" "}
              years
            </span>
            <span className="h-4 w-px bg-white/20" />
            <span>
              <span className="font-display text-base font-semibold text-white">
                30+
              </span>{" "}
              products shipped
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
