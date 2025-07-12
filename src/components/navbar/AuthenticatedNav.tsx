"use client";

import { forwardRef, useState } from "react";
import Link from "next/link";

import { NAV_LINKS, NavLink } from "@/components/navbar/Navbar";

// components
import SideNav from "@/components/navbar/SideNav";
import ThemeSwitch from "@/components/navbar/ThemeSwitch";
import UserProfile from "@/components/navbar/UserProfile";

// 3rd party
import { Session } from "next-auth";
import { MdMenu } from "react-icons/md";

interface AuthenticatedNavProps {
  session: Session | null;
}
const AuthenticatedNav = forwardRef<HTMLDivElement, AuthenticatedNavProps>(
  ({ session }, ref) => {
    const [isSideNavOpen, setIsSideNavOpen] = useState(false);
    const image = session?.user.image;

    return (
      <>
        <div
          ref={ref}
          className="fixed z-30 bg-light dark:bg-dark border-b top-0 left-0 right-0 h-16 flex items-center justify-center"
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

              <Link href="/" className="text-2xl font-extrabold text-primary">
                Jooble
              </Link>
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
          isOpen={isSideNavOpen}
          onClose={() => setIsSideNavOpen(false)}
        />
      </>
    );
  }
);
AuthenticatedNav.displayName = "AuthenticatedNav";

export default AuthenticatedNav;
