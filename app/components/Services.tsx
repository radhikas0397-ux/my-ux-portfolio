"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  type PanInfo,
} from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal } from "./Reveal";

type Service = {
  number: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  imagePosition?: string;
  imagePositionMobile?: string;
};

const SERVICES: Service[] = [
  {
    number: "01",
    title: "Product Strategy",
    description:
      "I help turn early ideas into clear product direction by understanding user needs, business goals, market context, and product constraints. From defining MVP scope to mapping user journeys and prioritizing features, I shape experiences that are practical, meaningful, and aligned with both user value and business impact.",
    image: "/images/services/product-strategy.png",
    imageAlt: "Product strategy illustration",
    imagePosition: "center center",
    imagePositionMobile: "center center",
  },
  {
    number: "02",
    title: "User Research",
    description:
      "I uncover what users need, expect, and struggle with through interviews, usability feedback, competitor analysis, and behavioral insights. My research approach focuses on asking better questions, identifying patterns, and translating findings into clear design decisions that reduce assumptions and help create products people can actually use.",
    image: "/images/services/user-research.png",
    imageAlt: "User research illustration",
    imagePosition: "center center",
    imagePositionMobile: "center center",
  },
  {
    number: "03",
    title: "UI/UX Design",
    description:
      "I design intuitive web and mobile experiences that make complex workflows feel simple, clear, and effortless. My focus is on creating thoughtful user flows, clean interfaces, strong visual hierarchy, and responsive layouts that balance usability, aesthetics, and product goals across every screen and interaction.",
    image: "/images/services/ui-ux-design.png",
    imageAlt: "UI and UX design illustration",
    imagePosition: "center center",
    imagePositionMobile: "center center",
  },
  {
    number: "04",
    title: "Design Systems",
    description:
      "I create scalable design systems that bring consistency, clarity, and speed to product teams. From reusable components and spacing rules to typography, colors, states, and interaction patterns, I build systems that help products grow without losing visual quality, usability, or brand coherence across different experiences.",
    image: "/images/services/design-systems.png",
    imageAlt: "Design systems illustration",
    imagePosition: "center center",
    imagePositionMobile: "center center",
  },
  {
    number: "05",
    title: "Prototyping & Handoff",
    description:
      "I create interactive prototypes that bring product ideas to life before development begins. I also prepare clean developer handoffs with design specs, edge cases, interaction notes, component behavior, and responsive guidance, helping teams reduce confusion, speed up implementation, and maintain design quality during development.",
    image: "/images/services/prototyping-handoff.png",
    imageAlt: "Prototyping and developer handoff illustration",
    imagePosition: "center center",
    imagePositionMobile: "center center",
  },
];

const CARD_COUNT = SERVICES.length;
const CARD_GAP = 24;
/** Visible sliver of the next card on the right (desktop/tablet) */
const NEXT_CARD_PEEK = 56;

const SLIDE_SPRING = {
  type: "spring" as const,
  stiffness: 260,
  damping: 34,
  mass: 0.85,
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function SliderArrow({
  direction,
  disabled,
  onClick,
}: {
  direction: "left" | "right";
  disabled: boolean;
  onClick: () => void;
}) {
  const Icon = direction === "left" ? ChevronLeft : ChevronRight;
  const label =
    direction === "left" ? "Previous service" : "Next service";

  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={`service-slider-arrow surface-control grid h-11 w-11 place-items-center rounded-full transition-colors duration-200 ${
        disabled
          ? "cursor-default text-muted/30 opacity-40"
          : "text-foreground"
      }`}
    >
      <Icon className="h-5 w-5" strokeWidth={1.5} />
    </button>
  );
}

function ServiceSlide({
  service,
  index,
  width,
}: {
  service: Service;
  index: number;
  width: number;
}) {
  return (
    <article
      className="service-slider-card shrink-0 select-none"
      style={{
        width: width > 0 ? width : undefined,
        ["--service-img-pos" as string]:
          service.imagePosition ?? "center center",
        ["--service-img-pos-mobile" as string]:
          service.imagePositionMobile ??
          service.imagePosition ??
          "center center",
      }}
      aria-roledescription="slide"
      aria-label={`${service.number} ${service.title}`}
    >
      <div className="service-slider-card-inner">
        <div className="service-slider-card-content">
          <span className="type-label">{service.number}</span>
          <h3 className="type-card-title mt-3 text-foreground">
            {service.title}
          </h3>
          <p className="service-slider-card-description mt-3">
            {service.description}
          </p>
        </div>

        <div className="service-slider-card-image-wrap relative h-full w-full overflow-hidden rounded-[inherit]">
          <Image
            src={service.image}
            alt={service.imageAlt}
            fill
            unoptimized
            draggable={false}
            sizes="(max-width: 768px) 100vw, 35vw"
            className="service-slider-image pointer-events-none object-cover object-center"
          />
        </div>
      </div>
    </article>
  );
}

