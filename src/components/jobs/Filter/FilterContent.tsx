import { Dispatch, SetStateAction } from "react";

// components
import MultiSelectFilter from "./MultiSelectFilter";

// 3rd party
import { MdOutlineTimer, MdOutlineLocationOn } from "react-icons/md";
import { RiHomeOfficeLine } from "react-icons/ri";

interface FilterContentProps {
  activeTab: string;
  jobType: string[];
  setJobType: Dispatch<SetStateAction<string[]>>;
  jobMode: string[];
  setJobMode: Dispatch<SetStateAction<string[]>>;
  location: string[];
  setLocation: Dispatch<SetStateAction<string[]>>;
}

export function FilterContent({
  activeTab,
  jobType,
  setJobType,
  jobMode,
  setJobMode,
  location,
  setLocation,
}: FilterContentProps) {
  const optionsMap = {
    jobType: {
      placeholder: "Job type",
      options: ["full-time", "part-time", "internship", "contract"],
      value: jobType,
      onChange: setJobType,
      icon: <MdOutlineTimer aria-hidden="true" />,
    },
    jobMode: {
      placeholder: "Job mode",
      options: ["office", "remote", "hybrid", "flexible"],
      value: jobMode,
      onChange: setJobMode,
      icon: <RiHomeOfficeLine aria-hidden="true" />,
    },
    location: {
      placeholder: "Location",
      options: ["pune", "mysore", "noida", "hyderabad", "bengaluru", "chennai"],
      value: location,
      onChange: setLocation,
      icon: <MdOutlineLocationOn aria-hidden="true" />,
    },
  };

  const config = optionsMap[activeTab as keyof typeof optionsMap];

  return (
    <div
      id={`tabpanel-${activeTab}`}
      role="tabpanel"
      aria-labelledby={`tab-${activeTab}`}
      className="h-full p-8"
    >
      <MultiSelectFilter
        placeholder={config.placeholder}
        options={config.options}
        value={config.value}
        icon={config.icon}
        onChange={config.onChange}
      />
    </div>
  );
}
