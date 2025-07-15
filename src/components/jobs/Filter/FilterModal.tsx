"use client";

import { useRef, Dispatch, SetStateAction } from "react";

// hooks
import { useHandleOutsideClick } from "@/hooks/useHandleOutsideClick";

// components
import Modal from "@/components/shared/Modal";
import Filters from "./Filters";

interface FilterModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function FilterModal({ isOpen, setIsOpen }: FilterModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  useHandleOutsideClick(modalRef, setIsOpen);

  return (
    <Modal
      ref={modalRef}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      maxWidth="max-w-2xl"
      labelledById="filter-modal-title"
    >
      <div role="document" className="outline-none">
        {/* This heading is only for screen readers */}
        <h2 id="filter-modal-title" className="sr-only">
          Job Filters Modal
        </h2>

        <Filters isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </Modal>
  );
}
