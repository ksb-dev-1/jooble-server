import JobCardSkeleton from "@/components/skeletons/JobCardSkeleton";

interface JobListSkeletonProps {
  gridClass?: string;
}

export default function JobListSkeleton({
  gridClass = "",
}: JobListSkeletonProps) {
  return (
    <div
      className={`w-full grid ${gridClass} gap-8`}
      role="status"
      aria-label="Loading job list"
      aria-busy="true"
    >
      {Array.from({ length: 8 }).map((_, index) => (
        <JobCardSkeleton key={index} />
      ))}
    </div>
  );
}
