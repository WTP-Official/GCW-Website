import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck,
  Gauge,
  TrendingUp,
  UserSearch,
  Receipt,
  MessageSquareText,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import content from "./content.json";

export const metadata: Metadata = {
  title: content.title,
  description: content.metaDescription,
};

const ICONS: Record<string, LucideIcon> = {
  ShieldCheck,
  Gauge,
  TrendingUp,
  UserSearch,
  Receipt,
  MessageSquareText,
};

export default function ServicesPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-32">
      <div className="max-w-2xl">
        <h1 className="font-serif-hero text-3xl leading-snug text-ink sm:text-4xl">
          {content.heading}
        </h1>
        <p className="mt-4 text-ink-soft">{content.intro}</p>
      </div>

      <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {content.services.map((service) => {
          const Icon = ICONS[service.icon];
          return (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group flex flex-col overflow-hidden rounded-md border border-black/5 bg-white transition-shadow hover:shadow-md"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="photo-grade object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute bottom-3 left-3 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md">
                  <Icon className="h-4 w-4 text-brand-600" aria-hidden="true" />
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h2 className="text-lg text-ink group-hover:text-brand-600">
                  {service.name}
                </h2>
                <p className="mt-2 text-sm text-ink-soft">{service.tagline}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-600">
                  Xem chi tiết
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
