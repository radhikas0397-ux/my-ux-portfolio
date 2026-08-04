import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { projects, getProject } from "../../lib/projects";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { Reveal } from "../../components/Reveal";
import { SectionLabel } from "../../components/SectionHeading";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  props: PageProps<"/work/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) return { title: "Case Study Not Found" };
  return {
    title: `${project.title} — Case Study`,
    description: project.description,
  };
}

function Block({
  label,
  title,
  children,
}: {
  label?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-line py-12 sm:py-14">
      <div className="grid gap-6 lg:grid-cols-[280px_1fr] lg:gap-12 case-study-section-grid">
        <div>
          {label && (
            <Reveal>
              <SectionLabel>{label}</SectionLabel>
            </Reveal>
          )}
          <Reveal delay={0.05}>
            <h2 className="type-section-title mt-3">
              {title}
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <div className="max-w-2xl">{children}</div>
        </Reveal>
      </div>
    </section>
  );
}

function Prose({ children }: { children: React.ReactNode }) {
  return (
    <p className="type-body">{children}</p>
  );
}

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="type-body flex gap-3">
          <Check className="mt-1 h-4 w-4 shrink-0 text-foreground" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default async function CaseStudyPage(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) notFound();

  const cs = project.caseStudy;
  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const next = projects[(currentIndex + 1) % projects.length];

  return (
    <>
      <Navbar />

      <main className="pt-28">
        {/* Hero */}
        <header className="container-shell">
          <Reveal>
            <Link
              href="/#work"
              className="type-small group inline-flex items-center gap-2 text-muted transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
              Back to work
            </Link>
          </Reveal>

          <div className="mt-8 flex flex-col gap-4">
            <Reveal>
              <p className="type-section-label">
                {project.category} · {project.year}
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="type-h1 max-w-4xl text-balance">
                {project.title}
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="type-body max-w-2xl">
                {project.description}
              </p>
            </Reveal>
          </div>

          {project.slug === "virtual-field-tour" && (
            <Reveal delay={0.12}>
              <div className="mt-8 mb-2">
                <a
                  href="https://tour.boomitra.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open the Carbon Project Virtual Tour in a new tab"
                  className="case-study-tour-cta inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#8FAF6A] bg-[#E8F3D8] px-6 py-3.5 text-sm font-medium text-[#162014] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#DCEBC7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8FAF6A] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] sm:w-auto"
                >
                  Experience the Virtual Tour
                  <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden />
                </a>
              </div>
            </Reveal>
          )}

          {/* meta strip */}
          <Reveal delay={0.15}>
            <dl className="case-study-meta-grid mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
              <div className="case-study-meta-item p-5">
                <dt className="type-caption">Role</dt>
                <dd className="type-ui-label mt-1 text-foreground">{project.role}</dd>
              </div>
              <div className="case-study-meta-item p-5">
                <dt className="type-caption">Year</dt>
                <dd className="type-ui-label mt-1 text-foreground">{project.year}</dd>
              </div>
              <div className="case-study-meta-item p-5">
                <dt className="type-caption">Discipline</dt>
                <dd className="type-ui-label mt-1 text-foreground">{project.category}</dd>
              </div>
              <div className="case-study-meta-item p-5">
                <dt className="type-caption">Outcome</dt>
                <dd className="type-ui-label mt-1 text-foreground">
                  {project.outcome}
                </dd>
              </div>
            </dl>
          </Reveal>
        </header>

        {/* Big image / cover */}
        <div className="container-shell mt-[var(--space-in-section)]">
          <Reveal>
            <div
              className={`project-cover relative overflow-hidden rounded-3xl border border-line ${
                project.mockups.cover
                  ? project.mockups.coverAspect === "16/9"
                    ? "aspect-[16/9]"
                    : "aspect-[3/2]"
                  : "aspect-[16/9]"
              } ${project.mockups.coverMobile ? "project-cover--responsive" : ""}`}
            >
              {project.mockups.cover ? (
                project.mockups.coverMobile ? (
                  <picture>
                    <source
                      media="(max-width: 768px)"
                      srcSet={project.mockups.coverMobile}
                    />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={project.mockups.cover}
                      alt={
                        project.mockups.alt ??
                        `${project.title} case study cover`
                      }
                      className="project-cover-image"
                      loading="eager"
                      decoding="async"
                      fetchPriority="high"
                    />
                  </picture>
                ) : (
                  <Image
                    src={project.mockups.cover}
                    alt={
                      project.mockups.alt ??
                      `${project.title} case study cover`
                    }
                    fill
                    unoptimized
                    priority
                    quality={100}
                    sizes="(max-width: 768px) 100vw, 1100px"
                    className="project-cover-image"
                  />
                )
              ) : (
                <>
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`}
                  />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.12),transparent_55%)]" />
                  <div className="grain absolute inset-0 p-8 sm:p-12">
                    <div className="flex h-full flex-col">
                      <div className="flex items-center gap-1.5">
                        <span className="h-3 w-3 rounded-full bg-white/25" />
                        <span className="h-3 w-3 rounded-full bg-white/15" />
                        <span className="h-3 w-3 rounded-full bg-white/10" />
                      </div>
                      <div className="mt-auto grid gap-4 sm:grid-cols-3">
                        <div className="h-28 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm" />
                        <div className="h-28 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm" />
                        <div className="h-28 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm" />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </Reveal>
        </div>

        {/* Body */}
        <div className="container-shell mt-[var(--space-in-section)]">
          <Block label="Overview" title="Project overview">
            <Prose>{cs.overview}</Prose>
          </Block>

          <Block label="01" title="The problem">
            <Prose>{cs.problem}</Prose>
          </Block>

          <Block label="02" title="My role">
            <Prose>{cs.role}</Prose>
          </Block>

          <Block label="03" title="Who we designed for">
            <Prose>{cs.users}</Prose>
          </Block>

          <Block label="04" title="Research">
            <CheckList items={cs.research} />
          </Block>

          <Block label="05" title="Key insights">
            <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
              {cs.insights.map((insight, i) => (
                <div key={insight} className="case-study-static-card p-5">
                  <span className="type-label">
                    0{i + 1}
                  </span>
                  <p className="type-body mt-2">
                    {insight}
                  </p>
                </div>
              ))}
            </div>
          </Block>

          <Block label="06" title="Design decisions">
            <div className="space-y-4">
              {cs.decisions.map((d) => (
                <div
                  key={d.title}
                  className="case-study-static-card rounded-2xl p-5"
                >
                  <h3 className="type-skill-title">
                    {d.title}
                  </h3>
                  <p className="type-body mt-2">
                    {d.body}
                  </p>
                </div>
              ))}
            </div>
          </Block>

          <Block label="07" title="Final solution">
            <Prose>{cs.solution}</Prose>
          </Block>

          <Block label="Impact" title="The impact">
            <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
              {cs.impact.map((m) => (
                <div key={m.label} className="case-study-static-card p-6 text-center">
                  <p className="type-impact-value text-foreground">
                    {m.value}
                  </p>
                  <p className="type-caption mt-2 normal-case tracking-normal">{m.label}</p>
                </div>
              ))}
            </div>
          </Block>

          <Block label="Reflection" title="What I learned">
            <CheckList items={cs.learnings} />
          </Block>
        </div>

        {/* Next project */}
        <section className="container-shell mt-[var(--space-in-section-md)] border-t border-line py-[var(--space-section-md)]">
          <Reveal>
            <p className="type-section-label">
              Next case study
            </p>
            <Link
              href={`/work/${next.slug}`}
              className="group mt-4 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end"
            >
              <h2 className="type-section-title transition-colors group-hover:text-foreground">
                {next.title}
              </h2>
              <span className="type-btn inline-flex items-center gap-2 text-muted transition-colors group-hover:text-foreground">
                View case study
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </Link>
          </Reveal>
        </section>
      </main>

      <Footer />
    </>
  );
}
