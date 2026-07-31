import Link from "next/link";
import { ArrowLeft, type LucideIcon } from "lucide-react";

type SeriesItem = { label: string; title: string; description: string };

type Content = {
  heading: string;
  intro: string;
  featured: { label: string; title: string; description: string };
  seriesHeading: string;
  series: SeriesItem[];
  cta: { heading: string; body: string; label: string; href: string };
};

export function FeaturedSeriesGrid({
  icon: Icon,
  content,
  backHref,
  backLabel,
}: {
  icon: LucideIcon;
  content: Content;
  backHref: string;
  backLabel: string;
}) {
  const { heading, intro, featured, seriesHeading, series, cta } = content;

  return (
    <main>
      <section className="bg-bg-dark text-white">
        <div className="mx-auto max-w-3xl px-4 py-28 text-center sm:py-32">
          <Icon className="mx-auto h-8 w-8 text-white/60" aria-hidden="true" />
          <h1 className="mt-4 font-serif-hero text-3xl leading-snug sm:text-4xl">{heading}</h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/70">{intro}</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-24">
        <Link
          href={backHref}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {backLabel}
        </Link>

        <div className="mt-10 grid gap-8 overflow-hidden rounded-md bg-bg-dark text-white sm:grid-cols-2">
          <div className="flex aspect-video w-full items-center justify-center bg-black/20 sm:aspect-auto">
            <Icon className="h-10 w-10 text-white/50" aria-hidden="true" />
          </div>
          <div className="flex flex-col justify-center p-8">
            <p className="text-sm font-medium uppercase tracking-widest text-white/50">
              {featured.label}
            </p>
            <h2 className="mt-3 text-2xl leading-snug">{featured.title}</h2>
            <p className="mt-3 text-white/70">{featured.description}</p>
          </div>
        </div>

        <h2 className="mt-16 text-2xl leading-snug text-ink sm:text-3xl">{seriesHeading}</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {series.map((item, index) => (
            <div
              key={item.title}
              className={`flex flex-col justify-between rounded-md p-6 ${
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
                className={`mt-6 flex aspect-square w-full items-center justify-center rounded-md border ${
                  index % 2 === 0 ? "border-white/10 bg-black/20" : "border-black/5 bg-white"
                }`}
              >
                <Icon
                  className={`h-8 w-8 ${index % 2 === 0 ? "text-white/40" : "text-ink-soft/40"}`}
                  aria-hidden="true"
                />
              </div>
            </div>
          ))}
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
