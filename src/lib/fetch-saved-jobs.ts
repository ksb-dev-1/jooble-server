import { unstable_cache } from "next/cache";

// lib
import { prisma } from "@/lib/prisma";

// types
import { Jobs } from "@/types/job";

type FetchSavedJobsParams = {
  userId: string;
};

// 👉 Actual DB function (not cached directly)
const _fetchSavedJobsFromDB = async ({ userId }: FetchSavedJobsParams) => {
  // console.log("⛏️ Fetching Saved Jobs from DB");

  const savedJobs = await prisma.savedJob.findMany({
    where: { userId },
    include: {
      job: {
        include: {
          applications: {
            where: { userId },
          },
        },
      },
    },
    orderBy: { createdAt: "asc" },
  });

  const mappedJobs = savedJobs.map((savedJob) => ({
    ...savedJob.job,
    isSaved: true,
    applicationStatus: savedJob.job.applications[0]?.status || null,
  }));

  return {
    savedJobs: mappedJobs,
  };
};

// ✅ Helper to wrap the above with correct static tag per call
export const fetchSavedJobs = async (userId: string): Promise<Jobs | null> => {
  try {
    const cached = unstable_cache(
      () => _fetchSavedJobsFromDB({ userId }),
      [`saved-jobs-user-${userId}`],
      {
        tags: [`saved-jobs-user-${userId}`],
        revalidate: 3600,
      }
    );

    const data = await cached();

    return {
      jobs: data.savedJobs,
    };
  } catch (error) {
    console.error("❌ fetchSavedJobsServerAction failed:", error);
    return null;
  }
};
