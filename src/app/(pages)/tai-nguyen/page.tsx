import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Newspaper,
  BookOpen,
  ClipboardList,
  Mic2,
  Video,
  PlayCircle,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import content from "./content.json";

export const metadata: Metadata = {
  title: content.title,
  description: content.metaDescription,
};

const ICONS: Record<string, LucideIcon> = {
  Newspaper,
  BookOpen,
  ClipboardList,
  Mic2,
  Video,
  PlayCircle,
};

export default function ResourcesPage() {
  const { heading, intro, heroImage, items } = content;

  return (
    <main>
      <section className="border-b border-black/10 bg-white">
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
      </section>

      <section className="mx-auto max-w-6xl px-4 py-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => {
            const Icon = ICONS[item.icon];
            return (
              <Link
                key={item.id}
                href={item.href}
                className="group flex flex-col rounded-md bg-bg-dark p-6 text-white transition-shadow hover:shadow-md"
              >
                <Icon className="h-6 w-6 text-brand-300" aria-hidden="true" />
                <h2 className="mt-4 font-serif-hero text-xl leading-snug group-hover:text-brand-200">{item.title}</h2>
                <p className="mt-2 text-sm text-white/70">{item.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-300">
                  {item.label}
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
