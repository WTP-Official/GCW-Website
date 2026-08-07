import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import content from "./content.json";

export const metadata: Metadata = {
  title: content.title,
  description: content.metaDescription,
};

export default function PackagesPage() {
  const { hero, resources, included, stats, testimonial, cta } = content;

  return (
    <main>
      <section className="border-b border-black/10 bg-white">
        <div className="mx-auto max-w-3xl px-4 py-16">
          <h1 className="font-serif-hero text-5xl leading-[1.1] text-ink sm:text-6xl">
            {hero.heading}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-ink-soft">{hero.body}</p>
        </div>
      </section>

      <section className="border-b border-black/10 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {resources.map((item) => (
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

      <section className="border-b border-black/10 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="font-serif-hero text-3xl leading-snug text-ink sm:text-4xl">
            {included.heading}
          </h2>
          <p className="mt-4 max-w-2xl text-ink-soft">{included.body}</p>
          <Link
            href="/contact"
            className="mt-3 inline-block text-sm font-medium text-brand-600 hover:text-brand-700"
          >
            {included.linkLabel}
          </Link>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {included.categories.map((category) => (
              <div key={category.name} className="overflow-hidden rounded-md bg-bg-dark text-white">
                <div className="p-6 pb-0">
                  <h3 className="font-serif-hero text-xl leading-snug">{category.name}</h3>
                </div>
                <div className="relative mt-4 aspect-4/3 w-full overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="photo-grade object-cover"
                  />
                </div>
                <p className="p-6 text-sm text-white/70">{category.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 bg-white py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-10 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-serif-hero text-6xl font-light text-ink">{stat.value}</p>
                <p className="mt-4 text-sm text-ink-soft">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 py-20">
        <div className="mx-auto max-w-4xl px-4">
          <p className="font-serif-hero text-3xl leading-snug text-ink sm:text-4xl">
            &ldquo;{testimonial.quote}&rdquo;
          </p>
          <p className="mt-6 text-sm text-ink-soft">
            <span className="font-medium text-ink">{testimonial.author}</span> —{" "}
            {testimonial.role}
          </p>
        </div>
      </section>

      <section className="bg-bg-muted">
        <div className="mx-auto max-w-2xl px-4 py-24 text-center">
          <h2 className="font-serif-hero text-3xl leading-snug text-ink sm:text-4xl">
            {cta.heading}
          </h2>
          <p className="mt-4 text-ink-soft">{cta.body}</p>
          <Link
            href={cta.href}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-medium text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-md"
          >
            {cta.label}
          </Link>
        </div>
      </section>
    </main>
  );
}
