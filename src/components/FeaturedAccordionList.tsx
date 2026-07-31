"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Minus } from "lucide-react";

type AccordionItem = { id: string; title: string; description: string };
type AccordionCategory = { heading: string; items: AccordionItem[] };
type ToolCard = {
  id: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
};

type Content = {
  heading: string;
  intro: string;
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
}: {
  icon: ReactNode;
  content: Content;
  backHref: string;
  backLabel: string;
}) {
  const [openKey, setOpenKey] = useState<string | null>(null);
  const { heading, intro, toolsHeading, tools, categoriesHeading, categories, cta } = content;

  return (
    <main>
      <section className="bg-bg-dark text-white">
        <div className="mx-auto max-w-3xl px-4 py-28 text-center sm:py-32">
          {icon}
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

        {tools && tools.length > 0 && (
          <div className="mt-12">
            {toolsHeading && (
              <h2 className="text-2xl leading-snug text-ink sm:text-3xl">{toolsHeading}</h2>
            )}
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              {tools.map((tool) => (
                <div
                  key={tool.id}
                  className="flex flex-col justify-between rounded-md bg-bg-dark p-6 text-white"
                >
                  <div>
                    <h3 className="text-lg leading-snug">{tool.title}</h3>
                    <p className="mt-2 text-sm text-white/70">{tool.description}</p>
                  </div>
                  <Link
                    href={tool.ctaHref}
                    className="mt-6 inline-flex w-fit items-center rounded-full bg-brand-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-700"
                  >
                    {tool.ctaLabel}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-16">
          <h2 className="text-2xl leading-snug text-ink sm:text-3xl">{categoriesHeading}</h2>
          <div className="mt-8 grid gap-x-10 gap-y-10 sm:grid-cols-3">
            {categories.map((category, categoryIndex) => (
              <div key={category.heading}>
                <p className="rounded-md bg-bg-dark px-4 py-3 text-center text-sm font-medium text-white">
                  {category.heading}
                </p>
                <ul className="mt-6 space-y-0">
                  {category.items.map((item, itemIndex) => {
                    const key = `${categoryIndex}-${itemIndex}`;
                    const isOpen = openKey === key;
                    return (
                      <li key={item.id} className="border-b border-black/10">
                        <button
                          type="button"
                          onClick={() => setOpenKey(isOpen ? null : key)}
                          aria-expanded={isOpen}
                          className="flex w-full items-start justify-between gap-3 py-4 text-left"
                        >
                          <span className="text-sm font-medium text-ink">{item.title}</span>
                          <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white">
                            {isOpen ? (
                              <Minus className="h-3 w-3" aria-hidden="true" />
                            ) : (
                              <Plus className="h-3 w-3" aria-hidden="true" />
                            )}
                          </span>
                        </button>
                        {isOpen && (
                          <p className="pb-4 text-sm text-ink-soft">{item.description}</p>
                        )}
                      </li>
                    );
                  })}
                </ul>
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
