"use client";

// 3rd party
import {
  MdFilterList,
  MdSearch,
  MdOutlineBookmarkBorder,
  MdOutlineCloudUpload,
  MdOutlineSend,
  MdOutlineWorkOutline,
} from "react-icons/md";

const features = [
  {
    icon: <MdFilterList className="h-6 w-6" />,
    title: "Smart Filters",
    desc: "Filter jobs by location, type, and mode.",
  },
  {
    icon: <MdSearch className="h-6 w-6" />,
    title: "Advanced Search",
    desc: "Search by company, skills, or designation.",
  },
  {
    icon: <MdOutlineBookmarkBorder className="h-6 w-6" />,
    title: "Bookmark Jobs",
    desc: "Save jobs to view and apply later.",
  },
  {
    icon: <MdOutlineCloudUpload className="h-6 w-6" />,
    title: "Upload Resume",
    desc: "Attach your resume to stand out.",
  },
  {
    icon: <MdOutlineSend className="h-6 w-6" />,
    title: "Easy Apply",
    desc: "Apply directly with one click.",
  },
  {
    icon: <MdOutlineWorkOutline className="h-6 w-6" />,
    title: "Flexible Job Modes",
    desc: "Explore remote, hybrid, or onsite roles.",
  },
];

export default function FeatureSection() {
  return (
    <section
      className="max-w-5xl px-4 mx-auto"
      role="region"
      aria-labelledby="features-heading"
    >
      <h2 id="features-heading" className="text-xl md:text-2xl font-bold mb-8">
        <span className="border-b border-primary text-primary">Features</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
        {features.map((feature, index) => (
          <article
            key={index}
            className="p-6 border rounded bg-gradient-to-b from-light to-dark"
            aria-label={`${feature.title}: ${feature.desc}`}
          >
            <span className="text-primary mb-4 block" aria-hidden="true">
              {feature.icon}
            </span>
            <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
            <p className="text-slate-500 dark:text-slate-400">{feature.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
