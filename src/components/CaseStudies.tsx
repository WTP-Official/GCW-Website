"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  Rocket,
  LineChart,
  Globe,
  ChevronLeft,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import content from "../app/content.json";
import { Reveal } from "@/components/Reveal";

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
    <section id="case-studies" className="scroll-mt-24 border-t border-black/5 py-32">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-end justify-between gap-4">
          <Reveal className="max-w-2xl">
            <div>
              <h2 className="font-serif-hero text-3xl leading-snug text-ink sm:text-4xl">
                {caseStudies.heading}
              </h2>
              <p className="mt-3 text-ink-soft">{caseStudies.intro}</p>
            </div>
          </Reveal>
          <div className="hidden shrink-0 gap-2 sm:flex">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              aria-label="Xem tình huống trước"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-ink transition-all hover:-translate-y-0.5 hover:bg-white"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              aria-label="Xem tình huống tiếp theo"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-ink transition-all hover:-translate-y-0.5 hover:bg-white"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="scrollbar-brand mt-10 flex snap-x snap-mandatory gap-8 overflow-x-auto pb-4"
        >
          {caseStudies.items.map((item, index) => {
            const Icon = ICONS[item.icon];
            return (
              <Reveal
                key={item.audience}
                delay={(index % 3) * 100}
                className="w-[85%] shrink-0 snap-start sm:w-[calc(50%-0.75rem)] lg:w-[calc(100%/3-1rem)]"
              >
                <article className="overflow-hidden rounded-md bg-white shadow-sm transition-shadow hover:shadow-md">
                  <div className="relative aspect-video w-full overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.audience}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 85vw"
                      className="photo-grade object-cover"
                    />
                    <div className="absolute bottom-3 left-3 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md">
                      <Icon className="h-4 w-4 text-brand-600" aria-hidden="true" />
                    </div>
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
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
