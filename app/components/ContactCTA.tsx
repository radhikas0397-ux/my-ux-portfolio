"use client";

import Image from "next/image";
import { ArrowUpRight, Download, FileText, Mail } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { site } from "../lib/site";
import { Reveal } from "./Reveal";

const ease = [0.21, 0.47, 0.32, 0.98] as const;
const CONTACT_BG = "/images/contact-section-bg.jpg";
const PORTRAIT = "/images/radhika-profile.jpg";
const EMAIL = "radhikas0397@gmail.com";

const CONTACT_LINKS = [
  {
    href: `mailto:${EMAIL}`,
    icon: "mail" as const,
    label: EMAIL,
    external: false,
  },
  {
    href: site.linkedin,
    icon: "linkedin" as const,
    label: "Connect on LinkedIn",
    external: true,
  },
  {
    href: site.resume,
    icon: "resume" as const,
    label: "View Resume",
    external: true,
    ariaLabel: site.resumeAriaLabel,
  },
] as const;

function ContactLinkIcon({ type }: { type: "mail" | "linkedin" | "resume" }) {
  if (type === "mail") {
    return <Mail aria-hidden className="contact-link-icon h-[1.125rem] w-[1.125rem] shrink-0" />;
  }

  if (type === "resume") {
    return <FileText aria-hidden className="contact-link-icon h-[1.125rem] w-[1.125rem] shrink-0" />;
  }

  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="contact-link-icon h-[1.125rem] w-[1.125rem] shrink-0"
      fill="currentColor"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export function ContactCTA() {
  const reduced = useReducedMotion() ?? false;

  return (
    <section
      id="contact"
      className="contact-landscape-section section-pad-compact-bottom scroll-mt-16"
    >
      <div className="container-shell">
        <Reveal y={36}>
          <motion.article
            className="contact-landscape-card contact-section group relative overflow-hidden rounded-[36px]"
            whileHover={reduced ? undefined : { y: -3 }}
            transition={{ duration: 0.5, ease }}
          >
            <div aria-hidden className="contact-section-bg">
              <Image
                src={CONTACT_BG}
                alt=""
                fill
                unoptimized
                priority={false}
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="contact-landscape-image object-cover object-center"
              />
            </div>

            <div className="contact-landscape-content contact-content relative z-[1] grid min-h-[520px] grid-cols-1 gap-10 p-8 sm:p-10 md:min-h-[480px] md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:items-center md:gap-12 md:p-14 lg:gap-16 lg:p-16">
              <div className="contact-copy order-2 flex flex-col justify-center md:order-1">
                <p className="type-section-label">
                  Let&apos;s Connect
                </p>

                <h2 className="type-section-title mt-4 text-balance md:mt-5">
                  Let&apos;s create something meaningful together.
                </h2>

                <p className="type-body-lg mt-5 max-w-xl md:mt-6">
                  I&apos;m open to product design opportunities, AI-driven
                  projects and thoughtful collaborations across B2B, B2C and
                  SaaS products.
                </p>

                <div className="contact-links mt-8 flex flex-col gap-3 sm:mt-9">
                  {CONTACT_LINKS.map((link) => (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      className="contact-link group/link"
                      aria-label={
                        "ariaLabel" in link ? link.ariaLabel : undefined
                      }
                      {...(link.external
                        ? {
                            target: "_blank",
                            rel: "noopener noreferrer",
                          }
                        : {})}
                      whileHover={reduced ? undefined : { y: -2 }}
                      transition={{ duration: 0.25, ease }}
                    >
                      <ContactLinkIcon type={link.icon} />
                      <span className="contact-link-text min-w-0 flex-1">
                        {link.label}
                      </span>
                      <ArrowUpRight
                        aria-hidden
                        className="contact-link-arrow h-4 w-4 shrink-0"
                      />
                    </motion.a>
                  ))}

                  <a
                    href={site.resume}
                    download={site.resumeDownloadName}
                    className="contact-resume-download type-caption mt-1 inline-flex items-center gap-2 self-start text-[var(--muted)] underline-offset-4 transition-colors hover:text-foreground hover:underline"
                    aria-label="Download Radhika Sharma's resume as a PDF"
                  >
                    <Download aria-hidden className="h-4 w-4 shrink-0" />
                    Download Resume
                  </a>
                </div>
              </div>

              <div className="contact-image-wrapper contact-portrait order-1 md:order-2">
                <div className="contact-portrait-frame mx-auto w-full max-w-[320px] sm:max-w-[360px] md:mx-0 md:max-w-none">
                  <Image
                    src={PORTRAIT}
                    alt="Portrait of Radhika Sharma, Product Designer"
                    fill
                    sizes="(max-width: 768px) 320px, 360px"
                    className="contact-portrait-image object-cover object-[center_18%]"
                  />
                </div>
              </div>
            </div>
          </motion.article>
        </Reveal>
      </div>
    </section>
  );
}
