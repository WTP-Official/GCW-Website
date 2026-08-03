import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, type LucideIcon } from "lucide-react";

type CatalogItem = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  image?: string;
};

type Content = {
  heading: string;
  intro: string;
  featured?: { title: string; description: string; ctaLabel: string; ctaHref: string };
  itemsHeading: string;
  items: CatalogItem[];
  cta: { heading: string; body: string; label: string; href: string };
};

export function FeaturedCatalogGrid({
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
  const { heading, intro, featured, itemsHeading, items, cta } = content;

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

        {featured && (
          <div className="mt-10 grid gap-8 overflow-hidden rounded-md bg-surface-2 sm:grid-cols-2">
            <div className="flex flex-col justify-center p-8">
              <h2 className="text-2xl leading-snug text-ink">{featured.title}</h2>
              <p className="mt-3 text-ink-soft">{featured.description}</p>
              <Link
                href={featured.ctaHref}
                className="mt-6 inline-flex w-fit items-center rounded-full bg-brand-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-700"
              >
                {featured.ctaLabel}
              </Link>
            </div>
            <div className="flex items-center justify-center bg-black/5 p-8">
              <Icon className="h-16 w-16 text-ink-soft/40" aria-hidden="true" />
            </div>
          </div>
        )}

        <h2 className="mt-16 text-2xl leading-snug text-ink sm:text-3xl">{itemsHeading}</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Link
              key={item.id}
              href={`${basePath}/${item.id}`}
              className="group flex flex-col overflow-hidden rounded-md bg-bg-dark text-white transition-shadow hover:shadow-md"
            >
              {item.image && (
                <div className="relative aspect-[4/3] w-full shrink-0">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              )}
              <div className="flex flex-1 flex-col p-6">
                <p className="text-xs font-medium uppercase tracking-widest text-white/50">
                  {item.eyebrow}
                </p>
                <h3 className="mt-3 text-lg leading-snug group-hover:text-brand-200">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-white/70">{item.description}</p>
              </div>
            </Link>
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
