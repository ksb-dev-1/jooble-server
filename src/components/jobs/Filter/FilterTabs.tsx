// 3rd party
import { MdOutlineTimer, MdOutlineLocationOn } from "react-icons/md";
import { RiHomeOfficeLine } from "react-icons/ri";

interface FilterTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  counts: { jobType: number; jobMode: number; location: number };
}

export function FilterTabs({
  activeTab,
  setActiveTab,
  counts,
}: FilterTabsProps) {
  const tabs = [
    {
      id: "jobType",
      label: "Job type",
      icon: (
        <MdOutlineTimer aria-hidden="true" className="h-5 w-5 sm:w-4 sm:h-4" />
      ),
    },
    {
      id: "jobMode",
      label: "Job mode",
      icon: (
        <RiHomeOfficeLine
          aria-hidden="true"
          className="h-5 w-5 sm:w-4 sm:h-4"
        />
      ),
    },
    {
      id: "location",
      label: "Location",
      icon: (
        <MdOutlineLocationOn
          aria-hidden="true"
          className="h-5 w-5 sm:w-4 sm:h-4"
        />
      ),
    },
  ];

  return (
    <div
      role="tablist"
      aria-label="Filter categories"
      className="w-full grid grid-cols-3 border-b"
    >
      {tabs.map(({ id, label, icon }, index) => {
        const isActive = activeTab === id;
        return (
          <button
            key={id}
            id={`tab-${id}`}
            role="tab"
            type="button"
            aria-selected={isActive}
            aria-controls={`tabpanel-${id}`}
            onClick={() => setActiveTab(id)}
            className={`${
              index === 1 ? "border-x" : ""
            } p-4 flex items-center justify-between cursor-pointer
              ${
                isActive
                  ? "border-b-2 border-b-primary text-primary pointer-events-none"
                  : "border-b-2 border-b-transparent hover:bg-dark dark:hover:bg-light transition-colors"
              }`}
          >
            <p className="flex items-center">
              {icon}
              <span className="font-semibold hidden sm:block ml-2">
                {label}
              </span>
            </p>
            <span
              className="h-5 w-5 sm:h-6 sm:w-6 ml-4 flex items-center justify-center border border-gray-400 dark:border-gray-600 text-primary rounded-md font-medium text-xs sm:text-sm"
              aria-hidden="true"
            >
              {counts[id as keyof typeof counts] || "-"}
            </span>
          </button>
        );
      })}
    </div>
  );
}
