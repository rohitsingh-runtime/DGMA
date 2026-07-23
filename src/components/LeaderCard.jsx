import { ArrowRight, ChevronRight } from "lucide-react";

const LeaderCard = ({ leader }) => {
  return (
    <article className="group flex-shrink-0 w-[260px] sm:w-[280px] overflow-hidden rounded-xl border border-gray-200/60 bg-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      {/* Portrait */}
      <div className="aspect-[4/4] w-full overflow-hidden bg-gray-100">
        <img
          src={leader.img}
          alt={leader.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Info */}
      <div className="p-5">
        <h3 className="font-serif text-lg font-bold text-gray-900 leading-snug">
          {leader.name}
        </h3>
        <p className="mt-1 text-sm text-gray-500 leading-relaxed">
          {leader.role}
          <br />
          {leader.org}
        </p>
        <p className="mt-3 text-sm font-bold text-[#C5A028]">{leader.years}</p>
        <button
          type="button"
          className="mt-3 flex items-center gap-1 text-sm font-semibold text-[#C5A028] transition-colors hover:text-[#a8881f]"
        >
          View Profile
          <ArrowRight size={14} />
          <ChevronRight size={12} />
        </button>
      </div>
    </article>
  );
};

export default LeaderCard;
