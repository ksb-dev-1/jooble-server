"use server";

import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";

type FetchSavedJobsParams = {
  userId: string;
};

// 👉 Actual DB function (not cached directly)
const _fetchSavedJobs = async ({ userId }: FetchSavedJobsParams) => {
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
export const fetchSavedJobsServerAction = async (userId: string) => {
  const cached = unstable_cache(
    () => _fetchSavedJobs({ userId }),
    [`saved-jobs-user-${userId}`], // static key array
    {
      tags: [`saved-jobs-user-${userId}`],
      revalidate: 3600,
    }
  );

  return cached(); // <-- invoke cached function
};
