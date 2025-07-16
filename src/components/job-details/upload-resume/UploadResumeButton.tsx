// 3rd party
import clsx from "clsx";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface UploadResumeButtonProps {
  onClick: () => void;
  disabled: boolean;
  isPending: boolean;
  className?: string;
}

export default function UploadResumeButton({
  onClick,
  disabled,
  isPending,
  className = "",
}: UploadResumeButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || isPending}
      aria-busy={isPending}
      aria-disabled={disabled}
      aria-label="Upload resume"
      className={clsx(
        "btn-primary relative",
        disabled ? "btn-primary-disabled" : "btn-primary-hover",
        className
      )}
    >
      Upload
      {isPending && (
        <AiOutlineLoading3Quarters className="absolute right-4 animate-spin" />
      )}
    </button>
  );
}
