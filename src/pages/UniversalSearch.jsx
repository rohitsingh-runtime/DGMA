import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
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
  X,
  Clock,
  TrendingUp,
  ExternalLink,
  Anchor,
  Building,
  Loader2,
} from "lucide-react";

/* ═══════════ SEARCHABLE CONTENT DATABASE ═══════════ */
import facilityData from "../data/facilityData";
import shipyardsData from "../data/shipyardsData";
import { stories } from "../data/storyData";
import { mediaItems } from "../data/mediaData";
import { leaders, publications } from "../data/leadershipData";

/* Build a unified searchable index from all data sources */
const buildSearchIndex = () => {
  const index = [];

  // Facilities
  facilityData.forEach((f) => {
    index.push({
      id: `facility-${f.id}`,
      title: f.name,
      subtitle: f.location,
      description: `${f.type} • Grade ${f.grade} • ${f.capacity}`,
      category: "Facilities",
      tags: [f.type, f.grade, ...f.certifications, f.location].join(" "),
      link: "/ship-recycling",
      icon: "facility",
    });
  });

  // Shipyards
  shipyardsData.forEach((s) => {
    index.push({
      id: `shipyard-${s.id}`,
      title: s.name,
      subtitle: `${s.location} • Est. ${s.year}`,
      description: `${s.type} • ${s.capacity} • ${s.docks}`,
      category: "Facilities",
      tags: [s.type, s.state, s.location, s.overview].join(" "),
      link: "/shipbuilding",
      icon: "shipyard",
    });
  });

  // Stories
  stories.forEach((s) => {
    index.push({
      id: `story-${s.id}`,
      title: s.title,
      subtitle: `${s.category} • ${s.year}`,
      description: `${s.duration} ${s.category} story`,
      category: "News",
      tags: [s.category, s.title].join(" "),
      link: "/stories",
      icon: "story",
    });
  });

  // Media
  mediaItems.forEach((m) => {
    index.push({
      id: `media-${m.id}`,
      title: m.title,
      subtitle: m.category,
      description: `${m.type}${m.duration ? " • " + m.duration : ""}`,
      category: m.type === "Video" || m.type === "Drone" ? "Videos" : "News",
      tags: [m.type, m.category, m.title].join(" "),
      link: "/media-centre",
      icon: "media",
    });
  });

  // Leaders
  leaders.forEach((l) => {
    index.push({
      id: `leader-${l.id}`,
      title: l.name,
      subtitle: `${l.role} ${l.org}`,
      description: l.years,
      category: "All",
      tags: [l.name, l.role, l.org].join(" "),
      link: "/maritime-leadership",
      icon: "leader",
    });
  });

  // Publications
  publications.forEach((p) => {
    index.push({
      id: `pub-${p.id}`,
      title: p.title,
      subtitle: p.category,
      description: `${p.year} • ${p.pages} pages • ${p.downloads} downloads`,
      category: "Publications",
      tags: [p.title, p.category].join(" "),
      link: "/knowledge-hub",
      icon: "publication",
    });
  });

  // Additional static entries for regulations, circulars, certifications
  const staticEntries = [
    { title: "Hong Kong International Convention", subtitle: "Ship Recycling Regulation", description: "Safe & environmentally sound recycling of ships", category: "Acts & Rules", link: "/knowledge-hub", icon: "regulation" },
    { title: "Merchant Shipping Act, 1958", subtitle: "Primary Maritime Legislation", description: "Governing law for Indian merchant shipping", category: "Acts & Rules", link: "/knowledge-hub", icon: "regulation" },
    { title: "STCW Convention Compliance", subtitle: "Certification Standards", description: "Standards of Training, Certification & Watchkeeping", category: "Certifications", link: "/knowledge-hub", icon: "certification" },
    { title: "DGS Circular No. 01/2024", subtitle: "Circular • January 2024", description: "Updated guidelines for ship recycling facilities", category: "Circulars", link: "/knowledge-hub", icon: "circular" },
    { title: "DGS Circular No. 05/2024", subtitle: "Circular • March 2024", description: "Revised STCW training requirements for cadets", category: "Circulars", link: "/knowledge-hub", icon: "circular" },
    { title: "DGS Circular No. 12/2023", subtitle: "Circular • August 2023", description: "Maritime safety compliance requirements update", category: "Circulars", link: "/knowledge-hub", icon: "circular" },
    { title: "GP Rating Course Certification", subtitle: "Maritime Certification", description: "General Purpose Rating certification for seafarers", category: "Certifications", link: "/knowledge-hub", icon: "certification" },
    { title: "ETO Course Certification", subtitle: "Maritime Certification", description: "Electro-Technical Officer certification program", category: "Certifications", link: "/knowledge-hub", icon: "certification" },
    { title: "ISO 14001 Environmental Management", subtitle: "International Standard", description: "Environmental management system certification for yards", category: "Certifications", link: "/ship-recycling", icon: "certification" },
    { title: "Maritime Training Institutes Directory", subtitle: "Complete Listing", description: "All approved maritime training institutes across India", category: "Institutes", link: "/", icon: "institute" },
    { title: "Approved STCW Courses", subtitle: "Course Directory", description: "DGS-approved STCW courses for maritime professionals", category: "Institutes", link: "/", icon: "institute" },
    { title: "Maritime India Vision 2030", subtitle: "Policy Document", description: "India's roadmap for maritime sector development", category: "Publications", link: "/knowledge-hub", icon: "publication" },
    { title: "Sagarmala Programme", subtitle: "Government Initiative", description: "Port-led prosperity through logistics optimization", category: "All", link: "/", icon: "initiative" },
  ];

  staticEntries.forEach((entry, i) => {
    index.push({
      id: `static-${i}`,
      ...entry,
      tags: [entry.title, entry.subtitle, entry.description].join(" "),
    });
  });

  return index;
};

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

