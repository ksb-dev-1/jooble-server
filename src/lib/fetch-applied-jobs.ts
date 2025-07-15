import { unstable_cache } from "next/cache";

// lib
import { prisma } from "@/lib/prisma";

// types
import { Jobs } from "@/types/job";

type FetchAppliedJobsParams = {
  userId: string;
};

// 👉 Actual DB function (not cached directly)
const _fetchAppliedJobsFromDB = async ({ userId }: FetchAppliedJobsParams) => {
  // console.log("⛏️ Fetching Applied Jobs from DB");

  const applications = await prisma.jobApplication.findMany({
    where: {
      userId: userId,
    },
    include: {
      job: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  // Get list of saved job IDs for the user
  const savedJobIds = await prisma.savedJob.findMany({
    where: {
      userId: userId,
    },
    select: {
      jobId: true,
    },
  });

  const savedJobIdSet = new Set(savedJobIds.map((sj) => sj.jobId));

  const appliedJobs = applications.map((application) => ({
    ...application.job,
    isSaved: savedJobIdSet.has(application.job.id),
    applicationStatus: application.status,
  }));

  return {
    appliedJobs,
  };
};

// ✅ Helper to wrap the above with correct static tag per call
export const fetchAppliedJobs = async (
  userId: string
): Promise<Jobs | null> => {
  try {
    const cached = unstable_cache(
      () => _fetchAppliedJobsFromDB({ userId }),
      [`applied-jobs-user-${userId}`],
      {
        tags: [`applied-jobs-user-${userId}`],
        revalidate: 3600,
      }
    );

    const data = await cached();

    return {
      jobs: data.appliedJobs,
    };
  } catch (error) {
    console.error("❌ fetchAppliedJobsServerAction failed:", error);
    return null;
  }
};
