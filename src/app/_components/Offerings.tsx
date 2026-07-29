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
import content from "../content.json";

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
    <section className="bg-surface-2 py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-2xl font-bold text-ink sm:text-3xl">
          Sáu gói dịch vụ cốt lõi
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {content.offerings.map((item) => {
            const Icon = ICONS[item.icon];
            return (
              <Link
                key={item.name}
                href="/services"
                className="group rounded-2xl border border-black/5 bg-white p-6 transition-shadow hover:shadow-md"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-ink group-hover:text-brand-600">
                  {item.name}
                </h3>
                <p className="mt-2 text-sm text-ink-soft">
                  {item.description}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
