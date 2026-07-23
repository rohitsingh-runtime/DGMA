import { Play } from "lucide-react";

const FeaturedBanner = ({ story }) => {
  if (!story) return null;

  return (
    <div className="group relative mt-10 w-full overflow-hidden rounded-2xl bg-gray-900 shadow-sm transition hover:shadow-md cursor-pointer">
      {/* ── Background Image ────────────────────────────────────── */}
      <div className="aspect-video w-full sm:aspect-[21/9] md:aspect-[3/1]">
        <img
          src={story.image}
          alt={story.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90"
          loading="lazy"
        />
      </div>

      {/* ── Dark Gradient Overlay ────────────────────────────────── */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-[#0A192F]/40 to-transparent opacity-90" />

      {/* ── Play Button (Centered) ───────────────────────────────── */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/20 p-4 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110 group-hover:bg-white/30">
        <Play className="ml-1 h-8 w-8 text-white md:h-12 md:w-12" fill="currentColor" />
      </div>

      {/* ── Text Content (Bottom Left) ───────────────────────────── */}
      <div className="absolute bottom-0 left-0 p-6 md:p-10">
        <span className="mb-3 inline-block rounded-full bg-[#E5B53D] px-3 py-1 text-[10px] font-bold tracking-widest text-[#1A1A2E] uppercase">
          Featured Documentary
        </span>
        <h2 className="font-serif text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl lg:text-5xl max-w-3xl">
          {story.title}
        </h2>
      </div>
    </div>
  );
};

export default FeaturedBanner;
