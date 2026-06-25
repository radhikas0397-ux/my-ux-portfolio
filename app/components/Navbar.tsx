"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { site } from "../lib/site";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div className="container-narrow">
          <div
            className={`relative mt-3 flex items-center justify-between rounded-full px-3 py-2 transition-all duration-500 sm:px-4 ${
              scrolled
                ? "border border-line bg-surface/70 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.6)] backdrop-blur-xl"
                : "border border-transparent bg-transparent"
            }`}
          >
            <Link
              href="/"
              className="group flex items-center gap-2.5 pl-1"
              onClick={() => setOpen(false)}
            >
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-foreground font-display text-xs font-bold tracking-tight text-background transition-transform duration-300 group-hover:scale-105">
                RS
              </span>
              <span className="hidden text-[13px] font-semibold tracking-tight sm:block">
                {site.name}
              </span>
            </Link>

            <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">
              {site.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="nav-underline rounded-lg px-3.5 py-2 text-[13px] font-medium text-muted transition-colors duration-300 hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <Link
                href="/#contact"
                className="group hidden items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-[13px] font-semibold text-background transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_-12px_rgba(255,255,255,0.5)] md:inline-flex"
              >
                Let&apos;s talk
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              <button
                type="button"
                aria-label="Toggle menu"
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
                className="grid h-10 w-10 place-items-center rounded-full border border-line-strong bg-surface-2 md:hidden"
              >
                {open ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl md:hidden"
          >
            <nav className="container-shell flex h-full flex-col justify-center gap-2 pb-20">
              {site.nav.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i + 0.1 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-line py-5 font-display text-3xl font-medium tracking-tight"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.a
                href={`mailto:${site.email}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * site.nav.length + 0.1 }}
                className="mt-8 text-lg text-accent"
              >
                {site.email}
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
