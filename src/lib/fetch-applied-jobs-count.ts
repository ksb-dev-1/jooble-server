import { unstable_cache } from "next/cache";

// lib
import { prisma } from "@/lib/prisma";

// 👉 Actual DB function (not cached directly)
const _fetchAppliedJobsCountFromDB = async ({ userId }: { userId: string }) => {
  //console.log("⛏️ Fetching Saved Jobs count from DB");

  const count = await prisma.jobApplication.count({
    where: { userId },
  });

  return count;
};

// ✅ Helper to wrap the above with correct static tag per call
export const fetchAppliedJobsCount = async (
  userId: string
): Promise<number | null> => {
  try {
    const cached = unstable_cache(
      () => _fetchAppliedJobsCountFromDB({ userId }),
      [`applied-jobs-count-user-${userId}`],
      {
        tags: [`applied-jobs-count-user-${userId}`],
        revalidate: 3600,
      }
    );

    return await cached();
  } catch (error) {
    console.error("❌ fetchAppliedJobsCountServerAction failed:", error);
    return null;
  }
};
