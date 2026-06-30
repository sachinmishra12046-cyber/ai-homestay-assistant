"use client";

import { FormEvent, useState } from "react";

export default function SearchBar() {
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <section className="bg-white px-4 sm:px-6 lg:px-8 -mt-6 pb-12">
      <div className="max-w-5xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl border border-gray-200 shadow-md p-4 sm:p-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Destination */}
            <div className="sm:col-span-2 lg:col-span-1">
              <label
                htmlFor="destination"
                className="block text-xs font-medium text-gray-500 mb-1.5"
              >
                Destination
              </label>
              <input
                id="destination"
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Where are you going?"
                className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#16a34a] focus:ring-2 focus:ring-[#16a34a]/20 outline-none transition-colors"
              />
            </div>

            {/* Check-in */}
            <div>
              <label
                htmlFor="check-in"
                className="block text-xs font-medium text-gray-500 mb-1.5"
              >
                Check-in
              </label>
              <input
                id="check-in"
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-900 focus:border-[#16a34a] focus:ring-2 focus:ring-[#16a34a]/20 outline-none transition-colors"
              />
            </div>

            {/* Check-out */}
            <div>
              <label
                htmlFor="check-out"
                className="block text-xs font-medium text-gray-500 mb-1.5"
              >
                Check-out
              </label>
              <input
                id="check-out"
                type="date"
                value={checkOut}
                min={checkIn || undefined}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-900 focus:border-[#16a34a] focus:ring-2 focus:ring-[#16a34a]/20 outline-none transition-colors"
              />
            </div>

            {/* Guests */}
            <div>
              <label
                htmlFor="guests"
                className="block text-xs font-medium text-gray-500 mb-1.5"
              >
                Guests
              </label>
              <select
                id="guests"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-900 focus:border-[#16a34a] focus:ring-2 focus:ring-[#16a34a]/20 outline-none transition-colors bg-white"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((count) => (
                  <option key={count} value={String(count)}>
                    {count} {count === 1 ? "Guest" : "Guests"}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="mt-4 w-full sm:w-auto rounded-lg bg-[#16a34a] px-8 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-green-700 transition-colors"
          >
            Search
          </button>
        </form>
      </div>
    </section>
  );
}
