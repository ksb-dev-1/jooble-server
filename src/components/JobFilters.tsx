"use client";

import { useState, useEffect, useRef, useTransition } from "react";

// actions
import { applyFiltersServerAction } from "@/actions/apply-filters-server-action";

// components
import MultiSelectFilter from "@/components/shared/MultiSelectFilter";

// 3rd party
import { MdSearch, MdOutlineLocationOn, MdOutlineTimer } from "react-icons/md";
import { RiHomeOfficeLine } from "react-icons/ri";

const cities = ["pune", "mysore", "noida", "hyderabad", "bengaluru", "chennai"];
const jobModes = ["office", "remote", "hybrid", "flexible"];
const jobTypes = ["full-time", "part-time", "internship", "contract"];

interface JobFilterProps {
  currentSearch?: string;
  currentLocation?: string;
  currentJobType?: string;
  currentJobMode?: string;
}

export default function JobFilters({
  currentSearch,
  currentLocation,
  currentJobType,
  currentJobMode,
}: JobFilterProps) {
  const [search, setSearch] = useState(currentSearch || "");
  const [location, setLocation] = useState<string[]>(
    currentLocation ? currentLocation.split(",") : []
  );
  const [jobType, setJobType] = useState<string[]>(
    currentJobType ? currentJobType.split(",") : []
  );
  const [jobMode, setJobMode] = useState<string[]>(
    currentJobMode ? currentJobMode.split(",") : []
  );

  const formRef = useRef<HTMLFormElement>(null);

  const [, startTransition] = useTransition();

  useEffect(() => {
    setSearch(currentSearch || "");
    setLocation(currentLocation ? currentLocation.split(",") : []);
    setJobType(currentJobType ? currentJobType.split(",") : []);
    setJobMode(currentJobMode ? currentJobMode.split(",") : []);
  }, [currentSearch, currentLocation, currentJobType, currentJobMode]);

  const submitFormWithValues = ({
    searchValue = search,
    locationValue = location,
    jobTypeValue = jobType,
    jobModeValue = jobMode,
  }: {
    searchValue?: string;
    locationValue?: string[];
    jobTypeValue?: string[];
    jobModeValue?: string[];
  }) => {
    if (!formRef.current) return;

    const form = formRef.current;

    (form.elements.namedItem("search") as HTMLInputElement).value = searchValue;
    (form.elements.namedItem("location") as HTMLInputElement).value =
      locationValue.join(",");
    (form.elements.namedItem("jobType") as HTMLInputElement).value =
      jobTypeValue.join(",");
    (form.elements.namedItem("jobMode") as HTMLInputElement).value =
      jobModeValue.join(",");

    startTransition(() => {
      form.requestSubmit();
    });
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && search.trim()) {
      e.preventDefault();
      submitFormWithValues({ searchValue: search });
    }
  };

  return (
    <aside
      className="bg-light dark:bg-dark border rounded p-4 w-[275px]"
      aria-labelledby="filter-heading"
    >
      <form
        ref={formRef}
        action={applyFiltersServerAction}
        className="hidden"
        aria-hidden="true"
      >
        <input type="hidden" name="search" value={search} />
        <input type="hidden" name="location" value={location.join(",")} />
        <input type="hidden" name="jobType" value={jobType.join(",")} />
        <input type="hidden" name="jobMode" value={jobMode.join(",")} />
      </form>

      <h2 id="filter-heading" className="font-semibold">
        Search & Filters
      </h2>

      {/* Search input */}
      <div className="relative w-full mt-4">
        <MdSearch
          className="absolute left-2 top-1/2 transform -translate-y-1/2 text-primary"
          aria-hidden="true"
        />
        <input
          type="text"
          value={search}
          placeholder="Company or job title"
          aria-label="Search jobs by title or company"
          role="searchbox"
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleSearchKeyDown}
          className="w-full pl-8 pr-4 py-2 bg-light dark:bg-dark border rounded placeholder:text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
        />
      </div>

      {/* Filters */}
      <MultiSelectFilter
        placeholder="Job Type"
        options={jobTypes}
        value={jobType}
        icon={<MdOutlineTimer aria-hidden="true" />}
        onChange={(val) => {
          setJobType(val);
          submitFormWithValues({ jobTypeValue: val });
        }}
        widthClass="w-full"
      />

      <MultiSelectFilter
        placeholder="Job Mode"
        options={jobModes}
        value={jobMode}
        icon={<RiHomeOfficeLine aria-hidden="true" />}
        onChange={(val) => {
          setJobMode(val);
          submitFormWithValues({ jobModeValue: val });
        }}
        widthClass="w-full"
      />

      <MultiSelectFilter
        placeholder="Location"
        options={cities}
        value={location}
        icon={<MdOutlineLocationOn aria-hidden="true" />}
        onChange={(val) => {
          setLocation(val);
          submitFormWithValues({ locationValue: val });
        }}
        widthClass="w-full"
      />
    </aside>
  );
}
