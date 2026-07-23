import { Eye, Download, BookOpen, Share2 } from "lucide-react";

const PublicationCard = ({ pub }) => {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-gray-200/60 bg-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      {/* Book Cover */}
      <div className="relative flex items-center justify-center bg-gray-50 px-8 py-8">
        <div
          className="relative w-[140px] rounded-md shadow-xl transition-transform duration-500 group-hover:scale-105 overflow-hidden"
          style={{ perspective: "600px" }}
        >
          {/* Book spine effect */}
          <div
            className="aspect-[3/4] flex flex-col justify-center px-5 py-6 text-center text-white"
            style={{ backgroundColor: pub.color }}
          >
            <p className="text-sm font-bold leading-snug">
              {pub.title.length > 35
                ? pub.title.slice(0, 35) + "..."
                : pub.title}
            </p>
          </div>
          {/* Page count label */}
          <div
            className="absolute bottom-0 left-0 right-0 py-1.5 px-3 text-left text-[11px] font-medium text-white/80"
            style={{ backgroundColor: pub.color }}
          >
            {pub.pages}pp
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
        <p
          className="text-[10px] font-bold uppercase tracking-widest"
          style={{ color: pub.color }}
        >
          {pub.category}
        </p>
        <h3 className="mt-1.5 font-serif text-base font-bold text-gray-900 leading-snug line-clamp-2">
          {pub.title}
        </h3>
        <p className="mt-1 text-xs text-gray-400">
          {pub.year} · {pub.pages} pages
        </p>
        <p className="mt-2 flex items-center gap-1 text-xs text-gray-400">
          <Download size={11} />
          {pub.downloads} downloads
        </p>

        {/* Action Buttons */}
        <div className="mt-4 flex items-center gap-2">
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-700 transition-colors hover:bg-gray-50"
          >
            <Eye size={13} />
            Preview
          </button>
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-semibold text-white transition-colors hover:opacity-90"
            style={{ backgroundColor: pub.btnColor }}
          >
            <Download size={13} />
            Download
          </button>
        </div>

        {/* Secondary Actions */}
        <div className="mt-3 flex items-center gap-5 text-xs text-gray-400">
          <button
            type="button"
            className="flex items-center gap-1.5 transition-colors hover:text-gray-600"
          >
            <BookOpen size={12} />
            Flipbook
          </button>
          <button
            type="button"
            className="flex items-center gap-1.5 transition-colors hover:text-gray-600"
          >
            <Share2 size={12} />
            Share
          </button>
        </div>
      </div>
    </article>
  );
};

export default PublicationCard;
