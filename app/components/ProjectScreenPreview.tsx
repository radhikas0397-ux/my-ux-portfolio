import Image from "next/image";
import type { Project } from "../lib/projects";

type Variant = "desktop" | "mobile";

export function ProjectScreenPreview({
  project,
  variant,
}: {
  project: Project;
  variant: Variant;
}) {
  const { desktop, mobile } = project.mockups;
  const src = variant === "desktop" ? desktop : mobile ?? desktop;

  if (src) {
    return (
      <Image
        src={src}
        alt={project.mockups.alt ?? `${project.title} preview`}
        fill
        unoptimized
        quality={100}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="service-card-image"
      />
    );
  }

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ background: `linear-gradient(145deg, ${project.accent}18, #0d1206 55%)` }}
    >
      {project.slug === "buyer-web-app" && (
        <BuyerPreview variant={variant} accent={project.accent} />
      )}
      {project.slug === "carbon-wallet" && (
        <WalletPreview variant={variant} accent={project.accent} />
      )}
      {project.slug === "partner-dashboard" && (
        <DashboardPreview variant={variant} accent={project.accent} />
      )}
      {project.slug === "virtual-field-tour" && (
        <FieldTourPreview variant={variant} accent={project.accent} />
      )}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08)_0%,transparent_42%,rgba(0,0,0,0.15)_100%)]" />
    </div>
  );
}

function BuyerPreview({
  variant,
  accent,
}: {
  variant: Variant;
  accent: string;
}) {
  const mobile = variant === "mobile";
  return (
    <div className={`relative h-full ${mobile ? "p-2.5" : "p-4 sm:p-5"}`}>
      <div className="mb-2 flex items-center justify-between">
        <div className="h-2 w-12 rounded-full bg-white/25" />
        <div className="flex gap-1">
          <div className="h-4 w-4 rounded-full bg-white/10" />
          <div className="h-4 w-4 rounded-full bg-white/10" />
        </div>
      </div>
      <div
        className={`grid gap-1.5 ${mobile ? "grid-cols-2" : "grid-cols-3 gap-2"}`}
      >
        {[0, 1, 2, 3, 4, 5].slice(0, mobile ? 4 : 6).map((i) => (
          <div
            key={i}
            className="overflow-hidden rounded-md border border-white/10 bg-[#141416]"
          >
            <div
              className="aspect-[4/3] w-full"
              style={{
                background: `linear-gradient(135deg, ${accent}33, #1a1a1e)`,
              }}
            />
            <div className="space-y-1 p-1.5">
              <div className="h-1 w-3/4 rounded-full bg-white/20" />
              <div className="h-1 w-1/2 rounded-full bg-white/10" />
            </div>
          </div>
        ))}
      </div>
      {!mobile && (
        <div className="absolute bottom-4 right-4 w-[28%] rounded-lg border border-white/10 bg-[#121214]/95 p-2 shadow-xl">
          <div className="mb-2 h-1.5 w-2/3 rounded-full bg-white/20" />
          <div className="h-6 rounded-md" style={{ background: accent }} />
        </div>
      )}
    </div>
  );
}

function WalletPreview({
  variant,
  accent,
}: {
  variant: Variant;
  accent: string;
}) {
  const mobile = variant === "mobile";
  return (
    <div className={`flex h-full flex-col ${mobile ? "p-3" : "p-5"}`}>
      <div className="mb-3 text-[8px] font-medium uppercase tracking-wider text-white/40">
        Carbon balance
      </div>
      <div
        className={`font-bold text-white ${mobile ? "text-lg" : "text-2xl"}`}
      >
        2.4t
      </div>
      <div className="mt-1 text-[9px] text-white/45">CO₂ this month</div>
      <div
        className={`mt-3 rounded-lg border border-white/10 bg-[#121214] ${mobile ? "h-14 p-2" : "h-20 p-3"}`}
      >
        <div className="flex h-full items-end gap-1">
          {[40, 65, 45, 80, 55, 70, 48].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm"
              style={{ height: `${h}%`, background: `${accent}${i === 3 ? "cc" : "55"}` }}
            />
          ))}
        </div>
      </div>
      <div className={`mt-auto grid gap-1.5 ${mobile ? "grid-cols-1" : "grid-cols-2"}`}>
        <div className="rounded-md border border-white/10 bg-[#141416] p-2">
          <div className="h-1 w-1/2 rounded-full bg-white/15" />
          <div className="mt-1.5 h-2 w-2/3 rounded-full" style={{ background: accent }} />
        </div>
        {!mobile && (
          <div className="rounded-md border border-white/10 bg-[#141416] p-2">
            <div className="h-1 w-1/2 rounded-full bg-white/15" />
            <div className="mt-1.5 h-2 w-1/2 rounded-full bg-white/20" />
          </div>
        )}
      </div>
    </div>
  );
}

function DashboardPreview({
  variant,
  accent,
}: {
  variant: Variant;
  accent: string;
}) {
  const mobile = variant === "mobile";
  return (
    <div className={`h-full ${mobile ? "p-2.5" : "p-4"}`}>
      <div className={`grid gap-1.5 ${mobile ? "grid-cols-2" : "grid-cols-4"}`}>
        {[0, 1, 2, 3].slice(0, mobile ? 2 : 4).map((i) => (
          <div
            key={i}
            className="rounded-md border border-white/10 bg-[#141416] p-2"
          >
            <div className="h-1 w-2/3 rounded-full bg-white/15" />
            <div
              className={`mt-1.5 font-bold text-white ${mobile ? "text-xs" : "text-sm"}`}
            >
              {["84%", "12.4k", "−18%", "99.2%"][i]}
            </div>
          </div>
        ))}
      </div>
      <div
        className={`mt-2 rounded-lg border border-white/10 bg-[#121214] ${mobile ? "h-16 p-2" : "mt-3 h-24 p-3"}`}
      >
        <svg viewBox="0 0 200 60" className="h-full w-full" aria-hidden>
          <polyline
            fill="none"
            stroke={accent}
            strokeWidth="2"
            points="0,45 30,38 60,42 90,22 120,28 150,12 180,18 200,8"
          />
        </svg>
      </div>
      {!mobile && (
        <div className="mt-2 space-y-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="flex items-center gap-2 rounded-md border border-white/[0.06] bg-[#141416]/80 px-2 py-1.5"
            >
              <div className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
              <div className="h-1 flex-1 rounded-full bg-white/12" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function FieldTourPreview({
  variant,
  accent,
}: {
  variant: Variant;
  accent: string;
}) {
  const mobile = variant === "mobile";
  return (
    <div className="relative h-full">
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(160deg, ${accent}44 0%, #1a3a2e 35%, #0f1f18 100%)`,
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(120,200,140,0.35),transparent_55%)]" />
      {!mobile && (
        <div className="absolute bottom-3 left-3 right-3 rounded-lg border border-white/15 bg-black/45 p-2 backdrop-blur-sm">
          <div className="text-[8px] font-medium uppercase tracking-wider text-white/50">
            Field view
          </div>
          <div className="mt-1 h-1 w-2/3 rounded-full bg-white/25" />
        </div>
      )}
      {mobile && (
        <div className="absolute bottom-2 left-2 right-2 rounded-md bg-black/40 px-2 py-1.5">
          <div className="h-1 w-1/2 rounded-full bg-white/30" />
        </div>
      )}
    </div>
  );
}
