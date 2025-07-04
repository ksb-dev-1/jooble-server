import { useEffect, RefObject } from "react";

export function useHandleOutsideClick(
  ref: RefObject<HTMLDivElement | null>,
  setIsOpen: (isOpen: boolean) => void
) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // 🛑 Ignore left-clicks (button === 0)
      if (event.button === 2) return;

      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, setIsOpen]);
}
