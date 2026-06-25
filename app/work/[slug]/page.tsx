import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { projects, getProject } from "../../lib/projects";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { CursorGlow } from "../../components/CursorGlow";
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
    <section className="border-t border-line py-12 sm:py-16">
      <div className="grid gap-6 lg:grid-cols-[280px_1fr] lg:gap-12">
        <div>
          {label && (
            <Reveal>
              <SectionLabel>{label}</SectionLabel>
            </Reveal>
          )}
          <Reveal delay={0.05}>
            <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
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
    <p className="text-base leading-relaxed text-muted sm:text-lg">{children}</p>
  );
}

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-base text-muted sm:text-lg">
          <Check className="mt-1 h-4 w-4 shrink-0 text-accent-2" />
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
      <CursorGlow />
      <Navbar />

      <main className="pt-32">
        {/* Hero */}
        <header className="container-shell">
          <Reveal>
            <Link
              href="/#work"
              className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
              Back to work
            </Link>
          </Reveal>

          <div className="mt-8 flex flex-col gap-4">
            <Reveal>
              <p className="text-xs font-medium tracking-[0.2em] text-faint uppercase">
                {project.category} · {project.year}
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="max-w-4xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-5xl md:text-6xl">
                {project.title}
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="max-w-2xl text-lg text-muted">
                {project.description}
              </p>
            </Reveal>
          </div>

          {/* meta strip */}
          <Reveal delay={0.15}>
            <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
              <div className="bg-surface p-5">
                <dt className="text-xs text-faint">Role</dt>
                <dd className="mt-1 text-sm font-medium">{project.role}</dd>
              </div>
              <div className="bg-surface p-5">
                <dt className="text-xs text-faint">Year</dt>
                <dd className="mt-1 text-sm font-medium">{project.year}</dd>
              </div>
              <div className="bg-surface p-5">
                <dt className="text-xs text-faint">Discipline</dt>
                <dd className="mt-1 text-sm font-medium">{project.category}</dd>
              </div>
              <div className="bg-surface p-5">
                <dt className="text-xs text-faint">Outcome</dt>
                <dd className="mt-1 text-sm font-medium text-accent-gradient">
                  {project.outcome}
                </dd>
              </div>
            </dl>
          </Reveal>
        </header>

        {/* Big image placeholder */}
        <div className="container-shell mt-12">
          <Reveal>
            <div className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-line">
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
            </div>
          </Reveal>
        </div>

        {/* Body */}
        <div className="container-shell mt-10">
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
                <div key={insight} className="bg-surface p-5">
                  <span className="font-display text-sm font-semibold text-accent">
                    0{i + 1}
                  </span>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
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
                  className="rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-line-strong"
                >
                  <h3 className="font-display text-lg font-semibold tracking-tight">
                    {d.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
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
                <div key={m.label} className="bg-surface p-6 text-center">
                  <p className="font-display text-3xl font-semibold tracking-tight text-accent-gradient sm:text-4xl">
                    {m.value}
                  </p>
                  <p className="mt-2 text-xs text-faint">{m.label}</p>
                </div>
              ))}
            </div>
          </Block>

          <Block label="Reflection" title="What I learned">
            <CheckList items={cs.learnings} />
          </Block>
        </div>

        {/* Next project */}
        <section className="container-shell mt-12 border-t border-line py-16">
          <Reveal>
            <p className="text-xs font-medium tracking-[0.2em] text-faint uppercase">
              Next case study
            </p>
            <Link
              href={`/work/${next.slug}`}
              className="group mt-4 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end"
            >
              <h2 className="font-display text-3xl font-semibold tracking-tight transition-colors group-hover:text-accent sm:text-5xl">
                {next.title}
              </h2>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-muted transition-colors group-hover:text-foreground">
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
