"use client";

import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

// actions
import { applyForJobServerAction } from "@/actions/apply-for-job-server-action";

// 3rd party
import toast from "react-hot-toast";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdOutlineClose, MdOutlineSend } from "react-icons/md";

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
    <section aria-labelledby="resume-actions-title">
      {/* Header with Close Button */}
      <header className="flex items-center justify-between">
        <h1
          id="resume-actions-title"
          className="sm:text-lg font-bold"
          role="heading"
          aria-level={1}
        >
          Apply for Job
        </h1>

        <button
          onClick={() => setIsOpen(false)}
          type="button"
          aria-label="Close apply panel"
          className="p-1 rounded hover:bg-muted"
        >
          <MdOutlineClose className="h-5 w-5" aria-hidden="true" />
        </button>
      </header>

      {/* <p className="text-sm mt-2">
        Review resume, upload a new one if needed, and apply for this job.
      </p> */}

      {/* Resume Preview Link */}
      <section className="my-4 border rounded p-4">
        {resumeUrl && (
          <p className="mb-4">
            <span className="font-semibold">1</span> - Would you like to review
            your resume before applying for the job?{" "}
            <Link
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary"
              aria-label="View your uploaded resume"
            >
              Click here
            </Link>
          </p>
        )}

        {/* Upload New Resume Button */}
        <p>
          <span className="font-semibold">2</span> - Would you like to upload a
          new resume tailored for this job application?{" "}
          <button
            onClick={() => setShowUploadResume(true)}
            className="text-primary"
            aria-label="Upload a new resume"
          >
            Click here
          </button>
        </p>
      </section>

      {/* Apply Button */}
      <button
        aria-busy={applyJobMutation.isPending}
        disabled={applyJobMutation.isPending}
        onClick={handleApply}
        type="button"
        className={`relative w-full h-[41.6px] py-2 px-4 flex items-center justify-center rounded font-medium text-white bg-primary dark:text-dark hover:opacity-90 transition-opacity ${
          applyJobMutation.isPending ? "opacity-60 pointer-events-none" : ""
        }`}
      >
        Apply Now
        <MdOutlineSend className="ml-2" aria-hidden="true" />
        {applyJobMutation.isPending && (
          <AiOutlineLoading3Quarters
            className="absolute right-4 animate-spin"
            aria-hidden="true"
          />
        )}
      </button>
    </section>
  );
}
