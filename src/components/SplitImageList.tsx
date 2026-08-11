import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ChevronRight, type LucideIcon } from "lucide-react";
import { formatEventDateOnly, formatEventMeta } from "@/lib/formatEventMeta";
import { Reveal } from "@/components/Reveal";
import { JarvisFormEmbed } from "@/components/JarvisFormEmbed";

type SplitItem = {
  id: string;
  title: string;
  description: string;
  format?: string;
  eventDate?: string;
  duration?: string;
  location?: string;
  image?: string;
};

type Content = {
  heading: string;
  intro: string;
  heroImage?: string;
  highlight?: { heading: string; body: string };
  itemsHeading: string;
  items: SplitItem[];
  cta?: { heading: string; body: string; label: string; href: string };
  leadForm?: { heading: string; body: string; jarvisFormId: string };
};

export function SplitImageList({
  icon: Icon,
  content,
  backHref,
  backLabel,
  basePath,
  imageLayout = "stacked",
}: {
  icon: LucideIcon;
  content: Content;
  backHref: string;
  backLabel: string;
  basePath: string;
  /** "stacked" = big photo below text (conferences); "side" = small photo beside text (webcasts). */
  imageLayout?: "stacked" | "side";
}) {
  const { heading, intro, heroImage, highlight, itemsHeading, items, leadForm } = content;
  const isSide = imageLayout === "side";

  return (
    <main>
      <section className="border-b border-black/10 bg-white">
        <Reveal>
          <div
            className={
              heroImage
                ? "mx-auto grid max-w-6xl gap-10 px-4 py-16 lg:grid-cols-2 lg:items-center"
                : "mx-auto max-w-5xl px-4 py-16"
            }
          >
            <div>
              <h1 className="max-w-2xl font-serif-hero text-5xl leading-[1.1] text-ink sm:text-6xl">{heading}</h1>
              <p className="mt-6 max-w-xl text-lg text-ink-soft">{intro}</p>
            </div>
            {heroImage && (
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-md">
                <Image src={heroImage} alt={heading} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" priority />
              </div>
            )}
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

        <h2 className="mt-8 text-2xl leading-snug text-ink sm:text-3xl">{itemsHeading}</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {items.map((item, index) => (
            <Reveal key={item.id} delay={(index % 4) * 80}>
              <Link
                href={`${basePath}/${item.id}`}
                className={`group flex overflow-hidden rounded-md bg-bg-dark text-white transition-shadow hover:shadow-md ${
                  isSide ? "flex-col sm:flex-row" : "flex-col"
                }`}
              >
                {isSide ? (
                  <>
                    <div className="flex flex-1 flex-col justify-center p-6">
                      <h3 className="flex items-start gap-1 font-serif-hero text-2xl leading-snug group-hover:text-brand-200">
                        {item.title}
                        <ChevronRight className="mt-2 h-5 w-5 shrink-0" aria-hidden="true" />
                      </h3>
                      <p className="mt-3 text-sm text-white/70">{item.description}</p>
                    </div>
                    <div className="relative aspect-4/3 w-full shrink-0 bg-black/20 sm:aspect-auto sm:w-2/5">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="(min-width: 640px) 40vw, 100vw"
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <Icon className="h-10 w-10 text-white/40" aria-hidden="true" />
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="p-6 pb-0">
                      <span className="text-xs font-bold uppercase tracking-wide text-white/70">
                        {formatEventDateOnly(item.eventDate) ?? formatEventMeta(item)}
                      </span>
                      <h3 className="mt-2 font-serif-hero text-2xl leading-snug group-hover:text-brand-200">
                        {item.title}
                      </h3>
                    </div>
                    <div className="relative mt-4 aspect-4/3 w-full shrink-0 bg-black/20">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="(min-width: 640px) 50vw, 100vw"
                          className="object-cover"
                        />
                      ) : (
                        <Icon className="h-10 w-10 text-white/40" aria-hidden="true" />
                      )}
                    </div>
                    <p className="p-6 pt-4 text-sm text-white/70">{item.description}</p>
                  </>
                )}
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {leadForm && (
        <section className="border-t border-black/10 bg-white">
          <Reveal>
            <div className="mx-auto grid max-w-6xl gap-10 px-4 py-24 lg:grid-cols-2 lg:items-start">
              <div>
                <h2 className="font-serif-hero text-4xl leading-tight text-ink sm:text-5xl">{leadForm.heading}</h2>
                <p className="mt-4 max-w-md text-ink-soft">{leadForm.body}</p>
              </div>
              <JarvisFormEmbed formId={leadForm.jarvisFormId} title={leadForm.heading} className="rounded-md" />
            </div>
          </Reveal>
        </section>
      )}

    </main>
  );
}
