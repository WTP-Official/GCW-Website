import type { Metadata } from "next";
import content from "./content.json";
import { PillarDetail } from "../_components/PillarDetail";

export const metadata: Metadata = {
  title: content.title,
  description: content.metaDescription,
};

export default function CulturePillarPage() {
  return <PillarDetail content={content} />;
}
