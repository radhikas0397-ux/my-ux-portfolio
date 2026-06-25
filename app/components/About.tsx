import Image from "next/image";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionHeading";

const stats: { label: string; value: string }[] = [
  { label: "Years Experience", value: "5+" },
  { label: "Products Shipped", value: "30+" },
  { label: "Currently", value: "Climate Tech" },
];

export function About() {
  return (
    <section id="about" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-10 lg:px-16">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* LEFT — personal image */}
          <Reveal>
            <div className="flex flex-col gap-5">
              <div className="group relative aspect-[4/5] overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.04] shadow-[0_40px_100px_-40px_rgba(0,0,0,0.9)] backdrop-blur-md transition-all duration-500 hover:-translate-y-1.5 hover:border-teal-400/30 hover:shadow-[0_50px_120px_-45px_rgba(45,212,191,0.35)]">
                <Image
                  src="/Images/hero-section.jpeg"
                  alt="Radhika Sharma, Product Designer"
                  fill
                  sizes="(max-width: 1024px) 90vw, 480px"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                <div className="pointer-events-none absolute inset-0 rounded-[24px] ring-1 ring-inset ring-white/10" />
              </div>

              <div>
                <p className="font-display text-base font-semibold tracking-tight">
                  Product Designer
                </p>
                <p className="mt-0.5 text-sm text-faint">Bengaluru, India</p>
              </div>
            </div>
          </Reveal>

          {/* RIGHT — about content */}
          <div>
            <Reveal>
              <SectionLabel>About Me</SectionLabel>
            </Reveal>

            <Reveal delay={0.05}>
              <h2 className="mt-5 font-display text-[1.9rem] leading-[1.15] font-semibold tracking-tight text-balance sm:text-4xl md:text-[2.6rem] md:leading-[1.12]">
                Designing with curiosity, psychology, and a{" "}
                <span className="text-accent">bias for clarity.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-muted">
                <p>
                  I&apos;m Radhika, a Product Designer with a background in
                  Psychology and experience designing products in climate tech.
                </p>
                <p>
                  I enjoy turning complex systems into experiences that feel
                  intuitive and effortless. My approach combines research,
                  product thinking, business understanding, and visual design to
                  create solutions that are both useful and meaningful.
                </p>
                <p>
                  Outside of design, I enjoy learning about human behavior,
                  emerging technology, fitness, and building side projects.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <figure className="mt-8 border-l-2 border-teal-400/40 pl-5">
                <blockquote className="font-display text-lg leading-snug font-medium tracking-tight text-balance text-white sm:text-xl">
                  &ldquo;If your only tool is a hammer, all your problems will be
                  nails.&rdquo;
                </blockquote>
                <figcaption className="mt-2 text-sm font-medium text-faint">
                  — Rolf Dobelli
                </figcaption>
              </figure>
            </Reveal>

            <Reveal delay={0.2}>
              <dl className="mt-8 grid grid-cols-3 gap-3">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-teal-400/30 hover:bg-white/[0.06]"
                  >
                    <dt className="text-[11px] tracking-wide text-faint uppercase">
                      {s.label}
                    </dt>
                    <dd className="mt-1.5 font-display text-lg font-semibold tracking-tight text-accent sm:text-xl">
                      {s.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
