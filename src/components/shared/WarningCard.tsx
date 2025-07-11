// 3rd party
import { PiWarningCircleBold } from "react-icons/pi";

export default function WarningCard({
  message,
  className,
}: {
  message: string;
  className?: string;
}) {
  return (
    <div
      role="alert"
      className={`relative rounded border bg-amber-100 text-amber-700 border-amber-700 dark:bg-amber-950 dark:text-amber-500 dark:border-amber-500 flex items-center overflow-hidden ${className}`}
    >
      <div className="absolute top-0 left-0 bottom-0 bg-amber-700 text-white dark:bg-amber-500 dark:text-amber-950 w-12">
        <PiWarningCircleBold className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6" />
      </div>
      <p className="ml-12 p-4 font-medium">{message}</p>
    </div>
  );
}
