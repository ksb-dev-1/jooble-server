import JobCardSkeleton from "@/components/skeletons/JobCardSkeleton";

export default function JobDetailsSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading job details">
      {/* Job summary card */}
      <JobCardSkeleton />

      {/* Apply button placeholder */}
      <div className="mt-4">
        <span
          className="skeleton px-4 py-2 w-full inline-block rounded"
          aria-hidden="true"
        >
          Apply Now
        </span>
      </div>

      {/* Description, Responsibilities, Requirements */}
      {["About Company", "Responsibilities", "Qualifications"].map(
        (section, index) => (
          <section className="mt-8" key={index} aria-hidden="true">
            <p className="skeleton rounded w-24 h-6"></p>
            <p className="mt-2 skeleton rounded w-full h-6"></p>
            <p className="mt-2 skeleton rounded w-full h-6"></p>
            <p className="mt-2 skeleton rounded w-full h-6"></p>
          </section>
        )
      )}
    </div>
  );
}
