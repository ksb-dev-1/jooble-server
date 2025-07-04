"use server";

import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";

type FetchAppliedJobsParams = {
  userId: string;
};

// 👉 Actual DB function (not cached directly)
const _fetchAppliedJobs = async ({ userId }: FetchAppliedJobsParams) => {
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
export const fetchAppliedJobsServerAction = async (userId: string) => {
  const cached = unstable_cache(
    () => _fetchAppliedJobs({ userId }),
    [`applied-jobs-user-${userId}`], // static key array
    {
      tags: [`applied-jobs-user-${userId}`],
      revalidate: 3600,
    }
  );

  return cached(); // <-- invoke cached function
};
