interface ApplyFiltersButtonProps {
  isFilterChanged: boolean;
  onApply: () => void;
}

export function ApplyFiltersButton({
  isFilterChanged,
  onApply,
}: ApplyFiltersButtonProps) {
  return (
    <button
      type="button"
      onClick={onApply}
      disabled={!isFilterChanged}
      className={`w-full bg-primary text-light dark:text-dark px-4 py-2 font-medium rounded ${
        isFilterChanged
          ? "hover:opacity-80 dark:hover:opacity-90 transition-opacity"
          : "opacity-60 pointer-events-none"
      }`}
      aria-disabled={!isFilterChanged}
      aria-label="Apply selected filters"
    >
      Apply Filters
    </button>
  );
}
