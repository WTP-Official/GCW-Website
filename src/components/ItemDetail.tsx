import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, type LucideIcon } from "lucide-react";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";

export function ItemDetail({
  icon: Icon,
  eyebrow,
  heading,
  image,
  body,
  tags,
  backHref,
  backLabel,
  cta,
}: {
  icon: LucideIcon;
  eyebrow?: string;
  heading: string;
  image?: string;
  body: string;
  tags?: string[];
  backHref: string;
  backLabel: string;
  cta: { heading: string; body: string; label: string; href: string };
}) {
  return (
    <main>
      <section className="bg-bg-dark text-white">
        <div className="mx-auto max-w-3xl px-4 py-28 text-center sm:py-32">
          <Icon className="mx-auto h-8 w-8 text-white/60" aria-hidden="true" />
          {eyebrow && (
            <p className="mt-4 text-sm font-medium uppercase tracking-widest text-white/50">
              {eyebrow}
            </p>
          )}
          <h1 className="mt-3 font-serif-hero text-3xl leading-snug sm:text-4xl">{heading}</h1>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-24">
        <Link
          href={backHref}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {backLabel}
        </Link>

        {image ? (
          <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-md">
            <Image src={image} alt={heading} fill sizes="(min-width: 768px) 768px, 100vw" className="object-cover" />
          </div>
        ) : (
          <ImagePlaceholder icon={Icon} className="mt-8 aspect-[16/9] w-full rounded-md" />
        )}

        {/<\/?[a-z][\s\S]*>/i.test(body) ? (
          <div
            className="mt-8 text-ink-soft [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-medium [&_h2]:text-ink [&_h3]:mt-6 [&_h3]:text-lg [&_h3]:font-medium [&_h3]:text-ink [&_p]:mt-4 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:mt-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mt-1 [&_a]:text-brand-600 [&_a]:underline [&_blockquote]:mt-4 [&_blockquote]:border-l-2 [&_blockquote]:border-black/10 [&_blockquote]:pl-4 [&_strong]:font-medium [&_strong]:text-ink"
            dangerouslySetInnerHTML={{ __html: body }}
          />
        ) : (
          <p className="mt-8 whitespace-pre-line text-ink-soft">{body}</p>
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
        <div className="mx-auto max-w-2xl px-4 py-24 text-center">
          <h2 className="text-2xl leading-snug text-ink sm:text-3xl">{cta.heading}</h2>
          <p className="mt-4 text-ink-soft">{cta.body}</p>
          <Link
            href={cta.href}
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-brand-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-700"
          >
            {cta.label}
          </Link>
        </div>
      </section>
    </main>
  );
}
