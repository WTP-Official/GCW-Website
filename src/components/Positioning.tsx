import Link from "next/link";
import { ArrowRight } from "lucide-react";
import content from "../app/content.json";

export function Positioning() {
  const { positioning } = content;

  return (
    <section className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h2 className="text-2xl leading-snug text-ink sm:text-3xl">
        {positioning.heading}
      </h2>
      <p className="mt-4 text-ink-soft">{positioning.body}</p>
      <Link
        href={positioning.linkHref}
        className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700"
      >
        {positioning.linkLabel}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </section>
  );
}
