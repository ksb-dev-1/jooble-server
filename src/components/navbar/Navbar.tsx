"use client";

import { useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Hooks
import { useHeaderShadowOnScroll } from "@/hooks/useHeaderShadowOnScroll";

// Components
import NavbarLoadingState from "@/components/navbar/NavLoadingState";
import AuthenticatedNav from "@/components/navbar/AuthenticatedNav";
import UnauthenticatedNav from "@/components/navbar/UnauthenticatedNav";

// 3rd party
import { useSession } from "next-auth/react";

// Constants
export const NAV_LINKS = [
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

export const NavLink = ({
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

// ----- NAVBAR -----
export default function Navbar() {
  const navbarRef = useRef<HTMLDivElement>(null);
  const { data: session, status } = useSession();

  useHeaderShadowOnScroll(navbarRef);

  if (status === "loading") return <NavbarLoadingState ref={navbarRef} />;
  if (session?.user.id)
    return <AuthenticatedNav session={session} ref={navbarRef} />;
  return <UnauthenticatedNav ref={navbarRef} />;
}
