"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { site } from "../lib/site";

const SECTION_IDS = ["home", "about", "work", "contact"];

function NavLink({
  href,
  label,
  activeLink,
  transparent,
  onClick,
  className = "",
  ariaLabel,
}: {
  href: string;
  label: string;
  activeLink: boolean;
  transparent: boolean;
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
}) {
  const isExternal = href.startsWith("/") && !href.startsWith("/#");
  const linkClass = `${
    transparent ? "type-nav-art" : "type-nav"
  } relative transition-colors ${className} ${
    transparent
      ? activeLink
        ? "text-[var(--foreground)]"
        : "text-[var(--nav)] hover:text-[var(--foreground)]"
      : activeLink
        ? "text-foreground"
        : "text-[var(--nav)] hover:text-foreground"
  }`;

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
        onClick={onClick}
        className={linkClass}
      >
        {label}
      </a>
    );
  }

  return (
    <Link href={href} onClick={onClick} className={linkClass}>
      {label}
    </Link>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  const onHome = pathname === "/";
  const transparent = onHome && !scrolled;

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (pathname !== "/") return;

    const sections = SECTION_IDS.map((id) =>
      document.getElementById(id),
    ).filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: "-40% 0px -45% 0px", threshold: [0, 0.25, 0.5] },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  const isActive = (href: string) => {
    if (href.startsWith("/") && !href.startsWith("/#")) return false;
    const id = href.replace("/#", "");
    if (pathname !== "/") return false;
    return active === id;
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
          transparent
            ? "border-b border-transparent bg-transparent"
            : "navbar-solid border-b"
        }`}
      >
        {transparent && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#10120F]/80 via-[#10120F]/35 to-transparent"
          />
        )}
        <div
          className={`navbar-inner relative flex h-14 items-center sm:h-16 ${
            transparent
              ? "navbar-inner--transparent justify-center px-6 md:px-8"
              : "container-shell justify-between"
          }`}
        >
          <Link
            href="/#home"
            onClick={() => setOpen(false)}
            className={`navbar-logo-link group flex items-center gap-3 ${
              transparent ? "navbar-logo-link--hero" : ""
            }`}
            aria-label="Home"
          >
            <span className="navbar-logo type-caption grid h-9 w-9 place-items-center rounded-full font-semibold normal-case tracking-normal">
              RS
            </span>
          </Link>

          <nav
            className={`hidden items-center md:flex ${
              transparent ? "gap-8 lg:gap-10" : "ml-auto gap-6 lg:gap-8"
            }`}
          >
            {site.nav.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                label={item.label}
                activeLink={isActive(item.href)}
                transparent={transparent}
                ariaLabel={"ariaLabel" in item ? item.ariaLabel : undefined}
              />
            ))}
          </nav>

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className={`navbar-menu-toggle grid place-items-center md:hidden ${
              transparent
                ? "text-[var(--foreground)]"
                : "rounded-lg border border-line text-foreground"
            }`}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="navbar-mobile-panel mobile-menu fixed inset-0 z-40 bg-[var(--surface-2)] backdrop-blur-sm md:hidden"
          >
            <nav className="mobile-menu-nav flex h-full w-full flex-col justify-start gap-1 pb-20">
              {site.nav.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i + 0.08 }}
                >
                  <NavLink
                    href={item.href}
                    label={item.label}
                    activeLink={isActive(item.href)}
                    transparent={false}
                    onClick={() => setOpen(false)}
                    className="type-nav block border-b border-line"
                    ariaLabel={"ariaLabel" in item ? item.ariaLabel : undefined}
                  />
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
