"use client";

import { useState, useRef } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

// hooks
import { useHandleOutsideClick } from "@/hooks/useHandleOutsideClick";
import { useToggleLockScroll } from "@/hooks/useToggleLockScroll";

// components
import Link from "@/components/shared/LinkWithProgress";

// 3rd party
import { signOut } from "next-auth/react";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";

interface UserProfileProps {
  image: string | null | undefined;
}

export default function UserProfile({ image }: UserProfileProps) {
  const [isProfileModalOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const path = usePathname();
  const isProfile = path === "/profile";

  useToggleLockScroll(isProfileModalOpen);
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
          role="button"
          aria-label="Open profile menu"
          tabIndex={0}
        >
          <FaRegUser className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text" />
        </div>
      )}
      <div
        className={`${
          isProfileModalOpen
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "translate-y-3 opacity-0 pointer-events-none"
        } origin-top-right absolute right-0 mt-2 rounded bg-light dark:bg-dark shadow-xl border-2 p-2 flex flex-col w-max transition-all`}
        role="menu"
        aria-label="User menu"
      >
        <Link
          href="/profile"
          onClick={toggleOpen}
          className={`${
            isProfile ? "pointer-events-none" : ""
          } px-4 py-2 flex items-center hover:bg-dark dark:hover:bg-light transition-colors rounded`}
          role="menuitem"
        >
          <FaRegUser className="h-4 w-4" />
          <span className="ml-3">Profile</span>
        </Link>
        <button
          onClick={() => {
            signOut();
            toggleOpen();
          }}
          className="px-4 py-2 flex items-center hover:bg-dark dark:hover:bg-light transition-colors rounded"
          role="menuitem"
        >
          <MdOutlineLogout className="h-4 w-4" />
          <span className="ml-3">Sign out</span>
        </button>
      </div>
    </div>
  );
}
