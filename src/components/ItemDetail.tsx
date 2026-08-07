import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, CheckCircle2, type LucideIcon } from "lucide-react";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { Reveal } from "@/components/Reveal";
import { JarvisFormEmbed } from "@/components/JarvisFormEmbed";
import {
  formatEventDateOnly,
  formatEventTimeOnly,
} from "@/lib/formatEventMeta";

function parseLines(raw?: string) {
  return (raw ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function parseSpeakers(raw?: string) {
  return parseLines(raw).map((line) => {
    const [name, role] = line.split("|").map((part) => part.trim());
    return { name, role };
  });
}

export function ItemDetail({
  icon: Icon,
  eyebrow,
  heading,
  image,
  body,
  format,
  eventDate,
  location,
  duration,
  speakers,
  takeaways,
  audience,
  tags,
  primaryAction,
  jarvisFormId,
  backHref,
  backLabel,
  cta,
}: {
  icon: LucideIcon;
  eyebrow?: string;
  heading: string;
  image?: string;
  body: string;
  format?: string;
  eventDate?: string;
  location?: string;
  duration?: string;
  speakers?: string;
  takeaways?: string;
  audience?: string;
  tags?: string[];
  primaryAction?: { label: string; href: string };
  jarvisFormId?: string;
  backHref: string;
  backLabel: string;
  cta: { heading: string; body: string; label: string; href: string };
}) {
  const speakerList = parseSpeakers(speakers);
  const takeawayList = parseLines(takeaways);
  const audienceList = parseLines(audience);
  const eventDateOnly = formatEventDateOnly(eventDate);
  const eventTimeOnly = formatEventTimeOnly(eventDate);
  return (
    <main>
      <section className="border-b border-black/10 bg-white">
        <Reveal>
          <div className="mx-auto max-w-5xl px-4 py-16">
            {eyebrow && (
              <p className="text-sm font-semibold text-ink">{eyebrow}</p>
            )}
            <h1 className="mt-2 max-w-2xl font-serif-hero text-5xl leading-[1.1] text-ink sm:text-6xl">
              {heading}
            </h1>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-24">
        <Link
          href={backHref}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {backLabel}
        </Link>

        <Reveal delay={100}>
          {image ? (
            <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-md">
              <Image
                src={image}
                alt={heading}
                fill
                sizes="(min-width: 768px) 768px, 100vw"
                className="object-cover"
              />
            </div>
          ) : (
            <ImagePlaceholder
              icon={Icon}
              className="mt-8 aspect-[16/9] w-full rounded-md"
            />
          )}
        </Reveal>

        {primaryAction && !jarvisFormId && (
          <a
            href={primaryAction.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-brand-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-700"
          >
            {primaryAction.label}
          </a>
        )}

        {/<\/?[a-z][\s\S]*>/i.test(body) ? (
          <div
            className="mt-8 text-ink-soft [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-medium [&_h2]:text-ink [&_h3]:mt-6 [&_h3]:text-lg [&_h3]:font-medium [&_h3]:text-ink [&_p]:mt-4 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:mt-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mt-1 [&_a]:text-brand-600 [&_a]:underline [&_blockquote]:mt-4 [&_blockquote]:border-l-2 [&_blockquote]:border-black/10 [&_blockquote]:pl-4 [&_strong]:font-medium [&_strong]:text-ink"
            dangerouslySetInnerHTML={{ __html: body }}
          />
        ) : (
          <p className="mt-8 whitespace-pre-line text-ink-soft">{body}</p>
        )}

        {(eventDateOnly || eventTimeOnly || format || location || duration) && (
          <div className="mt-12">
            <h2 className="text-xl font-semibold text-ink">Chi tiết sự kiện</h2>
            <dl className="mt-4 space-y-2.5 text-base">
              {eventDateOnly && (
                <div className="flex gap-2">
                  <dt className="shrink-0 font-semibold text-ink">Ngày:</dt>
                  <dd className="text-ink-soft">{eventDateOnly}</dd>
                </div>
              )}
              {eventTimeOnly && (
                <div className="flex gap-2">
                  <dt className="shrink-0 font-semibold text-ink">
                    Thời gian:
                  </dt>
                  <dd className="text-ink-soft">{eventTimeOnly}</dd>
                </div>
              )}
              {format && (
                <div className="flex gap-2">
                  <dt className="shrink-0 font-semibold text-ink">
                    Hình thức:
                  </dt>
                  <dd className="text-ink-soft">{format}</dd>
                </div>
              )}
              {location && (
                <div className="flex gap-2">
                  <dt className="shrink-0 font-semibold text-ink">Địa điểm:</dt>
                  <dd className="text-ink-soft">{location}</dd>
                </div>
              )}
              {duration && (
                <div className="flex gap-2">
                  <dt className="shrink-0 font-semibold text-ink">
                    Thời lượng:
                  </dt>
                  <dd className="text-ink-soft">{duration}</dd>
                </div>
              )}
            </dl>
          </div>
        )}

        {speakerList.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-semibold text-ink">Diễn giả nổi bật</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {speakerList.map((speaker, index) => (
                <div
                  key={`${speaker.name}-${index}`}
                  className="flex items-center gap-4 rounded-md bg-bg-muted p-4"
                >
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-600 text-base font-semibold text-white"
                    aria-hidden="true"
                  >
                    {speaker.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-ink">{speaker.name}</p>
                    {speaker.role && (
                      <p className="text-sm font-medium text-brand-600">
                        {speaker.role}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {takeawayList.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-semibold text-ink">
              Những điều bạn sẽ học được
            </h2>
            <ul className="mt-4 space-y-3">
              {takeawayList.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-ink-soft"
                >
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 shrink-0 text-brand-600"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {audienceList.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-semibold text-ink">
              Đối tượng nên tham dự
            </h2>
            <ul className="mt-4 space-y-3">
              {audienceList.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-ink-soft"
                >
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 shrink-0 text-brand-600"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {jarvisFormId && (
          <JarvisFormEmbed
            formId={jarvisFormId}
            title={`Đăng ký: ${heading}`}
            className="mt-4 rounded-md"
          />
        )}

        {tags && tags.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex rounded-none bg-brand-50 px-3 py-1 text-xs font-medium text-brand-600"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </section>

      <section className="bg-bg-muted">
        <Reveal>
          <div className="mx-auto max-w-2xl px-4 py-24 text-center">
            <h2 className="text-2xl leading-snug text-ink sm:text-3xl">
              {cta.heading}
            </h2>
            <p className="mt-4 text-ink-soft">{cta.body}</p>
            <Link
              href={cta.href}
              className="mt-8 inline-flex items-center gap-2 rounded-md bg-brand-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-700"
            >
              {cta.label}
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
