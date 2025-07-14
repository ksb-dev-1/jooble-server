"use client";

import { forwardRef } from "react";
import Link from "next/link";

// 3rd party
import ThemeSwitch from "@/components/navbar/ThemeSwitch";

const NavbarLoadingState = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div
      ref={ref}
      className="fixed z-30 bg-light dark:bg-dark border-b top-0 left-0 right-0 h-16 flex items-center justify-center"
    >
      <nav
        role="navigation"
        aria-label="Main navigation"
        aria-busy="true"
        className="max-w-5xl w-full mx-auto px-4 flex items-center justify-between"
      >
        <Link href="#" className="text-2xl font-extrabold text-primary">
          Jooble
        </Link>
        <div className="hidden md:flex items-center space-x-4">
          {["Jobs", "Saved", "Applied"].map((label) => (
            <div key={label} className="skeleton rounded-3xl w-20 py-[3px]">
              {label}
            </div>
          ))}
        </div>
        <div className="flex items-center space-x-4">
          <ThemeSwitch />
          <div className="skeleton h-8 w-8 rounded-full"></div>
        </div>
      </nav>
    </div>
  );
});
NavbarLoadingState.displayName = "NavbarLoadingState";

export default NavbarLoadingState;
