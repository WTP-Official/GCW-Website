import type { Metadata } from "next";
import { PlayCircle } from "lucide-react";
import content from "./content.json";
import { FeaturedAccordionList } from "@/components/FeaturedAccordionList";
import { groupByCategory } from "@/lib/groupByCategory";

export const metadata: Metadata = {
  title: content.title,
  description: content.metaDescription,
};

const PILLARS = ["Phát triển lãnh đạo", "Xây dựng văn hoá tin cậy", "Tạo kết quả đột phá"];

type Item = {
  id: string;
  category: string;
  title: string;
  description: string;
  image?: string;
  recordingUrl?: string;
};

export default function OnDemandWebcastsPage() {
  const items = (content.items as Item[]).map((item) => ({
    ...item,
    actionLabel: item.recordingUrl ? "Xem lại" : undefined,
    actionHref: item.recordingUrl,
  }));
  const categories = groupByCategory(items, PILLARS);

  return (
    <FeaturedAccordionList
      icon={<PlayCircle className="mx-auto h-8 w-8 text-white/60" aria-hidden="true" />}
      content={{ ...content, categories }}
      backHref="/tai-nguyen"
      backLabel="Quay lại Tài nguyên"
      itemStyle="list"
    />
  );
}
