import { useState, useMemo } from "react";
import { BookOpen, FolderOpen, Film, Download } from "lucide-react";
import {
  publications,
  knowledgeCategories,
} from "../data/leadershipData";
import PublicationCard from "../components/PublicationCard";

const KnowledgeHub = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPubs = useMemo(() => {
    if (activeCategory === "All") return publications;
    return publications.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <main className="w-full bg-[#F0E9DE] font-sans">
      {/* ═══════════ PAGE HEADER ═══════════ */}
      <section className="mx-auto max-w-7xl px-6 pb-4 pt-14 md:px-10 md:pt-20">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#7A7055]">
          DIGITAL LIBRARY
        </p>
        <h1 className="mt-3 font-serif text-4xl font-bold text-gray-900 md:text-5xl lg:text-6xl">
          Knowledge Hub
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-500 md:text-lg">
          India&apos;s maritime digital library — handbooks, coffee table books,
          research reports, case studies, and more.
        </p>

        {/* Stats Row */}
        <div className="mt-6 flex flex-wrap items-center gap-6">
          <span className="flex items-center gap-2 text-sm text-gray-500">
            <BookOpen size={16} className="text-[#7A7055]" />
            500+ Resources
          </span>
          <span className="flex items-center gap-2 text-sm text-gray-500">
            <FolderOpen size={16} className="text-[#7A7055]" />
            12 Categories
          </span>
          <span className="flex items-center gap-2 text-sm text-gray-500">
            <Film size={16} className="text-[#7A7055]" />
            Video Library
          </span>
        </div>
      </section>

      {/* ═══════════ CATEGORY FILTERS ═══════════ */}
      <div className="border-b border-gray-300/50">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="flex flex-wrap items-center gap-2 py-4">
            {knowledgeCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-[#1A1A1A] text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-200/60 hover:text-gray-900"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════ PUBLICATIONS GRID ═══════════ */}
      <section className="mx-auto max-w-7xl px-6 py-10 md:px-10 md:py-14">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-2xl font-bold text-gray-900 md:text-3xl">
            {activeCategory === "All"
              ? "All Publications"
              : activeCategory}
          </h2>
          <p className="text-sm text-gray-400">
            {filteredPubs.length} publication
            {filteredPubs.length !== 1 ? "s" : ""}
          </p>
        </div>

        {filteredPubs.length === 0 ? (
          <div className="mt-10 rounded-2xl bg-white p-16 text-center shadow-sm">
            <h3 className="font-serif text-xl font-bold text-gray-900">
              No Publications Found
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              No publications match this category yet.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredPubs.map((pub) => (
              <PublicationCard key={pub.id} pub={pub} />
            ))}
          </div>
        )}
      </section>

      {/* ═══════════ CTA BANNER ═══════════ */}
      <section className="mx-auto max-w-7xl px-6 pb-16 md:px-10">
        <div className="rounded-2xl bg-[#1A1A1A] px-8 py-12 text-center shadow-lg sm:px-12">
          <h2 className="font-serif text-2xl font-bold text-white sm:text-3xl">
            Download the Complete Digital Library
          </h2>
          <p className="mt-3 text-sm text-gray-400">
            Get all publications in one package — updated quarterly.
          </p>
          <button
            type="button"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#D6AF36] px-8 py-3.5 text-sm font-bold text-[#0A1F3C] transition-colors hover:bg-[#c29e2e] active:scale-[0.97]"
          >
            <Download size={18} />
            Knowledge hub
          </button>
        </div>
      </section>
    </main>
  );
};

export default KnowledgeHub;
