import Image from "next/image";
import { Plus } from "lucide-react";
import content from "../app/content.json";
import { Reveal } from "@/components/Reveal";

export function CaseStudies() {
  const { caseStudies } = content;

  return (
    <section id="case-studies" className="scroll-mt-24 border-t border-black/5 py-24">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <h2 className="font-serif-hero text-3xl leading-snug text-ink sm:text-4xl">
            {caseStudies.heading}
          </h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3">
          {caseStudies.items.map((item, index) => (
            <Reveal key={item.audience} delay={(index % 3) * 100}>
              <div>
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-md">
                  <Image
                    src={item.image}
                    alt={item.audience}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 33vw, 50vw"
                    className="grayscale object-cover contrast-105 transition-all duration-300 hover:grayscale-0"
                  />
                  <span className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-brand-600 text-white">
                    <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                </div>
                <p className="mt-3 text-sm text-ink">{item.audience}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
