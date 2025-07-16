import { Metadata } from "next";
import { redirect } from "next/navigation";

// lib
import { getUserSession } from "@/lib/getUserSession";

// components
import Container from "@/components/shared/Container";
import Breadcrumb from "@/components/shared/BreadCrumb";
import JobDetails from "@/components/job-details/JobDetails";

export const metadata: Metadata = {
  title: "Job Details",
  description: "View full job description and details before applying.",
};

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Jobs", href: "/jobs" },
  { label: "Details" },
];

export default async function JobDetailsPage({
  params,
}: {
  params: { job_id: string };
}) {
  const { userId } = await getUserSession();

  if (!userId) redirect("/sign-in");

  return (
    <Container>
      <nav aria-label="Breadcrumb" className="mb-8">
        <Breadcrumb items={breadcrumbItems} />
      </nav>

      <main className="w-full" role="main">
        <h1 id="job-details-heading" className="sr-only">
          Job Details
        </h1>

        <JobDetails params={params} userId={userId} />
      </main>
    </Container>
  );
}
