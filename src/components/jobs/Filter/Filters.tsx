"use client";

import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

// components
import { FilterTabs } from "./FilterTabs";
import { FilterContent } from "./FilterContent";
import { ApplyFiltersButton } from "./ApplyFiltersButton";

// 3rd party
import NProgress from "nprogress";
import { MdOutlineClose } from "react-icons/md";

interface FiltersProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Filters({ isOpen, setIsOpen }: FiltersProps) {
  const [activeTab, setActiveTab] = useState<string>("jobType");
  const [jobType, setJobType] = useState<string[]>([]);
  const [jobMode, setJobMode] = useState<string[]>([]);
  const [location, setLocation] = useState<string[]>([]);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  // Get params from URL
  const currentSearch = searchParams.get("search") || "";
  const currentJobType = searchParams.get("jobType") || "";
  const currentJobMode = searchParams.get("jobMode") || "";
  const currentLocation = searchParams.get("location") || "";

  const isFilterSelected = jobType.length || jobMode.length || location.length;

  // Reset to default values when open
  useEffect(() => {
    if (isOpen) {
      setJobType(currentJobType ? currentJobType.split(",") : []);
      setJobMode(currentJobMode ? currentJobMode.split(",") : []);
      setLocation(currentLocation ? currentLocation.split(",") : []);
      setActiveTab("jobType");
    }
  }, [isOpen, currentJobType, currentJobMode, currentLocation]);

  const isFilterChanged =
    currentJobType !== jobType.join(",") ||
    currentJobMode !== jobMode.join(",") ||
    currentLocation !== location.join(",");

  // Build href
  const buildHref = () => {
    const params = new URLSearchParams();
    if (currentSearch) params.set("search", currentSearch);
    if (jobType.length) params.set("jobType", jobType.join(","));
    if (jobMode.length) params.set("jobMode", jobMode.join(","));
    if (location.length) params.set("location", location.join(","));
    return `${pathname}?${params.toString()}`;
  };

  // handle apply filters
  const handleApplyFilters = () => {
    setIsOpen(false);
    const href = buildHref();
    NProgress.start();
    router.push(href);
  };

  // Handle clear all
  const handleClearAll = () => {
    setJobType([]);
    setJobMode([]);
    setLocation([]);
  };

  return (
    <>
      {/* Header: Title, Description, Close & Clear */}
      <header id="filters-heading">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h1
              className="text-lg sm:text-xl font-bold"
              id="filters-title"
              role="heading"
              aria-level={1}
            >
              Filters
            </h1>
            {isFilterSelected > 0 && (
              <div className="flex items-center">
                <p className="border-l-2 h-5 mx-4"></p>
                <button
                  type="button"
                  onClick={handleClearAll}
                  className="text-red-600 dark:text-red-400"
                  aria-label="Clear all applied filters"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => setIsOpen(false)}
            type="button"
            aria-label="Close filter panel"
            className="p-1 rounded hover:bg-muted"
          >
            <MdOutlineClose className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </header>

      {/* Filter Tabs + Panels */}
      <section
        className="flex flex-col border rounded my-4"
        aria-labelledby="filters-heading"
        aria-describedby="filters-description"
      >
        <FilterTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          counts={{
            jobType: jobType.length,
            jobMode: jobMode.length,
            location: location.length,
          }}
        />

        <FilterContent
          activeTab={activeTab}
          jobType={jobType}
          setJobType={setJobType}
          jobMode={jobMode}
          setJobMode={setJobMode}
          location={location}
          setLocation={setLocation}
        />
      </section>

      {/* Apply Button */}
      <ApplyFiltersButton
        disabled={!isFilterChanged}
        onClick={handleApplyFilters}
        className="px-4 h-[41.6px]"
      />
    </>
  );
}
