import Link from "next/link";
import { ArrowLeft, type LucideIcon } from "lucide-react";

type SplitItem = { title: string; description: string; meta: string };

type Content = {
  heading: string;
  intro: string;
  itemsHeading: string;
  items: SplitItem[];
  cta: { heading: string; body: string; label: string; href: string };
};

export function SplitImageList({
  icon: Icon,
  content,
  backHref,
  backLabel,
}: {
  icon: LucideIcon;
  content: Content;
  backHref: string;
  backLabel: string;
}) {
  const { heading, intro, itemsHeading, items, cta } = content;

  return (
    <main>
      <section className="bg-bg-dark text-white">
        <div className="mx-auto max-w-3xl px-4 py-28 text-center sm:py-32">
          <Icon className="mx-auto h-8 w-8 text-white/60" aria-hidden="true" />
          <h1 className="mt-4 font-serif-hero text-3xl leading-snug sm:text-4xl">{heading}</h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/70">{intro}</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-24">
        <Link
          href={backHref}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {backLabel}
        </Link>

        <h2 className="mt-8 text-2xl leading-snug text-ink sm:text-3xl">{itemsHeading}</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {items.map((item) => (
            <div
              key={item.title}
              className="flex flex-col overflow-hidden rounded-md bg-bg-dark text-white sm:flex-row"
            >
              <div className="flex flex-1 flex-col justify-center p-6">
                <span className="inline-flex w-fit rounded-none bg-white/10 px-3 py-1 text-xs font-medium text-white/70">
                  {item.meta}
                </span>
                <h3 className="mt-4 text-lg leading-snug">{item.title}</h3>
                <p className="mt-2 text-sm text-white/70">{item.description}</p>
              </div>
              <div className="flex w-full shrink-0 items-center justify-center bg-black/20 p-6 sm:w-40">
                <Icon className="h-10 w-10 text-white/40" aria-hidden="true" />
              </div>
            </div>
          ))}
        </div>
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
