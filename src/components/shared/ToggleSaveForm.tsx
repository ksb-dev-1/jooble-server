"use client";

import { useTransition } from "react";

// components
import ToggleSaveButton from "./ToggleSaveButton";

// 3rd party
import toast from "react-hot-toast";

import {
  ToggleSaveResponse,
  toggleSaveServerAction,
} from "@/actions/toggle-save-server-action";

export function ToggleSaveForm({
  jobId,
  isSaved,
}: {
  jobId: string;
  isSaved: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  // Save or remove job
  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      const result: ToggleSaveResponse = await toggleSaveServerAction(formData);

      if (!result.success) {
        toast.error(result.error);
      }
    });
  };

  return (
    <form action={handleSubmit} className="absolute top-4 right-4">
      <input type="hidden" name="jobId" value={jobId} />
      <ToggleSaveButton isSaved={isSaved} pending={isPending} />
    </form>
  );
}
