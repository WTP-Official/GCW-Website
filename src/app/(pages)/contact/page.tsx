import type { Metadata } from "next";
import { Globe, Mail, Phone } from "lucide-react";
import content from "./content.json";
import { JarvisFormEmbed } from "@/components/JarvisFormEmbed";
import { Reveal } from "@/components/Reveal";

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
      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 lg:grid-cols-2 lg:items-start">
          <Reveal>
            <div>
              <h1 className="font-serif-hero text-5xl leading-[1.1] text-ink sm:text-6xl">
                {content.heading}
              </h1>
              <p className="mt-6 max-w-md text-lg text-ink-soft">
                &ldquo;{content.quote}&rdquo;
              </p>

              <div className="mt-10 grid gap-8 border-t border-black/10 pt-8 sm:grid-cols-2">
                <div>
                  <h3 className="text-sm font-semibold text-ink">Thông tin</h3>
                  <ul className="mt-3 space-y-2 text-sm text-ink-soft">
                    <li className="font-medium text-ink">
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
                  <h3 className="text-sm font-semibold text-ink">Liên hệ</h3>
                  <ul className="mt-3 space-y-2 text-sm text-ink-soft">
                    <li className="flex flex-wrap items-center gap-1">
                      <Phone
                        className="mr-1 h-4 w-4 text-ink-soft"
                        aria-hidden="true"
                      />
                      {content.phones.map((phone, i) => (
                        <span key={phone}>
                          {i > 0 && <span className="mx-1 text-muted">|</span>}
                          <a
                            href={`tel:${phone}`}
                            className="transition-colors hover:text-brand-600"
                          >
                            {formatPhoneLabel(phone)}
                          </a>
                        </span>
                      ))}
                    </li>
                    <li className="flex items-center gap-2">
                      <Mail
                        className="h-4 w-4 text-ink-soft"
                        aria-hidden="true"
                      />
                      <a
                        href={`mailto:${content.email}`}
                        className="transition-colors hover:text-brand-600"
                      >
                        {content.email}
                      </a>
                    </li>
                    <li className="flex items-center gap-2">
                      <Globe
                        className="h-4 w-4 text-ink-soft"
                        aria-hidden="true"
                      />
                      <a
                        href={`https://${content.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors hover:text-brand-600"
                      >
                        {content.website}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div>
              <p className="mb-4 text-sm font-semibold text-ink">
                Điền vào biểu mẫu bên dưới để kết nối với đại diện GCW.
              </p>
              <JarvisFormEmbed
                formId={content.jarvisFormId}
                title="Biểu mẫu liên hệ GCW"
                className="rounded-md"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
