import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import content from "../app/content.json";
import { Reveal } from "@/components/Reveal";

export function EngagementModels() {
  const { engagementModels } = content;

  return (
    <>
      <section className="py-10 sm:py-12">
        <div className="mx-auto max-w-6xl px-3">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] lg:gap-16">
            <Reveal>
              <div className="relative hidden h-full min-h-[420px] w-full overflow-hidden rounded-xl lg:block">
                <Image
                  src={engagementModels.image}
                  alt={engagementModels.heading}
                  fill
                  sizes="25vw"
                  className="photo-grade object-cover"
                />
              </div>
            </Reveal>

            <div>
              <Reveal delay={80}>
                <div>
                  <p className="text-sm font-medium uppercase tracking-widest text-muted">
                    {engagementModels.eyebrow}
                  </p>
                  <h2 className="mt-4 font-serif-hero text-3xl leading-snug text-ink sm:text-4xl">
                    {engagementModels.heading}
                  </h2>
                  <p className="mt-5 text-ink-soft">{engagementModels.body}</p>
                </div>
              </Reveal>

              <div className="mt-4">
                {engagementModels.items.map((item, index) => (
                  <Reveal key={item.name} delay={index * 100}>
                    <Link href={item.href} className="group block py-2">
                      <span className="flex items-center justify-between text-xl text-ink group-hover:text-brand-600">
                        {item.name}
                        <ChevronRight
                          className="h-5 w-5 shrink-0 text-ink-soft transition-transform group-hover:translate-x-1"
                          aria-hidden="true"
                        />
                      </span>
                      <span className="mt-2 block text-sm text-ink-soft">
                        {item.description}
                      </span>
                      <span className="mt-4 block w-full border-t-[3px] border-brand-600" aria-hidden="true" />
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="mx-auto max-w-[1320px] px-3">
        <span className="block h-px w-full bg-black" aria-hidden="true" />
      </div>
    </>
  );
}
