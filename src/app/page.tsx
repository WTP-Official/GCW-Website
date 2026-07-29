import { Hero } from "./_components/Hero";
import { ValueProps } from "./_components/ValueProps";
import { Stats } from "./_components/Stats";
import { Positioning } from "./_components/Positioning";
import { Offerings } from "./_components/Offerings";
import { Audiences } from "./_components/Audiences";
import { Differentiators } from "./_components/Differentiators";
import { FinalCta } from "./_components/FinalCta";

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
      <FinalCta />
    </main>
  );
}
