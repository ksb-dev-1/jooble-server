// components
import Heading from "@/components/Heading";
import FloatingIcons from "@/components/FloatingIcons";
import FeatureSection from "@/components/FeatureSection";
import FAQs from "@/components/FAQs";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-56px)]">
      <div className="relative h-screen overflow-hidden">
        <Heading />
        <FloatingIcons />
      </div>
      <div className="border-y py-16">
        <FeatureSection />
      </div>
      <div className="py-16">
        <FAQs />
      </div>
    </div>
  );
}
