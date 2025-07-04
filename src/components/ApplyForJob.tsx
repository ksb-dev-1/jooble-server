"use client";

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import Link from "next/link";

// actions
import { checkIsResumeUploadedServerAction } from "@/actions/check-is-resume-uploaded-server-action";
import { applyForJobServerAction } from "@/actions/apply-for-job-server-action";
import { uploadResumeServerAction } from "@/actions/upload-resume-server-action";

// components
import Modal from "@/components/shared/Modal";

// 3rd party
import toast from "react-hot-toast";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useMutation } from "@tanstack/react-query";
import {
  MdArrowBack,
  MdOutlineCloudUpload,
  MdOutlineSend,
} from "react-icons/md";
import { ApplicationStatus } from "@prisma/client";

interface UploadResumeProps {
  isResumeUploaded: boolean;
  setShowUploadResume: (show: boolean) => void;
  userId?: string;
  refetch: () => void;
  setResumeUrl: (url?: string) => void;
}

function UploadResume({
  isResumeUploaded,
  setShowUploadResume,
  userId,
  refetch,
  setResumeUrl,
}: UploadResumeProps) {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: async ({
      base64,
      fileName,
    }: {
      base64: string;
      fileName: string;
    }) => {
      if (!userId) throw new Error("User ID is required");
      return uploadResumeServerAction(userId, base64, fileName);
    },
    onSuccess: (response) => {
      if (response.success) {
        toast.success("Resume uploaded successfully!");
        setResumeUrl(response.data?.url);
        setShowUploadResume(false);
        refetch();
      } else {
        setErrorMessage("Failed to upload resume. Please try again.");
      }
    },
    onError: () => {
      setErrorMessage("An unexpected error occurred during upload.");
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Validate file type
      const validTypes = [
        "application/pdf",
        "text/plain",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!validTypes.includes(selectedFile.type)) {
        setErrorMessage(
          "Invalid file type. Please upload a PDF, TXT, or DOCX file."
        );
        return;
      }

      // Validate file size (e.g., 5MB max)
      if (selectedFile.size > 5 * 1024 * 1024) {
        setErrorMessage("File size too large. Maximum 5MB allowed.");
        return;
      }

      setFile(selectedFile);
      setFileName(selectedFile.name);
      setErrorMessage(null);
    }
  };

  const handleUpload = () => {
    if (!file) {
      setErrorMessage("Please select a file to upload.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result?.toString().split(",")[1];
      if (!base64) {
        setErrorMessage("Failed to process the file. Please try another file.");
        return;
      }
      mutate({ base64, fileName: file.name });
    };
    reader.onerror = () =>
      setErrorMessage("Failed to read the file. Please try again.");
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-4">
      <button
        onClick={() => setShowUploadResume(false)}
        className="flex items-center text-primary font-medium"
        aria-label="Go back to previous screen"
      >
        <MdArrowBack className="mr-1" aria-hidden="true" />
        Back
      </button>

      {isResumeUploaded && (
        <div
          role="alert"
          className="p-4 rounded bg-amber-600 dark:bg-amber-950 text-white dark:text-amber-400"
        >
          <p className="font-semibold border-amber-600">Note</p>
          <p className="border-b-2 mb-4 border-white dark:border-amber-400 w-9"></p>
          <p>Your previous resume will be replaced with the new one.</p>
        </div>
      )}

      <div className="space-y-2">
        {/* <label
          htmlFor="resume-upload"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Upload Resume
        </label> */}
        <div className="relative border-2 border-dashed border-primary rounded-lg h-40 flex items-center justify-center">
          <input
            id="resume-upload"
            type="file"
            accept=".pdf,.txt,.docx"
            onChange={handleFileChange}
            disabled={isPending}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            aria-describedby="file-upload-instructions"
          />
          <div className="flex flex-col items-center p-4 text-center">
            <MdOutlineCloudUpload
              className="text-5xl text-primary mb-2"
              aria-hidden="true"
            />
            <p className="text-sm">
              {fileName || "Drag and drop or click to select a file"}
            </p>
            <p
              id="file-upload-instructions"
              className="text-xs text-gray-500 mt-1"
            >
              Supported formats: PDF, TXT, DOCX (Max 5MB)
            </p>
          </div>
        </div>
      </div>

      {file && (
        <button
          onClick={handleUpload}
          disabled={isPending}
          aria-busy={isPending}
          className={`relative bg-primary text-light dark:text-dark rounded flex items-center justify-center transition-opacity ${
            file && !isPending
              ? "hover:opacity-80 dark:hover:opacity-90"
              : "opacity-60 pointer-events-none"
          } mt-4 w-full px-4 h-[41.6px]`}
        >
          Upload
          {isPending && (
            <AiOutlineLoading3Quarters className="absolute right-4 animate-spin" />
          )}
        </button>
      )}

      {errorMessage && (
        <p role="alert" className="text-red-600 dark:text-red-400 text-sm mt-2">
          {errorMessage}
        </p>
      )}
    </div>
  );
}

