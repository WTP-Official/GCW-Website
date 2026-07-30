import { Handshake, Award, Network, type LucideIcon } from "lucide-react";
import content from "../app/content.json";

const ICONS: Record<string, LucideIcon> = { Handshake, Award, Network };

export function ValueProps() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24">
      <div className="grid gap-8 sm:grid-cols-3">
        {content.valueProps.map((item) => {
          const Icon = ICONS[item.icon];
          return (
            <div
              key={item.title}
              className="rounded-md border border-black/5 bg-surface p-6"
            >
              <Icon className="h-6 w-6 text-ink-soft" aria-hidden="true" />
              <h3 className="mt-4 text-lg text-ink">
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
