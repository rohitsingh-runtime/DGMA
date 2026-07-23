import { useState } from "react";
import {
  Search,
  ArrowRight,
  MapPin,
  GraduationCap,
  BookOpen,
  Video,
  ShieldCheck,
  FileText,
  Bell,
  Newspaper,
} from "lucide-react";

const quickTags = [
  "Ship recycling Gujarat",
  "STCW courses",
  "Alang facilities",
  "ETO training",
  "IMU Chennai",
  "Hong Kong Convention",
  "GP Rating institutes",
  "Maritime handbook 2024",
];

const categoryTabs = [
  { label: "All", icon: Search },
  { label: "Facilities", icon: MapPin },
  { label: "Institutes", icon: GraduationCap },
  { label: "Publications", icon: BookOpen },
  { label: "Videos", icon: Video },
  { label: "Certifications", icon: ShieldCheck },
  { label: "Acts & Rules", icon: FileText },
  { label: "Circulars", icon: Bell },
  { label: "News", icon: Newspaper },
];

const UniversalSearch = () => {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All");

  const handleTagClick = (tag) => {
    setQuery(tag);
  };

  return (
    <main className="w-full bg-[#F0E9DE] font-sans">
      {/* ═══════════ SEARCH HERO ═══════════ */}
      <section className="mx-auto max-w-4xl px-6 pb-8 pt-16 text-center md:pt-24">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#7A7055]">
          UNIVERSAL SEARCH
        </p>
        <h1 className="mt-4 font-serif text-5xl font-normal text-[#A09580] md:text-6xl lg:text-7xl">
          Search Everything
        </h1>
        <p className="mt-4 text-base text-gray-500 md:text-lg">
          Facilities, institutes, publications, videos, certifications,
          regulations, circulars — all in one place.
        </p>

        {/* Search Input */}
        <div className="mt-10 flex items-center rounded-xl border border-gray-300/60 bg-white shadow-sm transition-shadow focus-within:shadow-md focus-within:border-gray-400">
          <Search size={20} className="ml-5 shrink-0 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='Try "ship recycling Gujarat" or "ETO courses"...'
            className="flex-1 bg-transparent px-4 py-4 text-base text-gray-900 placeholder-gray-400 outline-none md:py-5"
            aria-label="Search"
          />
          <button
            type="button"
            className="mr-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-500 transition-colors hover:bg-gray-200"
            aria-label="Search"
          >
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Quick Tags */}
        <div className="mt-6 flex flex-wrap justify-center gap-2.5">
          {quickTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => handleTagClick(tag)}
              className="rounded-full border border-gray-300/70 bg-transparent px-4 py-2 text-sm text-gray-600 transition-all duration-200 hover:bg-white hover:border-gray-400 hover:text-gray-900 hover:shadow-sm"
            >
              {tag}
            </button>
          ))}
        </div>
      </section>

      {/* ═══════════ CATEGORY TABS ═══════════ */}
      <div className="border-b border-gray-300/50">
        <div className="mx-auto max-w-5xl px-6 md:px-10">
          <div className="flex items-center gap-1 overflow-x-auto py-3 scrollbar-hide" style={{ scrollbarWidth: "none" }}>
            {categoryTabs.map((tab) => (
              <button
                key={tab.label}
                type="button"
                onClick={() => setActiveTab(tab.label)}
                className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.label
                    ? "bg-[#1A1A1A] text-white shadow-sm"
                    : "text-gray-500 hover:bg-gray-200/60 hover:text-gray-700"
                }`}
              >
                <tab.icon size={14} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════ RESULTS / EMPTY STATE ═══════════ */}
      <section className="mx-auto max-w-4xl px-6 py-16 text-center md:py-24">
        <Search size={48} className="mx-auto text-gray-300" />
        <h2 className="mt-5 font-serif text-2xl font-bold text-gray-900 md:text-3xl">
          Search India&apos;s Maritime Knowledge Base
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-gray-500">
          From ship recycling facilities to STCW certifications, maritime
          regulations to training institutes — everything is searchable.
        </p>
      </section>
    </main>
  );
};

export default UniversalSearch;