interface ResumeActionsProps {
  userId: string | undefined;
  jobId: string;
  resumeUrl?: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setShowUploadResume: (show: boolean) => void;
}

function ResumeActions({
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
    <div className="space-y-4 text-center">
      <h2 className="text-xl font-semibold">Ready to Apply</h2>

      <p>
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

      <p>
        Want to upload a new resume?{" "}
        <button
          onClick={() => setShowUploadResume(true)}
          className="text-primary underline"
          aria-label="Upload new resume"
        >
          Click here
        </button>
      </p>

      <div className="border-t border my-4"></div>

      <button
        aria-busy={applyJobMutation.isPending}
        disabled={applyJobMutation.isPending}
        onClick={handleApply}
        className={`relative ${
          applyJobMutation.isPending
            ? "opacity-60 pointer-events-none"
            : "hover:opacity-80 dark:hover:opacity-90 transition-opacity"
        } bg-primary text-light dark:text-dark rounded w-full h-[41.6px] py-2 flex items-center justify-center`}
      >
        Apply Now <MdOutlineSend className="ml-2" />
        {applyJobMutation.isPending && (
          <AiOutlineLoading3Quarters className="absolute right-4 animate-spin" />
        )}
      </button>
    </div>
  );
}

function ResumeMissingPrompt({
  setShowUploadResume,
}: {
  setShowUploadResume: (show: boolean) => void;
}) {
  return (
    <div className="text-center space-y-4">
      <h2 className="text-xl font-semibold text-red-600 dark:text-red-400">
        Resume Required
      </h2>
      <p>You need to upload a resume to apply for this position.</p>
      <button
        onClick={() => setShowUploadResume(true)}
        className="text-primary underline font-medium"
        aria-label="Upload resume"
      >
        Click here to upload your resume
      </button>
    </div>
  );
}

interface ApplyForJobProps {
  userId: string;
  jobId: string;
  applicationStatus: ApplicationStatus;
}

export default function ApplyForJob({
  userId,
  jobId,
  applicationStatus,
}: ApplyForJobProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showUploadResume, setShowUploadResume] = useState(false);
  const [resumeUrl, setResumeUrl] = useState<string>();
  const modalRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["checkResumeUploaded", userId],
    queryFn: () => checkIsResumeUploadedServerAction(userId!),
    enabled: !!userId && isOpen,
  });

  useEffect(() => {
    if (data?.success) {
      setResumeUrl(data.data?.url);
    } else {
      setResumeUrl(undefined);
    }
  }, [data]);

  if (applicationStatus === "PENDING") {
    return (
      <div
        role="status"
        className="mt-4 p-2 bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-300 rounded text-center"
      >
        <p>
          Your application is under review. You&apos;ll be notified via email
          about interview updates.
        </p>
      </div>
    );
  }

  return (
    <>
      <button
        aria-label="Apply for this job"
        onClick={() => setIsOpen(true)}
        className="mt-4 w-full md:w-fit px-4 py-2 rounded bg-primary text-light dark:text-dark hover:opacity-80 dark:hover:opacity-90 transition-opacity"
      >
        Apply Now
      </button>

      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        ref={modalRef}
        labelledById="apply-modal-title"
      >
        <div role="document">
          <h2 id="apply-modal-title" className="sr-only">
            Apply for a job modal
          </h2>

          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <AiOutlineLoading3Quarters className="animate-spin mr-3" />
              <span>Checking your resume...</span>
            </div>
          ) : showUploadResume ? (
            <UploadResume
              isResumeUploaded={data?.success || false}
              setShowUploadResume={setShowUploadResume}
              userId={userId}
              refetch={refetch}
              setResumeUrl={setResumeUrl}
            />
          ) : data?.success ? (
            <ResumeActions
              userId={userId}
              jobId={jobId}
              resumeUrl={resumeUrl}
              setIsOpen={setIsOpen}
              setShowUploadResume={setShowUploadResume}
            />
          ) : (
            <ResumeMissingPrompt setShowUploadResume={setShowUploadResume} />
          )}
        </div>
      </Modal>
    </>
  );
}
