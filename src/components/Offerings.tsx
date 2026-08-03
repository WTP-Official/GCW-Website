import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck,
  Gauge,
  TrendingUp,
  UserSearch,
  Receipt,
  MessageSquareText,
  type LucideIcon,
} from "lucide-react";
import content from "../app/content.json";

const ICONS: Record<string, LucideIcon> = {
  ShieldCheck,
  Gauge,
  TrendingUp,
  UserSearch,
  Receipt,
  MessageSquareText,
};

export function Offerings() {
  return (
    <section className="border-t border-black/5 py-32 sm:py-36">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="font-serif-hero text-3xl leading-snug text-ink sm:text-4xl">
          Sáu gói dịch vụ <em className="italic">cốt lõi</em>
        </h2>
        <div className="mt-14 grid gap-x-8 gap-y-20 sm:grid-cols-2 lg:grid-cols-3">
          {content.offerings.map((item, index) => {
            const Icon = ICONS[item.icon];
            return (
              <Link
                key={item.name}
                href="/services"
                className="group block"
              >
                <div
                  className={`relative aspect-4/3 w-full overflow-hidden rounded-md shadow-sm transition-shadow group-hover:shadow-lg ${
                    index % 2 === 0 ? "-rotate-1" : "rotate-1"
                  }`}
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="photo-grade object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-ink/40 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md">
                    <Icon className="h-4 w-4 text-brand-600" aria-hidden="true" />
                  </div>
                </div>
                <div className="relative z-10 mx-3 -mt-6 rounded-md bg-white p-6 shadow-md">
                  <h3 className="text-lg text-ink group-hover:text-brand-600">
                    {item.name}
                  </h3>
                  <p className="mt-2 text-sm text-ink-soft">
                    {item.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
