import type { Metadata } from "next";
import { Globe, Mail, Phone } from "lucide-react";
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
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-24 lg:grid-cols-2 lg:items-start lg:py-32">
          <div>
            <h1 className="font-serif-hero text-3xl leading-snug sm:text-4xl">
              {content.heading}
            </h1>
            <p className="mt-6 max-w-md text-lg italic text-white/70">
              &ldquo;{content.quote}&rdquo;
            </p>

            <div className="mt-10 grid gap-8 border-t border-white/10 pt-8 sm:grid-cols-2">
              <div>
                <h3 className="text-sm font-semibold text-white">Thông tin</h3>
                <ul className="mt-3 space-y-2 text-sm text-white/70">
                  <li className="font-medium text-white">
                    {content.company.legalName}
                  </li>
                  <li>MST: {content.company.taxCode}</li>
                  {content.addresses.map((address, i) => (
                    <li key={address}>
                      Add-{i + 1}: {address}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-white">Liên hệ</h3>
                <ul className="mt-3 space-y-2 text-sm text-white/70">
                  <li className="flex flex-wrap items-center gap-1">
                    <Phone className="mr-1 h-4 w-4 text-white/70" aria-hidden="true" />
                    {content.phones.map((phone, i) => (
                      <span key={phone}>
                        {i > 0 && <span className="mx-1 text-white/40">|</span>}
                        <a
                          href={`tel:${phone}`}
                          className="transition-colors hover:text-white"
                        >
                          {formatPhoneLabel(phone)}
                        </a>
                      </span>
                    ))}
                  </li>
                  <li className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-white/70" aria-hidden="true" />
                    <a
                      href={`mailto:${content.email}`}
                      className="transition-colors hover:text-white"
                    >
                      {content.email}
                    </a>
                  </li>
                  <li className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-white/70" aria-hidden="true" />
                    <a
                      href={`https://${content.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-white"
                    >
                      {content.website}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="rounded-md bg-surface p-6 text-ink sm:p-8">
            <h2 className="text-xl text-ink">{content.formHeading}</h2>

            <div className="mt-6">
              <JarvisFormEmbed
                formId={content.jarvisFormId}
                title="Biểu mẫu liên hệ GCW"
                className="rounded-md"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
