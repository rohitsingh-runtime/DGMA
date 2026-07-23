import { useEffect, useCallback } from "react";
import { X, MapPin, Anchor, Download } from "lucide-react";

const ShipyardModal = ({ yard, onClose }) => {
  // Close on Escape key
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    // Prevent body scroll while modal is open
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  if (!yard) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {/* Hero Image */}
        <div className="aspect-[16/8] w-full overflow-hidden rounded-t-2xl">
          <img
            src={yard.img}
            alt={yard.name}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Content Body */}
        <div className="px-6 pb-6 pt-5 sm:px-8 sm:pb-8">
          <h2 className="font-serif text-2xl font-bold text-gray-900 sm:text-3xl">
            {yard.name}
          </h2>
          <p className="mt-1.5 flex items-center gap-1.5 text-sm text-gray-500">
            <MapPin size={14} className="text-gray-400" />
            {yard.location} &bull; {yard.type}
          </p>

          {/* Specs Grid */}
          <div className="mt-6 grid grid-cols-3 gap-4 rounded-xl bg-[#F7F4EF] p-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                Max Capacity
              </p>
              <p className="mt-1 text-sm font-bold text-gray-900">
                {yard.capacity}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                Dry Docks
              </p>
              <p className="mt-1 text-sm font-bold text-gray-900">
                {yard.docks}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                Established
              </p>
              <p className="mt-1 text-sm font-bold text-gray-900">
                {yard.year}
              </p>
            </div>
          </div>

          {/* Overview */}
          <p className="mt-5 text-sm leading-relaxed text-gray-600">
            {yard.overview}
          </p>

          {/* Action Buttons */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#0A284D] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0D3566]"
            >
              <Anchor size={16} />
              Inquire Facility
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
            >
              <Download size={16} />
              Download Brochure PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShipyardModal;
