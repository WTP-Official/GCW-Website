import type { Metadata } from "next";
import { ClipboardList } from "lucide-react";
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
  fileUrl?: string;
};

export default function GuidesPage() {
  const items = (content.items as Item[]).map((item) => ({
    ...item,
    actionLabel: item.fileUrl ? "Tải checklist" : undefined,
    actionHref: item.fileUrl,
  }));
  const categories = groupByCategory(items, PILLARS);

  return (
    <FeaturedAccordionList
      icon={<ClipboardList className="mx-auto h-8 w-8 text-white/60" aria-hidden="true" />}
      content={{ ...content, categories }}
      backHref="/tai-nguyen"
      backLabel="Quay lại Tài nguyên"
    />
  );
}
