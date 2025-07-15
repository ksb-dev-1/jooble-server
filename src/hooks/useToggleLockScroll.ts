// import { useEffect } from "react";

// export function useToggleLockScroll(isOpen: boolean) {
//   useEffect(() => {
//     const scrollbarWidth =
//       window.innerWidth - document.documentElement.clientWidth;

//     if (isOpen) {
//       // Lock scroll
//       document.body.style.overflow = "hidden";
//       document.body.style.paddingRight = `${scrollbarWidth}px`;
//       document.body.style.pointerEvents = "none";
//     } else {
//       // Unlock scroll
//       document.body.style.overflow = "";
//       document.body.style.paddingRight = "";
//       document.body.style.pointerEvents = "";
//     }

//     // On unmount: unlock scroll just in case
//     return () => {
//       document.body.style.overflow = "";
//       document.body.style.paddingRight = "";
//       document.body.style.pointerEvents = "";
//     };
//   }, [isOpen]);
// }

import { useEffect } from "react";

export function useToggleLockScroll(isOpen: boolean) {
  useEffect(() => {
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    const navbar = document.querySelector(
      ".navbar-fixed"
    ) as HTMLElement | null;

    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.style.pointerEvents = "none";

      if (navbar) {
        navbar.style.paddingRight = `${scrollbarWidth}px`;
      }
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      document.body.style.pointerEvents = "";

      if (navbar) {
        navbar.style.paddingRight = "";
      }
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      document.body.style.pointerEvents = "";

      if (navbar) {
        navbar.style.paddingRight = "";
      }
    };
  }, [isOpen]);
}
