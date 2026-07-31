import type { Metadata } from "next";
import { ClipboardList } from "lucide-react";
import content from "./content.json";
import tools from "@/app/_data/tai-nguyen-cam-nang-tools.json";
import items from "@/app/_data/tai-nguyen-cam-nang-items.json";
import { FeaturedAccordionList } from "@/components/FeaturedAccordionList";
import { groupByCategory } from "@/lib/groupByCategory";

export const metadata: Metadata = {
  title: content.title,
  description: content.metaDescription,
};

const PILLARS = ["Tuân thủ lao động", "Vận hành nhân sự", "Chiến lược & tổ chức"];

export default function GuidesPage() {
  const categories = groupByCategory(items, PILLARS);

  return (
    <FeaturedAccordionList
      icon={<ClipboardList className="mx-auto h-8 w-8 text-white/60" aria-hidden="true" />}
      content={{ ...content, tools, categories }}
      backHref="/tai-nguyen"
      backLabel="Quay lại Tài nguyên"
    />
  );
}
