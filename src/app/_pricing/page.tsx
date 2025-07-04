import type { Metadata } from "next";

// components
import Container from "@/components/shared/Container";
import Breadcrumb from "@/components/shared/BreadCrumb";
import PricingPlans from "@/components/pricing/PricingPlans";

export const metadata: Metadata = {
  title: "Pricing",
};

const breadcrumbItems = [{ label: "Home", href: "/" }, { label: "Pricing" }];

export default function PricingPlansPage() {
  return (
    <Container>
      <Breadcrumb items={breadcrumbItems} className="mb-8" />
      <PricingPlans />
    </Container>
  );
}
