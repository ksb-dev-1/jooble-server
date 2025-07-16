"use client";

import { Dispatch, SetStateAction } from "react";

// actions
import { applyForJobServerAction } from "@/actions/apply-for-job-server-action";

// components
import ApplyForJobButton from "./ApplyForJobButton";

// 3rd party
import toast from "react-hot-toast";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { MdOutlineClose } from "react-icons/md";

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
          className="text-lg sm:text-xl font-bold"
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

      {/* Resume Preview Link */}
      <section className="my-4 border rounded p-4">
        {resumeUrl && (
          <div className="flex items-start mb-4">
            <p className="mr-2">-</p>
            <p>
              <span>
                Would you like to review your resume before applying for the
                job?{" "}
              </span>
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary"
                aria-label="View your uploaded resume"
              >
                Click here to review
              </a>
            </p>
          </div>
        )}

        {/* Upload New Resume Button */}
        <div className="flex items-start">
          <p className="mr-2">-</p>
          <p>
            <span>
              Would you like to upload a new resume tailored for this job
              application?{" "}
            </span>
            <button
              onClick={() => setShowUploadResume(true)}
              className="text-primary"
              aria-label="Upload a new resume"
            >
              Click here to upload
            </button>
          </p>
        </div>
      </section>

      {/* Apply Button */}
      <ApplyForJobButton
        onClick={handleApply}
        disabled={applyJobMutation.isPending}
        isPending={applyJobMutation.isPending}
        className="px-4 h-[41.6px]"
      />
    </section>
  );
}
