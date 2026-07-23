import { useState, useMemo, useCallback } from "react";
import {
  Search,
  SlidersHorizontal,
  LayoutGrid,
  Map,
  ArrowRight,
  Handshake,
} from "lucide-react";
import shipyardsData, { stateOptions, typeOptions } from "../data/shipyardsData";
import ShipyardCard from "../components/ShipyardCard";
import ShipyardModal from "../components/ShipyardModal";

/* ═══════════════════════════════════════════════════════
   Map Pin Data (subset of shipyards with coordinates)
═══════════════════════════════════════════════════════ */
const mapPins = [
  { id: 1, top: "85%", left: "35%", title: "Cochin Shipyard Limited" },
  { id: 2, top: "55%", left: "24%", title: "Mazagon Dock Shipbuilders" },
  { id: 3, top: "42%", left: "72%", title: "Garden Reach Shipbuilders" },
  { id: 4, top: "75%", left: "45%", title: "L&T Shipbuilding" },
  { id: 5, top: "60%", left: "55%", title: "Hindustan Shipyard" },
  { id: 6, top: "62%", left: "26%", title: "Goa Shipyard Limited" },
];

const Shipbuilding = () => {
  // Search & filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [stateFilter, setStateFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  // View toggle
  const [activeView, setActiveView] = useState("grid");

  // Map pin selection
  const [activePin, setActivePin] = useState(1);

  // Modal
  const [selectedYard, setSelectedYard] = useState(null);

  /* ── Filtering logic (ported from legacy shipbuilding.js) ── */
  const filteredYards = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return shipyardsData.filter((yard) => {
      const matchesSearch =
        yard.name.toLowerCase().includes(query) ||
        yard.location.toLowerCase().includes(query) ||
        yard.capacity.toLowerCase().includes(query);
      const matchesState =
        stateFilter === "all" || yard.state === stateFilter;
      const matchesType = typeFilter === "all" || yard.type === typeFilter;
      return matchesSearch && matchesState && matchesType;
    });
  }, [searchQuery, stateFilter, typeFilter]);

  const resetFilters = useCallback(() => {
    setSearchQuery("");
    setStateFilter("all");
    setTypeFilter("all");
  }, []);

  /* ── Map sidebar data ── */
  const activePinYard = useMemo(
    () => shipyardsData.find((y) => y.id === activePin),
    [activePin]
  );

  return (
    <main className="w-full bg-[#F0E9DE] font-sans">
      {/* ═══════════════════════════════════════════════════════
          1. Hero Section
      ═══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#0A1F3C] py-16 md:py-20">
        {/* Background image overlay */}
        <div className="absolute inset-0">
          <img
            src="/shipyard/hero-bg.png"
            alt=""
            className="h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A1F3C]/80 to-[#0A1F3C]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 md:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D6AF36]">
            DIRECTORY
          </p>
          <h1 className="mt-3 font-serif text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
            Shipbuilding Partners of India
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-300 md:text-lg">
            Discover India&apos;s leading shipyards and shipbuilders powering
            global trade with innovation, quality and resilience.
          </p>

          {/* ── Search & Filter Box ── */}
          <div className="mt-8 rounded-xl bg-white/10 backdrop-blur-md p-5 border border-white/10">
            {/* Search input row */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Search
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  id="shipyard-search"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name, location or capacity..."
                  className="w-full rounded-lg border border-white/20 bg-white/10 py-3 pl-12 pr-4 text-sm text-white placeholder-gray-400 outline-none transition focus:border-[#D6AF36] focus:ring-2 focus:ring-[#D6AF36]/30"
                  aria-label="Search shipyards"
                />
              </div>
              <button
                type="button"
                onClick={resetFilters}
                className="flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/5 px-5 py-3 text-sm font-medium text-gray-300 transition hover:bg-white/10 active:scale-[0.97]"
              >
                <SlidersHorizontal size={16} />
                Reset Filters
              </button>
            </div>

            {/* Filter pills row */}
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Filter by:
              </span>

              <select
                value={stateFilter}
                onChange={(e) => setStateFilter(e.target.value)}
                className="rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-sm text-white outline-none transition focus:border-[#D6AF36] cursor-pointer appearance-none"
                aria-label="Filter by state"
              >
                <option value="all" className="text-gray-900">
                  All States
                </option>
                {stateOptions.map((state) => (
                  <option key={state} value={state} className="text-gray-900">
                    {state}
                  </option>
                ))}
              </select>

              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-sm text-white outline-none transition focus:border-[#D6AF36] cursor-pointer appearance-none"
                aria-label="Filter by type"
              >
                <option value="all" className="text-gray-900">
                  All Categories
                </option>
                {typeOptions.map((type) => (
                  <option key={type} value={type} className="text-gray-900">
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          2. Results Toolbar
      ═══════════════════════════════════════════════════════ */}
      <div className="border-b border-gray-300/50 bg-[#F0E9DE]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4 md:px-10">
          <p className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-bold text-gray-700">
              {filteredYards.length}
            </span>{" "}
            results
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveView("grid")}
              aria-label="Grid view"
              aria-pressed={activeView === "grid"}
              className={`flex h-9 items-center gap-2 rounded-lg px-4 text-sm font-medium transition ${
                activeView === "grid"
                  ? "bg-[#0A284D] text-white shadow-sm"
                  : "border border-gray-300 bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              <LayoutGrid size={15} />
              Grid View
            </button>
            <button
              type="button"
              onClick={() => setActiveView("map")}
              aria-label="Map view"
              aria-pressed={activeView === "map"}
              className={`flex h-9 items-center gap-2 rounded-lg px-4 text-sm font-medium transition ${
                activeView === "map"
                  ? "bg-[#0A284D] text-white shadow-sm"
                  : "border border-gray-300 bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Map size={15} />
              Map View
            </button>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          3. Main Content Area
      ═══════════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-6 py-10 md:px-10 md:py-14">
        {/* ── Grid View ── */}
        {activeView === "grid" && (
          <>
            {filteredYards.length === 0 ? (
              <div className="rounded-2xl bg-white p-16 text-center shadow-sm">
                <h3 className="font-serif text-xl font-bold text-gray-900">
                  No Shipyards Found
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Try adjusting your search criteria or resetting filters.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredYards.map((yard) => (
                  <ShipyardCard
                    key={yard.id}
                    yard={yard}
                    onViewProfile={setSelectedYard}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {/* ── Map View ── */}
        {activeView === "map" && (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Map Graphic */}
            <div className="relative lg:col-span-8 rounded-2xl bg-[#0E1B30] p-8 min-h-[450px] overflow-hidden">
              {/* India Outline SVG */}
              <svg
                viewBox="0 0 400 450"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mx-auto h-full w-full max-w-[400px]"
              >
                <path
                  d="M120 40 L180 30 L220 50 L250 80 L230 140 L210 200 L180 280 L160 360 L140 400 L130 380 L120 310 L100 240 L80 180 L90 120 Z"
                  fill="#162238"
                  stroke="#C5A55A"
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                />
                <text
                  x="160"
                  y="200"
                  fill="rgba(255,255,255,0.08)"
                  fontSize="28"
                  fontFamily="serif"
                  fontWeight="bold"
                >
                  INDIA
                </text>
              </svg>

              {/* Map Pins */}
              {mapPins.map((pin) => (
                <button
                  key={pin.id}
                  type="button"
                  onClick={() => setActivePin(pin.id)}
                  title={pin.title}
                  className={`absolute flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all duration-300 ${
                    activePin === pin.id
                      ? "bg-[#D6AF36] text-[#0A1F3C] scale-125 shadow-lg shadow-[#D6AF36]/30 ring-2 ring-[#D6AF36]/40"
                      : "bg-white/20 text-white hover:bg-[#D6AF36]/60 hover:text-white"
                  }`}
                  style={{ top: pin.top, left: pin.left }}
                >
                  {pin.id}
                </button>
              ))}
            </div>

            {/* Map Sidebar */}
            <div className="lg:col-span-4 rounded-2xl bg-white p-6 shadow-sm flex flex-col justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  SELECTED SHIPYARD
                </p>
                <h3 className="mt-3 font-serif text-xl font-bold text-gray-900">
                  {activePinYard?.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">
                  {activePinYard?.overview} Located in{" "}
                  {activePinYard?.location}. Max capacity:{" "}
                  {activePinYard?.capacity}.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedYard(activePinYard)}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-[#0A284D] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0D3566]"
              >
                View Full Profile
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════
            4. Partner Callout Banner
        ═══════════════════════════════════════════════════════ */}
        <div className="mt-14 flex flex-col items-center justify-between gap-6 rounded-2xl bg-gradient-to-r from-[#065F46] to-[#047857] px-8 py-10 text-white shadow-lg sm:flex-row sm:px-12">
          <div className="max-w-lg">
            <h3 className="font-serif text-2xl font-bold leading-tight sm:text-3xl">
              Partner with India&apos;s Shipbuilding Ecosystem
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-emerald-100">
              Collaborate, build and innovate with top-tier shipyards, powering
              global trade and national naval self-reliance.
            </p>
          </div>
          <button
            type="button"
            className="flex shrink-0 items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-bold text-emerald-800 transition-colors hover:bg-emerald-50 active:scale-[0.97]"
          >
            <Handshake size={18} />
            Become a Partner
            <ArrowRight size={14} />
          </button>
        </div>
      </section>

      {/* ── Shipyard Detail Modal ── */}
      {selectedYard && (
        <ShipyardModal
          yard={selectedYard}
          onClose={() => setSelectedYard(null)}
        />
      )}
    </main>
  );
};

export default Shipbuilding;
