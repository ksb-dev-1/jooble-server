"use client";

import { useEffect, RefObject } from "react";

export const useHeaderShadowOnScroll = (
  navbarRef: RefObject<HTMLDivElement | null>
): void => {
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollpos = window.scrollY;

      if (currentScrollpos === 0) {
        navbarRef.current!.style.boxShadow = "none";
      } else {
        navbarRef.current!.style.boxShadow = "0px 0px 25px rgba(30,10,58,0.2)";
      }
    };

    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [navbarRef]);
};
