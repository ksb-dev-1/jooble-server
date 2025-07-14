"use client";

import Link from "next/link";

// 3rd party
import { IoChevronForwardSharp } from "react-icons/io5";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
  className?: string;
};

export default function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav
      className={`flex items-center gap-2 font-medium ${className ?? ""}`}
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center gap-2" role="list">
        {items.map((item, index) => (
          <li
            key={item.href || item.label || index}
            className="flex items-center gap-3"
            role="listitem"
          >
            {item.href ? (
              <Link href={item.href} className="text-primary hover:underline">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page">{item.label}</span>
            )}
            {index < items.length - 1 && <IoChevronForwardSharp />}
          </li>
        ))}
      </ol>
    </nav>
  );
}
