"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Minus } from "lucide-react";
import { Reveal } from "@/components/Reveal";

type AccordionItem = {
  id: string;
  title: string;
  description: string;
  image?: string;
  actionLabel?: string;
  actionHref?: string;
};
type AccordionCategory = { heading: string; items: AccordionItem[] };

function AccordionRow({ item }: { item: AccordionItem }) {
  const [open, setOpen] = useState(false);

  return (
    <li className="border-b border-black/10">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-start justify-between gap-3 py-4 text-left"
      >
        <span className="text-sm font-medium text-ink">{item.title}</span>
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white">
          {open ? (
            <Minus className="h-3.5 w-3.5" aria-hidden="true" />
          ) : (
            <Plus className="h-3.5 w-3.5" aria-hidden="true" />
          )}
        </span>
      </button>

      {open && (
        <div className="pb-5">
          {item.image && (
            <div className="relative mb-4 aspect-4/3 w-full overflow-hidden rounded-md">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 100vw"
                className="object-cover"
              />
            </div>
          )}
          <p className="mb-4 text-sm text-ink-soft">{item.description}</p>
          {item.actionHref && item.actionLabel && (
            <a
              href={item.actionHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-700"
            >
              {item.actionLabel}
            </a>
          )}
        </div>
      )}
    </li>
  );
}

export function AccordionCategoryList({ categories }: { categories: AccordionCategory[] }) {
  return (
    <div className="mt-8 grid gap-x-10 gap-y-10 sm:grid-cols-3">
      {categories.map((category, index) => (
        <Reveal key={category.heading} delay={(index % 3) * 100}>
          <div>
            <p className="rounded-md bg-bg-dark px-4 py-3 text-center text-sm font-medium text-white">
              {category.heading}
            </p>
            <ul className="mt-6 space-y-0">
              {category.items.map((item) => (
                <AccordionRow key={item.id} item={item} />
              ))}
            </ul>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
