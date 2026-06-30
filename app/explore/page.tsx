"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CategoryChips from "@/components/explore/CategoryChips";
import EmptyState from "@/components/explore/EmptyState";
import FilterDrawer from "@/components/explore/FilterDrawer";
import HeroSection from "@/components/explore/HeroSection";
import LoadingSkeleton from "@/components/explore/LoadingSkeleton";
import SortDropdown from "@/components/explore/SortDropdown";
import StayGrid from "@/components/explore/StayGrid";
import { API_BASE, enrichStay } from "@/components/explore/constants";
import { useWishlist } from "@/context/WishlistProvider";
import {
  ApiStay,
  DEFAULT_FILTERS,
  FilterState,
  SortOption,
  Stay,
} from "@/components/explore/types";
import { motion } from "framer-motion";
import { Sparkles, TrendingUp } from "lucide-react";
import { SlidersHorizontal } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

const POPULAR_DESTINATIONS = ["Manali", "Goa", "Munnar", "Udaipur", "Coorg", "Kasol"];

function filterAndSortStays(
  stays: Stay[],
  search: string,
  activeCategory: string,
  filters: FilterState,
  sortBy: SortOption
): Stay[] {
  const query = search.toLowerCase().trim();

  const result = stays.filter((stay) => {
    const matchSearch =
      !query ||
      stay.title.toLowerCase().includes(query) ||
      stay.location.toLowerCase().includes(query);

    const matchCategory =
      activeCategory === "All" || stay.category === activeCategory;

    const matchPrice =
      stay.price >= filters.minPrice && stay.price <= filters.maxPrice;

    const matchRating = stay.rating >= filters.minRating;

    const matchLocation =
      !filters.location ||
      stay.location.toLowerCase().includes(filters.location.toLowerCase());

    const matchAmenities =
      filters.amenities.length === 0 ||
      filters.amenities.every((amenity) => stay.amenities.includes(amenity));

    const matchAvailable = !filters.availableOnly || stay.available;

    const matchPropertyType =
      filters.propertyType === "All" ||
      stay.title.toLowerCase().includes(filters.propertyType.toLowerCase());

    return (
      matchSearch &&
      matchCategory &&
      matchPrice &&
      matchRating &&
      matchLocation &&
      matchAmenities &&
      matchAvailable &&
      matchPropertyType
    );
  });

  return [...result].sort((a, b) => {
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "price_low") return a.price - b.price;
    if (sortBy === "price_high") return b.price - a.price;
    if (sortBy === "newest") return b.id - a.id;
    return 0;
  });
}

function SectionHeader({ title, subtitle, icon: Icon }: { title: string; subtitle?: string; icon?: typeof Sparkles }) {
  return (
    <div className="mb-5">
      <div className="flex items-center gap-2">
        {Icon && <Icon className="h-5 w-5 text-emerald-600" strokeWidth={2} />}
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h2>
      </div>
      {subtitle && <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>}
    </div>
  );
}

