import { AboutSection } from "@/components/AboutSection";
import { CollageHolder } from "@/components/CollageHolder";
import { Hero } from "@/components/Hero";
import { JoinTypeformSection } from "@/components/JoinTypeformSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <AboutSection />
      <CollageHolder />
      <JoinTypeformSection />
    </main>
  );
}
