import Image from "next/image";

// lib
import { fetchJobDetails } from "@/lib/fetch-job-details";

// types
import { JobWithSavedStatusAndApplicationStatus } from "@/types/job";

// components
import ServerError from "@/components/errors/ServerError";
import JobCard from "@/components/shared/JobCard";
import Markdown from "./Markdown";
import ApplyNowTrigger from "./ApplyNowTrigger";

interface JobDetailsProps {
  params: {
    job_id: string;
  };
  userId: string;
}

export default async function JobDetails({ params, userId }: JobDetailsProps) {
  let data: JobWithSavedStatusAndApplicationStatus | null = null;

  // Fetch applied jobs
  try {
    data = await fetchJobDetails(userId, params.job_id);

    if (!data) {
      console.error("❌ No data from fetchJobDetails");
      return <ServerError />;
    }
  } catch (error) {
    console.error("❌ JobDetails fetch failed:", error);
    return <ServerError />;
  }

  if (!data) {
    return (
      <div
        role="status"
        aria-live="polite"
        aria-labelledby="no-jobs-heading"
        className="w-full flex flex-col items-center justify-center border border-borderColor rounded px-4 py-16 sm:py-32 gap-8"
      >
        <Image
          src="/empty.svg"
          alt="No job details found illustration"
          height={150}
          width={150}
          priority
        />
        <div className="flex flex-col items-center justify-center gap-2">
          <h2 id="no-jobs-heading" className="font-semibold text-xl">
            No job details found!
          </h2>
        </div>
      </div>
    );
  }

  const { id, description, applicationStatus } = data;

  return (
    <article
      aria-labelledby="job-detail-heading"
      className="w-full flex flex-col"
    >
      <header>
        <h2 id="job-detail-heading" className="sr-only">
          Job Overview
        </h2>
        <JobCard
          key={id}
          job={data}
          link="#"
          pointerEventsClass="pointer-events-none"
        />
      </header>

      <ApplyNowTrigger
        userId={userId}
        jobId={id}
        applicationStatus={applicationStatus}
      />

      {description && (
        <section aria-labelledby="job-description-heading" className="mt-8">
          <h3 id="job-description-heading" className="sr-only">
            Job Description
          </h3>
          <Markdown>{description}</Markdown>
        </section>
      )}
    </article>
  );
}
