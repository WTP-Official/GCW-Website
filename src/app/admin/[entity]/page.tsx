import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getEntity } from "../lib/entities";
import { EntityManager } from "./components/EntityManager";
import { SingletonEntityForm } from "./components/SingletonEntityForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ entity: string }>;
}): Promise<Metadata> {
  const { entity: slug } = await params;
  const entity = getEntity(slug);
  return {
    title: entity ? `${entity.label} | Quản lý nội dung` : "Không tìm thấy",
    robots: { index: false, follow: false },
  };
}

export default async function EntityAdminPage({
  params,
}: {
  params: Promise<{ entity: string }>;
}) {
  const { entity: slug } = await params;
  const entity = getEntity(slug);
  if (!entity) notFound();

  return (
    <main className="flex flex-col w-full items-center px-4 py-16">
      <Link
        href="/admin"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Quay lại danh sách
      </Link>
      <h1 className="mt-4 text-2xl text-ink">{entity.label}</h1>
      <p className="mt-2 text-sm text-ink-soft">
        Hiển thị tại{" "}
        <Link
          href={entity.publicHref}
          target="_blank"
          className="font-medium text-brand-600 hover:text-brand-700"
        >
          {entity.publicHref}
        </Link>
      </p>

      <div className="mt-10">
        {entity.mode === "singleton" ? (
          <SingletonEntityForm slug={entity.slug} fields={entity.fields} />
        ) : (
          <EntityManager slug={entity.slug} fields={entity.fields} />
        )}
      </div>
    </main>
  );
}
