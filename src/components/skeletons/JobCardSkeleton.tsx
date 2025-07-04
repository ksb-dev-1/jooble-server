// 3rd party libraries
import { BsClock } from "react-icons/bs";
import {
  MdOutlineWorkOutline,
  MdOutlineLocationOn,
  MdOutlineTimer,
  MdOutlineCurrencyRupee,
} from "react-icons/md";
import { RiHomeOfficeLine } from "react-icons/ri";

export default function JobCardSkeleton() {
  return (
    <article
      className="relative h-full block bg-light dark:bg-dark border rounded p-4"
      aria-label="Loading job card"
    >
      <header>
        <h3 className="skeleton w-fit rounded font-semibold">
          Job Designation
        </h3>
        <p className="mt-1">
          <span className="skeleton rounded font-semibold">Company</span>

          <span className="skeleton inline-block w-16 rounded-3xl text-xs ml-2 uppercase tracking-wider">
            Status
          </span>
        </p>
      </header>

      <section
        className="my-4 p-4 rounded border bg-gradient-to-b from-light to-dark dark:from-dark dark:to-light"
        aria-label="Job details"
      >
        <dl className="grid grid-cols-2 lg:flex items-center flex-wrap gap-4 lg:gap-x-6 lg:gap-y-4 text-sm md:text-base">
          <div className="skeleton rounded flex items-center">
            <MdOutlineWorkOutline className="h-4 w-4" aria-hidden="true" />
            <dt className="sr-only">Experience</dt>
            <dd className="ml-2">1-2</dd>
          </div>
          <div className="skeleton rounded flex items-center">
            <MdOutlineLocationOn className="h-4 w-4" aria-hidden="true" />
            <dt className="sr-only">Location</dt>
            <dd className="ml-2">Location</dd>
          </div>
          <div className="skeleton rounded flex items-center">
            <MdOutlineTimer className="h-4 w-4" aria-hidden="true" />
            <dt className="sr-only">Job Type</dt>
            <dd className="ml-2">Job Type</dd>
          </div>
          <div className="skeleton rounded flex items-center">
            <RiHomeOfficeLine className="h-4 w-4" aria-hidden="true" />
            <dt className="sr-only">Job Mode</dt>
            <dd className="ml-2">Job Mode</dd>
          </div>
          <div className="skeleton rounded flex items-center">
            <MdOutlineCurrencyRupee className="h-4 w-4" aria-hidden="true" />
            <dt className="sr-only">Salary</dt>
            <dd className="ml-1">Salary</dd>
          </div>
        </dl>

        <div className="w-full border-b mt-4 mb-2" role="presentation" />

        <div className="flex items-end flex-wrap">
          {[1, 2, 3].map((_, index, arr) => (
            <div key={index} className="mt-2 flex items-center">
              <span className="skeleton rounded capitalize inline-block text-sm md:text-base">
                skilllllllllll
              </span>
              {index !== arr.length - 1 && (
                <span className="h-1 w-1 mx-2 rounded-full inline-block bg-[#999]"></span>
              )}
            </div>
          ))}
        </div>
      </section>

      <footer className="flex items-center justify-between w-full">
        <p className="skeleton rounded font-medium text-sm">Openings: 2</p>
        <div className="skeleton rounded w-fit flex items-center text-xs">
          <BsClock aria-hidden="true" />
          <span className="ml-1">Posted on</span>
        </div>
      </footer>

      {/* Bookmark icon */}
      <div className="skeleton rounded absolute top-4 right-4 h-8 w-8"></div>
    </article>
  );
}
