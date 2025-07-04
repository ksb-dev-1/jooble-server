"use server";

import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";

type FetchAppliedJobsLengthParams = {
  userId: string;
};

// 👉 Actual DB function (not cached directly)
const _fetchAppliedJobsLength = async ({
  userId,
}: FetchAppliedJobsLengthParams) => {
  //console.log("⛏️ Fetching Saved Jobs count from DB");

  const count = await prisma.jobApplication.count({
    where: { userId },
  });

  return count;
};

// ✅ Helper to wrap the above with correct static tag per call
export const fetchAppliedJobsLengthServerAction = async (userId: string) => {
  const cached = unstable_cache(
    () => _fetchAppliedJobsLength({ userId }),
    [`applied-jobs-length-user-${userId}`],
    {
      tags: [`applied-jobs-length-user-${userId}`],
      revalidate: 3600,
    }
  );

  return cached();
};
