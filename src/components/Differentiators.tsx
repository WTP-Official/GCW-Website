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
    <section className="bg-surface-2 py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-2xl font-bold text-ink sm:text-3xl">
          {differentiators.heading}
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {differentiators.items.map((item) => {
            const Icon = ICONS[item.icon];
            return (
              <div
                key={item.title}
                className="rounded-2xl bg-white p-6 shadow-sm"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-base font-semibold text-ink">
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
