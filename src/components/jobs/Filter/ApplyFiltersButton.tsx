// 3rd party
import clsx from "clsx";

interface ApplyFiltersButtonProps {
  disabled: boolean;
  onClick: () => void;
  className?: string;
}

export function ApplyFiltersButton({
  disabled,
  onClick,
  className,
}: ApplyFiltersButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled}
      aria-label="Apply selected filters"
      className={clsx(
        "btn-primary relative",
        disabled ? "btn-primary-disabled" : "btn-primary-hover",
        className
      )}
    >
      Apply Filters
    </button>
  );
}
