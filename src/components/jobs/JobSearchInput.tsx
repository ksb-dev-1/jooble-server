"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

// 3rd party
import NProgress from "nprogress";
import { MdSearch } from "react-icons/md";

export default function JobSearchInput() {
  const searchParams = useSearchParams();
  const currentSearch = searchParams.get("search") || "";
  const [search, setSearch] = useState(currentSearch);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setSearch(currentSearch || "");
  }, [currentSearch]);

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && search.trim()) {
      e.preventDefault();

      const params = new URLSearchParams(searchParams.toString());
      params.set("search", search.trim());

      NProgress.start();
      router.push(`${pathname}?${params.toString()}`);
    }
  };

  return (
    <div className="relative w-full flex items-center">
      <input
        type="text"
        value={search}
        placeholder="Enter company or job title"
        aria-label="Search jobs by title or company"
        role="searchbox"
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleSearchKeyDown}
        className="hidden sm:block w-full px-4 py-2 bg-light dark:bg-dark border rounded placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
      />
      <input
        type="text"
        value={search}
        placeholder="Company or Job title"
        aria-label="Search jobs by title or company"
        role="searchbox"
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleSearchKeyDown}
        className="sm:hidden w-full px-4 py-2 bg-light dark:bg-dark border rounded placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
      />
      <button className="absolute right-0 px-2 md:px-4 h-[41.6px] font-semibold flex items-center justify-center rounded-tr rounded-br border-l text-primary hover:bg-dark dark:hover:bg-light transition-colors">
        <MdSearch className="text-primary h-5 w-5 mr-2" />
        <span className="hidden sm:block">Find Jobs</span>
      </button>
    </div>
  );
}
