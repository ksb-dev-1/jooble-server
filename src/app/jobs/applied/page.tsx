import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";

// lib
import { getUserSession } from "@/lib/getUserSession";

// components
import Container from "@/components/shared/Container";
import Breadcrumb from "@/components/shared/BreadCrumb";
import JobListSkeleton from "@/components/skeletons/JobListSkeleton";
import AppliedJobList from "@/components/jobs/AppliedJobList";

export const metadata: Metadata = {
  title: "Applied Jobs",
  description:
    "View the jobs you've applied for and track your application status in one place.",
};

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Jobs", href: "/jobs" },
  { label: "Applied" },
];

export default async function AppliedJobsPage() {
  const { userId } = await getUserSession();

  if (!userId) redirect("/sign-in");

  return (
    <Container>
      <nav aria-label="Breadcrumb" className="mb-8">
        <Breadcrumb items={breadcrumbItems} />
      </nav>

      <main
        className="w-full flex flex-col"
        role="main"
        aria-labelledby="applied-job-list-heading"
      >
        <section
          className="w-full"
          aria-labelledby="applied-job-results-heading"
        >
          <h2 id="applied-job-results-heading" className="sr-only">
            Applied Jobs
          </h2>

          <Suspense fallback={<JobListSkeleton gridClass="md:grid-cols-2" />}>
            <AppliedJobList userId={userId} />
          </Suspense>
        </section>
      </main>
    </Container>
  );
}
