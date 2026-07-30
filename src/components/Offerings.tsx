import Link from "next/link";
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
import { ImagePlaceholder } from "@/components/ImagePlaceholder";

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
    <section className="bg-surface-2 py-24">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-2xl leading-snug text-ink sm:text-3xl">
          Sáu gói dịch vụ cốt lõi
        </h2>
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {content.offerings.map((item) => {
            const Icon = ICONS[item.icon];
            return (
              <Link
                key={item.name}
                href="/services"
                className="group overflow-hidden rounded-md border border-black/5 bg-white transition-shadow hover:shadow-md"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <ImagePlaceholder icon={Icon} className="h-full w-full" />
                </div>
                <div className="p-6">
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
