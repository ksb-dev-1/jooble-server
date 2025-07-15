"use client";

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
  onChange,
  widthClass,
}) => {
  const toggleOption = (option: string) => {
    const newValue = value.includes(option)
      ? value.filter((val) => val !== option)
      : [...value, option];
    onChange(newValue);
  };

  return (
    <div className={`relative ${widthClass}`}>
      {/* Options Group */}
      <div
        className="flex flex-col gap-4"
        role="group"
        aria-labelledby={`${placeholder
          .replace(/\s+/g, "-")
          .toLowerCase()}-label`}
      >
        {options.map((option) => {
          const isSelected = value.includes(option);
          return (
            <button
              key={option}
              type="button"
              onClick={() => toggleOption(option)}
              role="checkbox"
              aria-checked={isSelected}
              className="cursor-pointer w-fit flex items-center"
            >
              {isSelected ? (
                <div
                  className="relative h-5 w-5 rounded-[4px] text-primaryBtnTextColor bg-primary mr-3"
                  aria-hidden="true"
                >
                  <IoIosCheckmark
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-light dark:text-dark h-6 w-6"
                    aria-hidden="true"
                  />
                </div>
              ) : (
                <span
                  className="inline-block h-5 w-5 rounded-[4px] border border-gray-400 dark:border-gray-600 mr-3"
                  aria-hidden="true"
                />
              )}
              <span className="hover:text-primary dark:hover:text-primary transition-colors">
                {capitalize(option)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export default MultiSelectFilter;
