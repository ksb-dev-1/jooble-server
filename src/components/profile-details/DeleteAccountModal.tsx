"use client";

import {
  useState,
  useRef,
  useTransition,
  Dispatch,
  SetStateAction,
} from "react";

// hooks
import { useHandleOutsideClick } from "@/hooks/useHandleOutsideClick";

// actions
import { deleteUserAccount } from "@/actions/delete-user-account";

// types
import { DeleteAccountResponse } from "@/types/job";

// components
import Modal from "@/components/shared/Modal";

// 3rd party
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  userId: string;
}

export default function DeleteAccountModal({
  isModalOpen,
  setIsModalOpen,
  userId,
}: Props) {
  const [errorMsg, setErrorMsg] = useState("");
  const [isPending, startTransition] = useTransition();
  const modalRef = useRef<HTMLDivElement>(null);

  useHandleOutsideClick(modalRef, setIsModalOpen);

  const handleDelete = () => {
    setErrorMsg("");
    startTransition(async () => {
      const res: DeleteAccountResponse = await deleteUserAccount(userId);

      if (res.success) {
        toast.success(res?.message || "Account deleted successfully");
        setIsModalOpen(false);
        signOut();
      } else {
        setErrorMsg(res.error || "Something went wrong.");
      }
    });
  };

  return (
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
            This will delete everything related to your account, including saved
            jobs, applied jobs, and more.
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
  );
}
