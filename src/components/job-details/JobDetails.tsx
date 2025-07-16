// lib
import { fetchJobDetails } from "@/lib/fetch-job-details";

// types
import { JobWithSavedStatusAndApplicationStatus } from "@/types/job";

// components
import NotFoundError from "../errors/NotFoundError";
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

  // Fetch job details
  try {
    data = await fetchJobDetails(userId, params.job_id);

    if (!data) {
      console.error("❌ No data from fetchJobDetails");
      return (
        <NotFoundError message="The requested job details are unavailable" />
      );
    }
  } catch (error) {
    console.error("❌ fetchJobDetails failed:", error);
    return <ServerError />;
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
