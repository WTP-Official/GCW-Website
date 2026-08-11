import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/Reveal";

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
  highlight?: { heading: string; body: string };
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
  const { heading, intro, highlight, featured, itemsHeading, items, cta } = content;

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

        {featured && (
          <Reveal>
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
          </Reveal>
        )}

        <h2 className="mt-16 text-2xl leading-snug text-ink sm:text-3xl">{itemsHeading}</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => (
            <Reveal key={item.id} delay={(index % 4) * 80}>
              <Link
                href={`${basePath}/${item.id}`}
                className="group flex h-full flex-col rounded-md bg-bg-dark p-6 text-white transition-shadow hover:shadow-md"
              >
                <p className="text-xs font-medium uppercase tracking-widest text-white/50">
                  {item.eyebrow}
                </p>
                <h3 className="mt-3 text-lg leading-snug group-hover:text-brand-200">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-white/70">{item.description}</p>
                {item.image && (
                  <div className="relative mt-6 aspect-[3/4] w-20 shrink-0 overflow-hidden rounded-sm">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                )}
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
