"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  defaultViewport,
  staggerContainer,
  staggerItem,
} from "../lib/scrollAnimations";

const HERO_BG = "/images/portfolio-hero-coastal-centered.png";

const STATS = [
  { value: "5+", label: "Years Experience" },
  { value: "30+", label: "Products Shipped" },
  { value: "B2B · B2C · SaaS", label: "Focus Area" },
  { value: "AI-assisted", label: "Workflows" },
] as const;

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section id="home" className="relative scroll-mt-16">
      <div className="relative flex min-h-[100svh] flex-col">
        <div className="hero-illustration-stage absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute inset-0"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className={`hero-illustration-motion absolute inset-[-3%] ${reduce ? "" : "hero-illustration-motion--active"}`}
            >
              <Image
                src={HERO_BG}
                alt="Impressionistic coastal painting of a woman on the beach overlooking the sea and sailboats"
                fill
                priority
                unoptimized
                quality={100}
                sizes="100vw"
                className="hero-illustration-image object-cover object-center"
              />
            </div>
          </motion.div>
          <div
            aria-hidden
            className={`hero-atmosphere-drift pointer-events-none absolute inset-0 z-[1] ${reduce ? "" : "hero-atmosphere-drift--active"}`}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
          >
            <div className="hero-readability-overlay absolute inset-0" />
            <div className="hero-illustration-bottom absolute inset-0" />
          </div>
        </div>

        <div className="hero-content relative z-[2] flex flex-1 flex-col items-center px-6 text-center md:px-8">
          <div className="hero-content-inner flex max-w-4xl flex-col items-center">
            <p className="type-hero-art-kicker normal-case tracking-[0.06em]">
              Hello, I&apos;m Radhika Sharma
            </p>

            <h1 className="type-hero-art-title mt-2 sm:mt-2.5">
              Product Designer
            </h1>

            <p className="type-hero-art-intro mx-auto mt-3 max-w-2xl font-medium sm:mt-4">
              Turning complex products into clear, intuitive experiences.
            </p>

            <p className="type-body mx-auto mt-4 max-w-[42rem] sm:mt-5">
              I design end-to-end digital experiences for B2C and B2B startups,
              from research and product strategy to interfaces, prototypes and
              shipped solutions.
            </p>

            <div className="hero-cta-row mt-8 flex w-full flex-col items-center justify-center gap-3 sm:mt-9 sm:w-auto sm:flex-row sm:gap-4">
              <Link
                href="/#work"
                className="btn-hero-art-primary type-btn flex w-full items-center justify-center sm:w-auto"
              >
                View My Work
              </Link>
              <Link
                href="/#contact"
                className="btn-hero-art-secondary type-btn flex w-full items-center justify-center sm:w-auto"
              >
                Contact Me
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10">
        <div className="container-shell pb-0">
          <motion.div
            variants={staggerContainer(0.1, 0)}
            initial="hidden"
            whileInView="show"
            viewport={defaultViewport}
            className="hero-stats-card stats-section grid grid-cols-2 divide-x divide-y divide-[var(--divider)] overflow-hidden lg:grid-cols-4 lg:divide-y-0"
          >
            {STATS.map((stat) => (
              <motion.div
                key={stat.label}
                variants={staggerItem(reduce, 24)}
                className="hero-stat-item stat-item"
              >
                <p className="type-stat-value hero-stat-value stat-value">
                  {stat.value}
                </p>
                <p className="type-stat-label hero-stat-label stat-label">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
