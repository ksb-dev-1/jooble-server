"use server";

import {
  // revalidatePath,
  revalidateTag,
} from "next/cache";
import { auth } from "@/auth";

// lib
import { prisma } from "@/lib/prisma";

export type ToggleSaveResponse =
  | { success: true; message: string }
  | { success: false; error: string };

export async function toggleSaveServerAction(
  formData: FormData
): Promise<ToggleSaveResponse> {
  try {
    const jobId = formData.get("jobId") as string;
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return { success: false, error: "Not authenticated" };
    }

    const existing = await prisma.savedJob.findFirst({
      where: { userId, jobId },
    });

    if (existing) {
      await prisma.savedJob.deleteMany({
        where: { userId, jobId },
      });
    } else {
      await prisma.savedJob.create({
        data: { userId, jobId },
      });
    }

    // Cache invalidation
    revalidateTag(`jobs-user-${userId}`);
    revalidateTag(`saved-jobs-user-${userId}`);
    revalidateTag(`applied-jobs-user-${userId}`);
    revalidateTag(`job-details-${userId}-${jobId}`);
    revalidateTag(`saved-jobs-count-user-${userId}`);
    revalidateTag(`applied-jobs-count-user-${userId}`);
    //revalidatePath("/profile");

    return { success: true, message: "Toggled saved job successfully" };
  } catch (error) {
    console.error("❌ toggleSaveJobServerAction error:", error);
    return { success: false, error: "Something went wrong" };
  }
}
