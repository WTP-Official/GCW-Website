import type { Metadata } from "next";
import { BookOpen } from "lucide-react";
import content from "./content.json";
import { FeaturedCatalogGrid } from "@/components/FeaturedCatalogGrid";

export const metadata: Metadata = {
  title: content.title,
  description: content.metaDescription,
};

export default function BooksPage() {
  return (
    <FeaturedCatalogGrid
      icon={BookOpen}
      content={content}
      backHref="/tai-nguyen"
      backLabel="Quay lại Tài nguyên"
    />
  );
}
