import { useEffect } from "react";

export const useAutoCloseOnGreaterThanEqualToBreakpoint = (
  isOpen: boolean,
  setIsOpen: (open: boolean) => void,
  breakpoint: number = 768
) => {
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= breakpoint && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen, setIsOpen, breakpoint]);
};
