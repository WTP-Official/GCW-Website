import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronRight, Play } from "lucide-react";
import content from "./content.json";

export const metadata: Metadata = {
  title: content.title,
  description: content.metaDescription,
};

export default function SolutionsPage() {
  const { hero, claims, stats, positioning, missingPiece, pillars, resources, cta } = content;

  return (
    <main>
      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 border-b border-black/10 px-4 py-16 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <p className="text-lg font-semibold text-ink">{hero.label}</p>
            <h1 className="mt-3 font-serif-hero text-5xl leading-[1.1] text-ink sm:text-6xl">
              {hero.heading}
            </h1>
            <p className="mt-6 font-serif-hero text-2xl leading-snug text-ink">
              {hero.subheading}
            </p>
            <p className="mt-5 max-w-md text-ink-soft">{hero.body}</p>
            <Link
              href={hero.cta.href}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-700"
            >
              {hero.cta.label}
            </Link>
          </div>
          <div className="relative aspect-4/3 w-full overflow-hidden rounded-md">
            <Image
              src={hero.image}
              alt={hero.heading}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="photo-grade object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-ink/20">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-ink shadow-lg">
                <Play className="ml-1 h-6 w-6" aria-hidden="true" />
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface-2">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="grid gap-10 sm:grid-cols-3">
            {claims.map((claim) => (
              <div key={claim}>
                <p className="text-lg font-semibold leading-snug text-ink">{claim}</p>
                <span className="mt-6 block h-px w-full bg-black/20" aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="grid gap-10 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.value} className="text-center">
                <p className="text-sm text-ink-soft">{stat.lead}</p>
                <p className="mt-4 font-serif-hero text-6xl font-light text-ink">
                  {stat.value}
                </p>
                <p className="mt-4 text-sm text-ink-soft">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 lg:grid-cols-2 lg:gap-16">
          <h2 className="font-serif-hero text-3xl leading-snug text-ink sm:text-4xl">
            {positioning.heading}
          </h2>
          <p className="text-ink-soft">{positioning.body}</p>
        </div>
      </section>

      <section className="border-b border-black/10 bg-white py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="font-serif-hero text-3xl leading-snug text-ink sm:text-4xl">
            {missingPiece.heading}
          </h2>
        </div>
        <div className="mx-auto mt-16 grid max-w-6xl gap-10 px-4 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-ink-soft">{missingPiece.bodyLeft}</p>
            <p className="mt-5 font-semibold text-ink">{missingPiece.bodyLeftBold}</p>
          </div>
          <div className="space-y-4">
            {missingPiece.bodyRight.split("\n\n").map((paragraph) => (
              <p key={paragraph} className="text-ink-soft">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-8 sm:grid-cols-3">
            {pillars.map((pillar) => (
              <Link
                key={pillar.title}
                href={pillar.href}
                className="group flex flex-col overflow-hidden rounded-md bg-bg-dark text-white transition-shadow hover:shadow-md"
              >
                <div className="relative aspect-4/3 w-full overflow-hidden">
                  <Image
                    src={pillar.image}
                    alt={pillar.title}
                    fill
                    sizes="(min-width: 640px) 33vw, 100vw"
                    className="photo-grade object-cover"
                  />
                </div>
                <div className="p-6">
                  <span className="flex items-center gap-1 font-serif-hero text-xl leading-snug group-hover:text-brand-200">
                    {pillar.title}
                    <ChevronRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <p className="mt-2 text-sm text-white/70">{pillar.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="font-serif-hero text-2xl leading-snug text-ink sm:text-3xl">
            {resources.heading}
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {resources.items.map((item) => (
              <div
                key={item.title}
                className={`flex flex-col justify-between rounded-md p-6 ${
                  item.dark ? "bg-bg-dark text-white" : "bg-surface-2 text-ink"
                }`}
              >
                <div>
                  <p className={`text-xs ${item.dark ? "text-white/60" : "text-muted"}`}>
                    {item.label}
                  </p>
                  <p className="mt-3 font-serif-hero text-xl leading-snug">{item.title}</p>
                  <p className={`mt-3 text-sm ${item.dark ? "text-white/70" : "text-ink-soft"}`}>
                    {item.description}
                  </p>
                </div>
                <Link
                  href={item.href}
                  className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-700"
                >
                  {item.ctaLabel}
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 lg:grid-cols-2 lg:items-center lg:gap-16">
          <h2 className="font-serif-hero text-4xl leading-tight text-ink sm:text-5xl">
            {cta.heading}
          </h2>
          <div className="lg:border-l lg:border-black/10 lg:pl-16">
            <p className="text-ink-soft">{cta.body}</p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Link
                href={cta.primaryCta.href}
                className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-700"
              >
                {cta.primaryCta.label}
              </Link>
              <Link
                href={cta.secondaryCta.href}
                className="inline-flex items-center gap-2 rounded-full border border-black/15 px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-surface"
              >
                {cta.secondaryCta.label}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
