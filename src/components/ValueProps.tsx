import { Handshake, Award, Network, type LucideIcon } from "lucide-react";
import content from "../app/content.json";
import { Reveal } from "@/components/Reveal";

const ICONS: Record<string, LucideIcon> = { Handshake, Award, Network };

export function ValueProps() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-32">
      <div className="grid gap-10 sm:grid-cols-3 lg:gap-12">
        {content.valueProps.map((item, index) => {
          const Icon = ICONS[item.icon];
          return (
            <Reveal key={item.title} delay={index * 100}>
              <div className="rounded-md border border-black/5 bg-surface p-6 transition-shadow hover:shadow-md">
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
    </section>
  );
}
