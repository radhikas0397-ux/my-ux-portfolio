import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "../lib/projects";
import { Reveal } from "./Reveal";
import { ProjectScreenPreview } from "./ProjectScreenPreview";
import { FeaturedCarousel } from "./FeaturedCarousel";

type Variant = "featured" | "medium" | "wide" | "small";

type Theme = {
  from: string;
  to: string;
  glow: string;
  ink: string;
  sub: string;
};

type ProjectItem = {
  slug: string;
  number: string;
  category: string;
  variant: Variant;
  /** grid-area name used by the tablet/desktop bento layout */
  area: string;
  /** short supporting copy shown on the larger tiles */
  blurb?: string;
  theme: Theme;
};

const PROJECT_ITEMS: ProjectItem[] = [
  {
    slug: "virtual-field-tour",
    number: "01",
    category: "Immersive Experience · Climate Tech",
    variant: "featured",
    area: "featured",
    blurb:
      "A virtual storytelling experience that helps buyers understand carbon projects in action.",
    theme: {
      from: "#17624f",
      to: "#0a2f28",
      glow: "#3fe3d3",
      ink: "#eefef9",
      sub: "#9fd8cb",
    },
  },
  {
    slug: "farmer-wallet",
    number: "02",
    category: "Product Design · Mobile App",
    variant: "medium",
    area: "farmer",
    theme: {
      from: "#25459c",
      to: "#111f4b",
      glow: "#93c5fd",
      ink: "#eef4ff",
      sub: "#aec3ec",
    },
  },
  {
    slug: "buyer-web-app",
    number: "03",
    category: "Product Design · Dashboard",
    variant: "wide",
    area: "buyer",
    blurb:
      "An end-to-end purchasing experience that turns a fragmented buying journey into clarity, confidence, and control.",
    theme: {
      from: "#5d29b4",
      to: "#431c93",
      glow: "#d6c7ff",
      ink: "#f5f0ff",
      sub: "#cabbf0",
    },
  },
  {
    slug: "pet-walking-app",
    number: "04",
    category: "Product Design · Mobile App",
    variant: "small",
    area: "project4",
    theme: {
      from: "#a23c14",
      to: "#4a1c0b",
      glow: "#fdba74",
      ink: "#fff3e9",
      sub: "#f0c6a3",
    },
  },
];

function tileStyle(item: ProjectItem): CSSProperties {
  return {
    ["--bento-area" as string]: item.area,
    ["--tile-from" as string]: item.theme.from,
    ["--tile-to" as string]: item.theme.to,
    ["--tile-glow" as string]: item.theme.glow,
    ["--tile-ink" as string]: item.theme.ink,
    ["--tile-sub" as string]: item.theme.sub,
  } as CSSProperties;
}

function BentoCard({ item }: { item: ProjectItem }) {
  const project = projects.find((p) => p.slug === item.slug);
  if (!project) return null;

  return (
    <article
      className={`bento-card bento-card--${item.variant} group`}
      style={tileStyle(item)}
    >
      <Link
        href={`/work/${project.slug}`}
        aria-label={`View case study: ${project.title}`}
        className="bento-card-link"
      >
        <div className="bento-card-media">
          <div className="bento-card-preview">
            <ProjectScreenPreview
              project={project}
              variant="desktop"
              fit={
                item.variant === "featured" || item.variant === "wide"
                  ? "contain"
                  : "cover"
              }
            />
          </div>
          <span className="bento-card-glow" aria-hidden />
        </div>

        <div className="bento-card-body">
          <span className="bento-card-num">{item.number}</span>
          <h3 className="bento-card-title mt-4">{project.title}</h3>
          <p className="bento-card-category mt-3">{item.category}</p>
          {item.blurb && <p className="bento-card-desc mt-4">{item.blurb}</p>}
          <span className="bento-card-cta mt-6 inline-flex items-center gap-1.5">
            View Case Study
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </Link>
    </article>
  );
}

function IntroTile() {
  return (
    <div
      className="bento-intro hidden sm:flex"
      style={{ ["--bento-area" as string]: "intro" } as CSSProperties}
    >
      <p className="bento-intro-eyebrow">Selected Work</p>
      <h2 className="bento-intro-title">Featured Projects</h2>
      <p className="bento-intro-copy">
        A selection of product, climate-tech, and experience design projects —
        each one a story of turning complexity into something clear and human.
      </p>
      <div className="bento-intro-meta">
        <span>4 case studies</span>
        <span aria-hidden>·</span>
        <span>2024 — 2025</span>
      </div>
    </div>
  );
}

export function FeaturedProjects() {
  return (
    <section id="work" className="section-pad scroll-mt-16">
      <div className="container-shell">
        <Reveal y={40} className="bento-grid">
          <h2 className="bento-mobile-heading sm:hidden">Featured Projects</h2>
          <IntroTile />
          <FeaturedCarousel count={PROJECT_ITEMS.length}>
            {PROJECT_ITEMS.map((item) => (
              <BentoCard key={item.slug} item={item} />
            ))}
          </FeaturedCarousel>
        </Reveal>
      </div>
    </section>
  );
}
