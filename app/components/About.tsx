"use client";

import { useState } from "react";
import Image from "next/image";
import { Reveal, StaggerGroup, StaggerItem } from "./Reveal";

const ABOUT_ILLUSTRATION = "/images/about-me-study-landscape.jpg";

const PILLARS = [
  "User Research",
  "Product Thinking",
  "Visual Design",
  "Business Impact",
] as const;

export function About() {
  const [activeTopic, setActiveTopic] = useState<(typeof PILLARS)[number]>(
    PILLARS[0],
  );

  return (
    <section id="about" className="section-pad scroll-mt-16">
      <div className="container-shell">
        <div className="about-section-inner">
          <div className="about-text-column flex flex-col">
            <Reveal y={36}>
              <h2 className="type-section-title">
                The mindset behind every product I design.
              </h2>
            </Reveal>

            <Reveal delay={0.08} y={32}>
              <p className="type-body about-body-block">
                Great design isn&apos;t just about beautiful interfaces. It starts
                with understanding people, asking better questions, and making
                complex problems feel simple.
              </p>
            </Reveal>

            <Reveal delay={0.12} y={28}>
              <div className="type-body about-body-block">
                <p>
                  I&apos;m Radhika, a Product Designer with a background in
                  Psychology and experience designing products in climate tech.
                </p>
                <p>
                  I enjoy turning complex systems into experiences that feel
                  intuitive and effortless. My approach combines research, product
                  thinking, business understanding, and visual design to create
                  solutions that are both useful and meaningful.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="about-image-column">
            <Reveal
              delay={0.1}
              y={32}
              className="about-image-reveal w-full min-h-0"
            >
              <div className="about-illustration-card relative aspect-[4/3] min-h-[360px] overflow-hidden lg:aspect-auto lg:h-full lg:min-h-0">
                <Image
                  src={ABOUT_ILLUSTRATION}
                  alt="Designer studying and working on a UI and UX project"
                  fill
                  quality={100}
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="about-illustration-image object-cover object-center"
                />
              </div>
            </Reveal>
          </div>
        </div>

        <StaggerGroup
          className="mt-[var(--space-in-section)] lg:mt-[var(--space-in-section-md)]"
          stagger={0.1}
        >
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
            {PILLARS.map((item) => (
              <StaggerItem key={item}>
                <button
                  type="button"
                  aria-pressed={activeTopic === item}
                  onClick={() => setActiveTopic(item)}
                  className={`featured-topic-chip type-ui-label ${
                    activeTopic === item ? "is-active" : ""
                  }`}
                >
                  {item}
                </button>
              </StaggerItem>
            ))}
          </div>
        </StaggerGroup>
      </div>
    </section>
  );
}
