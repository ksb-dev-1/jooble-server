"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// actions
import { checkIsResumeUploadedServerAction } from "@/actions/check-is-resume-uploaded-server-action";

//import dynamic from "next/dynamic";

// components
import LinkWithProgress from "@/components/shared/LinkWithProgress";
import DeleteAccountModal from "./DeleteAccountModal";
// const DeleteAccountModal = dynamic(() => import("./DeleteAccountModal"), {
//   ssr: false,
// });

// 3rd party
import { FaRegUser } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { MdOutlineDelete } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";

interface ProfileDetailsProps {
  userId: string;
  image: string | null | undefined;
  name: string | null | undefined;
  email: string | null | undefined;
  savedJobsLength: number | null;
  appliedJobsLength: number | null;
}

export default function ProfileDetails({
  userId,
  image,
  name,
  email,
  savedJobsLength,
  appliedJobsLength,
}: ProfileDetailsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [resumeUrl, setResumeUrl] = useState<string>();

  const { data, isLoading } = useQuery({
    queryKey: ["checkResumeUploaded", userId],
    queryFn: () => checkIsResumeUploadedServerAction(userId!),
    enabled: !!userId,
  });

  useEffect(() => {
    if (data?.success) {
      setResumeUrl(data.data?.url);
    } else {
      setResumeUrl(undefined);
    }
  }, [data]);

  return (
    <div>
      {/* Profile Header */}
      <section
        aria-labelledby="profile-heading"
        className="relative rounded overflow-hidden"
      >
        <div className="p-4 md:p-6 border flex flex-col gap-4 rounded">
          <h1 id="profile-heading" className="sr-only">
            User Profile Details
          </h1>
          {image ? (
            <Image
              src={image}
              alt="User profile image"
              height={100}
              width={100}
              priority
              sizes="(max-width: 768px) 100vw, 33vw"
              className="rounded"
            />
          ) : (
            <div
              className="relative h-[100px] w-[100px] rounded bg-slate-300"
              role="img"
              aria-label="User avatar placeholder"
            >
              <FaRegUser className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl text-white" />
            </div>
          )}

          <div className="flex flex-col sm:flex-row sm:items-end justify-between">
            <div>
              <p className="text-xl font-bold">{name || "No name"}</p>
              <p className="font-medium">{email || "No email"}</p>
            </div>
            {isLoading ? (
              <span className="skeleton h-6 w-60 rounded mt-2 sm:mt-0"></span>
            ) : (
              resumeUrl && (
                <a
                  href={resumeUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 sm:mt-0 underline text-primary hover:opacity-80 dark:hover:opacity-80 transition-opacity font-medium"
                  aria-label="Download current resume"
                >
                  Click here to view your resume
                </a>
              )
            )}
          </div>
        </div>

        <button
          onClick={() => setIsOpen(true)}
          className="absolute top-0 right-0 bg-red-600 text-white hover:bg-red-500 transition-colors h-8 w-8 rounded-tr rounded-bl flex items-center justify-center"
          aria-label="Delete account"
        >
          <MdOutlineDelete className="h-5 w-5" />
        </button>
      </section>

      {/* Saved & Applied Job Links */}
      <section
        className="mt-4 grid sm:grid-cols-2 gap-4"
        aria-label="User job statistics"
      >
        <LinkWithProgress
          href="/jobs/saved"
          className="px-4 py-2 rounded border flex items-center justify-between hover:bg-dark dark:hover:bg-light transition-colors"
          aria-label="View saved jobs"
        >
          <p className="flex items-center">
            <span className="font-medium">Saved Jobs</span>
            <span
              className="ml-4 relative inline-block h-6 w-6 rounded-full border border-gray-400 dark:border-gray-500 text-primary"
              aria-live="polite"
              aria-label="Saved jobs count"
            >
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-medium">
                {savedJobsLength ?? 0}
              </span>
            </span>
          </p>
          <FaArrowRightLong className="text-primary" />
        </LinkWithProgress>

        <LinkWithProgress
          href="/jobs/applied"
          className="px-4 py-2 rounded border flex items-center justify-between hover:bg-dark dark:hover:bg-light transition-colors"
          aria-label="View applied jobs"
        >
          <p className="flex items-center">
            <span className="font-Medium">Applied Jobs</span>
            <span
              className="ml-4 relative inline-block h-6 w-6 rounded-full border border-gray-400 dark:border-gray-500 text-primary"
              aria-live="polite"
              aria-label="Applied jobs count"
            >
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-semibold">
                {appliedJobsLength ?? 0}
              </span>
            </span>
          </p>
          <FaArrowRightLong className="text-primary" />
        </LinkWithProgress>
      </section>

      {/* Delete Confirmation Modal */}
      <DeleteAccountModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        userId={userId}
      />
    </div>
  );
}
