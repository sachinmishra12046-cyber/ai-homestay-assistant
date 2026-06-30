import { CATEGORIES } from "./constants";

interface CategoryChipsProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryChips({
  activeCategory,
  onCategoryChange,
}: CategoryChipsProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
      {CATEGORIES.map(({ label, emoji, value }) => {
        const isActive = activeCategory === value;

        return (
          <button
            key={value}
            type="button"
            onClick={() => onCategoryChange(value)}
            className={[
              "inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300",
              isActive
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/25 scale-[1.02]"
                : "border border-gray-200 bg-white text-gray-600 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 hover:scale-[1.02]",
            ].join(" ")}
          >
            <span aria-hidden="true">{emoji}</span>
            {label}
          </button>
        );
      })}
    </div>
  );
}
