import { Clock } from "lucide-react";

const getCategoryColor = (category) => {
  switch (category) {
    case "Innovation":
      return "bg-[#0A284D]"; // Navy blue
    case "Women in Maritime":
      return "bg-[#6A4C9C]"; // Purple
    case "Documentary":
      return "bg-[#4A5568]"; // Dark Gray
    case "Feature":
      return "bg-[#C1622D]"; // Rust
    case "Leadership":
      return "bg-[#1A1A2E]"; // Near black
    case "Drone Series":
      return "bg-[#718096]"; // Gray
    default:
      return "bg-[#4A5568]";
  }
};

const StoryCard = ({ story, size = "normal" }) => {
  const isLarge = size === "large";

  return (
    <article
      className={`group relative overflow-hidden rounded-xl bg-gray-900 shadow-sm transition hover:shadow-md cursor-pointer ${
        isLarge ? "col-span-1 md:col-span-2 aspect-video md:aspect-[2/1]" : "col-span-1 aspect-[4/3] md:aspect-video"
      }`}
    >
      {/* ── Background Image ────────────────────────────────────── */}
      <img
        src={story.image}
        alt={story.title}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90"
        loading="lazy"
      />

      {/* ── Gradient Overlay ────────────────────────────────────── */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

      {/* ── Category Badge (Top Left) ───────────────────────────── */}
      <div className="absolute left-4 top-4">
        <span
          className={`inline-block rounded-sm px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white shadow-sm ${getCategoryColor(
            story.category
          )}`}
        >
          {story.category}
        </span>
      </div>

      {/* ── Text Content (Bottom) ───────────────────────────────── */}
      <div className="absolute bottom-0 left-0 w-full p-4 sm:p-5">
        <h3
          className={`font-serif font-bold text-white leading-snug drop-shadow-sm ${
            isLarge ? "text-xl sm:text-2xl" : "text-base sm:text-lg"
          }`}
        >
          {story.title}
        </h3>
        
        <div className="mt-2 flex items-center gap-2 text-xs text-gray-300">
          <Clock size={12} aria-hidden="true" />
          <span>{story.duration}</span>
          <span>&middot;</span>
          <span>{story.year}</span>
        </div>
      </div>
    </article>
  );
};

export default StoryCard;
