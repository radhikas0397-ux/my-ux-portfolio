import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2.5 text-xs font-medium tracking-[0.2em] text-faint uppercase">
      <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_12px_2px_rgba(196,181,253,0.6)]" />
      {children}
    </div>
  );
}

export function SectionHeading({
  label,
  title,
  description,
  className = "",
}: {
  label: string;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`max-w-3xl ${className}`}>
      <Reveal>
        <SectionLabel>{label}</SectionLabel>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="mt-5 font-display text-[1.75rem] font-semibold leading-[1.2] tracking-tight text-balance sm:text-4xl sm:leading-[1.15] md:text-[2.6rem]">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.1}>
          <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
