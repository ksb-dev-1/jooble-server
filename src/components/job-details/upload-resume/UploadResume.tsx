"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

// types
import { UploadResumeResponse } from "@/types/job";

// actions
import { uploadResumeServerAction } from "@/actions/upload-resume-server-action";

// components
import WarningCard from "@/components/shared/WarningCard";
import BackButton from "./BackButton";
import ResumeDropzone from "./ResumeDropzone";
import UploadResumeButton from "./UploadResumeButton";
import ErrorMessage from "./ErrorMessage";

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
  const [fileName, setFileName] = useState("");
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

  // Handle file change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const validTypes = [
        "application/pdf", // .pdf
        "text/plain", // .txt
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
      ];
      if (!validTypes.includes(selectedFile.type)) {
        setErrorMessage(
          "Invalid file type. Please upload a PDF, TXT, or DOCX file."
        );
        return;
      }

      if (selectedFile.size > 5 * 1024 * 1024) {
        setErrorMessage("File size too large. Maximum 5MB allowed.");
        return;
      }

      setFile(selectedFile);
      setFileName(selectedFile.name);
      setErrorMessage(null);
    }
  };

  // Handle file upload
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
    <div>
      <BackButton onClick={() => setShowUploadResume(false)} />

      <div className="mt-4 border rounded p-4">
        <ResumeDropzone
          onChange={handleFileChange}
          isPending={isPending}
          fileName={fileName}
        />

        {file && isResumeUploaded && (
          <WarningCard
            message="Your previous resume will be replaced with the new one."
            className="mt-4"
          />
        )}
      </div>

      <UploadResumeButton
        onClick={handleUpload}
        disabled={!file || isPending}
        isPending={isPending}
        className="px-4 h-[41.6px] mt-4"
      />

      <ErrorMessage message={errorMessage} />
    </div>
  );
}
