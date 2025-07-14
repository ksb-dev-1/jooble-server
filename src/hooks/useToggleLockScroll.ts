import { useEffect } from "react";

export function useToggleLockScroll(isOpen: boolean) {
  useEffect(() => {
    if (isOpen) {
      // Lock scroll
      document.body.style.overflow = "hidden";
    } else {
      // Unlock scroll
      document.body.style.overflow = "";
    }

    // On unmount: unlock scroll just in case
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);
}
