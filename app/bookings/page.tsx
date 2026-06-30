"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Calendar, Download, MapPin, Users } from "lucide-react";
import { useState } from "react";

type Tab = "upcoming" | "completed" | "cancelled";

const bookings = {
  upcoming: [
    { id: 1, property: "Himalayan Pine Retreat", location: "Manali, HP", date: "Apr 12 – Apr 15, 2026", guests: 2, price: 7497, status: "Confirmed" },
    { id: 2, property: "Coastal Bamboo Villa", location: "Gokarna, KA", date: "May 3 – May 7, 2026", guests: 3, price: 12796, status: "Confirmed" },
  ],
  completed: [
    { id: 3, property: "Tea Garden Eco Bungalow", location: "Munnar, KL", date: "Feb 20 – Feb 23, 2026", guests: 2, price: 6699, status: "Completed" },
  ],
  cancelled: [
    { id: 4, property: "Desert Courtyard Haveli", location: "Udaipur, RJ", date: "Jan 5 – Jan 8, 2026", guests: 2, price: 12897, status: "Cancelled" },
  ],
};

export default function BookingsPage() {
  const [tab, setTab] = useState<Tab>("upcoming");
  const [selected, setSelected] = useState<(typeof bookings.upcoming)[0] | null>(null);
  const list = bookings[tab];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">My Bookings</h1>

        <div className="flex gap-2 mb-8 overflow-x-auto">
          {(["upcoming", "completed", "cancelled"] as Tab[]).map((t) => (
            <button key={t} type="button" onClick={() => { setTab(t); setSelected(null); }} className={["shrink-0 rounded-xl px-5 py-2.5 text-sm font-semibold capitalize transition-all", tab === t ? "bg-emerald-600 text-white shadow-md" : "bg-white text-gray-600 border border-gray-200 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300"].join(" ")}>
              {t}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 space-y-4">
            {list.map((b, i) => (
              <motion.button
                key={b.id}
                type="button"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setSelected(b)}
                className={["w-full text-left rounded-2xl border p-5 transition-all hover:shadow-md", selected?.id === b.id ? "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20" : "border-gray-100 bg-white dark:border-gray-800 dark:bg-gray-900"].join(" ")}
              >
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">{b.property}</h3>
                    <p className="mt-1 flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400"><MapPin className="h-3.5 w-3.5" />{b.location}</p>
                    <p className="mt-2 flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400"><Calendar className="h-3.5 w-3.5" />{b.date}</p>
                  </div>
                  <span className={["rounded-full px-3 py-1 text-xs font-medium", tab === "upcoming" ? "bg-blue-100 text-blue-700" : tab === "completed" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"].join(" ")}>{b.status}</span>
                </div>
              </motion.button>
            ))}
          </div>

          <div className="lg:col-span-2">
            {selected ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 sticky top-24">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Booking Details</h2>
                <dl className="mt-4 space-y-3 text-sm">
                  <div><dt className="text-gray-500">Property</dt><dd className="font-medium text-gray-900 dark:text-white">{selected.property}</dd></div>
                  <div><dt className="text-gray-500">Dates</dt><dd className="font-medium text-gray-900 dark:text-white">{selected.date}</dd></div>
                  <div className="flex items-center gap-1"><Users className="h-4 w-4 text-gray-400" /><dd>{selected.guests} guests</dd></div>
                  <div><dt className="text-gray-500">Total</dt><dd className="text-xl font-bold text-emerald-600">₹{selected.price.toLocaleString("en-IN")}</dd></div>
                </dl>
                <div className="mt-6 rounded-xl border border-dashed border-gray-200 p-4 dark:border-gray-700">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Invoice</p>
                  <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">INV-{selected.id}2026</p>
                  <button type="button" className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-emerald-600"><Download className="h-4 w-4" /> Download Invoice</button>
                </div>
              </motion.div>
            ) : (
              <div className="rounded-2xl border border-dashed border-gray-200 p-8 text-center text-gray-400 dark:border-gray-700">Select a booking to view details</div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
