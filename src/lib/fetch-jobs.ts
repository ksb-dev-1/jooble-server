import { unstable_cache } from "next/cache";
import { Prisma } from "@prisma/client";

// lib
import { prisma } from "@/lib/prisma";

// types
import { JobsWithTotalPages } from "@/types/job";

type BaseParams = {
  location?: string;
  jobType?: string;
  jobMode?: string;
  page?: number;
  limit?: number;
  search?: string;
};

type FetchJobsParams = BaseParams & {
  userId: string;
};

const _fetchPublicJobsFromDB = async ({
  location,
  jobType,
  jobMode,
  page = 1,
  limit = 5,
  search,
}: BaseParams) => {
  // console.log("⛏️ Fetching Jobs from DB");
  const skip = (page - 1) * limit;

  const jobTypes = jobType?.split(",").filter((j) => j && j !== "all");
  const jobModes = jobMode?.split(",").filter((j) => j && j !== "all");
  const locations = location?.split(",").filter((j) => j && j !== "all");

  // Create base conditions array
  const conditions: Prisma.JobWhereInput[] = [];

  // Search condition
  if (search?.trim()) {
    const searchTerm = search.trim();
    conditions.push({
      OR: [
        { role: { contains: searchTerm, mode: "insensitive" } },
        { companyName: { contains: searchTerm, mode: "insensitive" } },
        {
          skills: {
            hasSome: [
              searchTerm,
              searchTerm.toLowerCase(),
              searchTerm.toUpperCase(),
              searchTerm.charAt(0).toUpperCase() +
                searchTerm.slice(1).toLowerCase(),
            ],
          },
        },
      ],
    });
  }

  // Location condition
  if (locations?.length) {
    conditions.push({
      OR: locations.map((loc) => ({
        location: { equals: loc, mode: "insensitive" },
      })),
    });
  }

  // Job type condition
  if (jobTypes?.length) {
    conditions.push({
      OR: jobTypes.map((type) => ({
        jobType: { equals: type, mode: "insensitive" },
      })),
    });
  }

  // Job mode condition
  if (jobModes?.length) {
    conditions.push({
      OR: jobModes.map((mode) => ({
        jobMode: { equals: mode, mode: "insensitive" },
      })),
    });
  }

  // Final where clause
  const whereClause: Prisma.JobWhereInput =
    conditions.length > 0 ? { AND: conditions } : {};

  const [jobs, totalJobs] = await Promise.all([
    prisma.job.findMany({
      where: whereClause,
      skip,
      take: limit,
    }),
    prisma.job.count({ where: whereClause }),
  ]);

  return {
    jobs,
    totalPages: Math.ceil(totalJobs / limit),
  };
};

// ✅ Cached version of public job fetch
const cachedFetchPublicJobs = (params: BaseParams & { userId: string }) => {
  const cacheKey = [`public-jobs-${JSON.stringify(params)}`];

  return unstable_cache(() => _fetchPublicJobsFromDB(params), cacheKey, {
    revalidate: 3600,
    tags: [`jobs-user-${params.userId}`], // ✅ Add tag
  })();
};

// ✅ 2. User-specific personalization: isSaved + applicationStatus
const fetchUserJobMetadataFromDB = async (userId: string, jobIds: string[]) => {
  const [savedJobs, applications] = await Promise.all([
    prisma.savedJob.findMany({
      where: {
        userId,
        jobId: { in: jobIds },
      },
      select: { jobId: true },
    }),
    prisma.jobApplication.findMany({
      where: {
        userId,
        jobId: { in: jobIds },
      },
      select: {
        jobId: true,
        status: true,
      },
    }),
  ]);

  const savedSet = new Set(savedJobs.map((j) => j.jobId));
  const applicationMap = new Map(applications.map((a) => [a.jobId, a.status]));

  return { savedSet, applicationMap };
};

// ✅ 3. Final exposed function
export const fetchJobs = async (
  params: FetchJobsParams
): Promise<JobsWithTotalPages | null> => {
  const { userId, ...baseParams } = params;

  try {
    const publicData = await cachedFetchPublicJobs({ ...baseParams, userId });
    const jobIds = publicData.jobs.map((job) => job.id);

    const { savedSet, applicationMap } = await fetchUserJobMetadataFromDB(
      userId,
      jobIds
    );

    const personalizedJobs = publicData.jobs.map((job) => ({
      ...job,
      isSaved: savedSet.has(job.id),
      applicationStatus: applicationMap.get(job.id) || null,
    }));

    return {
      jobs: personalizedJobs,
      totalPages: publicData.totalPages,
    };
  } catch (error) {
    console.error("❌ fetchJobsServerAction failed:", error);
    return null;
  }
};
