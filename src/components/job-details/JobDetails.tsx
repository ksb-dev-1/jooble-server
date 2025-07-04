import { fetchJobDetailsServerAction } from "@/actions/fetch-job-details-server-action";

// components
import UnauthorizedError from "@/components/errors/UnauthorizedError";
import ServerError from "@/components/errors/ServerError";
import JobCard from "@/components/shared/JobCard";
import Markdown from "@/components/Markdown";
import ApplyNowTrigger from "@/components/job-details/ApplyNowTrigger";

interface JobDetailsProps {
  params: {
    job_id: string;
  };
  userId: string;
}

export default async function JobDetails({ params, userId }: JobDetailsProps) {
  const data = await fetchJobDetailsServerAction(userId, params.job_id);

  if (!data || "error" in data) {
    if (data?.error === "Missing userId") return <UnauthorizedError />;
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
