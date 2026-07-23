import { MapPin, LayoutGrid, List } from "lucide-react";

const ResultsToolbar = ({
  resultsCount = 6,
  activeView = "grid",
  onViewChange = () => { },
  onMapViewClick = () => { },
}) => {
  return (
    <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-gray-300/50 pt-6">
      <p className="text-sm text-gray-500">
        Showing{" "}
        <span className="font-bold text-gray-700">{resultsCount}</span>{" "}
        facilities
      </p>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMapViewClick}
          aria-label="Map View"
          className="flex items-center gap-2 rounded-full border border-gray-300 px-4 py-2 text-sm text-gray-600 transition hover:bg-gray-100 active:scale-[0.97]"
        >
          <MapPin size={15} aria-hidden="true" />
          Map View
        </button>

        <button
          type="button"
          onClick={() => onViewChange("grid")}
          aria-label="Grid view"
          aria-pressed={activeView === "grid"}
          className={`flex h-9 w-9 items-center justify-center rounded-md transition ${activeView === "grid"
              ? "bg-[#C1622D] text-white shadow-sm"
              : "border border-gray-300 bg-transparent text-gray-500 hover:bg-gray-100"
            }`}
        >
          <LayoutGrid size={16} aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={() => onViewChange("list")}
          aria-label="List view"
          aria-pressed={activeView === "list"}
          className={`flex h-9 w-9 items-center justify-center rounded-md transition ${activeView === "list"
              ? "bg-[#C1622D] text-white shadow-sm"
              : "border border-gray-300 bg-transparent text-gray-500 hover:bg-gray-100"
            }`}
        >
          <List size={16} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

export default ResultsToolbar;
