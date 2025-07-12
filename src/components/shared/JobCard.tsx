import Link from "next/link";

// components
import { ToggleSaveForm } from "@/components/shared/ToggleSaveForm";

// utils
import { formatMoney, relativeDate } from "@/utils";

// 3rd party libraries
import { BsClock } from "react-icons/bs";
import { JobWithSavedStatusAndApplicationStatus } from "@/types/job";
import { ApplicationStatus } from "@prisma/client";
import {
  MdOutlineWorkOutline,
  MdOutlineLocationOn,
  MdOutlineTimer,
  MdOutlineCurrencyRupee,
} from "react-icons/md";
import { RiHomeOfficeLine } from "react-icons/ri";

interface JobCardProps {
  job: JobWithSavedStatusAndApplicationStatus;
  link?: string;
  pointerEventsClass?: string;
}

const statusColors: Record<ApplicationStatus, string> = {
  PENDING:
    "text-amber-600 border-amber-600 dark:text-amber-500 dark:border-amber-500 rounded-full border-2",
  OFFER: "border-emerald-600 bg-emerald-100 text-emerald-600",
  INTERVIEW: "border-blue-600 bg-blue-100 text-blue-600",
  REJECT: "border-red-600 bg-red-100 text-red-600",
};

export default function JobCard({
  job,
  link,
  pointerEventsClass,
}: JobCardProps) {
  const {
    id,
    role,
    companyName,
    experience,
    salary,
    location,
    jobType,
    jobMode,
    skills,
    openings,
    applicationStatus,
    createdAt,
  } = job;

  return (
    <article
      className="relative"
      aria-label={`Job posting: ${role} at ${companyName}`}
    >
      <Link
        href={link ?? `/jobs/${id}`}
        className={`h-full block bg-light dark:bg-dark border rounded p-4 md:p-6 hover:shadow-card transition-shadow ${pointerEventsClass}`}
      >
        <header>
          <h3 className="font-bold text-xl">{role}</h3>
          <p className="mt-1">
            <span className="text-primary font-bold">{companyName}</span>
            {applicationStatus && (
              <>
                {/* <span className="h-3 w-[2px] inline-block bg-black dark:bg-white mx-2"></span> */}
                <span className="inline-block mx-2">-</span>
                <span
                  className={`${statusColors[applicationStatus]} text-xs px-2 py-[2px] font-semibold uppercase`}
                >
                  {applicationStatus.charAt(0) +
                    applicationStatus.substring(1).toLowerCase()}
                </span>
              </>
            )}
          </p>
        </header>

        <section className="my-4 p-4 rounded border" aria-label="Job details">
          <dl className="grid grid-cols-2 lg:flex items-center flex-wrap gap-4 lg:gap-x-6 lg:gap-y-4">
            <div className="flex items-center">
              <MdOutlineWorkOutline className="h-4 w-4" aria-hidden="true" />
              <dt className="sr-only">Experience</dt>
              <dd className="ml-2">{experience}</dd>
            </div>
            <div className="flex items-center">
              <MdOutlineLocationOn className="h-4 w-4" aria-hidden="true" />
              <dt className="sr-only">Location</dt>
              <dd className="ml-2">{location}</dd>
            </div>
            <div className="flex items-center">
              <MdOutlineTimer className="h-4 w-4" aria-hidden="true" />
              <dt className="sr-only">Job Type</dt>
              <dd className="ml-2">{jobType}</dd>
            </div>
            <div className="flex items-center">
              <RiHomeOfficeLine className="h-4 w-4" aria-hidden="true" />
              <dt className="sr-only">Job Mode</dt>
              <dd className="ml-2">{jobMode}</dd>
            </div>
            <div className="flex items-center">
              <MdOutlineCurrencyRupee className="h-4 w-4" aria-hidden="true" />
              <dt className="sr-only">Salary</dt>
              <dd className="ml-1">{formatMoney(salary).slice(1)}</dd>
            </div>
          </dl>

          <div className="w-full border-b mt-4 mb-2" role="presentation" />

          <div className="flex items-end flex-wrap">
            {skills?.length > 0 &&
              skills.slice(0, 3).map((skill: string, index: number) => (
                <div key={skill} className="mt-2 flex items-center">
                  <span className="rounded-xl capitalize text-slate-500 dark:text-slate-400">
                    {skill}
                  </span>
                  {index !== 2 && index !== skills.slice(0, 3).length - 1 && (
                    <span
                      className="h-1 w-1 mx-2 rounded-full inline-block bg-[#555]"
                      aria-hidden="true"
                    ></span>
                  )}
                </div>
              ))}
          </div>
        </section>

        <footer className="flex items-center justify-between w-full text-slate-500 dark:text-slate-400">
          <p className="text-sm">Openings: {openings}</p>
          <div className="w-fit flex items-center text-xs">
            <BsClock aria-hidden="true" />
            <span className="ml-1">{relativeDate(createdAt)}</span>
          </div>
        </footer>
      </Link>

      <ToggleSaveForm jobId={id} isSaved={job.isSaved} />
    </article>
  );
}
