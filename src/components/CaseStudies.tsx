"use client";

import { useRef } from "react";
import {
  Rocket,
  LineChart,
  Globe,
  ChevronLeft,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import content from "../app/content.json";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";

const ICONS: Record<string, LucideIcon> = { Rocket, LineChart, Globe };

export function CaseStudies() {
  const { caseStudies } = content;
  const scrollerRef = useRef<HTMLDivElement>(null);

  function scrollByCard(direction: 1 | -1) {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({
      left: direction * el.clientWidth * 0.85,
      behavior: "smooth",
    });
  }

  return (
    <section id="case-studies" className="scroll-mt-24 bg-surface-2 py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-end justify-between gap-4">
          <div className="max-w-2xl">
            <h2 className="text-2xl leading-snug text-ink sm:text-3xl">
              {caseStudies.heading}
            </h2>
            <p className="mt-2 text-ink-soft">{caseStudies.intro}</p>
          </div>
          <div className="hidden shrink-0 gap-2 sm:flex">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              aria-label="Xem tình huống trước"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-black/10 text-ink transition-colors hover:bg-white"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              aria-label="Xem tình huống tiếp theo"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-black/10 text-ink transition-colors hover:bg-white"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="scrollbar-brand mt-8 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4"
        >
          {caseStudies.items.map((item) => {
            const Icon = ICONS[item.icon];
            return (
              <article
                key={item.audience}
                className="w-[85%] shrink-0 snap-start overflow-hidden rounded-md bg-white shadow-sm sm:w-[calc(50%-0.75rem)] lg:w-[calc(100%/3-1rem)]"
              >
                <div className="relative aspect-video w-full overflow-hidden">
                  <ImagePlaceholder icon={Icon} className="h-full w-full" iconClassName="h-8 w-8" />
                </div>
                <div className="p-6">
                  <h3 className="text-base text-ink">
                    {item.audience}
                  </h3>
                  <p className="mt-3 text-sm text-ink-soft">
                    <span className="font-medium text-ink">Bài toán: </span>
                    {item.challenge}
                  </p>
                  <p className="mt-2 text-sm text-ink-soft">
                    <span className="font-medium text-ink">
                      Cách GCW đồng hành:{" "}
                    </span>
                    {item.approach}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
