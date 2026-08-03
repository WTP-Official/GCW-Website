import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Presentation } from "lucide-react";
import content from "../content.json";
import { ItemDetail } from "@/components/ItemDetail";

type Item = {
  id: string;
  title: string;
  description: string;
  meta: string;
  image?: string;
  body?: string;
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

export default async function ConferenceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = itemList.find((i) => i.id === slug);
  if (!item) notFound();

  return (
    <ItemDetail
      icon={Presentation}
      eyebrow={item.meta}
      heading={item.title}
      image={item.image}
      body={item.body || item.description}
      backHref="/su-kien/hoi-nghi"
      backLabel="Quay lại danh sách"
      cta={content.cta}
    />
  );
}
