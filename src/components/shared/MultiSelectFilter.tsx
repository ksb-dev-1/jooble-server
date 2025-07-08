// "use client";

// import { useRef, useState, useEffect } from "react";

// // hooks
// import { useHandleOutsideClick } from "@/hooks/useHandleOutsideClick";
// import { useAutoCloseOnSmallerThanEqualToBreakpoint } from "@/hooks/useAutoCloseOnSmallerThanEqualToBreakpoint";

// // 3rd party
// import { IoIosCheckmark } from "react-icons/io";

// type MultiSelectFilterProps = {
//   placeholder: string;
//   options: string[];
//   value: string[];
//   icon?: React.ReactNode;
//   onChange: (val: string[]) => void;
//   widthClass?: string;
// };

// const MultiSelectFilter: React.FC<MultiSelectFilterProps> = ({
//   placeholder,
//   options,
//   value,
//   icon,
//   onChange,
//   widthClass = "w-[200px]",
// }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const containerRef = useRef<HTMLDivElement>(null);

//   useHandleOutsideClick(containerRef, setIsOpen);
//   useAutoCloseOnSmallerThanEqualToBreakpoint(isOpen, setIsOpen, 768);

//   const toggleOption = (option: string) => {
//     const newValue = value.includes(option)
//       ? value.filter((val) => val !== option)
//       : [...value, option];
//     onChange(newValue);
//   };

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         containerRef.current &&
//         !containerRef.current.contains(event.target as Node)
//       ) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <div ref={containerRef} className={`mt-8 ${widthClass}`}>
//       {/* Label Section */}
//       <div
//         className="flex items-center gap-2 mb-4 font-medium text-primary"
//         id={`${placeholder.replace(/\s+/g, "-").toLowerCase()}-label`}
//       >
//         {icon && (
//           <span className="text-primary" aria-hidden="true">
//             {icon}
//           </span>
//         )}
//         <span>{placeholder}</span>
//       </div>

//       {/* Options Group */}
//       <div
//         className="flex flex-col gap-2"
//         role="group"
//         aria-labelledby={`${placeholder
//           .replace(/\s+/g, "-")
//           .toLowerCase()}-label`}
//       >
//         {options.map((option) => {
//           const isSelected = value.includes(option);
//           return (
//             <button
//               key={option}
//               type="button"
//               onClick={() => toggleOption(option)}
//               role="checkbox"
//               aria-checked={isSelected}
//               className={`transition-colors w-fit ${
//                 isSelected ? "" : "hover:text-primary"
//               } flex items-center`}
//             >
//               {isSelected ? (
//                 <div
//                   className="relative h-4 w-4 rounded-[4px] text-primaryBtnTextColor bg-primary mr-2"
//                   aria-hidden="true"
//                 >
//                   <IoIosCheckmark
//                     className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-light dark:text-dark h-5 w-5"
//                     aria-hidden="true"
//                   />
//                 </div>
//               ) : (
//                 <span
//                   className="inline-block h-4 w-4 rounded-[4px] border border-gray-400 dark:border-gray-600 mr-2"
//                   aria-hidden="true"
//                 />
//               )}
//               <span
//                 className={`${
//                   isSelected
//                     ? "text-gray-700 dark:text-gray-300"
//                     : "text-slate-500 dark:text-slate-400"
//                 }`}
//               >
//                 {capitalize(option)}
//               </span>
//             </button>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

// export default MultiSelectFilter;

"use client";

import { useRef, useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

// hooks
import { useHandleOutsideClick } from "@/hooks/useHandleOutsideClick";
import { useAutoCloseOnSmallerThanEqualToBreakpoint } from "@/hooks/useAutoCloseOnSmallerThanEqualToBreakpoint";

// components
import Link from "@/components/LinkWithProgress";

// 3rd party
import { IoIosCheckmark } from "react-icons/io";

type MultiSelectFilterProps = {
  placeholder: string;
  options: string[];
  value: string[];
  icon?: React.ReactNode;
  onChange: (val: string[]) => void;
  widthClass?: string;
};

const MultiSelectFilter: React.FC<MultiSelectFilterProps> = ({
  placeholder,
  options,
  value,
  icon,
  onChange,
  widthClass = "w-[200px]",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  const searchParams = useSearchParams();

  useHandleOutsideClick(containerRef, setIsOpen);
  useAutoCloseOnSmallerThanEqualToBreakpoint(isOpen, setIsOpen, 768);

  const getHref = (option: string) => {
    const current = new URLSearchParams(searchParams.toString());

    const labelToParamMap: Record<string, string> = {
      "Job Type": "jobType",
      "Job Mode": "jobMode",
      Location: "location",
    };

    const paramKey = labelToParamMap[placeholder] || placeholder.toLowerCase();

    const existing = current.get(paramKey)?.split(",").filter(Boolean) ?? [];

    const updated = existing.includes(option)
      ? existing.filter((v) => v !== option)
      : [...existing, option];

    if (updated.length) {
      current.set(paramKey, updated.join(","));
    } else {
      current.delete(paramKey);
    }

    return `${pathname}?${current.toString()}`;
  };

  const toggleOption = (option: string) => {
    const newValue = value.includes(option)
      ? value.filter((val) => val !== option)
      : [...value, option];
    onChange(newValue);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className={`mt-8 ${widthClass}`}>
      {/* Label Section */}
      <div
        className="flex items-center gap-2 mb-4 font-medium text-primary"
        id={`${placeholder.replace(/\s+/g, "-").toLowerCase()}-label`}
      >
        {icon && (
          <span className="text-primary" aria-hidden="true">
            {icon}
          </span>
        )}
        <span className="font-semibold">{placeholder}</span>
      </div>

      {/* Options Group */}
      <div
        className="flex flex-col gap-2"
        role="group"
        aria-labelledby={`${placeholder
          .replace(/\s+/g, "-")
          .toLowerCase()}-label`}
      >
        {options.map((option) => {
          const isSelected = value.includes(option);
          return (
            <Link
              key={option}
              href={getHref(option)}
              scroll={false}
              onClick={() => toggleOption(option)}
              role="checkbox"
              aria-checked={isSelected}
              className="w-fit flex items-center"
            >
              {isSelected ? (
                <div
                  className="relative h-4 w-4 rounded-[4px] text-primaryBtnTextColor bg-primary mr-2"
                  aria-hidden="true"
                >
                  <IoIosCheckmark
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-light dark:text-dark h-5 w-5"
                    aria-hidden="true"
                  />
                </div>
              ) : (
                <span
                  className="inline-block h-4 w-4 rounded-[4px] border border-gray-400 dark:border-gray-600 mr-2"
                  aria-hidden="true"
                />
              )}
              <span className="hover:text-primary dark:hover:text-primary transition-colors">
                {capitalize(option)}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export default MultiSelectFilter;
