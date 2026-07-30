import type { Metadata } from "next";
import Link from "next/link";
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
import { ImagePlaceholder } from "@/components/ImagePlaceholder";

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
    <main className="mx-auto max-w-6xl px-4 py-24">
      <div className="max-w-2xl">
        <h1 className="text-3xl leading-snug text-ink sm:text-4xl">
          {content.heading}
        </h1>
        <p className="mt-4 text-ink-soft">{content.intro}</p>
      </div>

      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {content.services.map((service) => {
          const Icon = ICONS[service.icon];
          return (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group flex flex-col overflow-hidden rounded-md border border-black/5 bg-white transition-shadow hover:shadow-md"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <ImagePlaceholder icon={Icon} className="h-full w-full" />
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
