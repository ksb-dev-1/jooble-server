"use client";

import { useRef } from "react";

// components
import LinkWithProgress from "@/components/shared/LinkWithProgress";

// hooks
import { useAutoCloseOnGreaterThanEqualToBreakpoint } from "@/hooks/useAutoCloseOnGreaterThanEqualToBreakPoint";
import { useHandleOutsideClick } from "@/hooks/useHandleOutsideClick";
import { NAV_LINKS, NavLink } from "@/components/navbar/Navbar";

interface SideNavProps {
  isHome: boolean;
  isOpen: boolean;
  onClose: () => void;
}

export default function SideNav({ isOpen, onClose, isHome }: SideNavProps) {
  const sideNavRef = useRef<HTMLDivElement>(null);

  useHandleOutsideClick(sideNavRef, onClose);
  useAutoCloseOnGreaterThanEqualToBreakpoint(isOpen, onClose);

  return (
    <div
      className={`${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      } transition-opacity fixed top-0 left-0 right-0 bottom-0 backdrop-blur-sm bg-modal z-30`}
    >
      <nav
        ref={sideNavRef}
        role="navigation"
        aria-label="Mobile side navigation"
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-[100%]"
        } transition-transform absolute top-0 left-0 bottom-0 w-52 bg-light dark:bg-dark border-r z-30`}
      >
        <div className="flex flex-col h-full">
          <div className="w-full border-b h-16 flex items-center justify-start pl-4">
            <LinkWithProgress
              href="/"
              onClick={onClose}
              className={`text-2xl font-extrabold text-primary rounded hover:tracking-wider transition-all ${
                isHome ? "pointer-events-none" : ""
              }`}
            >
              Jooble
            </LinkWithProgress>
          </div>
          <div className="flex flex-col items-start mt-4 px-4 space-y-2">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.href}
                linkPath={link.href}
                matchPath={link.matchPath}
                text={link.text}
                onClick={onClose}
                isMobile
              />
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}
