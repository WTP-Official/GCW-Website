import {
  GraduationCap,
  Network,
  Landmark,
  Globe2,
  type LucideIcon,
} from "lucide-react";
import content from "../app/content.json";

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
        <h2 className="font-serif-hero text-3xl leading-snug text-ink sm:text-4xl">
          {differentiators.heading}
        </h2>
        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {differentiators.items.map((item) => {
            const Icon = ICONS[item.icon];
            return (
              <div
                key={item.title}
                className="rounded-md border border-black/5 bg-white p-6 shadow-sm"
              >
                <Icon className="h-6 w-6 text-ink-soft" aria-hidden="true" />
                <h3 className="mt-4 text-base text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-ink-soft">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
