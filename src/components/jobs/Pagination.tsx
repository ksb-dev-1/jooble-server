"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// 3rd party
import { GrFormPrevious, GrFormNext } from "react-icons/gr";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({
  currentPage,
  totalPages,
}: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [inputPage, setInputPage] = useState<string>("");

  const updatePage = (page: number) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const pageNum = Math.max(1, Math.min(Number(inputPage), totalPages));
    updatePage(pageNum);
  };

  return (
    <nav
      className="flex items-center justify-between gap-4"
      role="navigation"
      aria-label="Pagination Navigation"
    >
      <button
        onClick={() => updatePage(currentPage - 1)}
        disabled={currentPage <= 1}
        className="bg-primary text-light dark:text-dark hover:opacity-80 dark:hover:opacity-90 transition-opacity rounded p-2 sm:pl-2 sm:pr-4 py-2 flex items-center disabled:opacity-40 disabled:pointer-events-none"
        aria-label="Go to previous page"
      >
        <GrFormPrevious className="h-5 w-5 sm:mr-1" />
        <span className="hidden sm:block font-medium">Prev</span>
      </button>

      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2"
        aria-label="Jump to specific page"
      >
        <label htmlFor="jump-to-page" className="sr-only">
          Jump to page
        </label>
        <span className="text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <input
          id="jump-to-page"
          type="number"
          min={1}
          max={totalPages}
          value={inputPage}
          onChange={(e) => setInputPage(e.target.value)}
          className="min-w-24 px-4 py-2 bg-light dark:bg-dark border rounded text-center focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
          //placeholder="Jump to"
          aria-label="Enter page number to jump"
        />
        <button
          type="submit"
          className="bg-primary text-light dark:text-dark hover:opacity-80 dark:hover:opacity-90 transition-opacity rounded px-4 py-2 font-medium"
          aria-label={`Jump to page ${inputPage || ""}`}
        >
          Go
        </button>
      </form>

      <button
        onClick={() => updatePage(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="bg-primary text-light dark:text-dark hover:opacity-80 dark:hover:opacity-90 transition-opacity rounded p-2 sm:pl-4 py-2 flex items-center disabled:opacity-40 disabled:pointer-events-none"
        aria-label="Go to next page"
      >
        <span className="hidden sm:block font-medium">Next</span>
        <GrFormNext className="h-5 w-5 sm:ml-1" />
      </button>
    </nav>
  );
}
