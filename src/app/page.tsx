// components
import Heading from "@/components/home/Heading";
import FeatureSection from "@/components/home/FeatureSection";
import FAQs from "@/components/home/FAQs";
import FloatingIcons from "@/components/home/FloatingIcons";

export default function HomePage() {
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
