// 3rd party
//import { PiWarningCircleBold } from "react-icons/pi";

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
      className={`relative rounded bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400 overflow-hidden ${className}`}
    >
      {/* <div className="absolute top-0 left-0 bottom-0 bg-amber-700 text-white dark:bg-amber-500 dark:text-amber-950 w-8">
        <PiWarningCircleBold className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5" />
      </div> */}
      <p className="p-2 text-sm text-center font-medium">{message}</p>
    </div>
  );
}
