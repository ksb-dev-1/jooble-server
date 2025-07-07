"use server";

// lib
import { prisma } from "@/lib/prisma";

// types
import { CheckIsResumeUploadedResponse } from "@/types/job";

export async function checkIsResumeUploadedServerAction(
  userId: string | undefined
): Promise<CheckIsResumeUploadedResponse> {
  if (!userId) {
    return {
      success: false,
      status: 400,
      message: "User ID is required!",
      data: null,
    };
  }

  try {
    const resume = await prisma.resume.findUnique({
      where: { userId },
    });

    if (resume) {
      return {
        success: true,
        status: 200,
        message: "Resume uploaded successfully.",
        data: {
          url: resume.url?.toString(),
        },
      };
    } else {
      return {
        success: false,
        status: 404,
        message: "No resume found for the user.",
        data: {
          url: undefined,
        },
      };
    }
  } catch (error) {
    console.error("Error checking if resume is uploaded:", error);

    return {
      success: false,
      status: 500,
      message: "An error occurred while checking resume status.",
      data: null,
    };
  }
}
