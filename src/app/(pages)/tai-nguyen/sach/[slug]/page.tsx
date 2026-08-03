import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BookOpen } from "lucide-react";
import content from "../content.json";
import { ItemDetail } from "@/components/ItemDetail";

type Item = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  image?: string;
  body?: string;
  downloadUrl?: string;
};

const itemList = content.items as Item[];

export function generateStaticParams() {
  return itemList.map((item) => ({ slug: item.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = itemList.find((i) => i.id === slug);
  if (!item) return {};
  return { title: item.title, description: item.description };
}

export default async function BookDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = itemList.find((i) => i.id === slug);
  if (!item) notFound();

  return (
    <ItemDetail
      icon={BookOpen}
      eyebrow={item.eyebrow}
      heading={item.title}
      image={item.image}
      body={item.body || item.description}
      primaryAction={item.downloadUrl ? { label: "Tải ấn phẩm", href: item.downloadUrl } : undefined}
      backHref="/tai-nguyen/sach"
      backLabel="Quay lại danh sách"
      cta={content.cta}
    />
  );
}
