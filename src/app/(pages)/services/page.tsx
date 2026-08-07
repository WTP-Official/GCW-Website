import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import content from "./content.json";

export const metadata: Metadata = {
  title: content.title,
  description: content.metaDescription,
};

const PILLARS = ["Phát triển lãnh đạo", "Xây dựng văn hoá tin cậy", "Tạo kết quả đột phá"];

export default function ServicesPage() {
  const columns = PILLARS.map((pillar) => ({
    pillar,
    items: content.services.filter((service) => service.pillar === pillar),
  }));

  return (
    <main className="mx-auto max-w-6xl px-4 py-16">
      <div className="max-w-2xl border-b border-black/10 pb-16">
        <h1 className="font-serif-hero text-5xl leading-[1.1] text-ink sm:text-6xl">
          {content.heading}
        </h1>
        <p className="mt-6 max-w-xl text-lg text-ink-soft">{content.intro}</p>
      </div>

      <div className="mt-14 grid gap-10 sm:grid-cols-3 sm:gap-8">
        {columns.map(({ pillar, items }, index) => (
          <div key={pillar}>
            <span
              className={`block rounded-full px-5 py-3 text-center text-sm font-semibold ${
                index === 1 ? "bg-surface-2 text-ink" : "bg-bg-dark text-white"
              }`}
            >
              {pillar}
            </span>
            <ul className="mt-8 space-y-6">
              {items.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="group block border-b border-black/10 pb-6"
                  >
                    <span className="flex items-start justify-between gap-3 font-semibold text-ink group-hover:text-brand-600">
                      {service.name}
                      <Plus
                        className="mt-0.5 h-5 w-5 shrink-0 rounded-full bg-brand-600 p-1 text-white"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="mt-2 block text-sm text-ink-soft">
                      {service.tagline}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </main>
  );
}
