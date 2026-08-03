import type { Metadata } from "next";
import { CalendarCheck } from "lucide-react";
import content from "./content.json";
import { FeaturedCatalogGrid } from "@/components/FeaturedCatalogGrid";

export const metadata: Metadata = {
  title: content.title,
  description: content.metaDescription,
};

export default function PlannersPage() {
  return (
    <FeaturedCatalogGrid
      icon={CalendarCheck}
      content={content}
      backHref="/tai-nguyen"
      backLabel="Quay lại Tài nguyên"
      basePath="/tai-nguyen/ke-hoach-mau"
    />
  );
}
