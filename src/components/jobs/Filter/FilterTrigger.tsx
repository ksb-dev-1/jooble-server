"use client";

import { useState } from "react";

// components
import FilterModal from "./FilterModal";

// 3rd party
import { MdFilterList, MdOutlineKeyboardArrowDown } from "react-icons/md";

export default function FilterTrigger() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        className="relative flex items-center px-4 h-[41.6px] rounded border text-primary hover:bg-dark dark:hover:bg-light transition-colors"
      >
        <MdFilterList className="h-5 w-5 sm:mr-2" />
        <span className="font-semibold hidden sm:block">Filter</span>
        <MdOutlineKeyboardArrowDown className="h-5 w-5 ml-4 hidden sm:block" />
      </button>
      <FilterModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