export default function ExplorePage() {
  const { wishlist, toggleWishlist } = useWishlist();
  const [stays, setStays] = useState<Stay[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState<SortOption>("rating");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [draftFilters, setDraftFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [recentlyViewed, setRecentlyViewed] = useState<number[]>([]);

  useEffect(() => {
    let cancelled = false;

    async function loadStays() {
      setLoading(true);
      try {
        const response = await fetch(`${API_BASE}/api/homestays`);
        const json = await response.json();
        if (!cancelled && json.success && Array.isArray(json.data)) {
          setStays(json.data.map((stay: ApiStay) => enrichStay(stay)));
        }
      } catch {
        if (!cancelled) setStays([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    try {
      const stored = localStorage.getItem("staynest-recently-viewed");
      if (stored) setRecentlyViewed(JSON.parse(stored));
    } catch { /* ignore */ }

    loadStays();
    return () => { cancelled = true; };
  }, []);

  const filteredStays = useMemo(
    () => filterAndSortStays(stays, search, activeCategory, filters, sortBy),
    [stays, search, activeCategory, filters, sortBy]
  );

  const trendingStays = useMemo(
    () => [...stays].sort((a, b) => b.reviews - a.reviews).slice(0, 4),
    [stays]
  );

  const aiPicks = useMemo(
    () => [...stays].filter((s) => s.rating >= 4.8).slice(0, 4),
    [stays]
  );

  const recentStays = useMemo(
    () => recentlyViewed.map((id) => stays.find((s) => s.id === id)).filter(Boolean) as Stay[],
    [recentlyViewed, stays]
  );

  const handleCategoryChange = useCallback((category: string) => {
    setActiveCategory(category);
    setFilters((prev) => ({ ...prev, category }));
  }, []);

  const openFilters = useCallback(() => {
    setDraftFilters(filters);
    setShowFilters(true);
  }, [filters]);

  const applyFilters = useCallback(() => {
    setFilters(draftFilters);
    setActiveCategory(draftFilters.category);
    setShowFilters(false);
  }, [draftFilters]);

  const resetAll = useCallback(() => {
    setSearch("");
    setActiveCategory("All");
    setSortBy("rating");
    setFilters(DEFAULT_FILTERS);
    setDraftFilters(DEFAULT_FILTERS);
    setShowFilters(false);
  }, []);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.minPrice !== DEFAULT_FILTERS.minPrice) count++;
    if (filters.maxPrice !== DEFAULT_FILTERS.maxPrice) count++;
    if (filters.minRating > 0) count++;
    if (filters.location) count++;
    if (filters.amenities.length > 0) count++;
    if (filters.availableOnly) count++;
    if (filters.propertyType !== "All") count++;
    if (filters.guestCapacity > 1) count++;
    return count;
  }, [filters]);

  const hasActiveSearch = search || activeCategory !== "All" || activeFilterCount > 0;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100 transition-colors duration-300">
      <Navbar />

      <HeroSection search={search} onSearchChange={setSearch} onClear={() => setSearch("")} />

      <div className="sticky top-16 z-30 border-b border-gray-100 bg-white/90 shadow-sm backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/90">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-4 lg:flex-row lg:items-center lg:justify-between">
          <CategoryChips activeCategory={activeCategory} onCategoryChange={handleCategoryChange} />
          <div className="flex shrink-0 items-center gap-3">
            <SortDropdown sortBy={sortBy} onSortChange={setSortBy} />
            <button
              type="button"
              onClick={openFilters}
              className={[
                "inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200",
                showFilters || activeFilterCount > 0
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                  : "border border-gray-200 bg-white text-gray-700 hover:border-emerald-200 hover:bg-emerald-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-emerald-950/30",
              ].join(" ")}
            >
              <SlidersHorizontal className="h-4 w-4" strokeWidth={2} />
              Filters
              {activeFilterCount > 0 && (
                <span className="flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-white/20 px-1.5 text-xs font-bold">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-10 space-y-14">
        {/* Popular Destinations */}
        {!hasActiveSearch && !loading && (
          <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <SectionHeader title="Popular Destinations" subtitle="Trending places travelers love" icon={TrendingUp} />
            <div className="flex flex-wrap gap-2">
              {POPULAR_DESTINATIONS.map((dest) => (
                <button
                  key={dest}
                  type="button"
                  onClick={() => setSearch(dest)}
                  className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-emerald-950/30"
                >
                  {dest}
                </button>
              ))}
            </div>
          </motion.section>
        )}

        {/* AI Picks */}
        {!hasActiveSearch && !loading && aiPicks.length > 0 && (
          <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <SectionHeader title="AI Picks for You" subtitle="Personalized recommendations based on your preferences" icon={Sparkles} />
            <StayGrid stays={aiPicks} wishlist={wishlist} onToggleWishlist={toggleWishlist} />
          </motion.section>
        )}

        {/* Trending */}
        {!hasActiveSearch && !loading && (
          <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <SectionHeader title="Trending Stays" subtitle="Most reviewed homestays this month" icon={TrendingUp} />
            <StayGrid stays={trendingStays} wishlist={wishlist} onToggleWishlist={toggleWishlist} />
          </motion.section>
        )}

        {/* Recently Viewed */}
        {!hasActiveSearch && recentStays.length > 0 && (
          <section>
            <SectionHeader title="Recently Viewed" />
            <StayGrid stays={recentStays} wishlist={wishlist} onToggleWishlist={toggleWishlist} showAiBadge={false} />
          </section>
        )}

        {/* All Results */}
        <section>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
            Showing <span className="font-bold text-gray-900 dark:text-white">{filteredStays.length}</span> stays
            {activeCategory !== "All" && <> in <span className="font-semibold text-emerald-600">{activeCategory}</span></>}
          </p>

          {loading ? (
            <LoadingSkeleton />
          ) : filteredStays.length === 0 ? (
            <EmptyState onReset={resetAll} />
          ) : (
            <StayGrid stays={filteredStays} wishlist={wishlist} onToggleWishlist={toggleWishlist} />
          )}
        </section>
      </div>

      <FilterDrawer
        open={showFilters}
        draft={draftFilters}
        onDraftChange={setDraftFilters}
        onClose={() => setShowFilters(false)}
        onApply={applyFilters}
        onReset={() => setDraftFilters(DEFAULT_FILTERS)}
      />

      <Footer />
    </div>
  );
}
