// 3rd party
import { IoIosSearch } from "react-icons/io";

export default function JobSearchInput() {
  return (
    <div className="relative flex items-center gap-2 mb-4">
      <IoIosSearch className="absolute left-4 h-5 w-5 text-input_focus" />
      <input
        type="text"
        placeholder="Enter designation / company / skill"
        className="border rounded pl-12 pr-4 py-2 w-full bg-white focus:border-input_focus focus:outline-input_focus"
      />
    </div>
  );
}
