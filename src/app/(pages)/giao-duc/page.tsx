import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Plus } from "lucide-react";
import content from "./content.json";

export const metadata: Metadata = {
  title: content.title,
  description: content.metaDescription,
};

export default function EducationPage() {
  const { hero, highlight, audiences, programsHeading, programs, caseStudiesHeading, caseStudies, cta } =
    content;

  return (
    <main>
      <section className="border-b border-black/10 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-16">
          <p className="text-sm font-semibold text-ink">{hero.eyebrow}</p>
          <h1 className="mt-2 max-w-2xl font-serif-hero text-5xl leading-[1.1] text-ink sm:text-6xl">
            {hero.heading}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-ink-soft">{hero.body}</p>
        </div>
      </section>

      {highlight && (
        <section className="border-b border-black/10 bg-white">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 lg:grid-cols-2">
            <p className="font-serif-hero text-2xl leading-snug text-ink sm:text-3xl">{highlight.heading}</p>
            <p className="text-sm text-ink-soft">{highlight.body}</p>
          </div>
        </section>
      )}

      <section className="border-b border-black/10 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-8 sm:grid-cols-2">
            {audiences.map((audience) => (
              <div key={audience.title} className="flex gap-5">
                <div className="relative aspect-square w-24 shrink-0 overflow-hidden rounded-md">
                  <Image
                    src={audience.image}
                    alt={audience.title}
                    fill
                    sizes="96px"
                    className="photo-grade object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-lg text-ink">{audience.title}</h2>
                  <p className="mt-2 text-sm text-ink-soft">{audience.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="font-serif-hero text-2xl leading-snug text-ink sm:text-3xl">
            {programsHeading}
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {programs.map((program) => (
              <div
                key={program.name}
                className="overflow-hidden rounded-md bg-bg-dark text-white"
              >
                <div className="relative aspect-4/3 w-full overflow-hidden">
                  <Image
                    src={program.image}
                    alt={program.name}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="photo-grade object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-serif-hero text-base leading-snug">{program.name}</h3>
                  <p className="mt-2 text-xs text-white/70">{program.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="font-serif-hero text-2xl leading-snug text-ink sm:text-3xl">
            {caseStudiesHeading}
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3">
            {caseStudies.map((item) => (
              <div key={item.name}>
                <div className="relative aspect-3/4 w-full overflow-hidden rounded-md">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(min-width: 640px) 33vw, 50vw"
                    className="grayscale object-cover contrast-105 transition-all duration-300 hover:grayscale-0"
                  />
                  <span className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-brand-600 text-white">
                    <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                </div>
                <p className="mt-3 text-sm text-ink">{item.name}</p>
              </div>
            ))}
          </div>
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
