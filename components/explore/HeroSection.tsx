import { useState } from "react";
import { Sparkles, Search, Wand2 } from "lucide-react";
import ExploreSearchBar from "./SearchBar";
import { searchPropertiesWithAI, Property, AIPropertySearchResult } from "@/lib/ai";

interface HeroSectionProps {
  search: string;
  onSearchChange: (value: string) => void;
  onClear: () => void;
  onAISearch?: (filters: AIPropertySearchResult) => void;
  properties?: Property[];
}

export default function HeroSection({
  search,
  onSearchChange,
  onClear,
  onAISearch,
  properties = [],
}: HeroSectionProps) {
  const [isAISearch, setIsAISearch] = useState(false);
  const [aiQuery, setAiQuery] = useState("");
  const [isProcessingAI, setIsProcessingAI] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const handleAISearch = async () => {
    if (!aiQuery.trim() || !onAISearch || properties.length === 0) return;

    setIsProcessingAI(true);
    setAiError(null);
    try {
      const result = await searchPropertiesWithAI(aiQuery, properties);
      onAISearch(result);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'AI search failed. Please try again.';
      setAiError(errorMessage);
      console.error("AI search failed:", error);
    } finally {
      setIsProcessingAI(false);
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-primary pt-28 pb-20 px-6">
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

        {/* Search Mode Toggle */}
        <div className="mt-8 flex justify-center gap-2">
          <button
            onClick={() => setIsAISearch(false)}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
              !isAISearch
                ? "bg-white text-primary shadow-lg"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            <Search className="h-4 w-4" />
            Standard Search
          </button>
          <button
            onClick={() => setIsAISearch(true)}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
              isAISearch
                ? "bg-white text-primary shadow-lg"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            <Wand2 className="h-4 w-4" />
            AI Search
          </button>
        </div>

        {!isAISearch ? (
          <ExploreSearchBar
            search={search}
            onSearchChange={onSearchChange}
            onClear={onClear}
          />
        ) : (
          <div className="mt-6 max-w-2xl mx-auto">
            <div className="glass-strong rounded-2xl p-2 flex items-center gap-2">
              <input
                type="text"
                value={aiQuery}
                onChange={(e) => setAiQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAISearch()}
                placeholder="Describe your perfect stay in natural language..."
                className="flex-1 rounded-xl bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none"
                disabled={isProcessingAI}
              />
              <button
                onClick={handleAISearch}
                disabled={isProcessingAI || !aiQuery.trim()}
                className="rounded-xl bg-gradient-primary px-6 py-3 text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isProcessingAI ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Wand2 className="h-4 w-4" />
                    Search with AI
                  </>
                )}
              </button>
            </div>
            {aiError && (
              <p className="mt-3 text-sm text-red-200 bg-red-500/20 rounded-lg px-3 py-2">
                {aiError}
              </p>
            )}
            <p className="mt-3 text-sm text-emerald-50/70">
              Try: &quot;I want a peaceful mountain cabin with fast WiFi under ₹5000&quot;
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
