"use client";

import { useFormStatus } from "react-dom";

// Icons
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdOutlineBookmarkBorder, MdOutlineBookmark } from "react-icons/md";

function IconButton({
  children,
  label,
  pressed,
}: {
  children: React.ReactNode;
  label: string;
  pressed?: boolean;
}) {
  return (
    <button
      type="submit"
      aria-label={label}
      aria-pressed={pressed}
      title={label}
      className="flex items-center justify-center border rounded-full h-8 w-8 hover:shadow-md transition-shadow"
    >
      {children}
    </button>
  );
}

export default function ToggleSaveButton({ isSaved }: { isSaved: boolean }) {
  const { pending } = useFormStatus();

  if (pending) {
    return (
      <IconButton label="Saving job" pressed={isSaved}>
        <AiOutlineLoading3Quarters
          className="h-4 w-4 animate-spin text-primary"
          aria-hidden="true"
        />
      </IconButton>
    );
  }

  if (isSaved) {
    return (
      <IconButton label="Remove job from saved" pressed={true}>
        <MdOutlineBookmark
          className="h-5 w-5 text-primary"
          aria-hidden="true"
        />
      </IconButton>
    );
  }

  return (
    <IconButton label="Save job" pressed={false}>
      <MdOutlineBookmarkBorder
        className="h-5 w-5 text-primary"
        aria-hidden="true"
      />
    </IconButton>
  );
}
