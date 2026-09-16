"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { site } from "../lib/site";

export function Footer() {
  const reduced = useReducedMotion() ?? false;

  return (
    <footer className="footer-premium relative overflow-hidden border-t border-[var(--border-subtle)]">
      <div aria-hidden className="footer-premium-atmosphere absolute inset-0" />
      <motion.div
        aria-hidden
        className="footer-premium-line absolute left-1/2 top-0 h-px w-[min(92%,720px)] -translate-x-1/2 bg-gradient-to-r from-transparent via-foreground/20 to-transparent"
        animate={reduced ? undefined : { opacity: [0.35, 0.75, 0.35] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container-shell relative z-10 py-10 sm:py-12">
        <div className="flex flex-col items-center gap-6 text-center md:flex-row md:items-center md:justify-between md:gap-8 md:text-left">
          <Link
            href="/#home"
            aria-label="Home"
            className="group inline-flex items-center gap-3"
          >
            <span className="navbar-logo type-caption grid h-10 w-10 place-items-center rounded-full font-semibold normal-case tracking-normal">
              RS
            </span>
            <span className="hidden sm:block">
              <span className="type-nav block text-foreground">{site.name}</span>
              <span className="type-caption mt-0.5 block normal-case tracking-normal text-muted">
                {site.role}
              </span>
            </span>
          </Link>

          <p className="type-caption normal-case tracking-normal text-muted md:text-right">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
