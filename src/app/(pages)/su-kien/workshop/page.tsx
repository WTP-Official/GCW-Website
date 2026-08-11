import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Users2, Video, PlayCircle } from "lucide-react";
import content from "./content.json";
import { formatEventMeta } from "@/lib/formatEventMeta";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: content.title,
  description: content.metaDescription,
};

const FORMAT_ICONS = [Video, PlayCircle];

export default function WorkshopsPage() {
  const { heading, intro, formatsHeading, formats, explainer, itemsHeading, items, cta } =
    content;

  return (
    <main>
      <section className="border-b border-black/10 bg-white">
        <Reveal>
          <div className="mx-auto max-w-5xl px-4 py-16">
            <h1 className="max-w-2xl font-serif-hero text-5xl leading-[1.1] text-ink sm:text-6xl">
              {heading}
            </h1>
            <p className="mt-6 max-w-xl text-lg text-ink-soft">{intro}</p>
          </div>
        </Reveal>
      </section>

      <section className="border-b border-black/10 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl leading-snug text-ink sm:text-3xl">{formatsHeading}</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {formats.map((format, index) => {
              const Icon = FORMAT_ICONS[index] ?? Video;
              return (
                <div key={format.name} className="rounded-md bg-bg-dark p-8 text-white">
                  <Icon className="h-6 w-6 text-brand-300" aria-hidden="true" />
                  <h3 className="mt-4 font-serif-hero text-xl leading-snug">{format.name}</h3>
                  <p className="mt-3 text-sm text-white/70">{format.description}</p>
                  <Link
                    href="/contact"
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-700"
                  >
                    {format.ctaLabel}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="font-serif-hero text-2xl leading-snug text-ink sm:text-3xl">
            {explainer.heading}
          </h2>
          <div className="mt-6 max-w-3xl space-y-4">
            {explainer.body.split("\n\n").map((paragraph) => (
              <p key={paragraph} className="text-ink-soft">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-24">
        <Link
          href="/su-kien"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Quay lại Sự kiện
        </Link>

        <h2 className="mt-8 text-2xl leading-snug text-ink sm:text-3xl">{itemsHeading}</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {items.map((item, index) => (
            <Reveal key={item.id} delay={(index % 4) * 80}>
              <Link
                href={`/su-kien/workshop/${item.id}`}
                className="group flex flex-col overflow-hidden rounded-md bg-bg-dark text-white transition-shadow hover:shadow-md sm:flex-row"
              >
                <div className="flex flex-1 flex-col justify-center p-6">
                  <span className="inline-flex w-fit rounded-none bg-white/10 px-3 py-1 text-xs font-medium text-white/70">
                    {formatEventMeta(item)}
                  </span>
                  <h3 className="mt-4 text-lg leading-snug group-hover:text-brand-200">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-white/70">{item.description}</p>
                </div>
                <div className="relative flex w-full shrink-0 items-center justify-center bg-black/20 p-6 sm:w-40">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(min-width: 640px) 160px, 100vw"
                      className="object-cover"
                    />
                  ) : (
                    <Users2 className="h-10 w-10 text-white/40" aria-hidden="true" />
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
