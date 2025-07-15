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
import { MdOutlineClose, MdOutlineDelete } from "react-icons/md";

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
      <header className="flex items-center justify-between">
        <h1
          id="modal-title"
          className="text-lg font-semibold"
          role="heading"
          aria-level={1}
        >
          Delete Account
        </h1>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          aria-label="Close delete account modal"
          className="p-1 rounded hover:bg-muted"
        >
          <MdOutlineClose className="w-5 h-5" aria-hidden="true" />
        </button>
      </header>

      <section
        aria-describedby="modal-description"
        className="my-4 border p-4 rounded"
      >
        <p id="modal-description">Do you want to delete your account?</p>

        <WarningCard
          message="This will delete everything related to your account, including saved jobs, applied jobs, and more."
          className="mt-4"
        />
      </section>

      <footer className="mt-4">
        <button
          type="button"
          onClick={handleDelete}
          disabled={isPending}
          className={`w-full flex items-center justify-center px-4 h-[41.6px] rounded font-medium text-white bg-red-600 hover:bg-red-500 transition-colors ${
            isPending ? "pointer-events-none opacity-70" : ""
          }`}
        >
          <MdOutlineDelete className="w-5 h-5 mr-1" aria-hidden="true" />
          Delete
          {isPending && (
            <AiOutlineLoading3Quarters
              className="w-4 h-4 animate-spin ml-2"
              aria-hidden="true"
            />
          )}
        </button>

        {errorMsg && (
          <p
            className="mt-4 text-sm text-center text-red-600"
            role="alert"
            aria-live="assertive"
          >
            {errorMsg}
          </p>
        )}
      </footer>
    </Modal>
  );
}
