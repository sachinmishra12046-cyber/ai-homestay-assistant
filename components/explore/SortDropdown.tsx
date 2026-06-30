import { ArrowDown, ArrowUp, ChevronDown, Clock, Star } from "lucide-react";
import { SortOption } from "./types";

const SORT_OPTIONS: {
  value: SortOption;
  label: string;
  icon: typeof Star;
}[] = [
  { value: "rating", label: "Top Rated", icon: Star },
  { value: "price_low", label: "Price Low → High", icon: ArrowUp },
  { value: "price_high", label: "Price High → Low", icon: ArrowDown },
  { value: "newest", label: "Newest", icon: Clock },
];

interface SortDropdownProps {
  sortBy: SortOption;
  onSortChange: (value: SortOption) => void;
}

export default function SortDropdown({ sortBy, onSortChange }: SortDropdownProps) {
  const active = SORT_OPTIONS.find((o) => o.value === sortBy);

  return (
    <div className="relative min-w-[180px]">
      <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-emerald-600">
        {active && <active.icon className="h-4 w-4" strokeWidth={2} />}
      </div>
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value as SortOption)}
        className="w-full cursor-pointer appearance-none rounded-xl border border-gray-200 bg-white py-2.5 pl-9 pr-9 text-sm font-medium text-gray-700 shadow-sm outline-none transition-all hover:border-emerald-200 hover:bg-emerald-50/50 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
      >
        {SORT_OPTIONS.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
    </div>
  );
}
