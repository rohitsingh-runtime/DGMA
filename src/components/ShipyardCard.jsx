import { Star, MapPin, ArrowRight } from "lucide-react";

const ShipyardCard = ({ yard, onViewProfile }) => {
  return (
    <article className="flex flex-col overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group">
      {/* Card Header — Image with Rating & Type overlays */}
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <img
          src={yard.img}
          alt={yard.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Rating Badge */}
        <span className="absolute top-3 left-3 flex items-center gap-1 rounded-md bg-black/60 backdrop-blur-sm px-2.5 py-1 text-xs font-bold text-white">
          <Star size={12} className="fill-amber-400 text-amber-400" />
          {yard.rating}
        </span>
        {/* Type Tag */}
        <span className="absolute top-3 right-3 rounded-md bg-[#0A284D]/80 backdrop-blur-sm px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
          {yard.type}
        </span>
      </div>

      {/* Card Body */}
      <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
        <h3 className="font-serif text-lg font-bold leading-snug text-gray-900 line-clamp-2">
          {yard.name}
        </h3>

        <div className="mt-1.5 flex items-center gap-1.5 text-sm text-gray-500">
          <MapPin size={13} className="text-gray-400 shrink-0" />
          <span>{yard.location}</span>
        </div>

        {/* Specs */}
        <div className="mt-4 grid grid-cols-2 gap-3 border-t border-gray-100 pt-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">
              Capacity
            </p>
            <p className="text-sm font-bold text-gray-900">{yard.capacity}</p>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">
              Dry Docks
            </p>
            <p className="text-sm font-bold text-gray-900">{yard.docks}</p>
          </div>
        </div>

        {/* View Profile Button */}
        <button
          type="button"
          onClick={() => onViewProfile(yard)}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-[#0A284D] py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#0D3566] active:scale-[0.98]"
        >
          View Profile
          <ArrowRight size={14} />
        </button>
      </div>
    </article>
  );
};

export default ShipyardCard;
