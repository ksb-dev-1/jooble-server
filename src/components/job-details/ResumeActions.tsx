"use client";

import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

// hooks
import { applyForJobServerAction } from "@/actions/apply-for-job-server-action";

// 3rd party
import toast from "react-hot-toast";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdOutlineSend } from "react-icons/md";

interface ResumeActionsProps {
  userId: string | undefined;
  jobId: string;
  resumeUrl?: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setShowUploadResume: (show: boolean) => void;
}

export default function ResumeActions({
  userId,
  jobId,
  resumeUrl,
  setIsOpen,
  setShowUploadResume,
}: ResumeActionsProps) {
  const queryClient = useQueryClient();

  const applyJobMutation = useMutation({
    mutationFn: async () => {
      if (!userId) throw new Error("Authentication required");

      const { success, data, message } = await applyForJobServerAction(
        userId,
        jobId
      );

      if (!success) {
        throw new Error(message || "Application failed");
      }

      toast.success(message || "Application submitted successfully");
      return data?.isApplied;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["saved-jobs"] });
      queryClient.invalidateQueries({ queryKey: ["applied-jobs"] });
      queryClient.invalidateQueries({ queryKey: ["job-details", jobId] });
      setIsOpen(false);
    },
    onError: (error: Error) => {
      console.error("Application error:", error);
      toast.error(error.message || "Application failed. Please try again.");
    },
  });

  const handleApply = () => {
    if (!userId) {
      toast.error("Please sign in to apply for this job.");
      return;
    }
    applyJobMutation.mutate();
  };

  return (
    <div className="text-center">
      <h2 className="text-xl font-bold up">Ready to Apply</h2>

      <p className="sm:text-lg mt-8">
        Review your resume:{" "}
        <Link
          href={resumeUrl || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline"
          aria-label="Download current resume"
        >
          Download
        </Link>
      </p>

      <p className="sm:text-lg mt-4">
        Want to upload a new resume?{" "}
        <button
          onClick={() => setShowUploadResume(true)}
          className="text-primary underline"
          aria-label="Upload new resume"
        >
          Click here
        </button>
      </p>

      <div className="border-t my-8"></div>

      <button
        aria-busy={applyJobMutation.isPending}
        disabled={applyJobMutation.isPending}
        onClick={handleApply}
        className={`relative ${
          applyJobMutation.isPending
            ? "opacity-60 pointer-events-none"
            : "hover:opacity-80 dark:hover:opacity-90 transition-opacity"
        } bg-primary text-light dark:text-dark rounded w-full h-[41.6px] py-2 flex items-center justify-center font-medium`}
      >
        Apply Now <MdOutlineSend className="ml-2" />
        {applyJobMutation.isPending && (
          <AiOutlineLoading3Quarters className="absolute right-4 animate-spin" />
        )}
      </button>
    </div>
  );
}
