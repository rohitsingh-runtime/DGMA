import { ArrowRight } from "lucide-react";
import StoryCard from "./StoryCard";

const SeriesSection = ({ title, description, stories = [], isComingSoon = false }) => {
  if (stories.length === 0 && !isComingSoon) return null;

  return (
    <section className="mt-16 border-t border-gray-300/60 pt-10">
      {/* ── Section Header ─────────────────────────────────────── */}
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C1440E]">
            SERIES
          </p>
          <h2 className="mt-1 font-serif text-2xl font-bold text-[#1A1A2E] sm:text-3xl">
            {title}
          </h2>
          {description && (
            <p className="mt-2 max-w-2xl text-sm text-gray-500 sm:text-base">
              {description}
            </p>
          )}
        </div>

        {!isComingSoon && (
          <a
            href="#"
            className="group flex items-center gap-1 whitespace-nowrap text-xs font-semibold text-gray-500 transition hover:text-[#C1622D] sm:text-sm"
          >
            See all
            <ArrowRight
              size={14}
              className=" transition-transform group-hover:translate-x-1"
            />
          </a>
        )}
      </div>

      {/* ── Stories Row / Grid ─────────────────────────────────── */}
      <div className="mt-8">
        {isComingSoon ? (
          <div className="relative overflow-hidden rounded-xl bg-gray-900 shadow-sm aspect-[4/1] sm:aspect-[6/1] md:aspect-[8/1] flex flex-col items-center justify-center">
            <img
              src="/story-feature-1.png"
              alt="Coming Soon Background"
              className="absolute inset-0 h-full w-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-[#0A192F]/60" />
            <div className="relative z-10 text-center">
              <span className="mb-2 inline-block text-[10px] font-bold uppercase tracking-widest text-[#E5B53D]">
                COMING SOON
              </span>
              <h3 className="font-serif text-xl font-bold text-white sm:text-2xl md:text-3xl">
                {title}
              </h3>
            </div>
          </div>
        ) : (
          <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 scrollbar-hide md:grid md:grid-cols-4 md:snap-none md:overflow-x-visible md:pb-0">
            {stories.map((story) => (
              <div
                key={story.id}
                className="w-[80vw] shrink-0 snap-start sm:w-[45vw] md:w-auto"
              >
                <StoryCard story={story} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SeriesSection;
