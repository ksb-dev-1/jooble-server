"use client";

import Link from "next/link";
import { forwardRef } from "react";

// components
import ThemeSwitch from "@/components/navbar/ThemeSwitch";

// 3rd party
import { MdOutlineLogin } from "react-icons/md";

interface UnauthenticatedNavProps {
  isHome: boolean;
}

const UnauthenticatedNav = forwardRef<HTMLDivElement, UnauthenticatedNavProps>(
  ({ isHome }, ref) => (
    <div
      ref={ref}
      className="fixed z-30 bg-light dark:bg-dark border-b top-0 left-0 right-0 h-16 flex items-center justify-center"
    >
      <nav
        className="max-w-5xl w-full mx-auto px-4 flex items-center justify-between"
        role="navigation"
        aria-label="Unauthenticated main navigation"
      >
        <Link
          href="/"
          className={`${
            isHome ? "pointer-events-none" : ""
          } text-2xl font-extrabold text-primary`}
        >
          Jooble
        </Link>

        <div className="flex items-center">
          <ThemeSwitch />
          <Link
            href="/sign-in"
            className="ml-4 px-3 py-1 flex items-center font-medium border hover:bg-dark dark:hover:bg-light transition-colors rounded"
          >
            <MdOutlineLogin className="h-4 w-4" />
            <span className="ml-2">Sign in</span>
          </Link>
        </div>
      </nav>
    </div>
  )
);

// ✅ Corrected displayName
UnauthenticatedNav.displayName = "UnauthenticatedNav";

export default UnauthenticatedNav;
