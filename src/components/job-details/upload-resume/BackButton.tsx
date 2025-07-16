import { MdArrowBack } from "react-icons/md";

export default function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center text-primary font-medium"
      aria-label="Go back to previous screen"
    >
      <MdArrowBack className="mr-1" aria-hidden="true" />
      Back
    </button>
  );
}
