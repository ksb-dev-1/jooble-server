import { unstable_cache } from "next/cache";

// lib
import { prisma } from "@/lib/prisma";

// 👉 Actual DB function (not cached directly)
const _fetchSavedJobsCountFromDB = async ({ userId }: { userId: string }) => {
  //console.log("⛏️ Fetching Saved Jobs count from DB");

  const count = await prisma.savedJob.count({
    where: { userId },
  });

  return count;
};

// ✅ Helper to wrap the above with correct static tag per call
export const fetchSavedJobsCount = async (
  userId: string
): Promise<number | null> => {
  try {
    const cached = unstable_cache(
      () => _fetchSavedJobsCountFromDB({ userId }),
      [`saved-jobs-count-user-${userId}`],
      {
        tags: [`saved-jobs-count-user-${userId}`],
        revalidate: 3600,
      }
    );

    return cached();
  } catch (error) {
    console.error("❌ fetchSavedJobsCountServerAction failed:", error);
    return null;
  }
};
