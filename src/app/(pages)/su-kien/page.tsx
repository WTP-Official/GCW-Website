import type { Metadata } from "next";
import Link from "next/link";
import { Radio, Presentation, Mic, Users2, ArrowRight, type LucideIcon } from "lucide-react";
import content from "./content.json";
import categories from "@/app/_data/su-kien-categories.json";

export const metadata: Metadata = {
  title: content.title,
  description: content.metaDescription,
};

const ICONS: Record<string, LucideIcon> = { Radio, Presentation, Mic, Users2 };

export default function EventsPage() {
  const { heading, intro, cta } = content;

  return (
    <main>
      <section className="bg-bg-dark text-white">
        <div className="mx-auto max-w-3xl px-4 py-28 text-center sm:py-32">
          <h1 className="font-serif-hero text-3xl leading-snug sm:text-4xl">{heading}</h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/70">{intro}</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-24">
        <div className="grid gap-8 sm:grid-cols-2">
          {categories.map((category, index) => {
            const Icon = ICONS[category.icon];
            return (
              <Link
                key={category.id}
                href={category.href}
                className="group rounded-md border border-black/5 bg-surface p-6 transition-shadow hover:shadow-md"
              >
                <span className="text-sm font-medium text-brand-600">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <Icon className="mt-3 h-6 w-6 text-ink-soft" aria-hidden="true" />
                <h2 className="mt-4 text-lg text-ink group-hover:text-brand-600">
                  {category.title}
                </h2>
                <p className="mt-2 text-sm text-ink-soft">{category.description}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-600">
                  Xem chi tiết
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="bg-bg-muted">
        <div className="mx-auto max-w-2xl px-4 py-24 text-center">
          <h2 className="text-2xl leading-snug text-ink sm:text-3xl">{cta.heading}</h2>
          <p className="mt-4 text-ink-soft">{cta.body}</p>
          <Link
            href={cta.href}
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-brand-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-700"
          >
            {cta.label}
          </Link>
        </div>
      </section>
    </main>
  );
}
