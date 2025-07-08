import {
  Dispatch,
  forwardRef,
  SetStateAction,
  useEffect,
  useCallback,
} from "react";

// hooks
import { useHandleOutsideClick } from "@/hooks/useHandleOutsideClick";

interface ModalProps {
  children: React.ReactNode;
  isOpen?: boolean;
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
        className={`z-30 fixed inset-0 flex items-center justify-center px-4 ${
          isOpen
            ? "scale-100 opacity-100 pointer-events-auto"
            : "scale-95 opacity-0 pointer-events-none"
        } backdrop-blur-sm bg-modal`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledById}
      >
        <div
          ref={ref}
          className={`max-w-[500px] w-full transform rounded bg-light dark:bg-dark border-2 shadow-xl transition-transform duration-200 ${
            isOpen ? "scale-100" : "scale-75"
          } p-4 md:p-8`}
        >
          {children}
        </div>
      </div>
    );
  }
);

Modal.displayName = "Modal";

export default Modal;
