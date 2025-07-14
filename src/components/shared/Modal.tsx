import {
  Dispatch,
  forwardRef,
  SetStateAction,
  useEffect,
  useCallback,
} from "react";

// hooks
import { useToggleLockScroll } from "@/hooks/useToggleLockScroll";
import { useHandleOutsideClick } from "@/hooks/useHandleOutsideClick";

// 3rd party
import { MdOutlineClose } from "react-icons/md";

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  labelledById?: string; // Optional: ID of the modal title for accessibility
}

const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ children, isOpen, setIsOpen, labelledById }, ref) => {
    useHandleOutsideClick(ref as React.RefObject<HTMLDivElement>, setIsOpen);

    // Handle ESC key to close modal
    const handleKeyDown = useCallback(
      (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setIsOpen(false);
        }
      },
      [setIsOpen]
    );

    useToggleLockScroll(isOpen);

    useEffect(() => {
      if (isOpen) {
        document.addEventListener("keydown", handleKeyDown);
      } else {
        document.removeEventListener("keydown", handleKeyDown);
      }

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, [isOpen, handleKeyDown]);

    return (
      <div
        className={`z-30 fixed inset-0 transition ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } backdrop-blur-sm bg-modal flex items-center justify-center px-4`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledById}
      >
        <div
          ref={ref}
          className={`relative ${
            isOpen ? "translate-y-0" : "translate-y-10"
          } bg-light dark:bg-dark border-2 max-w-2xl w-full mx-auto rounded overflow-hidden transition shadow-xl p-4 md:p-8`}
        >
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-0 right-0 w-8 h-8 rounded-tr rounded-bl bg-red-600 dark:bg-red-900 hover:bg-red-500 dark:hover:bg-red-800 transition-colors"
          >
            <MdOutlineClose className="h-6 w-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white" />
          </button>
          {children}
        </div>
      </div>
    );
  }
);

Modal.displayName = "Modal";

export default Modal;
