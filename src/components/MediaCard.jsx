import { Play } from "lucide-react";

const MediaCard = ({ item, className = "" }) => {
  const hasVideo =
    item.type === "Video" ||
    item.type === "Interview" ||
    item.type === "Drone";

  return (
    <article
      className={`group relative overflow-hidden rounded-xl bg-gray-900 cursor-pointer transition-all duration-300 hover:shadow-xl ${className}`}
    >
      {/* Image */}
      <img
        src={item.img}
        alt={item.title}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-90"
        loading="lazy"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Type tag */}
      <span className="absolute top-3 left-3 rounded-md bg-white/20 backdrop-blur-sm px-2.5 py-1 text-[10px] font-bold text-white">
        {item.type}
      </span>

      {/* Category tag */}
      <span className="absolute top-3 right-3 rounded-md bg-white/20 backdrop-blur-sm px-2.5 py-1 text-[10px] font-bold text-white">
        {item.category}
      </span>

      {/* Play button for video types */}
      {hasVideo && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-white transition-transform duration-300 group-hover:scale-110">
            <Play size={20} fill="white" />
          </div>
        </div>
      )}

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="font-serif text-sm font-bold text-white leading-snug sm:text-base line-clamp-2">
          {item.title}
        </h3>
        {item.duration && (
          <p className="mt-1 text-xs text-gray-300">{item.duration}</p>
        )}
      </div>
    </article>
  );
};

export default MediaCard;
