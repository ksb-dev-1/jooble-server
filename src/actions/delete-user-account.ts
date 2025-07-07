"use server";

// lib
import { prisma } from "@/lib/prisma";

// utils
import cloudinary from "@/utils/cloudinary";

// types
import { DeleteAccountResponse } from "@/types/job";

export async function deleteUserAccount(
  userId: string
): Promise<DeleteAccountResponse> {
  try {
    if (!userId) throw new Error("Missing user ID");

    // Step 1: Get the resume's publicId
    const resume = await prisma.resume.findUnique({
      where: { userId },
      select: { publicId: true },
    });

    // Step 2: Delete resume from Cloudinary if it exists
    if (resume?.publicId) {
      await cloudinary.uploader.destroy(resume.publicId, {
        resource_type: "raw", //
      });
    }

    // Step 3: Delete user and related data
    await prisma.$transaction([
      prisma.resume.deleteMany({ where: { userId } }),
      prisma.subscription.deleteMany({ where: { userId } }),
      prisma.savedJob.deleteMany({ where: { userId } }),
      prisma.jobApplication.deleteMany({ where: { userId } }),
      prisma.account.deleteMany({ where: { userId } }),
      prisma.session.deleteMany({ where: { userId } }),
      prisma.user.delete({ where: { id: userId } }),
    ]);

    return { success: true, message: "User deleted successfully" };
  } catch (error) {
    console.error("Failed to delete user:", error);
    return { success: false, error: "Failed to delete user" };
  }
}
