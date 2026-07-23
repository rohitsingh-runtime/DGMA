import { Search, SlidersHorizontal } from "lucide-react";

const SearchFilterBar = ({ onFilterClick = () => { } }) => {
  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
      <div className="relative flex-1">
        <label htmlFor="facility-search" className="sr-only">
          Search facilities
        </label>
        <Search
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          size={18}
          aria-hidden="true"
        />
        <input
          id="facility-search"
          type="text"
          placeholder="Search by facility name or location..."
          className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-12 pr-4 text-sm text-gray-700 placeholder-gray-400 shadow-sm outline-none transition focus:border-[#C1622D] focus:ring-2 focus:ring-[#C1622D]/20"
        />
      </div>

      <button
        type="button"
        onClick={onFilterClick}
        className="flex items-center justify-center gap-2 rounded-full border border-[#C1622D]/30 bg-white px-5 py-3 text-sm font-medium text-[#C1622D] transition hover:bg-[#C1622D]/5 active:scale-[0.97]"
      >
        <SlidersHorizontal size={16} aria-hidden="true" />
        Filters
      </button>
    </div>
  );
};

export default SearchFilterBar;