export function Services() {
  const reduced = useReducedMotion() ?? false;
  const viewportRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [layout, setLayout] = useState({ cardWidth: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const x = useMotionValue(0);
  const { cardWidth } = layout;
  const stride = cardWidth + CARD_GAP;

  const measure = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const width = viewport.clientWidth;
    const isMobile = width < 768;
    const nextCardWidth = isMobile
      ? width
      : Math.min(860, width - NEXT_CARD_PEEK);
    setLayout({ cardWidth: nextCardWidth });
  }, []);

  useEffect(() => {
    measure();
    const viewport = viewportRef.current;
    if (!viewport) return;

    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    window.addEventListener("resize", measure);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  useEffect(() => {
    if (stride <= 0) return;

    const target = -activeIndex * stride;
    if (reduced) {
      x.set(target);
      return;
    }

    const controls = animate(x, target, SLIDE_SPRING);
    return () => controls.stop();
  }, [activeIndex, stride, reduced, x]);

  const goTo = (index: number) => {
    setActiveIndex(clamp(index, 0, CARD_COUNT - 1));
  };

  const goPrev = () => goTo(activeIndex - 1);
  const goNext = () => goTo(activeIndex + 1);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    setIsDragging(false);
    if (stride <= 0) return;

    const offset = info.offset.x;
    const velocity = info.velocity.x;
    let nextIndex = activeIndex;

    if (offset < -stride * 0.15 || velocity < -350) {
      nextIndex = activeIndex + 1;
    } else if (offset > stride * 0.15 || velocity > 350) {
      nextIndex = activeIndex - 1;
    }

    goTo(nextIndex);
  };

  return (
    <section
      id="services"
      className="section-pad scroll-mt-16 overflow-hidden"
    >
      <div className="container-shell">
        <div className="section-header flex items-end justify-between gap-6">
          <Reveal y={32} className="max-w-3xl">
            <p className="type-section-label">Services</p>
            <h2 className="type-section-title mt-4 text-balance text-foreground">
              How I can help shape your product.
            </h2>
            <p className="type-body-lg mt-5 max-w-2xl">
              From early product thinking to polished interfaces and
              developer-ready systems.
            </p>
          </Reveal>

          <div className="hidden shrink-0 gap-3 sm:flex">
            <SliderArrow
              direction="left"
              disabled={activeIndex === 0}
              onClick={goPrev}
            />
            <SliderArrow
              direction="right"
              disabled={activeIndex === CARD_COUNT - 1}
              onClick={goNext}
            />
          </div>
        </div>

        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Services"
          className="services-slider-region"
        >
          <div ref={viewportRef} className="services-slider-viewport">
            <motion.div
              className={`services-slider-track ${isDragging ? "is-dragging" : ""}`}
              drag={reduced || stride <= 0 ? false : "x"}
              dragMomentum={false}
              dragElastic={0.06}
              dragConstraints={
                stride > 0
                  ? { left: -stride * (CARD_COUNT - 1), right: 0 }
                  : undefined
              }
              style={{
                x,
                gap: CARD_GAP,
              }}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={onDragEnd}
            >
              {SERVICES.map((service, index) => (
                <ServiceSlide
                  key={service.title}
                  service={service}
                  index={index}
                  width={cardWidth}
                />
              ))}
            </motion.div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4 sm:mt-[var(--space-header-content)]">
            <div className="flex gap-3 sm:hidden">
              <SliderArrow
                direction="left"
                disabled={activeIndex === 0}
                onClick={goPrev}
              />
              <SliderArrow
                direction="right"
                disabled={activeIndex === CARD_COUNT - 1}
                onClick={goNext}
              />
            </div>

            <div
              className="flex items-center gap-2"
              role="tablist"
              aria-label="Service slides"
            >
              {SERVICES.map((service, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={service.title}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`${service.number} ${service.title}`}
                    onClick={() => goTo(index)}
                    className={`service-slider-dot ${isActive ? "is-active" : ""}`}
                  />
                );
              })}
            </div>
          </div>

          <p className="sr-only" aria-live="polite">
            {SERVICES[activeIndex].number} {SERVICES[activeIndex].title}.{" "}
            {SERVICES[activeIndex].description}
          </p>
        </div>
      </div>
    </section>
  );
}
