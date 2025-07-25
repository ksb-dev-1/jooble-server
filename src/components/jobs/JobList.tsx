import Image from "next/image";

// lib
import { fetchJobs } from "@/lib/fetch-jobs";

// types
import {
  JobFilterValues,
  JobsWithTotalPages,
  JobWithSavedStatusAndApplicationStatus,
} from "@/types/job";

// components
import ServerError from "@/components/errors/ServerError";
import JobCard from "@/components/shared/JobCard";
import Pagination from "./Pagination";
import ActiveFilters from "./ActiveFilters";

interface JobListProps {
  userId: string;
  filterValues: JobFilterValues;
}

const parseUnique = (str?: string): string[] => {
  return Array.from(
    new Set(
      (str || "")
        .split(",")
        .map((v) => v.trim().toLowerCase())
        .filter(Boolean)
    )
  );
};

export default async function JobList({ userId, filterValues }: JobListProps) {
  const currentPage = parseInt(filterValues.page || "1", 10);
  const limit = 8;

  let data: JobsWithTotalPages | null = null;

  // Fetch jobs
  try {
    data = await fetchJobs({
      userId,
      page: currentPage,
      limit,
      search: filterValues.search || undefined,
      jobType: filterValues.jobType || undefined,
      location: filterValues.location || undefined,
      jobMode: filterValues.jobMode || undefined,
    });

    if (!data) {
      console.error("❌ No data from fetchJobs");
      return <ServerError />;
    }
  } catch (error) {
    console.error("❌ JobList fetch failed:", error);
    return <ServerError />;
  }

  const { jobs, totalPages } = data;

  const cleanedFilterValues = {
    search: filterValues.search,
    location: parseUnique(filterValues.location).join(","),
    jobType: parseUnique(filterValues.jobType).join(","),
    jobMode: parseUnique(filterValues.jobMode).join(","),
  };

  const matchedValues = {
    location: new Set(jobs.map((job) => job.location.toLowerCase())),
    jobType: new Set(jobs.map((job) => job.jobType.toLowerCase())),
    jobMode: new Set(jobs.map((job) => job.jobMode.toLowerCase())),
  };

  if (jobs.length === 0) {
    return (
      <>
        <ActiveFilters
          search={cleanedFilterValues.search}
          jobType={cleanedFilterValues.jobType}
          location={cleanedFilterValues.location}
          jobMode={cleanedFilterValues.jobMode}
          matchedValues={matchedValues}
        />
        <div
          role="status"
          aria-live="polite"
          aria-labelledby="no-jobs-heading"
          className="w-full flex flex-col items-center justify-center border border-borderColor rounded px-4 py-16 sm:py-32 gap-8"
        >
          <Image
            src="/empty.svg"
            alt="No jobs found illustration"
            height={150}
            width={150}
            priority
          />
          <div className="flex flex-col items-center justify-center gap-2">
            <h2 id="no-jobs-heading" className="font-semibold text-xl">
              No jobs found!
            </h2>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <ActiveFilters
        search={cleanedFilterValues.search}
        jobType={cleanedFilterValues.jobType}
        location={cleanedFilterValues.location}
        jobMode={cleanedFilterValues.jobMode}
        matchedValues={matchedValues}
      />

      <section
        className="w-full flex flex-col"
        aria-labelledby="job-list-section-heading"
      >
        <h2 id="job-list-section-heading" className="sr-only">
          Job listings
        </h2>

        <ul className="w-full grid md:grid-cols-2 gap-4 sm:gap-8">
          {jobs.map((job: JobWithSavedStatusAndApplicationStatus) => (
            <li key={job.id}>
              <JobCard job={job} />
            </li>
          ))}
        </ul>

        {totalPages > 1 && (
          <nav
            role="navigation"
            aria-label="Pagination navigation"
            className="w-full mt-16"
          >
            <Pagination currentPage={currentPage} totalPages={totalPages} />
          </nav>
        )}
      </section>
    </>
  );
}
