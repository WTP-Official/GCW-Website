import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Radio, Presentation, Mic, Users2, ArrowRight, type LucideIcon } from "lucide-react";
import content from "./content.json";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: content.title,
  description: content.metaDescription,
};

const ICONS: Record<string, LucideIcon> = { Radio, Presentation, Mic, Users2 };

type Category = {
  id: string;
  icon: string;
  title: string;
  description: string;
  href: string;
  image?: string;
};

export default function EventsPage() {
  const { heading, intro, cta } = content;
  const categoryList = content.categories as Category[];

  return (
    <main>
      <section className="bg-bg-dark text-white">
        <Reveal>
          <div className="mx-auto max-w-3xl px-4 py-28 text-center sm:py-32">
            <h1 className="font-serif-hero text-3xl leading-snug sm:text-4xl">{heading}</h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-white/70">{intro}</p>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-24">
        <div className="grid gap-8 sm:grid-cols-2">
          {categoryList.map((category, index) => {
            const Icon = ICONS[category.icon];
            return (
              <Reveal key={category.id} delay={(index % 2) * 100}>
                <Link
                  href={category.href}
                  className="group block overflow-hidden rounded-md border border-black/5 bg-surface transition-shadow hover:shadow-md"
                >
                  {category.image ? (
                    <div className="relative aspect-[4/3] w-full">
                      <Image
                        src={category.image}
                        alt={category.title}
                        fill
                        sizes="(min-width: 640px) 50vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <ImagePlaceholder icon={Icon} className="aspect-[4/3] w-full" />
                  )}
                  <div className="p-6">
                    <span className="text-sm font-medium text-brand-600">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h2 className="mt-3 text-lg text-ink group-hover:text-brand-600">
                      {category.title}
                    </h2>
                    <p className="mt-2 text-sm text-ink-soft">{category.description}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-600">
                      Xem chi tiết
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
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
