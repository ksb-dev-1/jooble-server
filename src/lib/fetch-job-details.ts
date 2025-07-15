import { unstable_cache } from "next/cache";

// lib
import { prisma } from "@/lib/prisma";

// types
import { JobWithSavedStatusAndApplicationStatus } from "@/types/job";

type FetchJobDetailsParams = {
  userId: string;
  jobId: string;
};

// 👉 Raw DB query function (not cached directly)
const _fetchJobDetailsFromDB = async ({
  userId,
  jobId,
}: FetchJobDetailsParams) => {
  //console.log("⛏️ Fetching Job Details from DB");

  const job = await prisma.job.findUnique({
    where: { id: jobId },
    include: {
      savedByUsers: {
        where: { userId },
        select: { id: true },
      },
      applications: {
        where: { userId },
        select: { status: true },
      },
    },
  });

  if (!job) return null;

  const isSaved = job.savedByUsers.length > 0;
  const applicationStatus = job.applications[0]?.status || null;

  return {
    ...job,
    isSaved,
    applicationStatus,
  };
};

// ✅ Cached wrapper per userId + jobId
export const fetchJobDetails = async (
  userId: string,
  jobId: string
): Promise<JobWithSavedStatusAndApplicationStatus | null> => {
  try {
    const cached = unstable_cache(
      () => _fetchJobDetailsFromDB({ userId, jobId }),
      [`job-details-${userId}-${jobId}`],
      {
        tags: [`job-details-${userId}-${jobId}`],
        revalidate: 3600,
      }
    );

    return cached();
  } catch (error) {
    console.error("❌ fetchAppliedJobsServerAction failed:", error);
    return null;
  }
};
