"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function toggleSaveJobServerAction(formData: FormData) {
  const jobId = formData.get("jobId") as string;
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("Not authenticated");
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

  revalidateTag(`jobs-user-${userId}`);
  revalidateTag(`saved-jobs-user-${userId}`);
  revalidateTag(`applied-jobs-user-${userId}`);
  revalidateTag(`job-details-${userId}-${jobId}`);
  revalidatePath("/profile");
}
