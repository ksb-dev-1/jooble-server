// 3rd party
import clsx from "clsx";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdOutlineSend } from "react-icons/md";

interface ApplyForJobButtonProps {
  onClick: () => void;
  disabled: boolean;
  isPending: boolean;
  className?: string;
}

export default function ApplyForJobButton({
  onClick,
  disabled,
  isPending,
  className,
}: ApplyForJobButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "btn-primary relative",
        disabled ? "btn-primary-disabled" : "btn-primary-hover",
        className
      )}
      aria-busy={isPending}
      disabled={isPending}
    >
      Click here to apply
      <MdOutlineSend className="ml-2" aria-hidden="true" />
      {isPending && (
        <AiOutlineLoading3Quarters
          className="absolute right-4 animate-spin"
          aria-hidden="true"
        />
      )}
    </button>
  );
}
