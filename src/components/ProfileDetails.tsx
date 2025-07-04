"use client";

import { useState, useRef, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";

// hooks
import { useHandleOutsideClick } from "@/hooks/useHandleOutsideClick";

// components
import Modal from "@/components/shared/Modal";

// server action
import { deleteUserAccount } from "@/actions/delete-user-account";

// 3rd party
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";
import { FaRegUser } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { MdOutlineDelete } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface ProfileDetailsProps {
  userId: string;
  image: string | null | undefined;
  name: string | null | undefined;
  email: string | null | undefined;
  savedJobsLength: number;
  appliedJobsLength: number;
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
  const [errorMsg, setErrorMsg] = useState("");
  const [isPending, startTransition] = useTransition();

  const modalRef = useRef<HTMLDivElement>(null);
  useHandleOutsideClick(modalRef, setIsModalOpen);

  const handleDelete = () => {
    setErrorMsg("");
    startTransition(async () => {
      const res = await deleteUserAccount(userId);
      if (res.success) {
        toast.success("Account deleted successfully");
        setIsModalOpen(false);
        signOut();
      } else {
        setErrorMsg(res.error || "Something went wrong.");
      }
    });
  };

  return (
    <div>
      {/* Profile Header */}
      <section
        aria-labelledby="profile-heading"
        className="relative rounded overflow-hidden"
      >
        <div className="p-4 md:p-6 border flex flex-col gap-4 bg-gradient-to-b from-light to-dark rounded">
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

      {/* Saved & Applied Jobs */}
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
      <Modal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        ref={modalRef}
        labelledById="modal-title"
      >
        <div role="document">
          <h2
            id="modal-title"
            className="text-lg md:text-xl font-semibold text-red-600 text-center"
          >
            Do you want to delete your account?
          </h2>

          <div className="mt-4 p-4 rounded bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400">
            <p className="font-semibold">Note</p>
            <p className="border-b-2 mb-4 border-red-500 dark:border-red-400 w-9"></p>
            <p className="mt-1">
              This will delete everything related to your account, including
              saved jobs, applied jobs, and more.
            </p>
          </div>

          <button
            onClick={handleDelete}
            disabled={isPending}
            className={`mt-4 relative w-full px-4 h-[41.6px] rounded flex items-center justify-center bg-red-600 text-white hover:bg-red-500 dark:bg-red-700 dark:hover:bg-red-600 transition-colors ${
              isPending ? "pointer-events-none opacity-70" : ""
            }`}
          >
            <MdOutlineDelete className="mr-2 h-5 w-5" />
            Delete
            {isPending && (
              <AiOutlineLoading3Quarters
                className="absolute right-4 animate-spin"
                aria-hidden="true"
              />
            )}
          </button>

          {errorMsg && (
            <p className="mt-4 text-sm text-red-600 text-center" role="alert">
              {errorMsg}
            </p>
          )}
        </div>
      </Modal>
    </div>
  );
}
