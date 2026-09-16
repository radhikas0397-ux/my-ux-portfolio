"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Mobile-only horizontal carousel wrapper for the Featured Projects cards.
 *
 * On mobile (< 640px) the `.bento-carousel` element is a native, scroll-snapping
 * horizontal scroller (styled entirely in CSS). On tablet/desktop the element is
 * `display: contents`, so the cards flow back into the existing bento grid.
 */
export function FeaturedCarousel({
  count,
  children,
}: {
  count: number;
  children: ReactNode;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      // On tablet/desktop the scroller is `display: contents` (no box).
      if (el.clientWidth === 0) return;
      const cards = Array.from(el.children) as HTMLElement[];
      if (!cards.length) return;
      const elRect = el.getBoundingClientRect();
      const viewportCenter = elRect.left + el.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;
      cards.forEach((card, i) => {
        const r = card.getBoundingClientRect();
        const cardCenter = r.left + r.width / 2;
        const dist = Math.abs(cardCenter - viewportCenter);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });
      setActive(best);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const goTo = (i: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.children[i] as HTMLElement | undefined;
    if (!card) return;
    const elRect = el.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const delta =
      cardRect.left + cardRect.width / 2 - (elRect.left + el.clientWidth / 2);
    el.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <>
      <div className="bento-carousel" ref={scrollerRef}>
        {children}
      </div>
      <div className="bento-dots" role="tablist" aria-label="Featured projects">
        {Array.from({ length: count }).map((_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-label={`Go to project ${i + 1}`}
            className={`bento-dot${i === active ? " is-active" : ""}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </>
  );
}
