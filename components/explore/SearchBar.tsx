import { Search, X } from "lucide-react";

interface ExploreSearchBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  onClear: () => void;
}

export default function ExploreSearchBar({
  search,
  onSearchChange,
  onClear,
}: ExploreSearchBarProps) {
  return (
    <div className="mt-10 max-w-2xl mx-auto">
      <div className="group flex items-center gap-3 rounded-full border border-white/30 bg-white/15 p-2 pl-5 shadow-2xl shadow-emerald-900/20 backdrop-blur-xl transition-all duration-300 hover:bg-white/20 hover:border-white/40 focus-within:bg-white/25 focus-within:border-white/50 focus-within:shadow-emerald-900/30">
        <Search className="h-5 w-5 shrink-0 text-white/70 transition-colors group-focus-within:text-white" />

        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search destinations, stays, or regions..."
          className="w-full bg-transparent py-2.5 text-sm text-white placeholder:text-white/60 outline-none"
        />

        {search && (
          <button
            type="button"
            onClick={onClear}
            aria-label="Clear search"
            className="mr-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white/70 transition-all hover:bg-white/15 hover:text-white hover:scale-105"
          >
            <X className="h-4 w-4" strokeWidth={2} />
          </button>
        )}

        <button
          type="button"
          className="shrink-0 rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-emerald-700 shadow-lg transition-all duration-300 hover:bg-emerald-50 hover:scale-[1.02] hover:shadow-xl"
        >
          Search
        </button>
      </div>
    </div>
  );
}
