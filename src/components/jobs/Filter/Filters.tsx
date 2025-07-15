// "use client";

// import { useState, useEffect, Dispatch, SetStateAction } from "react";
// import { useRouter, usePathname, useSearchParams } from "next/navigation";

// // components
// import MultiSelectFilter from "@/components/shared/MultiSelectFilter";

// // 3rd party
// import NProgress from "nprogress";
// import { MdOutlineLocationOn, MdOutlineTimer } from "react-icons/md";
// import { RiHomeOfficeLine } from "react-icons/ri";

// const cities = ["pune", "mysore", "noida", "hyderabad", "bengaluru", "chennai"];
// const jobModes = ["office", "remote", "hybrid", "flexible"];
// const jobTypes = ["full-time", "part-time", "internship", "contract"];

// type TabKey = "jobType" | "jobMode" | "location";

// export default function Filters({
//   isOpen,
//   setIsOpen,
// }: {
//   isOpen: boolean;
//   setIsOpen: Dispatch<SetStateAction<boolean>>;
// }) {
//   const searchParams = useSearchParams();
//   const pathname = usePathname();
//   const router = useRouter();

//   const currentSearch = searchParams.get("search") || "";
//   const currentJobType = searchParams.get("jobType") || "";
//   const currentJobMode = searchParams.get("jobMode") || "";
//   const currentLocation = searchParams.get("location") || "";

//   const [activeTab, setActiveTab] = useState<TabKey>("jobType");

//   const [jobType, setJobType] = useState<string[]>(
//     currentJobType ? currentJobType.split(",") : []
//   );
//   const [jobMode, setJobMode] = useState<string[]>(
//     currentJobMode ? currentJobMode.split(",") : []
//   );
//   const [location, setLocation] = useState<string[]>(
//     currentLocation ? currentLocation.split(",") : []
//   );

//   // Reset filters and active tab on modal open
//   useEffect(() => {
//     if (isOpen) {
//       const jobTypeFromUrl = searchParams.get("jobType") || "";
//       const jobModeFromUrl = searchParams.get("jobMode") || "";
//       const locationFromUrl = searchParams.get("location") || "";

//       setJobType(jobTypeFromUrl ? jobTypeFromUrl.split(",") : []);
//       setJobMode(jobModeFromUrl ? jobModeFromUrl.split(",") : []);
//       setLocation(locationFromUrl ? locationFromUrl.split(",") : []);
//       setActiveTab("jobType");
//     }
//   }, [isOpen, searchParams]);

//   const isFilterChanged =
//     currentJobType !== jobType.join(",") ||
//     currentJobMode !== jobMode.join(",") ||
//     currentLocation !== location.join(",");

//   const buildHref = ({
//     searchValue = currentSearch,
//     locationValue = location,
//     jobTypeValue = jobType,
//     jobModeValue = jobMode,
//   }: {
//     searchValue?: string;
//     locationValue?: string[];
//     jobTypeValue?: string[];
//     jobModeValue?: string[];
//   }) => {
//     const params = new URLSearchParams();

//     if (searchValue) params.set("search", searchValue);
//     if (jobTypeValue.length) params.set("jobType", jobTypeValue.join(","));
//     if (jobModeValue.length) params.set("jobMode", jobModeValue.join(","));
//     if (locationValue.length) params.set("location", locationValue.join(","));

//     return `${pathname}?${params.toString()}`;
//   };

//   const tabConfig: {
//     id: TabKey;
//     label: string;
//     icon: React.ElementType;
//     value: string;
//   }[] = [
//     {
//       id: "jobType",
//       label: "Job type",
//       icon: MdOutlineTimer,
//       value: currentJobType,
//     },
//     {
//       id: "jobMode",
//       label: "Job mode",
//       icon: RiHomeOfficeLine,
//       value: currentJobMode,
//     },
//     {
//       id: "location",
//       label: "Location",
//       icon: MdOutlineLocationOn,
//       value: currentLocation,
//     },
//   ];

//   return (
//     <>
//       <h1 className="font-bold text-xl mb-4">Filters</h1>

//       <aside
//         className="flex flex-col border rounded"
//         aria-labelledby="filters-heading"
//       >
//         <div
//           role="tablist"
//           aria-label="Filter categories"
//           className="w-full grid grid-cols-3 border-b"
//         >
//           {tabConfig.map(({ id, label, icon: Icon, value }) => (
//             <button
//               key={id}
//               type="button"
//               role="tab"
//               id={`${id}-tab`}
//               aria-selected={activeTab === id}
//               aria-controls={`${id}-panel`}
//               onClick={() => setActiveTab(id)}
//               className={`p-4 flex items-center justify-between sm:justify-center cursor-pointer ${
//                 activeTab === id
//                   ? "border-b-2 border-b-primary text-primary pointer-events-none"
//                   : "border-b-2 border-b-transparent hover:bg-dark dark:hover:bg-light transition-colors"
//               } ${id === "jobMode" ? "border-x" : ""}`}
//             >
//               <Icon aria-hidden="true" className="mr-2 w-6 h-6 sm:h-4 sm:w-4" />
//               <span className="font-semibold hidden sm:block">{label}</span>
//               <span className="h-6 w-6 flex items-center justify-center border border-gray-400 dark:border-gray-600 text-primary ml-4 rounded font-medium">
//                 {value ? value.split(",").length : "-"}
//               </span>
//             </button>
//           ))}
//         </div>

