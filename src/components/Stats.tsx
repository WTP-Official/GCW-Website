import content from "../app/content.json";
import { Counter } from "@/components/Counter";
import { Reveal } from "@/components/Reveal";

const FOOTNOTED_VALUES = new Set(["70%"]);

export function Stats() {
  return (
    <>
      <section className="-mt-[50px] bg-white">
        <div className="mx-auto max-w-[1360px] px-3 py-10 sm:py-12">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-12 text-center">
            {content.stats.map((stat, index) => (
              <Reveal key={stat.label} delay={index * 100} className="min-w-40 flex-1">
                <div>
                  <p className="font-serif-hero text-6xl font-light text-ink sm:text-7xl">
                    <Counter value={stat.value} />
                    {FOOTNOTED_VALUES.has(stat.value) && (
                      <sup className="ml-0.5 text-lg text-ink/50">*</sup>
                    )}
                  </p>
                  <p className="mx-auto mt-3 max-w-40 text-base text-ink-soft">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <div className="mx-auto max-w-[1360px] px-3">
        <span className="block h-px w-full bg-black" aria-hidden="true" />
      </div>
    </>
  );
}
