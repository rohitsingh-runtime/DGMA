import { useState, useMemo } from "react";
import {
  Play,
  Camera,
  Wifi,
  Users,
  Image,
  Mic,
  Video,
} from "lucide-react";
import {
  mediaItems,
  topicFilters,
  mediaTypeFilters,
  mediaStats,
} from "../data/mediaData";
import MediaCard from "../components/MediaCard";

const mediaTypeIcons = {
  All: Image,
  Video: Video,
  Photo: Camera,
  Drone: Wifi,
  Interview: Mic,
};

const statIcons = {
  play: Play,
  camera: Camera,
  wifi: Wifi,
  users: Users,
};

const MediaCentre = () => {
  const [activeTopic, setActiveTopic] = useState("All");
  const [activeType, setActiveType] = useState("All");

  const filteredMedia = useMemo(() => {
    return mediaItems.filter((item) => {
      const matchesTopic =
        activeTopic === "All" || item.category === activeTopic;
      const matchesType = activeType === "All" || item.type === activeType;
      return matchesTopic && matchesType;
    });
  }, [activeTopic, activeType]);

  const featured = filteredMedia.find((m) => m.featured) || filteredMedia[0];
  const rest = filteredMedia.filter((m) => m !== featured);

  return (
    <main className="w-full font-sans">
      {/* ═══════════ PAGE HEADER ═══════════ */}
      <section className="bg-[#0A1525] px-6 pb-4 pt-14 md:px-10 md:pt-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#D6AF36]">
            VISUAL ARCHIVE
          </p>
          <h1 className="mt-3 font-serif text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            Media Centre
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-400 md:text-lg">
            Explore India&apos;s maritime story through documentary films, drone
            footage, photography, and exclusive interviews.
          </p>
        </div>
      </section>

      {/* ═══════════ DUAL FILTER BAR ═══════════ */}
      <div className="bg-[#0A1525] border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="flex flex-wrap items-center gap-3 py-4">
            {/* Topic filters */}
            {topicFilters.map((topic) => (
              <button
                key={topic}
                type="button"
                onClick={() => setActiveTopic(topic)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
                  activeTopic === topic
                    ? "border border-[#D6AF36] text-[#D6AF36]"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {topic}
              </button>
            ))}

            {/* Separator */}
            <span className="hidden h-5 w-px bg-white/20 sm:block" />

            {/* Media type filters */}
            {mediaTypeFilters.map((type) => {
              const IconComp = mediaTypeIcons[type];
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => setActiveType(type)}
                  className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
                    activeType === type
                      ? "bg-white/15 text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {IconComp && <IconComp size={14} />}
                  {type}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ═══════════ MEDIA GALLERY ═══════════ */}
      <section className="bg-[#0A1525] px-6 py-10 md:px-10 md:py-14">
        <div className="mx-auto max-w-7xl">
          {filteredMedia.length === 0 ? (
            <div className="rounded-2xl bg-white/5 p-16 text-center">
              <h3 className="font-serif text-xl font-bold text-white">
                No Media Found
              </h3>
              <p className="mt-2 text-sm text-gray-400">
                Try adjusting your filters.
              </p>
            </div>
          ) : (
            <>
              {/* Featured + Top Row */}
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
                {/* Featured large card */}
                {featured && (
                  <MediaCard
                    item={featured}
                    className="lg:col-span-6 aspect-[16/10] lg:aspect-auto lg:min-h-[420px]"
                  />
                )}
                {/* Stacked right cards */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-6">
                  {rest.slice(0, 2).map((item) => (
                    <MediaCard
                      key={item.id}
                      item={item}
                      className="aspect-[16/10]"
                    />
                  ))}
                  {rest.slice(2, 4).map((item) => (
                    <MediaCard
                      key={item.id}
                      item={item}
                      className="aspect-[16/10]"
                    />
                  ))}
                </div>
              </div>

              {/* Additional rows */}
              {rest.length > 4 && (
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {rest.slice(4).map((item) => (
                    <MediaCard
                      key={item.id}
                      item={item}
                      className="aspect-[16/10]"
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* ═══════════ STATS BAR ═══════════ */}
      <section className="bg-[#141414] py-12">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {mediaStats.map((stat) => {
              const StatIcon = statIcons[stat.icon];
              return (
                <div
                  key={stat.label}
                  className="rounded-xl border border-white/10 bg-white/5 p-6 text-center transition-colors hover:bg-white/10"
                >
                  {StatIcon && (
                    <StatIcon
                      size={24}
                      className="mx-auto text-gray-400"
                    />
                  )}
                  <p className="mt-3 font-serif text-3xl font-bold text-white">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-gray-400">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
};

export default MediaCentre;
