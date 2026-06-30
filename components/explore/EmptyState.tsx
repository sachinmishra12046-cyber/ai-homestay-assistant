import { MapPin, Search } from "lucide-react";

interface EmptyStateProps {
  onReset: () => void;
}

export default function EmptyState({ onReset }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-gray-200 bg-white py-20 px-6 text-center">
      <div className="relative mb-6">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-emerald-50">
          <MapPin className="h-10 w-10 text-emerald-300" strokeWidth={1.5} />
        </div>
        <div className="absolute -bottom-1 -right-1 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md">
          <Search className="h-5 w-5 text-emerald-600" strokeWidth={2} />
        </div>
      </div>

      <h3 className="text-2xl font-bold text-gray-900">No stays found</h3>
      <p className="mt-2 max-w-md text-sm text-gray-500 leading-relaxed">
        We couldn&apos;t find any homestays matching your search or filters.
        Try adjusting your criteria or explore all available stays.
      </p>

      <button
        type="button"
        onClick={onReset}
        className="mt-8 rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-emerald-600/20 transition-all hover:bg-emerald-700 hover:shadow-lg hover:scale-[1.02]"
      >
        Clear all filters
      </button>
    </div>
  );
}
