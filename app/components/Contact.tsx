"use client";

import { motion } from "framer-motion";
import { Mail, ArrowUpRight, FileText } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionHeading";
import { site } from "../lib/site";

export function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="container-shell">
        <div className="relative overflow-hidden rounded-[2rem] border border-line card-surface px-6 py-16 sm:px-12 sm:py-20 lg:px-20">
          {/* glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10"
          >
            <div className="absolute -top-24 left-1/2 h-[400px] w-[600px] -translate-x-1/2 animate-float-glow rounded-full bg-[radial-gradient(circle,_rgba(124,100,255,0.18),_transparent_60%)] blur-2xl" />
            <div className="absolute -bottom-32 right-0 h-[360px] w-[360px] animate-drift rounded-full bg-[radial-gradient(circle,_rgba(94,234,212,0.12),_transparent_60%)] blur-2xl" />
          </div>

          <div className="mx-auto max-w-3xl text-center">
            <Reveal className="flex justify-center">
              <SectionLabel>Contact</SectionLabel>
            </Reveal>

            <Reveal delay={0.05}>
              <h2 className="mt-6 font-display text-3xl font-semibold leading-[1.12] tracking-tight text-balance sm:text-4xl md:text-[3.25rem]">
                Let&apos;s build something{" "}
                <span className="font-serif italic font-normal text-accent">
                  meaningful.
                </span>
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mx-auto mt-6 max-w-xl text-base text-muted sm:text-lg">
                I&apos;m currently available for product design roles and select
                collaborations. Have a problem worth solving? I&apos;d love to
                hear about it.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <motion.a
                  whileHover={{ y: -2 }}
                  href={`mailto:${site.email}`}
                  className="cta-glow group inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-semibold text-background sm:w-auto"
                >
                  <Mail className="h-4 w-4" />
                  {site.email}
                </motion.a>
                <motion.a
                  whileHover={{ y: -2 }}
                  href={site.resume}
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-line-strong bg-surface-2/60 px-6 py-3.5 text-sm font-semibold backdrop-blur transition-colors hover:border-accent/50 sm:w-auto"
                >
                  <FileText className="h-4 w-4" />
                  Resume
                </motion.a>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-8 flex items-center justify-center gap-6 text-sm">
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1 text-muted transition-colors hover:text-foreground"
                >
                  LinkedIn
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <span className="h-4 w-px bg-line-strong" />
                <span className="text-faint">{site.location}</span>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
