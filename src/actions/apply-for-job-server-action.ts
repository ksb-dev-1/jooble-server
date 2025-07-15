"use server";

import { revalidatePath, revalidateTag } from "next/cache";

// lib
import { prisma } from "@/lib/prisma";

// types
import { ApplyForJobResponse } from "@/types/job";

// 3rd party
import { ApplicationStatus } from "@prisma/client";

export async function applyForJobServerAction(
  userId: string,
  jobId: string
): Promise<ApplyForJobResponse> {
  // Check for user id
  if (!userId) {
    return {
      success: false,
      status: 400, // Use 400 for bad request
      message: "User ID is required!",
      data: null,
    };
  }

  // Check for job id
  if (!jobId) {
    return {
      success: false,
      status: 400, // Use 400 for bad request
      message: "Job ID is required!",
      data: null,
    };
  }

  // Check if the job exists
  const job = await prisma.job.findUnique({
    where: { id: jobId },
  });

  if (!job) {
    return {
      success: false,
      status: 404,
      message: "The job you're trying to apply doesn't exist",
      data: null,
    };
  }

  await prisma.jobApplication.create({
    data: {
      jobId,
      userId,
      status: ApplicationStatus.PENDING,
    },
  });

  // Revalidate
  revalidateTag(`jobs-user-${userId}`);
  revalidateTag(`saved-jobs-user-${userId}`);
  revalidateTag(`job-details-${userId}-${jobId}`);
  revalidateTag(`applied-jobs-user-${userId}`);
  revalidatePath("/profile");

  return {
    success: true,
    status: 200,
    message: "Your application has been submitted successfully",
    data: { isApplied: true },
  };
}
