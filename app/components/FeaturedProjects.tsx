"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { projects } from "../lib/projects";
import { Reveal } from "./Reveal";
import { ProjectScreenPreview } from "./ProjectScreenPreview";

const FEATURED_SLUGS = [
  "virtual-field-tour",
  "farmer-wallet",
  "buyer-web-app",
  "pet-walking-app",
] as const;

const FEATURED_META: Record<
  (typeof FEATURED_SLUGS)[number],
  { number: string; category: string }
> = {
  "virtual-field-tour": {
    number: "01",
    category: "Immersive Experience · Climate Tech",
  },
  "farmer-wallet": { number: "02", category: "Product Design · Mobile App" },
  "buyer-web-app": { number: "03", category: "Product Design · Dashboard" },
  "pet-walking-app": { number: "04", category: "Product Design · Mobile App" },
};

function ScrollArrow({
  direction,
  disabled,
  onClick,
}: {
  direction: "left" | "right";
  disabled: boolean;
  onClick: () => void;
}) {
  const Icon = direction === "left" ? ChevronLeft : ChevronRight;

  return (
    <button
      type="button"
      aria-label={`Scroll projects ${direction}`}
      disabled={disabled}
      onClick={onClick}
      className={`service-scroll-btn surface-control grid h-11 w-11 place-items-center rounded-full transition-all duration-300 ${
        disabled
          ? "cursor-default text-muted/30 opacity-40"
          : "text-foreground"
      }`}
    >
      <Icon className="h-5 w-5" strokeWidth={1.5} />
    </button>
  );
}

function ProjectCard({ slug }: { slug: (typeof FEATURED_SLUGS)[number] }) {
  const project = projects.find((p) => p.slug === slug);
  if (!project) return null;

  const category = FEATURED_META[slug].category;
  const number = FEATURED_META[slug].number;

  return (
    <article className="service-card group flex h-full shrink-0 flex-col">
      <Link href={`/work/${project.slug}`} className="flex h-full min-h-0 flex-col">
        <div className="service-card-image-wrap">
          <div className="service-card-preview">
            <ProjectScreenPreview project={project} variant="desktop" />
          </div>
        </div>

        <div className="service-card-body flex flex-1 flex-col p-6 sm:p-7">
          <span className="type-label text-muted">{number}</span>
          <h3 className="type-card-title service-card-title mt-3 text-foreground">
            {project.title}
          </h3>
          <p className="type-body service-card-category mt-3 flex-1">
            {category}
          </p>
          <span className="type-btn link-subtle mt-5 inline-flex items-center gap-1">
            View Case Study
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </Link>
    </article>
  );
}

export function FeaturedProjects() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 4);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    updateScrollState();

    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  const scrollByCard = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;

    const card = el.querySelector<HTMLElement>(".service-card");
    const gap = 28;
    const distance = (card?.offsetWidth ?? 450) + gap;

    el.scrollBy({
      left: direction === "left" ? -distance : distance,
      behavior: "smooth",
    });
  };

  return (
    <section id="work" className="section-pad scroll-mt-16 overflow-hidden">
      <div className="container-shell">
        <div className="section-header flex items-end justify-between gap-6">
          <Reveal y={32} className="max-w-3xl">
            <p className="type-section-label">Selected Work</p>
            <h2 className="type-section-title mt-4 text-balance text-foreground">
              Featured Projects
            </h2>
            <p className="type-body-lg mt-5 max-w-2xl">
              A selection of product, climate-tech, and experience design
              projects.
            </p>
          </Reveal>

          <div className="hidden shrink-0 gap-3 md:flex">
            <ScrollArrow
              direction="left"
              disabled={!canScrollLeft}
              onClick={() => scrollByCard("left")}
            />
            <ScrollArrow
              direction="right"
              disabled={!canScrollRight}
              onClick={() => scrollByCard("right")}
            />
          </div>
        </div>
      </div>

      <div className="services-scroll-outer">
        <div
          ref={scrollRef}
          className="services-scroll-track flex items-stretch gap-7 overflow-x-auto scroll-smooth pb-2"
        >
          {FEATURED_SLUGS.map((slug) => (
            <ProjectCard key={slug} slug={slug} />
          ))}
        </div>
      </div>
    </section>
  );
}
