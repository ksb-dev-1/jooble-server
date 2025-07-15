"use client";

import { forwardRef, useState } from "react";

import { NAV_LINKS, NavLink } from "./Navbar";

// components
import LinkWithProgress from "@/components/shared/LinkWithProgress";
import SideNav from "./SideNav";
import ThemeSwitch from "./ThemeSwitch";
import UserProfile from "./UserProfile";

// 3rd party
import { Session } from "next-auth";
import { MdMenu } from "react-icons/md";

interface AuthenticatedNavProps {
  session: Session | null;
  isHome: boolean;
}

const AuthenticatedNav = forwardRef<HTMLDivElement, AuthenticatedNavProps>(
  ({ session, isHome }, ref) => {
    const [isSideNavOpen, setIsSideNavOpen] = useState(false);
    const image = session?.user.image;

    return (
      <>
        <div
          ref={ref}
          className="navbar-fixed fixed z-30 bg-light dark:bg-dark border-b top-0 left-0 w-full h-16 flex items-center justify-center"
        >
          <nav className="max-w-5xl w-full mx-auto px-4 flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => setIsSideNavOpen((prev) => !prev)}
                className="md:hidden border p-2 rounded mr-4 cursor-pointer hover:bg-dark dark:hover:bg-light transition-colors"
                aria-label="Open menu"
                aria-expanded={isSideNavOpen}
                aria-controls="side-navigation"
              >
                <MdMenu className="h-5 w-5" aria-hidden="true" />
              </button>

              <LinkWithProgress
                href="/"
                className={`${
                  isHome ? "pointer-events-none" : ""
                } text-2xl font-extrabold text-primary hover:opacity-80 dark:hover:opacity-90 transition-opacity`}
              >
                Glassdoor
              </LinkWithProgress>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.href}
                  linkPath={link.href}
                  matchPath={link.matchPath}
                  text={link.text}
                />
              ))}
            </div>
            <div className="flex items-center space-x-4">
              <ThemeSwitch />
              <UserProfile image={image} />
            </div>
          </nav>
        </div>
        <SideNav
          isHome={isHome}
          isOpen={isSideNavOpen}
          onClose={() => setIsSideNavOpen(false)}
        />
      </>
    );
  }
);
AuthenticatedNav.displayName = "AuthenticatedNav";

export default AuthenticatedNav;
