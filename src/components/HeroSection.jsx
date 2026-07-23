import { useState } from "react";
import SearchFilterBar from "./SearchFilterBar";
import ResultsToolbar from "./ResultsToolbar";
import FacilityGrid from "./FacilityGrid";
import facilityData from "../data/facilityData";

const HeroSection = () => {
  const [activeView, setActiveView] = useState("grid");

  return (
    <main className="w-full bg-[#F0E9DE]">
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
          DIRECTORY
        </p>
        <h1 className="mt-2 font-serif text-4xl font-bold leading-tight text-[#1A1A2E] md:text-5xl">
          Ship Recycling
        </h1>

        <p className="mt-3 max-w-xl text-base leading-relaxed text-[#C1622D] md:text-lg">
          Browse India's certified ship recycling facilities — from Alang's
          world-renowned yards to emerging coastal operations.
        </p>

        <SearchFilterBar onFilterClick={() => { }} />

        <ResultsToolbar
          resultsCount={facilityData.length}
          activeView={activeView}
          onViewChange={setActiveView}
          onMapViewClick={() => { }}
        />
        <FacilityGrid facilities={facilityData} />
      </div>
    </main>
  );
};

export default HeroSection;
