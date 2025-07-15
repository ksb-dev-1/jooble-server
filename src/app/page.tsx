// components
import Heading from "@/components/home/Heading";
import FeatureSection from "@/components/home/FeatureSection";
import FAQs from "@/components/home/FAQs";
import FloatingIcons from "@/components/home/FloatingIcons";

export default function HomePage() {
  return (
    <div>
      <div className="relative h-[calc(100vh-64px)] mt-16 overflow-hidden">
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
