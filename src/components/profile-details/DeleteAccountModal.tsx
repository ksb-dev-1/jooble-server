"use client";

import {
  useState,
  useRef,
  useTransition,
  Dispatch,
  SetStateAction,
} from "react";

// actions
import { deleteUserAccount } from "@/actions/delete-user-account";

// types
import { DeleteAccountResponse } from "@/types/job";

// components
import Modal from "@/components/shared/Modal";
import WarningCard from "@/components/shared/WarningCard";

// 3rd party
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  userId: string;
}

export default function DeleteAccountModal({
  isOpen,
  setIsOpen,
  userId,
}: Props) {
  const [errorMsg, setErrorMsg] = useState("");
  const [isPending, startTransition] = useTransition();
  const modalRef = useRef<HTMLDivElement>(null);

  const handleDelete = () => {
    setErrorMsg("");
    startTransition(async () => {
      const res: DeleteAccountResponse = await deleteUserAccount(userId);

      if (res.success) {
        toast.success(res?.message || "Account deleted successfully");
        setIsOpen(false);
        signOut();
      } else {
        setErrorMsg(res.error || "Something went wrong.");
      }
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      ref={modalRef}
      labelledById="modal-title"
    >
      <div role="document">
        <h2 id="modal-title" className="text-xl font-semibold text-center">
          Do you want to delete your account?
        </h2>

        <WarningCard
          message=" This will delete everything related to your account, including saved
            jobs, applied jobs, and more."
          className="mt-8"
        />

        <button
          onClick={handleDelete}
          disabled={isPending}
          className={`mt-4 relative w-full px-4 h-[41.6px] rounded flex items-center justify-center bg-red-600 text-white dark:bg-red-900 hover:bg-red-500 dark:hover:bg-red-800 transition-colors ${
            isPending ? "pointer-events-none opacity-70" : ""
          } font-medium`}
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
  );
}
