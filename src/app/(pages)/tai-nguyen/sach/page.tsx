import type { Metadata } from "next";
import { BookOpen } from "lucide-react";
import content from "./content.json";
import items from "@/app/_data/tai-nguyen-sach.json";
import { FeaturedCatalogGrid } from "@/components/FeaturedCatalogGrid";

export const metadata: Metadata = {
  title: content.title,
  description: content.metaDescription,
};

export default function BooksPage() {
  return (
    <FeaturedCatalogGrid
      icon={BookOpen}
      content={{ ...content, items }}
      backHref="/tai-nguyen"
      backLabel="Quay lại Tài nguyên"
    />
  );
}
