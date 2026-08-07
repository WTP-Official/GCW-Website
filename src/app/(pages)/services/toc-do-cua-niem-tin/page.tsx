import type { Metadata } from "next";
import content from "./content.json";
import { ServiceDetail } from "../_components/ServiceDetail";

export const metadata: Metadata = {
  title: content.title,
  description: content.metaDescription,
};

export default function GcwControlPage() {
  return <ServiceDetail content={content} />;
}
