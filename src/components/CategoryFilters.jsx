import { categories } from "../data/storyData";

const CategoryFilters = ({ activeCategory, onCategoryChange }) => {
  return (
    <div className="mt-8 flex w-full gap-3 overflow-x-auto pb-4 scrollbar-hide md:mt-12">
      {categories.map((category) => {
        const isActive = activeCategory === category;
        return (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`whitespace-nowrap rounded-full px-5 py-2 text-sm font-medium transition-colors active:scale-95 ${
              isActive
                ? "bg-[#1A1A2E] text-white shadow-sm"
                : "bg-[#EAE1D3] text-gray-700 hover:bg-[#E0D5C3]"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
};

export default CategoryFilters;
