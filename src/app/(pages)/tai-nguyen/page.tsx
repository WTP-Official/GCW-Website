import type { Metadata } from "next";
import Link from "next/link";
import {
  Newspaper,
  BookOpen,
  ClipboardList,
  Mic2,
  Video,
  CalendarCheck,
  PlayCircle,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import content from "./content.json";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";

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
  CalendarCheck,
  PlayCircle,
};

export default function ResourcesPage() {
  const { heading, intro, live, upcoming, cta } = content;
  const LiveIcon = ICONS[live.icon];

  return (
    <main>
      <section className="bg-bg-dark text-white">
        <div className="mx-auto max-w-3xl px-4 py-28 text-center sm:py-32">
          <h1 className="font-serif-hero text-3xl leading-snug sm:text-4xl">{heading}</h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/70">{intro}</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-24">
        <Link
          href={live.href}
          className="flex flex-col items-start gap-4 rounded-md border border-brand-600 bg-white p-6 transition-colors hover:bg-brand-50 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-start gap-4">
            <LiveIcon className="mt-1 h-6 w-6 shrink-0 text-brand-600" aria-hidden="true" />
            <div>
              <h2 className="text-lg text-ink">{live.title}</h2>
              <p className="mt-1 text-sm text-ink-soft">{live.description}</p>
            </div>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-brand-600">
            {live.label}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </span>
        </Link>

        <h2 className="mt-16 text-2xl leading-snug text-ink sm:text-3xl">
          Khám phá theo định dạng
        </h2>
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {upcoming.map((item) => {
            const Icon = ICONS[item.icon];
            return (
              <Link
                key={item.id}
                href={item.href}
                className="group flex flex-col overflow-hidden rounded-md border border-black/5 bg-white transition-shadow hover:shadow-md"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <ImagePlaceholder icon={Icon} className="h-full w-full" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg text-ink group-hover:text-brand-600">{item.title}</h3>
                  <p className="mt-2 text-sm text-ink-soft">{item.description}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-600">
                    Xem chi tiết
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            );
          })}
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
