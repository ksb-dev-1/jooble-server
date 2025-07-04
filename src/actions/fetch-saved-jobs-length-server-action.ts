"use server";

import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";

type FetchSavedJobsLengthParams = {
  userId: string;
};

// 👉 Actual DB function (not cached directly)
const _fetchSavedJobsLength = async ({
  userId,
}: FetchSavedJobsLengthParams) => {
  //console.log("⛏️ Fetching Saved Jobs count from DB");

  const count = await prisma.savedJob.count({
    where: { userId },
  });

  return count;
};

// ✅ Helper to wrap the above with correct static tag per call
export const fetchSavedJobsLengthServerAction = async (userId: string) => {
  const cached = unstable_cache(
    () => _fetchSavedJobsLength({ userId }),
    [`saved-jobs-length-user-${userId}`],
    {
      tags: [`saved-jobs-length-user-${userId}`],
      revalidate: 3600,
    }
  );

  return cached();
};
