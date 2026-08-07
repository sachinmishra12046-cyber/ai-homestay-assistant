"use client";

import { X } from "lucide-react";
import { AMENITY_OPTIONS, CATEGORIES } from "./constants";
import PriceSlider from "./PriceSlider";
import { FilterState } from "./types";

interface FilterDrawerProps {
  open: boolean;
  draft: FilterState;
  onDraftChange: (draft: FilterState) => void;
  onClose: () => void;
  onApply: () => void;
  onReset: () => void;
}

export default function FilterDrawer({
  open,
  draft,
  onDraftChange,
  onClose,
  onApply,
  onReset,
}: FilterDrawerProps) {
  if (!open) return null;

  const toggleAmenity = (id: string) => {
    const amenities = draft.amenities.includes(id)
      ? draft.amenities.filter((a) => a !== id)
      : [...draft.amenities, id];
    onDraftChange({ ...draft, amenities });
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        type="button"
        aria-label="Close filters"
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
      />

      <aside className="relative flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ease-out dark:bg-gray-900">
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5 dark:border-gray-800">
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Filters</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Refine your perfect stay</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
          >
            <X className="h-5 w-5" strokeWidth={2} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">
          {/* Amenities */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Amenities</h3>
            <div className="flex flex-wrap gap-2">
              {AMENITY_OPTIONS.map(({ id, label }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => toggleAmenity(id)}
                  className={[
                    "rounded-full px-4 py-2 text-sm font-medium capitalize transition-all duration-200",
                    draft.amenities.includes(id)
                      ? "bg-emerald-600 text-white shadow-md"
                      : "border border-gray-200 bg-gray-50 text-gray-600 hover:border-emerald-200 hover:bg-emerald-50",
                  ].join(" ")}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Availability</h3>
            <label className="inline-flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 px-4 py-3 transition-colors hover:bg-gray-50">
              <input
                type="checkbox"
                checked={draft.availableOnly}
                onChange={(e) =>
                  onDraftChange({ ...draft, availableOnly: e.target.checked })
                }
                className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500/30"
              />
              <span className="text-sm font-medium text-gray-700">
                Show available stays only
              </span>
            </label>
          </div>

          {/* Minimum Rating */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Minimum Rating</h3>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min={0}
                max={5}
                step={0.5}
                value={draft.minRating}
                onChange={(e) =>
                  onDraftChange({ ...draft, minRating: Number(e.target.value) })
                }
                className="flex-1 accent-emerald-600 cursor-pointer"
              />
              <span className="min-w-[3rem] text-sm font-bold text-emerald-700">
                {draft.minRating}+
              </span>
            </div>
          </div>

          {/* Location */}
          <div>
            <label htmlFor="filter-location" className="text-sm font-semibold text-gray-900 mb-3 block">
              Location
            </label>
            <input
              id="filter-location"
              type="text"
              value={draft.location}
              onChange={(e) => onDraftChange({ ...draft, location: e.target.value })}
              placeholder="Filter by city or region..."
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>

          {/* Category */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Category</h3>
            <select
              value={draft.category}
              onChange={(e) => onDraftChange({ ...draft, category: e.target.value })}
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            >
              {CATEGORIES.map(({ label, value }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          {/* Property Type */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Property Type</h3>
            <select
              value={draft.propertyType}
              onChange={(e) => onDraftChange({ ...draft, propertyType: e.target.value })}
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none focus:border-emerald-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
            >
              {["All", "Cottage", "Villa", "Camp", "Bungalow", "Shack"].map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Guest Capacity */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Guest Capacity</h3>
            <select
              value={draft.guestCapacity}
              onChange={(e) => onDraftChange({ ...draft, guestCapacity: Number(e.target.value) })}
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none focus:border-emerald-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
            >
              {[1, 2, 3, 4, 5, 6, 8].map((n) => (
                <option key={n} value={n}>{n}+ guests</option>
              ))}
            </select>
          </div>

          {/* Price */}
          <PriceSlider
            minPrice={draft.minPrice}
            maxPrice={draft.maxPrice}
            onMinChange={(minPrice) => onDraftChange({ ...draft, minPrice })}
            onMaxChange={(maxPrice) => onDraftChange({ ...draft, maxPrice })}
          />
        </div>

        <div className="border-t border-gray-100 px-6 py-5 flex gap-3">
          <button
            type="button"
            onClick={onReset}
            className="flex-1 rounded-xl border border-gray-200 py-3 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-50"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={onApply}
            className="flex-1 rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white shadow-md shadow-emerald-600/20 transition-all hover:bg-emerald-700 hover:shadow-lg"
          >
            Apply
          </button>
        </div>
      </aside>
    </div>
  );
}