//         <div className="h-full p-8">
//           {activeTab === "jobType" && (
//             <div
//               role="tabpanel"
//               id="jobType-panel"
//               aria-labelledby="jobType-tab"
//             >
//               <MultiSelectFilter
//                 placeholder="Job type"
//                 options={jobTypes}
//                 value={jobType}
//                 icon={<MdOutlineTimer aria-hidden="true" />}
//                 onChange={setJobType}
//               />
//             </div>
//           )}

//           {activeTab === "jobMode" && (
//             <div
//               role="tabpanel"
//               id="jobMode-panel"
//               aria-labelledby="jobMode-tab"
//             >
//               <MultiSelectFilter
//                 placeholder="Job mode"
//                 options={jobModes}
//                 value={jobMode}
//                 icon={<RiHomeOfficeLine aria-hidden="true" />}
//                 onChange={setJobMode}
//               />
//             </div>
//           )}

//           {activeTab === "location" && (
//             <div
//               role="tabpanel"
//               id="location-panel"
//               aria-labelledby="location-tab"
//             >
//               <MultiSelectFilter
//                 placeholder="Location"
//                 options={cities}
//                 value={location}
//                 icon={<MdOutlineLocationOn aria-hidden="true" />}
//                 onChange={setLocation}
//               />
//             </div>
//           )}
//         </div>
//       </aside>

//       <button
//         onClick={() => {
//           setIsOpen(false);
//           const href = buildHref({});
//           NProgress.start();
//           router.push(href);
//         }}
//         disabled={!isFilterChanged}
//         className={`w-full mt-4 bg-primary text-light dark:text-dark px-4 py-2 font-medium rounded ${
//           isFilterChanged
//             ? "hover:opacity-80 dark:hover:opacity-90 transition-opacity"
//             : "opacity-60 pointer-events-none"
//         }`}
//       >
//         Apply Filters
//       </button>
//     </>
//   );
// }

// Filters.tsx
"use client";

import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

// components
import { FilterTabs } from "./FilterTabs";
import { FilterContent } from "./FilterContent";
import { ApplyFiltersButton } from "./ApplyFiltersButton";

// 3rd party
import NProgress from "nprogress";

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

  const jobTypeCount = currentJobType ? currentJobType.split(",").length : 0;
  const jobModeCount = currentJobMode ? currentJobMode.split(",").length : 0;
  const jobLocationCount = currentLocation
    ? currentLocation.split(",").length
    : 0;
  const totalFilterCount = jobTypeCount + jobModeCount + jobLocationCount;

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

  const buildHref = () => {
    const params = new URLSearchParams();
    if (currentSearch) params.set("search", currentSearch);
    if (jobType.length) params.set("jobType", jobType.join(","));
    if (jobMode.length) params.set("jobMode", jobMode.join(","));
    if (location.length) params.set("location", location.join(","));
    return `${pathname}?${params.toString()}`;
  };

  const handleApply = () => {
    setIsOpen(false);
    const href = buildHref();
    NProgress.start();
    router.push(href);
  };

  const handleClearFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    // Keep search, remove jobType, jobMode, location
    params.delete("jobType");
    params.delete("jobMode");
    params.delete("location");

    setIsOpen(false);
    NProgress.start();
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <div
        id="filters-heading"
        className="flex items-center justify-between mb-4"
      >
        <h1 className="font-semibold text-xl flex items-center">
          <span>Filters</span>
          <span
            className="h-5 w-5 sm:h-6 sm:w-6 ml-4 flex items-center justify-center border border-gray-400 dark:border-gray-600 text-primary rounded-md font-medium text-xs sm:text-sm"
            aria-hidden="true"
          >
            {totalFilterCount || "-"}
          </span>
        </h1>
        {totalFilterCount > 0 && (
          <button
            type="button"
            onClick={handleClearFilters}
            className="px-3 py-1 rounded-full bg-red-600 text-white hover:bg-red-500  dark:bg-red-900 dark:hover:bg-red-800 transition-colors"
            aria-label="Clear all filters"
          >
            Clear All
          </button>
        )}
      </div>

      <aside
        className="flex flex-col border rounded"
        aria-labelledby="filters-heading"
      >
        {/* Accessible Tabs */}
        <FilterTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          // counts={{
          //   jobType: jobType.length,
          //   jobMode: jobMode.length,
          //   location: location.length,
          // }}
          counts={{
            jobType: currentJobType ? currentJobType.split(",").length : 0,
            jobMode: currentJobMode ? currentJobMode.split(",").length : 0,
            location: currentLocation ? currentLocation.split(",").length : 0,
          }}
        />

        {/* Tab Panels */}
        <FilterContent
          activeTab={activeTab}
          jobType={jobType}
          setJobType={setJobType}
          jobMode={jobMode}
          setJobMode={setJobMode}
          location={location}
          setLocation={setLocation}
        />
      </aside>

      <ApplyFiltersButton
        isFilterChanged={isFilterChanged}
        onApply={handleApply}
      />
    </>
  );
}
