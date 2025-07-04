import Image from "next/image";

// actions
import { fetchAppliedJobsServerAction } from "@/actions/fetch-applied-jobs-server-action";

// types
import { JobWithSavedStatusAndApplicationStatus } from "@/types/job";

// components
import ServerError from "@/components/errors/ServerError";
import JobCard from "@/components/shared/JobCard";

interface AppliedJobListProps {
  userId: string;
}

export default async function AppliedJobList({ userId }: AppliedJobListProps) {
  const data = await fetchAppliedJobsServerAction(userId);
  if (!data || "error" in data) return <ServerError />;

  const { appliedJobs } = data;

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
          <h2 id="no-applied-jobs-heading" className="sm:text-xl font-medium">
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
