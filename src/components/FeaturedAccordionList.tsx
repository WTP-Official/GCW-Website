import { type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, PlayCircle } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { AccordionCategoryList } from "@/components/AccordionCategoryList";

type AccordionItem = {
  id: string;
  title: string;
  description: string;
  image?: string;
  actionLabel?: string;
  actionHref?: string;
};
type AccordionCategory = { heading: string; items: AccordionItem[] };
export type ToolCard = {
  id: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  image?: string;
};

type Content = {
  heading: string;
  intro: string;
  heroImage?: string;
  highlight?: { heading: string; body: string };
  toolsHeading?: string;
  tools?: ToolCard[];
  categoriesHeading: string;
  categories: AccordionCategory[];
  cta: { heading: string; body: string; label: string; href: string };
};

export function FeaturedAccordionList({
  icon,
  content,
  backHref,
  backLabel,
  renderToolAction,
  itemStyle = "accordion",
}: {
  icon: ReactNode;
  content: Content;
  backHref: string;
  backLabel: string;
  renderToolAction?: (tool: ToolCard) => ReactNode | undefined;
  /** "accordion" = click to expand image/description/download (guides); "list" = flat title + icon link (videos, recordings). */
  itemStyle?: "accordion" | "list";
}) {
  const { heading, intro, heroImage, highlight, toolsHeading, tools, categoriesHeading, categories, cta } = content;

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

        {tools && tools.length > 0 && (
          <div className="mt-12">
            {toolsHeading && (
              <h2 className="text-2xl leading-snug text-ink sm:text-3xl">{toolsHeading}</h2>
            )}
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              {tools.map((tool, index) => (
                <Reveal key={tool.id} delay={(index % 3) * 100}>
                  <div className="flex flex-col justify-between overflow-hidden rounded-md bg-bg-dark text-white transition-shadow hover:shadow-md">
                    {tool.image && (
                      <div className="relative aspect-video w-full shrink-0">
                        <Image
                          src={tool.image}
                          alt={tool.title}
                          fill
                          sizes="(min-width: 640px) 33vw, 100vw"
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="flex flex-1 flex-col justify-between p-6">
                      <div>
                        <h3 className="text-lg leading-snug">{tool.title}</h3>
                        <p className="mt-2 text-sm text-white/70">{tool.description}</p>
                      </div>
                      {renderToolAction?.(tool) ?? (
                        <Link
                          href={tool.ctaHref}
                          className="mt-6 inline-flex w-fit items-center rounded-full bg-brand-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-700"
                        >
                          {tool.ctaLabel}
                        </Link>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        )}

        <div className="mt-16">
          <h2 className="text-2xl leading-snug text-ink sm:text-3xl">{categoriesHeading}</h2>
          {itemStyle === "list" ? (
            <div className="mt-8 grid gap-x-10 gap-y-10 sm:grid-cols-3">
              {categories.map((category, index) => (
                <Reveal key={category.heading} delay={(index % 3) * 100}>
                  <div>
                    <p className="rounded-md bg-bg-dark px-4 py-3 text-center text-sm font-medium text-white">
                      {category.heading}
                    </p>
                    <ul className="mt-6 space-y-0">
                      {category.items.map((item) =>
                        item.actionHref ? (
                          <li key={item.id} className="border-b border-black/10">
                            <a
                              href={item.actionHref}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-between gap-3 py-4 text-sm font-medium text-ink hover:text-brand-600"
                            >
                              {item.title}
                              <PlayCircle className="h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" />
                            </a>
                          </li>
                        ) : (
                          <li
                            key={item.id}
                            className="flex items-center justify-between gap-3 border-b border-black/10 py-4 text-sm font-medium text-ink"
                          >
                            {item.title}
                            <PlayCircle className="h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" />
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          ) : (
            <AccordionCategoryList categories={categories} />
          )}
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
