import {
  GraduationCap,
  Network,
  Landmark,
  Globe2,
  type LucideIcon,
} from "lucide-react";
import content from "../app/content.json";
import { Reveal } from "@/components/Reveal";

const ICONS: Record<string, LucideIcon> = {
  GraduationCap,
  Network,
  Landmark,
  Globe2,
};

export function Differentiators() {
  const { differentiators } = content;

  return (
    <section className="border-t border-black/5 py-32">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <h2 className="font-serif-hero text-3xl leading-snug text-ink sm:text-4xl">
            {differentiators.heading}
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {differentiators.items.map((item, index) => {
            const Icon = ICONS[item.icon];
            return (
              <Reveal key={item.title} delay={(index % 4) * 90}>
                <div className="rounded-md bg-bg-dark p-6 text-white transition-shadow hover:shadow-md">
                  <Icon className="h-6 w-6 text-brand-300" aria-hidden="true" />
                  <h3 className="mt-4 text-base text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-white/70">{item.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