const iconMap = {
  facility: MapPin,
  shipyard: Anchor,
  story: Newspaper,
  media: Video,
  leader: Building,
  publication: BookOpen,
  regulation: FileText,
  certification: ShieldCheck,
  circular: Bell,
  institute: GraduationCap,
  initiative: TrendingUp,
};

const RECENT_STORAGE_KEY = "dgma_recent_searches";

const UniversalSearch = () => {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const inputRef = useRef(null);
  const debounceRef = useRef(null);

  const searchIndex = useMemo(() => buildSearchIndex(), []);

  // Load recent searches from storage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(RECENT_STORAGE_KEY);
      if (stored) setRecentSearches(JSON.parse(stored));
    } catch { /* ignore */ }
  }, []);

  const saveRecentSearch = useCallback((term) => {
    if (!term.trim()) return;
    setRecentSearches((prev) => {
      const updated = [term, ...prev.filter((s) => s !== term)].slice(0, 6);
      try { localStorage.setItem(RECENT_STORAGE_KEY, JSON.stringify(updated)); } catch { /* ignore */ }
      return updated;
    });
  }, []);

  const clearRecentSearches = useCallback(() => {
    setRecentSearches([]);
    try { localStorage.removeItem(RECENT_STORAGE_KEY); } catch { /* ignore */ }
  }, []);

  /* Perform fuzzy search */
  const results = useMemo(() => {
    if (!query.trim()) return [];
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    return searchIndex
      .map((item) => {
        const searchText = `${item.title} ${item.subtitle} ${item.description} ${item.tags}`.toLowerCase();
        let score = 0;
        for (const term of terms) {
          if (searchText.includes(term)) {
            score += 1;
            // Boost title matches
            if (item.title.toLowerCase().includes(term)) score += 3;
            // Boost exact category matches
            if (item.category.toLowerCase().includes(term)) score += 2;
          }
        }
        return { ...item, score };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score);
  }, [query, searchIndex]);

  /* Filter by active tab */
  const filteredResults = useMemo(() => {
    if (activeTab === "All") return results;
    return results.filter((r) => r.category === activeTab);
  }, [results, activeTab]);

  /* Simulate loading on search */
  const executeSearch = useCallback(
    (term) => {
      if (!term.trim()) return;
      setIsLoading(true);
      setHasSearched(true);
      saveRecentSearch(term);
      // Simulate a brief loading state for polish
      clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        setIsLoading(false);
      }, 400);
    },
    [saveRecentSearch]
  );

  /* Debounced live search */
  useEffect(() => {
    if (!query.trim()) {
      setHasSearched(false);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    const timer = setTimeout(() => {
      setHasSearched(true);
      setIsLoading(false);
    }, 350);
    return () => clearTimeout(timer);
  }, [query]);

  const handleTagClick = (tag) => {
    setQuery(tag);
    setActiveTab("All");
    executeSearch(tag);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") executeSearch(query);
  };

  const clearQuery = () => {
    setQuery("");
    setHasSearched(false);
    setActiveTab("All");
    inputRef.current?.focus();
  };

  /* Highlight matching text */
  const highlightMatch = (text) => {
    if (!query.trim()) return text;
    const terms = query.split(/\s+/).filter(Boolean);
    const regex = new RegExp(`(${terms.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark key={i} className="bg-[#D6AF36]/25 text-[#8B7A2E] rounded px-0.5 font-semibold">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  /* Category counts */
  const categoryCounts = useMemo(() => {
    const counts = { All: results.length };
    categoryTabs.forEach((tab) => {
      if (tab.label !== "All") {
        counts[tab.label] = results.filter((r) => r.category === tab.label).length;
      }
    });
    return counts;
  }, [results]);

  return (
    <main className="w-full min-h-screen bg-[#F0E9DE] font-sans">
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
        <div className="mt-10 flex items-center rounded-xl border border-gray-300/60 bg-white shadow-sm transition-all duration-300 focus-within:shadow-lg focus-within:border-[#D6AF36]/50 focus-within:ring-2 focus-within:ring-[#D6AF36]/10">
          <Search size={20} className="ml-5 shrink-0 text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder='Try "ship recycling Gujarat" or "ETO courses"...'
            className="flex-1 bg-transparent px-4 py-4 text-base text-gray-900 placeholder-gray-400 outline-none md:py-5"
            aria-label="Search"
          />
          {query && (
            <button
              type="button"
              onClick={clearQuery}
              className="mr-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
          <button
            type="button"
            onClick={() => executeSearch(query)}
            className="mr-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#0A284D] text-white transition-all duration-200 hover:bg-[#0D2E52] hover:shadow-md active:scale-95"
            aria-label="Search"
          >
            {isLoading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <ArrowRight size={18} />
            )}
          </button>
        </div>

        {/* Quick Tags */}
        <div className="mt-6 flex flex-wrap justify-center gap-2.5">
          {quickTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => handleTagClick(tag)}
              className={`rounded-full border px-4 py-2 text-sm transition-all duration-200 ${
                query === tag
                  ? "border-[#D6AF36] bg-[#D6AF36]/10 text-[#8B7A2E] shadow-sm"
                  : "border-gray-300/70 bg-transparent text-gray-600 hover:bg-white hover:border-gray-400 hover:text-gray-900 hover:shadow-sm"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Recent Searches */}
        {!hasSearched && recentSearches.length > 0 && (
          <div className="mt-8 animate-fadeIn">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Clock size={14} className="text-gray-400" />
              <span className="text-xs text-gray-400 uppercase tracking-wider font-medium">
                Recent Searches
              </span>
              <button
                onClick={clearRecentSearches}
                className="text-xs text-gray-400 hover:text-gray-600 ml-2 underline transition-colors"
              >
                Clear
              </button>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {recentSearches.map((term, i) => (
                <button
                  key={i}
                  onClick={() => handleTagClick(term)}
                  className="flex items-center gap-1.5 rounded-full border border-dashed border-gray-300 bg-white/50 px-3 py-1.5 text-xs text-gray-500 transition-all hover:border-gray-400 hover:text-gray-700 hover:shadow-sm"
                >
                  <Clock size={10} />
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ═══════════ CATEGORY TABS ═══════════ */}
      <div className="border-b border-gray-300/50 sticky top-[108px] z-20 bg-[#F0E9DE]/95 backdrop-blur-sm">
        <div className="mx-auto max-w-5xl px-6 md:px-10">
          <div
            className="flex items-center gap-1 overflow-x-auto py-3"
            style={{ scrollbarWidth: "none" }}
          >
            {categoryTabs.map((tab) => {
              const count = categoryCounts[tab.label] || 0;
              return (
                <button
                  key={tab.label}
                  type="button"
                  onClick={() => setActiveTab(tab.label)}
                  className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                    activeTab === tab.label
                      ? "bg-[#0A284D] text-white shadow-sm"
                      : "text-gray-500 hover:bg-gray-200/60 hover:text-gray-700"
                  }`}
                >
                  <tab.icon size={14} />
                  {tab.label}
                  {hasSearched && count > 0 && (
                    <span
                      className={`text-[10px] font-bold rounded-full px-1.5 py-0.5 min-w-[18px] text-center ${
                        activeTab === tab.label
                          ? "bg-white/20 text-white"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ═══════════ RESULTS / STATES ═══════════ */}
      <section className="mx-auto max-w-4xl px-6 py-8 md:py-12">
        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20 animate-fadeIn">
            <div className="relative">
              <div className="w-12 h-12 rounded-full border-2 border-gray-200 border-t-[#D6AF36] animate-spin" />
            </div>
            <p className="mt-4 text-sm text-gray-400">Searching across all content...</p>
          </div>
        )}

        {/* Results Found */}
        {!isLoading && hasSearched && filteredResults.length > 0 && (
          <div className="animate-fadeIn">
            {/* Results header */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-500">
                <span className="font-semibold text-gray-700">{filteredResults.length}</span>{" "}
                result{filteredResults.length !== 1 ? "s" : ""} found
                {activeTab !== "All" && (
                  <span>
                    {" "}
                    in <span className="font-medium text-gray-700">{activeTab}</span>
                  </span>
                )}
              </p>
              {activeTab !== "All" && (
                <button
                  onClick={() => setActiveTab("All")}
                  className="text-xs text-[#0A284D] font-medium hover:underline"
                >
                  View all {results.length} results
                </button>
              )}
            </div>

            {/* Results list */}
            <div className="space-y-3">
              {filteredResults.map((result, index) => {
                const IconComponent = iconMap[result.icon] || Search;
                return (
                  <Link
                    key={result.id}
                    to={result.link}
                    className="group block rounded-xl border border-gray-200/80 bg-white p-4 sm:p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:border-[#D6AF36]/30 hover:-translate-y-0.5"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#0A284D]/5 text-[#0A284D] group-hover:bg-[#D6AF36]/10 group-hover:text-[#8B7A2E] transition-colors duration-300">
                        <IconComponent size={18} />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <h3 className="text-base font-semibold text-gray-900 leading-snug group-hover:text-[#0A284D] transition-colors truncate">
                              {highlightMatch(result.title)}
                            </h3>
                            <p className="text-sm text-gray-500 mt-0.5 truncate">
                              {highlightMatch(result.subtitle)}
                            </p>
                          </div>
                          <ExternalLink
                            size={14}
                            className="shrink-0 text-gray-300 group-hover:text-[#D6AF36] transition-colors mt-1"
                          />
                        </div>
                        <p className="text-sm text-gray-400 mt-1.5 line-clamp-1">
                          {highlightMatch(result.description)}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-0.5 text-[10px] font-medium text-gray-500 uppercase tracking-wider">
                            {result.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* No Results State */}
        {!isLoading && hasSearched && filteredResults.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 animate-fadeIn">
            <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
              <Search size={28} className="text-gray-300" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-gray-900 md:text-3xl">
              No results found
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-gray-500">
              {activeTab !== "All" ? (
                <>
                  No results found in <strong>{activeTab}</strong> for &ldquo;{query}&rdquo;.{" "}
                  <button
                    onClick={() => setActiveTab("All")}
                    className="text-[#0A284D] font-medium hover:underline"
                  >
                    Search all categories
                  </button>{" "}
                  or try different keywords.
                </>
              ) : (
                <>
                  We couldn&apos;t find anything matching &ldquo;{query}&rdquo;. Try
                  different keywords or browse using the quick tags above.
                </>
              )}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {quickTags.slice(0, 4).map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className="rounded-full border border-gray-300 bg-white px-4 py-2 text-sm text-gray-600 transition-all hover:border-gray-400 hover:shadow-sm"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Empty / Initial State */}
        {!isLoading && !hasSearched && (
          <div className="flex flex-col items-center justify-center py-16 md:py-24 animate-fadeIn">
            <div className="relative mb-6">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#0A284D]/5 to-[#D6AF36]/10 flex items-center justify-center">
                <Search size={36} className="text-gray-300" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#D6AF36]/20 flex items-center justify-center">
                <TrendingUp size={12} className="text-[#D6AF36]" />
              </div>
            </div>
            <h2 className="font-serif text-2xl font-bold text-gray-900 md:text-3xl">
              Search India&apos;s Maritime Knowledge Base
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-gray-500">
              From ship recycling facilities to STCW certifications, maritime
              regulations to training institutes — everything is searchable.
            </p>

            {/* Browse categories */}
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-lg">
              {[
                { label: "Facilities", icon: MapPin, count: facilityData.length + shipyardsData.length, path: "/ship-recycling" },
                { label: "Publications", icon: BookOpen, count: publications.length, path: "/knowledge-hub" },
                { label: "Media", icon: Video, count: mediaItems.length, path: "/media-centre" },
                { label: "Stories", icon: Newspaper, count: stories.length, path: "/stories" },
              ].map((cat) => (
                <Link
                  key={cat.label}
                  to={cat.path}
                  className="group flex flex-col items-center gap-2 rounded-xl border border-gray-200 bg-white p-4 transition-all duration-300 hover:shadow-md hover:border-[#D6AF36]/30 hover:-translate-y-0.5"
                >
                  <cat.icon
                    size={20}
                    className="text-gray-400 group-hover:text-[#D6AF36] transition-colors"
                  />
                  <span className="text-xs font-medium text-gray-700">{cat.label}</span>
                  <span className="text-[10px] text-gray-400">{cat.count} items</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Inline animation styles */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </main>
  );
};

export default UniversalSearch;
