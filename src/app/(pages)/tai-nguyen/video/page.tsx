import type { Metadata } from "next";
import { Video } from "lucide-react";
import content from "./content.json";
import { FeaturedAccordionList } from "@/components/FeaturedAccordionList";
import { groupByCategory } from "@/lib/groupByCategory";

export const metadata: Metadata = {
  title: content.title,
  description: content.metaDescription,
};

const PILLARS = ["Tuân thủ lao động", "Vận hành nhân sự", "Chiến lược & tổ chức"];

type Item = {
  id: string;
  category: string;
  title: string;
  description: string;
  image?: string;
  videoUrl?: string;
};

export default function VideosPage() {
  const items = (content.items as Item[]).map((item) => ({
    ...item,
    actionLabel: item.videoUrl ? "Xem video" : undefined,
    actionHref: item.videoUrl,
  }));
  const categories = groupByCategory(items, PILLARS);

  return (
    <FeaturedAccordionList
      icon={<Video className="mx-auto h-8 w-8 text-white/60" aria-hidden="true" />}
      content={{ ...content, categories }}
      backHref="/tai-nguyen"
      backLabel="Quay lại Tài nguyên"
    />
  );
}
