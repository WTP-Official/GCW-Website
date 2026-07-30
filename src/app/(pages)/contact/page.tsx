import type { Metadata } from "next";
import { Mail, Phone, MapPin } from "lucide-react";
import content from "./content.json";
import { JarvisFormEmbed } from "@/components/JarvisFormEmbed";

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
      <section className="bg-bg-dark text-white">
        <div className="mx-auto max-w-3xl px-4 py-28 text-center sm:py-32">
          <h1 className="font-serif-hero text-3xl leading-snug sm:text-4xl">{content.heading}</h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/70">
            {content.intro}
          </p>
          <a
            href={`mailto:${content.email}`}
            className="mt-10 inline-flex items-center gap-2 rounded-md bg-brand-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-700"
          >
            Gửi email tới {content.email}
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-24">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="flex flex-col gap-6 lg:col-span-2">
            <div className="rounded-md border border-black/5 bg-surface p-6">
              <Phone className="h-6 w-6 text-ink-soft" aria-hidden="true" />
              <h2 className="mt-4 text-base text-ink">
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

            <div className="rounded-md border border-black/5 bg-surface p-6">
              <Mail className="h-6 w-6 text-ink-soft" aria-hidden="true" />
              <h2 className="mt-4 text-base text-ink">Email</h2>
              <a
                href={`mailto:${content.email}`}
                className="mt-2 block text-sm text-ink-soft transition-colors hover:text-brand-600"
              >
                {content.email}
              </a>
            </div>
          </div>

          <div className="rounded-md border border-black/5 bg-surface p-6 sm:p-8 lg:col-span-3">
            <JarvisFormEmbed
              formId={content.jarvisFormId}
              title="Biểu mẫu liên hệ GCW"
              className="rounded-md"
            />
          </div>
        </div>

        <h2 className="mt-16 text-xl text-ink">Văn phòng</h2>
        <div className="mt-6 grid gap-8 sm:grid-cols-2">
          {content.offices.map((office) => (
            <div
              key={office.name}
              className="overflow-hidden rounded-md border border-black/5 bg-surface p-6"
            >
              <MapPin className="h-6 w-6 text-ink-soft" aria-hidden="true" />
              <h3 className="mt-4 text-base text-ink">
                {office.name}
              </h3>
              <p className="mt-2 text-sm text-ink-soft">{office.address}</p>
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
