// components
import Heading from "@/components/home/Heading";
//import FloatingIcons from "@/components/home/FloatingIcons";
import FeatureSection from "@/components/home/FeatureSection";
import FAQs from "@/components/home/FAQs";

export default async function Home() {
  return (
    <div className="min-h-[calc(100vh-56px)]">
      <div className="relative h-screen overflow-hidden">
        <Heading />
        {/* <FloatingIcons /> */}
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
