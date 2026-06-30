import { Sparkles } from "lucide-react";
import ExploreSearchBar from "./SearchBar";

interface HeroSectionProps {
  search: string;
  onSearchChange: (value: string) => void;
  onClear: () => void;
}

export default function HeroSection({
  search,
  onSearchChange,
  onClear,
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-700 via-green-600 to-teal-600 pt-28 pb-20 px-6">
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute top-10 right-0 h-96 w-96 rounded-full bg-emerald-300/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-teal-400/20 blur-3xl" />

      <div className="relative max-w-4xl mx-auto text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-emerald-50 backdrop-blur-md transition-opacity duration-700">
          <Sparkles className="h-4 w-4" strokeWidth={2} />
          500+ Eco Stays Across India
        </span>

        <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
          Explore Extraordinary
          <span className="block text-emerald-100">Homestays</span>
        </h1>

        <p className="mt-4 text-base md:text-lg text-emerald-50/90 max-w-2xl mx-auto leading-relaxed">
          AI-curated stays that match your vibe, budget, and values — from
          mountain retreats to beach escapes.
        </p>

        <ExploreSearchBar
          search={search}
          onSearchChange={onSearchChange}
          onClear={onClear}
        />
      </div>
    </section>
  );
}
