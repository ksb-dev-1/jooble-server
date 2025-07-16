"use client";

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

// components
import Modal from "@/components/shared/Modal";
import ResumeActions from "./ResumeActions";
import ResumeMissingPrompt from "./ResumeMissingPrompt";
import UploadResume from "./upload-resume/UploadResume";

// actions
import { checkIsResumeUploadedServerAction } from "@/actions/check-is-resume-uploaded-server-action";

// 3rd party
import { useQuery } from "@tanstack/react-query";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface ApplyForJobModalProps {
  userId: string;
  jobId: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function ApplyForJobModal({
  userId,
  jobId,
  isOpen,
  setIsOpen,
}: ApplyForJobModalProps) {
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

  useEffect(() => {
    if (isOpen) setShowUploadResume(false);
  }, [isOpen]);

  return (
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
  );
}
