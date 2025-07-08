"use client";

import { useState } from "react";
//import dynamic from "next/dynamic";

// components
import ApplyForJobModal from "./ApplyForJobModal";
// const ApplyForJobModal = dynamic(() => import("./ApplyForJobModal"), {
//   ssr: false,
// });

// 3rd party
import { ApplicationStatus } from "@prisma/client";

interface ApplyForJobProps {
  userId: string;
  jobId: string;
  applicationStatus: ApplicationStatus | null;
}

export default function ApplyNowTrigger({
  userId,
  jobId,
  applicationStatus,
}: ApplyForJobProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (applicationStatus === "PENDING") {
    return (
      <div
        role="status"
        className="mt-4 p-2 bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 rounded text-center font-medium"
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
        className="mt-4 w-full md:w-fit px-4 py-2 rounded bg-primary text-light dark:text-dark hover:opacity-80 dark:hover:opacity-90 transition-opacity font-medium"
      >
        Apply Now
      </button>

      <ApplyForJobModal
        userId={userId}
        jobId={jobId}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </>
  );
}
