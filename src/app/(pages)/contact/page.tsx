import type { Metadata } from "next";
import { Mail, Phone, MapPin, Building2 } from "lucide-react";
import content from "./content.json";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";

export const metadata: Metadata = {
  title: content.title,
  description: content.metaDescription,
};

function formatPhoneLabel(phone: string) {
  // "+84868974899" -> "+84 868 974 899"
  const digits = phone.replace("+84", "");
  const groups = [digits.slice(0, 3), digits.slice(3, 6), digits.slice(6)];
  return `+84 ${groups.join(" ")}`;
}

export default function ContactPage() {
  return (
    <main>
      <section className="bg-gradient-to-b from-brand-900 via-brand-700 to-brand-600 text-white">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:py-24">
          <h1 className="text-3xl font-bold sm:text-4xl">
            {content.heading}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-brand-50/90">
            {content.intro}
          </p>
          <a
            href={`mailto:${content.email}`}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-50"
          >
            Gửi email tới {content.email}
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-black/5 bg-surface p-6">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand-50 text-brand-600">
              <Phone className="h-5 w-5" aria-hidden="true" />
            </span>
            <h2 className="mt-4 text-base font-semibold text-ink">
              Điện thoại tư vấn
            </h2>
            <ul className="mt-2 space-y-1">
              {content.phones.map((phone) => (
                <li key={phone}>
                  <a
                    href={`tel:${phone}`}
                    className="text-sm text-ink-soft transition-colors hover:text-brand-600"
                  >
                    {formatPhoneLabel(phone)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-black/5 bg-surface p-6">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand-50 text-brand-600">
              <Mail className="h-5 w-5" aria-hidden="true" />
            </span>
            <h2 className="mt-4 text-base font-semibold text-ink">Email</h2>
            <a
              href={`mailto:${content.email}`}
              className="mt-2 block text-sm text-ink-soft transition-colors hover:text-brand-600"
            >
              {content.email}
            </a>
          </div>
        </div>

        <h2 className="mt-12 text-xl font-semibold text-ink">Văn phòng</h2>
        <div className="mt-4 grid gap-6 sm:grid-cols-2">
          {content.offices.map((office) => (
            <div
              key={office.name}
              className="overflow-hidden rounded-lg border border-black/5 bg-surface"
            >
              <div className="relative aspect-video w-full overflow-hidden">
                <ImagePlaceholder icon={Building2} className="h-full w-full" iconClassName="h-8 w-8" />
              </div>
              <div className="p-6">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                  <MapPin className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-base font-semibold text-ink">
                  {office.name}
                </h3>
                <p className="mt-2 text-sm text-ink-soft">{office.address}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-10 text-sm text-muted">
          {content.company.legalName} — MST {content.company.taxCode}
        </p>
      </section>
    </main>
  );
}
