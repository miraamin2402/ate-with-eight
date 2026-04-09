import { AboutSection } from "@/components/AboutSection";
import { CollageHolder } from "@/components/CollageHolder";
import { Hero } from "@/components/Hero";
import { StepForm } from "@/components/StepForm";

export default function Home() {
  return (
    <main>
      <Hero />
      <AboutSection />
      <CollageHolder />
      <StepForm sectionTitle="come join us for a bite" />
    </main>
  );
}
