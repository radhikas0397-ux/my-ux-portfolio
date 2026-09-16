import { projects } from "../lib/projects";
import { CaseStudyStack } from "./CaseStudyStack";
import { SectionHeading } from "./SectionHeading";
import { GlowOrb } from "./ui/GamifiedUI";

export function SelectedWork() {
  return (
    <section id="work" className="relative scroll-mt-24 overflow-visible bg-background">
      <GlowOrb className="left-1/4 top-0 h-56 w-56 opacity-30" color="teal" />

      <div className="container-shell relative">
        <SectionHeading
          centered
          label="Selected Work"
          title={
            <>
              Turning complexity into{" "}
              <span className="text-foreground">clarity.</span>
            </>
          }
          description="Explore a selection of products across climate-tech, enterprise SaaS, AI-assisted design, and immersive experiences—each shaped by research, strategy, and thoughtful execution."
          descriptionClassName="max-w-[750px]"
        />

        <CaseStudyStack
          projects={projects}
          className="mt-14 sm:mt-16"
        />
      </div>
    </section>
  );
}
