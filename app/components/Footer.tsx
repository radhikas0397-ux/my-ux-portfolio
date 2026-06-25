import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { site } from "../lib/site";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="container-shell py-12">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <p className="font-display text-lg font-semibold tracking-tight">
              {site.name}
            </p>
            <p className="mt-1 text-sm text-faint">
              {site.role} · {site.location}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
            <a
              href={`mailto:${site.email}`}
              className="group inline-flex items-center gap-1 text-muted transition-colors hover:text-foreground"
            >
              Email
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1 text-muted transition-colors hover:text-foreground"
            >
              LinkedIn
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href={site.resume}
              className="group inline-flex items-center gap-1 text-muted transition-colors hover:text-foreground"
            >
              Resume
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <Link
              href="/#work"
              className="text-muted transition-colors hover:text-foreground"
            >
              Work
            </Link>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-2 border-t border-line pt-6 text-xs text-faint sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>Designed &amp; built with care.</p>
        </div>
      </div>
    </footer>
  );
}
