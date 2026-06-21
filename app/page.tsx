"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Card from "@/components/Card";
import Footer from "@/components/Footer";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div
      className={
        darkMode
          ? "bg-black text-white min-h-screen"
          : "bg-white text-black min-h-screen"
      }
    >
      <Navbar />

      <div className="p-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="border px-4 py-2 rounded-lg"
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      <main>
        <section
          className={`py-16 px-4 ${
            darkMode ? "bg-gray-900" : "bg-gray-100"
          }`}
        >
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-4">
              Find Your Perfect Homestay
            </h1>

            <p
              className={`text-lg ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Explore comfortable and affordable homestays across different
              destinations with smart recommendations.
            </p>

            <button className="mt-6 bg-black text-white px-6 py-3 rounded-lg">
              Explore Stays
            </button>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-4 py-8">
          <input
            type="text"
            placeholder="Search destination..."
            className={`w-full border rounded-lg p-3 ${
              darkMode
                ? "bg-gray-800 text-white"
                : "bg-white text-black"
            }`}
          />
        </section>

        <section className="max-w-6xl mx-auto px-4 py-10">
          <h2 className="text-3xl font-bold mb-6">
            Featured Homestays
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}