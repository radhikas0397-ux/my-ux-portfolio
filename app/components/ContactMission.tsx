"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail, Rocket } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionHeading";
import { site } from "../lib/site";
import { GlowOrb } from "./ui/GamifiedUI";

const ease = [0.21, 0.47, 0.32, 0.98] as const;

export function ContactMission() {
  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden">
      <div className="container-shell">
        <Reveal>
          <div className="panel-glow relative overflow-hidden rounded-[32px] px-6 py-12 sm:px-10 sm:py-16 lg:px-16">
            <GlowOrb className="right-0 top-0 h-64 w-64 opacity-70" color="purple" />
            <GlowOrb className="bottom-0 left-0 h-48 w-48 opacity-50" color="teal" />

            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(94,234,212,0.06),transparent_55%)]"
            />

            <div className="relative mx-auto max-w-2xl text-center">
              <SectionLabel>Contact</SectionLabel>

              <h2 className="type-section-title mt-5 text-balance">
                Let&apos;s build something{" "}
                <span className="text-foreground">meaningful.</span>
              </h2>

              <p className="type-body mx-auto mt-6 max-w-lg">
                Ready to start a new mission? Whether it&apos;s a product
                challenge, design system, or climate-tech initiative — I&apos;d
                love to hear about it.
              </p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease }}
                className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
              >
                <a
                  href={`mailto:${site.email}`}
                  className="group type-btn inline-flex items-center justify-center gap-2.5 rounded-full border border-line bg-foreground px-7 py-4 text-background transition-all duration-300 hover:-translate-y-0.5 hover:bg-foreground/90"
                >
                  <Rocket className="h-4 w-4" />
                  Start a Mission
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <Link
                  href="/#work"
                  className="group type-btn inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-7 py-4 text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/10"
                >
                  Explore Work
                </Link>
              </motion.div>

              <motion.a
                href={`mailto:${site.email}`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-8 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
              >
                <Mail className="h-4 w-4" />
                {site.email}
              </motion.a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
