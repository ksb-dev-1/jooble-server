"use client";

import { useState } from "react";

// actions
import { uploadResumeServerAction } from "@/actions/upload-resume-server-action";

// types
import { UploadResumeResponse } from "@/types/job";

// components
import WarningCard from "@/components/shared/WarningCard";

// 3rd party
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdArrowBack, MdOutlineCloudUpload } from "react-icons/md";

interface UploadResumeProps {
  isResumeUploaded: boolean;
  setShowUploadResume: (show: boolean) => void;
  userId?: string;
  refetch: () => void;
  setResumeUrl: (url?: string) => void;
}

export default function UploadResume({
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
      const response: UploadResumeResponse = await uploadResumeServerAction(
        userId,
        base64,
        fileName
      );
      return response;
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

      <div className="space-y-2">
        <div className="relative border-2 border-dashed border-primary rounded h-40 flex items-center justify-center">
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
              className="text-5xl text-primary"
              aria-hidden="true"
            />
            <p className="font-medium sm:text-lg">
              {fileName || "Drag and drop or click to select a file"}
            </p>
            <p
              id="file-upload-instructions"
              className="text-xs sm:text-sm text-gray-500 mt-1 font-medium"
            >
              Supported formats: PDF, TXT, DOCX (Max 5MB)
            </p>
          </div>
        </div>
      </div>

      {file && isResumeUploaded && (
        <WarningCard message="Your previous resume will be replaced with the new one." />
      )}

      {file && (
        <button
          onClick={handleUpload}
          disabled={isPending}
          aria-busy={isPending}
          className={`relative bg-primary text-light dark:text-dark rounded flex items-center justify-center transition-opacity ${
            file && !isPending
              ? "hover:opacity-80 dark:hover:opacity-90"
              : "opacity-60 pointer-events-none"
          } mt-4 w-full px-4 h-[41.6px] font-medium`}
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
