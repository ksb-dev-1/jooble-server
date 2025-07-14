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
      <MdSearch
        className="hidden md:block absolute left-4 top-1/2 transform -translate-y-1/2 text-primary h-6 w-6"
        aria-hidden="true"
      />
      <input
        type="text"
        value={search}
        placeholder="Enter company or job title"
        aria-label="Search jobs by title or company"
        role="searchbox"
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleSearchKeyDown}
        className="hidden sm:block w-full pl-2 md:pl-12 pr-4 py-2 bg-light dark:bg-dark border rounded placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
      />
      <input
        type="text"
        value={search}
        placeholder="Company or Job title"
        aria-label="Search jobs by title or company"
        role="searchbox"
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleSearchKeyDown}
        className="sm:hidden w-full pl-2 md:pl-12 pr-4 py-2 bg-light dark:bg-dark border rounded placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
      />
      <button className="absolute right-0 px-2 md:px-4 h-[41.6px] font-medium flex items-center justify-center rounded-tr rounded-br bg-primary text-light dark:text-dark hover:opacity-80 dark:hover:opacity-90 transition-opacity">
        <span className="hidden md:block"> Find Jobs</span>
        <MdSearch className="md:hidden text-light dark:text-dark h-5 w-5" />
      </button>
    </div>
  );
}
