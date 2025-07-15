import Image from "next/image";

// lib
import { fetchAppliedJobs } from "@/lib/fetch-applied-jobs";

// types

import { Jobs, JobWithSavedStatusAndApplicationStatus } from "@/types/job";

// components
import ServerError from "@/components/errors/ServerError";
import JobCard from "@/components/shared/JobCard";

interface AppliedJobListProps {
  userId: string;
}

export default async function AppliedJobList({ userId }: AppliedJobListProps) {
  let data: Jobs | null = null;

  // Fetch applied jobs
  try {
    data = await fetchAppliedJobs(userId);

    if (!data) {
      console.error("❌ No data from fetchAppliedJobs");
      return <ServerError />;
    }
  } catch (error) {
    console.error("❌ AppliedJobList fetch failed:", error);
    return <ServerError />;
  }

  const { jobs: appliedJobs } = data;

  if (appliedJobs.length === 0) {
    return (
      <div
        role="status"
        aria-live="polite"
        aria-labelledby="no-applied-jobs-heading"
        className="w-full flex flex-col items-center justify-center border border-borderColor rounded px-4 py-16 sm:py-32 gap-8"
      >
        <Image
          src="/empty.svg"
          alt="Illustration indicating no applied jobs"
          height={150}
          width={150}
          priority
        />
        <div className="flex flex-col items-center justify-center gap-2">
          <h2 id="no-applied-jobs-heading" className="font-medium text-lg">
            You haven&apos;t applied to any jobs yet!
          </h2>
        </div>
      </div>
    );
  }

  return (
    <ul className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
      {appliedJobs.map((job: JobWithSavedStatusAndApplicationStatus) => (
        <li key={job.id}>
          <JobCard job={job} />
        </li>
      ))}
    </ul>
  );
}
