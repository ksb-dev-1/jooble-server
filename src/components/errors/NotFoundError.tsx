import { IoCloseSharp } from "react-icons/io5";

interface NotFoundErrorProps {
  message?: string;
  title?: string;
}

export default function NotFoundError({
  title = "404 - Not Found",
  message = "The requested content was not found.",
}: NotFoundErrorProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-labelledby="not-found-heading"
      className="w-full flex flex-col items-center justify-center border rounded px-4 py-16 sm:py-32 gap-6"
    >
      {/* Title */}
      <p className="font-bold text-2xl text-red-400">{title}</p>

      {/* Visual Box UI */}
      <div className="border border-gray-300 dark:border-gray-500 rounded w-48">
        <div className="border-b border-b-gray-300 dark:border-b-gray-500 px-4 py-1 w-full">
          <span className="h-2 w-2 bg-gray-300 dark:bg-gray-500 rounded-full inline-block"></span>
          <span className="h-2 w-2 bg-gray-300 dark:bg-gray-500 rounded-full inline-block mx-2"></span>
          <span className="h-2 w-2 bg-gray-300 dark:bg-gray-500 rounded-full inline-block"></span>
        </div>

        <div className="flex flex-col items-center justify-center py-4">
          <div className="w-full px-12 flex items-center justify-between">
            <IoCloseSharp className="h-6 w-6 text-red-400" aria-hidden="true" />
            <IoCloseSharp className="h-6 w-6 text-red-400" aria-hidden="true" />
          </div>
          <div className="w-16 h-8 rounded-t-full mt-4 border-t-4 border-t-red-400"></div>
        </div>
      </div>

      {/* Message */}
      <div className="flex flex-col items-center justify-center gap-2 text-center">
        <h2 id="not-found-heading" className="font-bold text-xl">
          {message}
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Please check the URL or try again later.
        </p>
      </div>
    </div>
  );
}
