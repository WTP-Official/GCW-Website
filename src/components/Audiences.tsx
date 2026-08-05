import { Rocket, LineChart, Globe, type LucideIcon } from "lucide-react";
import content from "../app/content.json";
import { Reveal } from "@/components/Reveal";

const ICONS: Record<string, LucideIcon> = { Rocket, LineChart, Globe };

const EMPHASIS = "doanh nghiệp nào";

export function Audiences() {
  const { audiences } = content;
  const [lead, tail] = audiences.heading.split(EMPHASIS);

  return (
    <section className="px-4 py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="font-serif-hero text-2xl leading-snug text-ink sm:text-3xl">
            {lead}
            <em className="italic text-brand-600">{EMPHASIS}</em>
            {tail}
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-10 sm:grid-cols-3 lg:gap-12">
          {audiences.items.map((item, index) => {
            const Icon = ICONS[item.icon];
            return (
              <Reveal key={item.title} delay={index * 100}>
                <div className="rounded-md border border-black/5 p-6 transition-shadow hover:shadow-md">
                  <Icon className="h-6 w-6 text-ink-soft" aria-hidden="true" />
                  <h3 className="mt-4 text-lg text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-ink-soft">{item.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
