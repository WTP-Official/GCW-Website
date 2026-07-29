import { Rocket, LineChart, Globe, type LucideIcon } from "lucide-react";
import content from "../content.json";

const ICONS: Record<string, LucideIcon> = { Rocket, LineChart, Globe };

export function Audiences() {
  const { audiences } = content;

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h2 className="text-2xl font-bold text-ink sm:text-3xl">
        {audiences.heading}
      </h2>
      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        {audiences.items.map((item) => {
          const Icon = ICONS[item.icon];
          return (
            <div
              key={item.title}
              className="rounded-2xl border border-black/5 p-6"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-lg font-semibold text-ink">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-ink-soft">{item.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
