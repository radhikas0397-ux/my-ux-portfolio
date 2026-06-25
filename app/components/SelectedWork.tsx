import { projects } from "../lib/projects";
import { ProjectCard } from "./ProjectCard";
import { SectionHeading } from "./SectionHeading";

export function SelectedWork() {
  return (
    <section id="work" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="container-shell">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            label="Selected Work"
            title={
              <>
                Case studies that show the
                <br className="hidden sm:block" /> thinking, not just the screens.
              </>
            }
          />
          <p className="max-w-xs text-sm text-muted md:text-right">
            A few projects across product, climate-tech, dashboards, and
            AI-assisted design.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2 lg:gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
