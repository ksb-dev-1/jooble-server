"use server";

import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";

type FetchJobDetailsParams = {
  userId: string;
  jobId: string;
};

// 👉 Raw DB query function (not cached directly)
const _fetchJobDetails = async ({ userId, jobId }: FetchJobDetailsParams) => {
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
export const fetchJobDetailsServerAction = async (
  userId: string,
  jobId: string
) => {
  const cached = unstable_cache(
    () => _fetchJobDetails({ userId, jobId }),
    [`job-details-${userId}-${jobId}`],
    {
      tags: [`job-details-${userId}-${jobId}`],
      revalidate: 3600,
    }
  );

  return cached();
};
