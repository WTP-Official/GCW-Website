import content from "../app/content.json";
import { Counter } from "@/components/Counter";
import { Reveal } from "@/components/Reveal";

const FOOTNOTED_VALUES = new Set(["70%"]);

export function Stats() {
  return (
    <section className="border-t border-black/5 bg-white">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-y-12 px-4 py-24 sm:grid-cols-3">
        {content.stats.map((stat, index) => (
          <Reveal key={stat.label} delay={index * 100}>
            <div
              className={`px-4 text-center sm:text-left ${
                index > 0 ? "border-black/10 sm:border-l" : ""
              }`}
            >
              <p className="font-serif-hero text-4xl text-brand-600 sm:text-5xl">
                <Counter value={stat.value} />
                {FOOTNOTED_VALUES.has(stat.value) && (
                  <sup className="ml-0.5 text-lg text-brand-600/70">*</sup>
                )}
              </p>
              <p className="mt-3 text-sm text-ink-soft">{stat.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
