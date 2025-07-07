import { fetchJobDetailsServerAction } from "@/actions/fetch-job-details-server-action";

// components
import ServerError from "@/components/errors/ServerError";
import JobCard from "@/components/shared/JobCard";
import Markdown from "@/components/job-details/Markdown";
import ApplyNowTrigger from "@/components/job-details/ApplyNowTrigger";
import { JobWithSavedStatusAndApplicationStatus } from "@/types/job";

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
    data = await fetchJobDetailsServerAction(userId, params.job_id);

    if (!data) {
      console.error("❌ No data from fetchJobDetailsServerAction");
      return <ServerError />;
    }
  } catch (error) {
    console.error("❌ JobDetails fetch failed:", error);
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
