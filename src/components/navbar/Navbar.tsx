"use client";

import { useState, useRef, forwardRef } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

// Hooks
import { useHeaderShadowOnScroll } from "@/hooks/useHeaderShadowOnScroll";
import { useHandleOutsideClick } from "@/hooks/useHandleOutsideClick";
import { useAutoCloseOnGreaterThanEqualToBreakpoint } from "@/hooks/useAutoCloseOnGreaterThanEqualToBreakPoint";

// Components
import Link from "@/components/LinkWithProgress";
import ThemeSwitch from "./ThemeSwitch";

// 3rd party
import { Session } from "next-auth";
import { useSession, signOut } from "next-auth/react";
import { FaRegUser } from "react-icons/fa";
import { MdMenu, MdOutlineLogin, MdOutlineLogout } from "react-icons/md";

// Constants
const NAV_LINKS = [
  {
    href: "/jobs?page=1",
    matchPath: "/jobs",
    text: "Jobs",
  },
  {
    href: "/jobs/saved",
    matchPath: "/jobs/saved",
    text: "Saved",
  },
  {
    href: "/jobs/applied",
    matchPath: "/jobs/applied",
    text: "Applied",
  },
] as const;

interface NavLinkProps {
  linkPath: string;
  matchPath: string;
  text: string;
  onClick?: () => void;
  isMobile?: boolean;
}

const NavLink = ({
  linkPath,
  matchPath,
  text,
  onClick,
  isMobile = false,
}: NavLinkProps) => {
  const path = usePathname();
  const isActive = path === matchPath;

  const baseClasses = isMobile
    ? "w-full flex items-center px-4 py-2 rounded transition-colors font-semibold"
    : "border-b-2 font-medium h-16 flex items-center";

  const activeClasses = isMobile
    ? "text-primary pointer-events-none"
    : "text-primary border-primary pointer-events-none";

  const inactiveClasses = isMobile
    ? "hover:bg-dark dark:hover:bg-light"
    : "border-transparent hover:border-[#999]";

  return (
    <Link
      href={linkPath}
      onClick={onClick}
      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
      aria-current={isActive ? "page" : undefined}
    >
      {text}
    </Link>
  );
};

// ----- USER PROFILE -----
interface UserProfileProps {
  image: string | null | undefined;
}

const UserProfile = ({ image }: UserProfileProps) => {
  const [isProfileModalOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useHandleOutsideClick(profileRef, setIsProfileOpen);

  const toggleOpen = () => setIsProfileOpen((prev) => !prev);

  return (
    <div ref={profileRef} className="relative">
      {image ? (
        <Image
          src={image}
          alt="User Avatar"
          height={32}
          width={32}
          priority
          sizes="(max-width: 768px) 100vw, 33vw"
          onClick={toggleOpen}
          className="object-cover rounded-full cursor-pointer"
        />
      ) : (
        <div
          className="relative h-8 w-8 rounded-full cursor-pointer bg-dark dark:bg-light"
          onClick={toggleOpen}
        >
          <FaRegUser className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text" />
        </div>
      )}
      <div
        className={`${
          isProfileModalOpen
            ? "scale-100 opacity-100 pointer-events-auto"
            : "scale-95 opacity-0 pointer-events-none"
        } origin-top-right absolute right-0 mt-2 rounded bg-light dark:bg-dark shadow-xl border p-2 flex flex-col w-max transition-all`}
      >
        <Link
          href="/profile"
          onClick={toggleOpen}
          className="px-4 py-2 flex items-center hover:bg-dark dark:hover:bg-light transition-colors rounded"
        >
          <FaRegUser className="h-4 w-4" />
          <span className="ml-3 font-medium">Profile</span>
        </Link>
        <button
          onClick={() => {
            signOut();
            toggleOpen();
          }}
          className="px-4 py-2 flex items-center hover:bg-dark dark:hover:bg-light transition-colors rounded"
        >
          <MdOutlineLogout className="h-4 w-4" />
          <span className="ml-3 font-medium">Sign out</span>
        </button>
      </div>
    </div>
  );
};

// ----- SIDE NAVBAR -----
interface SideNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideNav = ({ isOpen, onClose }: SideNavProps) => {
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
            <Link
              href="/"
              onClick={onClose}
              className="text-2xl font-extrabold text-primary rounded hover:tracking-wider transition-all"
            >
              Jooble
            </Link>
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
};

// ----- LOADING STATE NAVBAR -----
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
        <Link href="/" className="text-2xl font-extrabold text-primary">
          Jooble
        </Link>
        <div className="hidden md:flex items-center space-x-4">
          {["Jobs", "Saved", "Applied"].map((label) => (
            <div key={label} className="skeleton rounded w-20 py-1">
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

// ----- AUTHENTICATED NAVBAR -----
interface AuthenticatedNavbarProps {
  session: Session | null;
}
const AuthenticatedNavbar = forwardRef<
  HTMLDivElement,
  AuthenticatedNavbarProps
>(({ session }, ref) => {
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
      <SideNav isOpen={isSideNavOpen} onClose={() => setIsSideNavOpen(false)} />
    </>
  );
});
AuthenticatedNavbar.displayName = "AuthenticatedNavbar";

// ----- UNAUTHENTICATED NAVBAR -----
const UnauthenticatedNavbar = forwardRef<HTMLDivElement>((_, ref) => (
  <div
    ref={ref}
    className="fixed z-30 bg-light dark:bg-dark border-b top-0 left-0 right-0 h-16 flex items-center justify-center"
  >
    <nav className="max-w-5xl w-full mx-auto px-4 flex items-center justify-between">
      <Link href="/" className="text-2xl font-extrabold text-primary">
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
));
UnauthenticatedNavbar.displayName = "UnauthenticatedNavbar";

// ----- NAVBAR -----
export default function Navbar() {
  const navbarRef = useRef<HTMLDivElement>(null);
  const { data: session, status } = useSession();

  useHeaderShadowOnScroll(navbarRef);

  if (status === "loading") return <NavbarLoadingState ref={navbarRef} />;
  if (session?.user.id)
    return <AuthenticatedNavbar session={session} ref={navbarRef} />;
  return <UnauthenticatedNavbar ref={navbarRef} />;
}
