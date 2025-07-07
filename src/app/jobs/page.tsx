import type { Metadata } from "next";
import { redirect } from "next/navigation";

// lib
import { getUserSession } from "@/lib/getUserSession";

// components
import Container from "@/components/shared/Container";
import Breadcrumb from "@/components/shared/BreadCrumb";
import JobFilters from "@/components/jobs/JobFilters";
import JobList from "@/components/jobs/JobList";

export const metadata: Metadata = {
  title: "Jobs",
  description:
    "Explore job listings by title, city, and job type. Apply instantly to opportunities that match your profile.",
};

interface JobFilterValues {
  page: string;
  jobType?: string;
  location?: string;
  jobMode?: string;
  search?: string;
}

interface JobsPageProps {
  searchParams: JobFilterValues;
}

const breadcrumbItems = [
  { label: "Home", href: "/", ariaLabel: "Go to home page" },
  { label: "Jobs" },
];

export default async function JobsPage({ searchParams }: JobsPageProps) {
  const { userId } = await getUserSession();

  if (!userId) redirect("/sign-in");

  const filterValues = {
    page: searchParams.page || "1",
    location: searchParams.location,
    jobType: searchParams.jobType,
    jobMode: searchParams.jobMode,
    search: searchParams.search,
  };

  return (
    <Container>
      <nav aria-label="Breadcrumb" className="mb-8">
        <Breadcrumb items={breadcrumbItems} />
      </nav>

      <main className="w-full flex items-start md:gap-8" role="main">
        <aside
          className="hidden md:block"
          aria-labelledby="job-filters-heading"
        >
          <h2 id="job-filters-heading" className="sr-only">
            Filter jobs by type, location, and mode
          </h2>
          <JobFilters
            currentSearch={searchParams.search}
            currentJobType={searchParams.jobType}
            currentLocation={searchParams.location}
            currentJobMode={searchParams.jobMode}
          />
        </aside>

        <section className="w-full" aria-labelledby="job-results-heading">
          <h2 id="job-results-heading" className="sr-only">
            Job Results
          </h2>
          <JobList userId={userId} filterValues={filterValues} />
        </section>
      </main>
    </Container>
  );
}
