import { Hero } from "../components/Hero";
import { ValueProps } from "../components/ValueProps";
import { Stats } from "../components/Stats";
import { Positioning } from "../components/Positioning";
import { EngagementModels } from "../components/EngagementModels";
import { CaseStudies } from "../components/CaseStudies";
import { FinalCta } from "../components/FinalCta";

export default function Home() {
  return (
    <main>
      <Hero />
      <ValueProps />
      <Stats />
      <Positioning />
      <EngagementModels />
      <CaseStudies />
      <FinalCta />
    </main>
  );
}
