import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function SectionLabel({ children }: { children: ReactNode }) {
  return <p className="type-section-label">{children}</p>;
}

export function SectionHeading({
  label,
  title,
  description,
  className = "",
  descriptionClassName = "",
  centered = false,
}: {
  label: string;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
  descriptionClassName?: string;
  centered?: boolean;
}) {
  return (
    <div
      className={`${centered ? "mx-auto w-full text-center" : "max-w-3xl"} ${className}`}
    >
      <Reveal className={centered ? "flex justify-center" : undefined}>
        <SectionLabel>{label}</SectionLabel>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="type-section-title mt-4 text-balance">{title}</h2>
      </Reveal>
      {description && (
        <Reveal delay={0.1}>
          <p
            className={`type-body mt-5 ${centered ? "mx-auto " : ""}${descriptionClassName}`}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
