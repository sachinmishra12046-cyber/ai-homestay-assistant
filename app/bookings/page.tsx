"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthProvider";
import { motion } from "framer-motion";
import { Calendar, Download, MapPin, Users, X } from "lucide-react";
import { useEffect, useState } from "react";
import { format } from "date-fns";

type Tab = "upcoming" | "completed" | "cancelled";

interface Booking {
  id: string;
  property: {
    id: string;
    title: string;
    city: string;
    images: string[];
  };
  checkIn: string;
  checkOut: string;
  totalPrice: number;
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
  createdAt: string;
}

export default function BookingsPage() {
  const { user, isLoading: authLoading } = useAuth();
  const [tab, setTab] = useState<Tab>("upcoming");
  const [selected, setSelected] = useState<Booking | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    async function loadBookings() {
      setLoading(true);
      try {
        const response = await fetch(`/api/bookings?userId=${user!.id}`);
        const data = await response.json();
        if (response.ok) {
          setBookings(data.bookings || []);
        }
      } catch (error) {
        console.error("Error loading bookings:", error);
      } finally {
        setLoading(false);
      }
    }

    loadBookings();
  }, [user?.id]);

  const filteredBookings = bookings.filter((booking) => {
    if (tab === "upcoming") return booking.status === "PENDING" || booking.status === "CONFIRMED";
    if (tab === "completed") return booking.status === "COMPLETED";
    if (tab === "cancelled") return booking.status === "CANCELLED";
    return true;
  });

  const handleCancelBooking = async (bookingId: string) => {
    if (!confirm("Are you sure you want to cancel this booking?")) return;

    try {
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "CANCELLED" }),
      });

      if (response.ok) {
        setBookings(bookings.map((b) => b.id === bookingId ? { ...b, status: "CANCELLED" } : b));
      } else {
        alert("Failed to cancel booking");
      }
    } catch (error) {
      console.error("Error cancelling booking:", error);
      alert("Failed to cancel booking");
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <Navbar />
        <div className="mx-auto max-w-6xl px-4 py-20 text-center">
          <p className="text-gray-600 dark:text-gray-400">Please login to view your bookings</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
        <Footer />
      </div>
    );
  }

  const list = filteredBookings;

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

        {list.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-200 p-12 text-center text-gray-400 dark:border-gray-700">
            No {tab} bookings found
          </div>
        ) : (
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
                    <div className="flex gap-4">
                      <img
                        src={b.property.images[0] || "/placeholder.jpg"}
                        alt={b.property.title}
                        className="h-20 w-20 rounded-lg object-cover"
                      />
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white">{b.property.title}</h3>
                        <p className="mt-1 flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400"><MapPin className="h-3.5 w-3.5" />{b.property.city}</p>
                        <p className="mt-2 flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400"><Calendar className="h-3.5 w-3.5" />{format(new Date(b.checkIn), "MMM d")} – {format(new Date(b.checkOut), "MMM d, yyyy")}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className={["rounded-full px-3 py-1 text-xs font-medium", b.status === "CONFIRMED" ? "bg-blue-100 text-blue-700" : b.status === "PENDING" ? "bg-yellow-100 text-yellow-700" : b.status === "COMPLETED" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"].join(" ")}>{b.status}</span>
                      {b.status === "PENDING" || b.status === "CONFIRMED" ? (
                        <span
                          role="button"
                          onClick={(e) => { e.stopPropagation(); handleCancelBooking(b.id); }}
                          className="text-xs text-red-600 hover:text-red-700 cursor-pointer"
                        >
                          Cancel
                        </span>
                      ) : null}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            <div className="lg:col-span-2">
              {selected ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 sticky top-24">
                  <div className="flex justify-between items-start">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">Booking Details</h2>
                    <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600">
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  <dl className="mt-4 space-y-3 text-sm">
                    <div><dt className="text-gray-500">Property</dt><dd className="font-medium text-gray-900 dark:text-white">{selected.property.title}</dd></div>
                    <div><dt className="text-gray-500">Location</dt><dd className="font-medium text-gray-900 dark:text-white">{selected.property.city}</dd></div>
                    <div><dt className="text-gray-500">Dates</dt><dd className="font-medium text-gray-900 dark:text-white">{format(new Date(selected.checkIn), "MMM d, yyyy")} – {format(new Date(selected.checkOut), "MMM d, yyyy")}</dd></div>
                    <div><dt className="text-gray-500">Status</dt><dd className="font-medium text-gray-900 dark:text-white">{selected.status}</dd></div>
                    <div><dt className="text-gray-500">Total</dt><dd className="text-xl font-bold text-emerald-600">₹{selected.totalPrice.toLocaleString("en-IN")}</dd></div>
                  </dl>
                  <div className="mt-6 rounded-xl border border-dashed border-gray-200 p-4 dark:border-gray-700">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Invoice</p>
                    <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">INV-{selected.id.slice(0, 8).toUpperCase()}</p>
                    <button type="button" className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-emerald-600"><Download className="h-4 w-4" /> Download Invoice</button>
                  </div>
                </motion.div>
              ) : (
                <div className="rounded-2xl border border-dashed border-gray-200 p-8 text-center text-gray-400 dark:border-gray-700">Select a booking to view details</div>
              )}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
