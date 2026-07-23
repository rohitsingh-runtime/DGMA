import { useState, useMemo } from "react";
import FeaturedBanner from "../components/FeaturedBanner";
import CategoryFilters from "../components/CategoryFilters";
import StoryCard from "../components/StoryCard";
import SeriesSection from "../components/SeriesSection";
import { stories } from "../data/storyData";

const StoryHub = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const featuredStory = stories.find((s) => s.featured);

  // Filter grid stories based on category (excluding the featured one)
  const gridStories = useMemo(() => {
    let filtered = stories.filter((s) => !s.featured);
    if (activeCategory !== "All") {
      filtered = filtered.filter((s) => s.category === activeCategory);
    }
    return filtered;
  }, [activeCategory]);

  return (
    <main className="w-full bg-[#F0E9DE]">
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-16">
        
        {/* ═══════════════════════════════════════════════════════
            1. Page Header Block
        ═══════════════════════════════════════════════════════ */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C1622D]">
              ORIGINAL CONTENT
            </p>
            <h1 className="mt-2 font-serif text-4xl font-bold leading-tight text-[#1A1A2E] md:text-5xl">
              Digital Story Hub
            </h1>
          </div>
          <p className="max-w-xs text-sm text-gray-500 md:text-right md:text-base">
            India's maritime stories — told with the depth they deserve.
          </p>
        </div>

        {/* ═══════════════════════════════════════════════════════
            2. Featured Video Banner
        ═══════════════════════════════════════════════════════ */}
        <FeaturedBanner story={featuredStory} />

        {/* ═══════════════════════════════════════════════════════
            3. Category Filters
        ═══════════════════════════════════════════════════════ */}
        <CategoryFilters
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* ═══════════════════════════════════════════════════════
            4. Mixed Story Grid
        ═══════════════════════════════════════════════════════ */}
        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3 md:grid-rows-2">
          {gridStories.slice(0, 5).map((story, index) => (
            <StoryCard
              key={story.id}
              story={story}
              size={index === 0 && activeCategory === "All" ? "large" : "normal"}
            />
          ))}
        </div>

        {/* ═══════════════════════════════════════════════════════
            5. Series Sections
        ═══════════════════════════════════════════════════════ */}
        
        <SeriesSection
          title="Featured Documentary"
          description="Long-form documentary films on India's maritime heritage."
          stories={stories.filter((s) => s.featured)}
        />

        <SeriesSection
          title="Latest Stories"
          description="Fresh perspectives from India's maritime ecosystem."
          stories={stories.filter((s) => s.series?.includes("Latest Stories"))}
        />

        <SeriesSection
          title="Women in Maritime"
          description="Celebrating trailblazers charting new waters."
          stories={stories.filter((s) => s.series?.includes("Women in Maritime"))}
        />

        <SeriesSection
          title="Innovation Series"
          description="Exploring technology transforming maritime India."
          stories={stories.filter((s) => s.series?.includes("Innovation Series"))}
        />

        <SeriesSection
          title="Future Mariners Series 2"
          description="India's next generation of seafarers."
          isComingSoon={true}
        />

      </div>
    </main>
  );
};

export default StoryHub;
