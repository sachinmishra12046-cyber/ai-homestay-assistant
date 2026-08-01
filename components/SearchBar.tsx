"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, ChevronDown, MapPin, Search, Users } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const router = useRouter();
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const query = destination.trim();
    router.push(query ? `/explore?q=${encodeURIComponent(query)}` : "/explore");
  };

  return (
    <section className="relative z-10 px-4 sm:px-6 lg:px-8 -mt-10 pb-12">
      <div className="max-w-5xl mx-auto">
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="rounded-2xl border border-gray-200/50 bg-white/80 p-4 shadow-2xl shadow-emerald-950/10 backdrop-blur-xl ring-1 ring-black/5 sm:p-6 dark:border-gray-700/50 dark:bg-gray-900/80 dark:ring-white/10"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Destination */}
            <div className="relative">
              <label
                htmlFor="destination"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400"
              >
                Destination
              </label>
              <div className="relative group">
                <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-[#16a34a]" aria-hidden="true" />
                <input
                  id="destination"
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Where are you going?"
                  className="w-full rounded-xl border border-gray-200 bg-white/50 py-3 pl-10 pr-3 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-[#16a34a] focus:bg-white focus:ring-2 focus:ring-[#16a34a]/20 dark:border-gray-700 dark:bg-gray-800/50 dark:text-white dark:placeholder:text-gray-500 dark:focus:bg-gray-800"
                />
              </div>
            </div>

            {/* Check-in */}
            <div className="relative">
              <label
                htmlFor="check-in"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400"
              >
                Check-in
              </label>
              <div className="relative group">
                <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-[#16a34a]" aria-hidden="true" />
                <input
                  id="check-in"
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white/50 py-3 pl-10 pr-3 text-sm text-gray-900 outline-none transition-all focus:border-[#16a34a] focus:bg-white focus:ring-2 focus:ring-[#16a34a]/20 dark:border-gray-700 dark:bg-gray-800/50 dark:text-white dark:focus:bg-gray-800"
                />
              </div>
            </div>

            {/* Check-out */}
            <div className="relative">
              <label
                htmlFor="check-out"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400"
              >
                Check-out
              </label>
              <div className="relative group">
                <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-[#16a34a]" aria-hidden="true" />
                <input
                  id="check-out"
                  type="date"
                  value={checkOut}
                  min={checkIn || undefined}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white/50 py-3 pl-10 pr-3 text-sm text-gray-900 outline-none transition-all focus:border-[#16a34a] focus:bg-white focus:ring-2 focus:ring-[#16a34a]/20 dark:border-gray-700 dark:bg-gray-800/50 dark:text-white dark:focus:bg-gray-800"
                />
              </div>
            </div>

            {/* Guests */}
            <div className="relative">
              <label
                htmlFor="guests"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400"
              >
                Guests
              </label>
              <div className="relative group">
                <Users className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-[#16a34a]" aria-hidden="true" />
                <select
                  id="guests"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full cursor-pointer appearance-none rounded-xl border border-gray-200 bg-white/50 py-3 pl-10 pr-9 text-sm text-gray-900 outline-none transition-all focus:border-[#16a34a] focus:bg-white focus:ring-2 focus:ring-[#16a34a]/20 dark:border-gray-700 dark:bg-gray-800/50 dark:text-white dark:focus:bg-gray-800"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((count) => (
                    <option key={count} value={String(count)}>
                      {count} {count === 1 ? "Guest" : "Guests"}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-[#16a34a]" aria-hidden="true" />
              </div>
            </div>
          </div>

          <motion.button
            type="submit"
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#16a34a] to-emerald-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-green-500/30 transition-all duration-300 hover:shadow-green-500/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900 sm:w-auto"
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
          >
            <Search className="h-4 w-4" />
            Search
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
}
