import { Star } from "lucide-react";

const FacilityCard = ({
  name,
  location,
  grade,
  type,
  _badgeColor,
  rating,
  capacity,
  certifications = [],
  image,
}) => {
  return (
    <article className="flex flex-col overflow-hidden rounded-xl bg-white shadow-sm transition hover:shadow-md">
      <div className="aspect-[16/10] w-full overflow-hidden">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />
      </div>

      <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
        <div className="flex items-center justify-between gap-2">
          <span
            className="inline-flex items-center rounded-sm px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#C1440E]"
          >
            {grade} {type}
          </span>

          <span className="flex items-center gap-1 text-sm text-gray-600">
            <Star
              size={13}
              className="fill-gray-700 text-gray-700"
              aria-hidden="true"
            />
            {rating.toFixed(1)}
          </span>
        </div>

        <h3 className="mt-3 font-serif text-lg font-bold leading-snug text-gray-900">
          {name}
        </h3>

        <p className="mt-0.5 text-sm text-gray-500">{location}</p>

        <div className="mt-4 flex flex-wrap items-end justify-between gap-2">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">
              Capacity
            </p>
            <p className="text-sm font-bold text-gray-900">{capacity}</p>
          </div>

          {certifications.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {certifications.map((cert) => (
                <span
                  key={cert}
                  className="rounded-sm border border-gray-200 bg-gray-50 px-2 py-0.5 text-[10px] font-medium text-gray-500"
                >
                  {cert}
                </span>
              ))}
            </div>
          )}
        </div>
        <button
          type="button"
          className="mt-5 w-full rounded-lg bg-[#C1622D] py-2.5 text-sm font-semibold text-white transition hover:bg-[#A8521F] active:scale-[0.98]"
        >
          View Complete Profile
        </button>
      </div>
    </article>
  );
};

export default FacilityCard;
