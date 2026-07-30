import type { Metadata } from "next";
import Link from "next/link";
import { Check, Rocket, LineChart, Globe, type LucideIcon } from "lucide-react";
import content from "./content.json";
import homeContent from "@/app/content.json";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";

export const metadata: Metadata = {
  title: content.title,
  description: content.metaDescription,
};

const ICONS: Record<string, LucideIcon> = { Rocket, LineChart, Globe };

export default function PackagesPage() {
  return (
    <main>
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold text-ink sm:text-4xl">
            {content.heading}
          </h1>
          <p className="mt-4 text-ink-soft">{content.intro}</p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {content.tiers.map((tier) => (
            <div
              key={tier.name}
              className={`flex flex-col rounded-2xl border p-6 ${
                tier.highlighted
                  ? "border-brand-600 bg-white shadow-lg lg:-translate-y-2"
                  : "border-black/5 bg-white"
              }`}
            >
              {tier.highlighted && (
                <span className="mb-3 inline-flex w-fit rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-600">
                  Được đề xuất nhiều nhất
                </span>
              )}
              <h2 className="text-lg font-semibold text-ink">{tier.name}</h2>
              <p className="mt-1 text-sm font-medium text-brand-600">
                {tier.audience}
              </p>
              <p className="mt-3 text-sm text-ink-soft">{tier.description}</p>

              <ul className="mt-6 flex-1 space-y-2">
                {tier.includes.map((service) => (
                  <li key={service.name} className="flex items-center gap-2 text-sm text-ink-soft">
                    <Check className="h-4 w-4 shrink-0 text-brand-600" aria-hidden="true" />
                    <Link href={service.href} className="hover:text-brand-600">
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>

              <Link
                href="/contact"
                className={`mt-6 inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                  tier.highlighted
                    ? "bg-brand-600 text-white hover:bg-brand-700"
                    : "border border-brand-600 text-brand-600 hover:bg-brand-50"
                }`}
              >
                Đặt lịch tư vấn
              </Link>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-sm text-muted">{content.note}</p>
      </div>

      <section className="bg-surface-2 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-bold text-ink sm:text-3xl">
            {homeContent.caseStudies.heading}
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {homeContent.caseStudies.items.map((item) => {
              const Icon = ICONS[item.icon];
              return (
                <article key={item.audience} className="overflow-hidden rounded-lg bg-white shadow-sm">
                  <div className="relative aspect-video w-full overflow-hidden">
                    <ImagePlaceholder icon={Icon} className="h-full w-full" iconClassName="h-8 w-8" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-base font-semibold text-ink">
                      {item.audience}
                    </h3>
                    <p className="mt-2 text-sm text-ink-soft">{item.approach}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-brand-700">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center text-white">
          <h2 className="text-2xl font-bold sm:text-3xl">{content.cta.heading}</h2>
          <p className="mt-4 text-brand-50/90">{content.cta.body}</p>
          <Link
            href={content.cta.href}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-50"
          >
            {content.cta.label}
          </Link>
        </div>
      </section>
    </main>
  );
}
