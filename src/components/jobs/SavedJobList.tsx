import Image from "next/image";
import Link from "next/link";

// actions
import { fetchSavedJobsServerAction } from "@/actions/fetch-saved-jobs-server-action";

// types
import { Jobs, JobWithSavedStatusAndApplicationStatus } from "@/types/job";

// components
import ServerError from "@/components/errors/ServerError";
import JobCard from "@/components/shared/JobCard";

interface SavedJobListProps {
  userId: string;
}

export default async function SavedJobList({ userId }: SavedJobListProps) {
  let data: Jobs | null = null;

  // Fetch saved jobs
  try {
    data = await fetchSavedJobsServerAction(userId);
    if (!data) {
      console.error("❌ No data from fetchSavedJobsServerAction");
      return <ServerError />;
    }
  } catch (error) {
    console.error("❌ SavedJobList fetch failed:", error);
    return <ServerError />;
  }

  const { jobs: savedJobs } = data;

  if (savedJobs.length === 0) {
    return (
      <div
        role="status"
        aria-live="polite"
        aria-labelledby="no-saved-jobs-heading"
        className="w-full flex flex-col items-center justify-center border border-borderColor rounded px-4 py-16 sm:py-32 gap-8"
      >
        <Image
          src="/empty.svg"
          alt="Illustration indicating no saved jobs"
          height={150}
          width={150}
          priority
        />
        <div className="flex flex-col items-center justify-center gap-2">
          <h2 id="no-saved-jobs-heading" className="font-medium">
            You haven&apos;t saved to any jobs yet!
          </h2>
          <Link
            href="/jobs"
            className="text-primary font-medium underline"
            aria-label="Browse available jobs to save"
          >
            Browse jobs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <ul className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
      {savedJobs.map((job: JobWithSavedStatusAndApplicationStatus) => (
        <li key={job.id}>
          <JobCard job={job} />
        </li>
      ))}
    </ul>
  );
}
