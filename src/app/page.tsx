import { Hero } from "../components/Hero";
import { ValueProps } from "../components/ValueProps";
import { Stats } from "../components/Stats";
import { Positioning } from "../components/Positioning";
import { Offerings } from "../components/Offerings";
import { Audiences } from "../components/Audiences";
import { Differentiators } from "../components/Differentiators";
import { CaseStudies } from "../components/CaseStudies";
import { FinalCta } from "../components/FinalCta";

export default function Home() {
  return (
    <main>
      <Hero />
      <ValueProps />
      <Stats />
      <Positioning />
      <Offerings />
      <Audiences />
      <Differentiators />
      <CaseStudies />
      <FinalCta />
    </main>
  );
}
