import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/Reveal";

type SeriesItem = {
  id: string;
  label: string;
  title: string;
  description: string;
  image?: string;
};

type Content = {
  heading: string;
  intro: string;
  highlight?: { heading: string; body: string };
  featured: { label: string; title: string; description: string; image?: string };
  seriesHeading: string;
  series: SeriesItem[];
  cta: { heading: string; body: string; label: string; href: string };
};

export function FeaturedSeriesGrid({
  icon: Icon,
  content,
  backHref,
  backLabel,
  basePath,
}: {
  icon: LucideIcon;
  content: Content;
  backHref: string;
  backLabel: string;
  basePath: string;
}) {
  const { heading, intro, highlight, featured, seriesHeading, series, cta } = content;

  return (
    <main>
      <section className="border-b border-black/10 bg-white">
        <Reveal>
          <div className="mx-auto max-w-5xl px-4 py-16">
            <h1 className="max-w-2xl font-serif-hero text-5xl leading-[1.1] text-ink sm:text-6xl">{heading}</h1>
            <p className="mt-6 max-w-xl text-lg text-ink-soft">{intro}</p>
          </div>
        </Reveal>
      </section>

      {highlight && (
        <section className="border-b border-black/10 bg-white">
          <Reveal>
            <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 lg:grid-cols-2">
              <p className="font-serif-hero text-2xl leading-snug text-ink sm:text-3xl">{highlight.heading}</p>
              <div className="space-y-4 text-sm text-ink-soft">
                {highlight.body.split("\n\n").map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </Reveal>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-4 py-24">
        <Link
          href={backHref}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {backLabel}
        </Link>

        <Reveal>
          <div className="mt-10 grid gap-8 overflow-hidden rounded-md bg-bg-dark text-white sm:grid-cols-2">
            <div className="relative flex aspect-video w-full items-center justify-center bg-black/20 sm:aspect-auto">
              {featured.image ? (
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              ) : (
                <Icon className="h-10 w-10 text-white/50" aria-hidden="true" />
              )}
            </div>
            <div className="flex flex-col justify-center p-8">
              <p className="text-sm font-medium uppercase tracking-widest text-white/50">
                {featured.label}
              </p>
              <h2 className="mt-3 text-2xl leading-snug">{featured.title}</h2>
              <p className="mt-3 text-white/70">{featured.description}</p>
            </div>
          </div>
        </Reveal>

        <h2 className="mt-16 text-2xl leading-snug text-ink sm:text-3xl">{seriesHeading}</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {series.map((item, index) => (
            <Reveal key={item.id} delay={(index % 4) * 80}>
              <Link
                href={`${basePath}/${item.id}`}
                className={`flex flex-col justify-between rounded-md p-6 transition-shadow hover:shadow-md ${
                  index % 2 === 0 ? "bg-bg-dark text-white" : "bg-surface-2 text-ink"
                }`}
              >
                <div>
                  <p
                    className={`text-xs font-medium uppercase tracking-widest ${
                      index % 2 === 0 ? "text-white/50" : "text-muted"
                    }`}
                  >
                    {item.label}
                  </p>
                  <h3 className="mt-3 text-lg leading-snug">{item.title}</h3>
                  <p className={`mt-2 text-sm ${index % 2 === 0 ? "text-white/70" : "text-ink-soft"}`}>
                    {item.description}
                  </p>
                </div>
                <div
                  className={`relative mt-6 flex aspect-square w-full items-center justify-center overflow-hidden rounded-md border ${
                    index % 2 === 0 ? "border-white/10 bg-black/20" : "border-black/5 bg-white"
                  }`}
                >
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  ) : (
                    <Icon
                      className={`h-8 w-8 ${index % 2 === 0 ? "text-white/40" : "text-ink-soft/40"}`}
                      aria-hidden="true"
                    />
                  )}
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-bg-muted">
        <Reveal>
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
        </Reveal>
      </section>
    </main>
  );
}
