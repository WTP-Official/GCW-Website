import type { Metadata } from "next";
import { PlayCircle } from "lucide-react";
import content from "./content.json";
import items from "@/app/_data/tai-nguyen-hoi-thao-luu-tru-items.json";
import { FeaturedAccordionList } from "@/components/FeaturedAccordionList";
import { groupByCategory } from "@/lib/groupByCategory";

export const metadata: Metadata = {
  title: content.title,
  description: content.metaDescription,
};

const PILLARS = ["Tuân thủ lao động", "Vận hành nhân sự", "Chiến lược & tổ chức"];

export default function OnDemandWebcastsPage() {
  const categories = groupByCategory(items, PILLARS);

  return (
    <FeaturedAccordionList
      icon={<PlayCircle className="mx-auto h-8 w-8 text-white/60" aria-hidden="true" />}
      content={{ ...content, categories }}
      backHref="/tai-nguyen"
      backLabel="Quay lại Tài nguyên"
    />
  );
}
