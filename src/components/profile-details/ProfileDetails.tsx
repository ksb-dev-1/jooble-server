"use client";

import { useState } from "react";
import Image from "next/image";

//import dynamic from "next/dynamic";

// components
import Link from "@/components/LinkWithProgress";
import DeleteAccountModal from "./DeleteAccountModal";
// const DeleteAccountModal = dynamic(() => import("./DeleteAccountModal"), {
//   ssr: false,
// });

// 3rd party
import { FaRegUser } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { MdOutlineDelete } from "react-icons/md";

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
  const [isModalOpen, setIsModalOpen] = useState(false);

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

          <div>
            <p className="text-xl font-bold">{name || "No name"}</p>
            <p className="font-medium">{email || "No email"}</p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="absolute top-4 right-4 bg-red-600 text-white hover:bg-red-500 dark:bg-red-950 dark:text-red-300 dark:hover:bg-red-900 transition-colors h-8 w-8 rounded-full flex items-center justify-center"
            aria-label="Delete account"
          >
            <MdOutlineDelete className="h-5 w-5" />
          </button>
        </div>
      </section>

      {/* Saved & Applied Job Links */}
      <section
        className="mt-4 grid sm:grid-cols-2 gap-4"
        aria-label="User job statistics"
      >
        <Link
          href="/jobs/saved"
          className="p-4 rounded border flex items-center justify-between hover:bg-dark dark:hover:bg-light transition-colors"
          aria-label="View saved jobs"
        >
          <p className="flex items-center">
            <span>Saved Jobs</span>
            <span
              className="ml-2 relative inline-block h-6 w-6 rounded-full bg-primary text-light dark:text-dark"
              aria-live="polite"
              aria-label="Saved jobs count"
            >
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-medium">
                {savedJobsLength ?? 0}
              </span>
            </span>
          </p>
          <FaArrowRightLong />
        </Link>

        <Link
          href="/jobs/applied"
          className="p-4 rounded border flex items-center justify-between hover:bg-dark dark:hover:bg-light transition-colors"
          aria-label="View applied jobs"
        >
          <p className="flex items-center">
            <span>Applied Jobs</span>
            <span
              className="ml-2 relative inline-block h-6 w-6 rounded-full bg-primary text-light dark:text-dark"
              aria-live="polite"
              aria-label="Applied jobs count"
            >
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-medium">
                {appliedJobsLength ?? 0}
              </span>
            </span>
          </p>
          <FaArrowRightLong />
        </Link>
      </section>

      {/* Delete Confirmation Modal */}
      <DeleteAccountModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        userId={userId}
      />
    </div>
  );
}
