"use server";

import { revalidatePath } from "next/cache";

// lib
import { prisma } from "@/lib/prisma";

// utils
import cloudinary from "@/utils/cloudinary";

// types
import { UploadResumeResponse } from "@/types/job";

export async function uploadResumeServerAction(
  userId: string,
  base64File: string,
  fileName: string
): Promise<UploadResumeResponse> {
  if (!userId) {
    return {
      success: false,
      status: 400,
      message: "User ID is required!",
      data: null,
    };
  }

  try {
    // Validate the Base64 file
    if (!base64File) {
      return {
        success: false,
        status: 400,
        message: "Invalid file format. Please provide a valid Base64 file.",
        data: null,
      };
    }
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return {
        success: false,
        status: 404,
        message: "User not found!",
        data: null,
      };
    }

    const existingResume = await prisma.resume.findUnique({
      where: { userId },
    });

    // Delete the existing resume if it exists
    if (existingResume) {
      try {
        await cloudinary.uploader.destroy(existingResume.publicId, {
          resource_type: "raw",
        });
      } catch (error) {
        console.error(
          "Failed to delete existing resume from Cloudinary:",
          error
        );
        // Continue even if deletion fails to avoid blocking the upload
      }

      await prisma.resume.delete({
        where: { userId },
      });
    }

    // Decode the Base64 file data
    const buffer = Buffer.from(base64File, "base64");

    // Upload the new resume to Cloudinary
    const cloudinaryResult = await new Promise<{
      secure_url: string;
      public_id: string;
    }>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "raw",
          folder: "resumes",
          use_filename: true,
          filename_override: fileName,
          disposition: "attachment", // This forces download
        },

        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve({
              secure_url: result!.secure_url,
              public_id: result!.public_id,
            });
          }
        }
      );
      uploadStream.end(buffer);
    });

    await prisma.resume.create({
      data: {
        url: cloudinaryResult.secure_url,
        publicId: cloudinaryResult.public_id,
        userId,
      },
    });

    revalidatePath("/profile");

    return {
      success: true,
      status: 200,
      message: "Resume uploaded successfully.",
      data: {
        url: cloudinaryResult.secure_url,
      },
    };
  } catch (error) {
    console.error("Failed to upload resume:", error);
    return {
      success: false,
      status: 500,
      message: "An unexpected error occurred.",
      data: null,
    };
  }
}
