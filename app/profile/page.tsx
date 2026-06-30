"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useWishlist } from "@/context/WishlistProvider";
import { useAuth } from "@/context/AuthProvider";
import { motion } from "framer-motion";
import {
  BadgeCheck,
  Calendar,
  Edit3,
  Heart,
  MapPin,
  Settings,
} from "lucide-react";
import Link from "next/link";

const recentActivity = [
  { action: "Booked Himalayan Pine Retreat", date: "Apr 12, 2026" },
  { action: "Added Coastal Villa to wishlist", date: "Apr 10, 2026" },
  { action: "Reviewed Tea Garden Bungalow", date: "Mar 28, 2026" },
  { action: "Updated travel preferences", date: "Mar 15, 2026" },
];

export default function ProfilePage() {
  const { count } = useWishlist();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-gray-100 bg-white p-6 sm:p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-3xl font-semibold text-white ring-4 ring-emerald-100 dark:ring-emerald-900">
              {user?.avatar || "U"}
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{user?.name || "User"}</h1>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                  <BadgeCheck className="h-3.5 w-3.5" /> Verified Traveler
                </span>
              </div>
              <p className="mt-1 text-gray-500 dark:text-gray-400">{user?.email || "user@example.com"}</p>
              <p className="mt-2 flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                <MapPin className="h-4 w-4" /> Bangalore, India · Joined Jan 2025
              </p>
            </div>
            <Link href="/settings" className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors">
              <Edit3 className="h-4 w-4" /> Edit Profile
            </Link>
          </div>
        </motion.div>

        <div className="mt-6 grid sm:grid-cols-3 gap-4">
          {[
            { label: "Wishlist", value: count, icon: Heart, href: "/wishlist" },
            { label: "Bookings", value: 12, icon: Calendar, href: "/bookings" },
            { label: "Reviews", value: 8, icon: BadgeCheck, href: "/bookings" },
          ].map(({ label, value, icon: Icon, href }) => (
            <Link key={label} href={href} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-md transition-all dark:border-gray-800 dark:bg-gray-900">
              <Icon className="h-5 w-5 text-emerald-600 mb-2" strokeWidth={2} />
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
            </Link>
          ))}
        </div>

        <div className="mt-6 grid lg:grid-cols-2 gap-6">
          <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">About</h2>
            <dl className="space-y-3 text-sm">
              <div><dt className="text-gray-500 dark:text-gray-400">Phone</dt><dd className="font-medium text-gray-900 dark:text-white">+91 98765 43210</dd></div>
              <div><dt className="text-gray-500 dark:text-gray-400">Bio</dt><dd className="text-gray-700 dark:text-gray-300">Eco-travel enthusiast exploring India's hidden homestays.</dd></div>
              <div><dt className="text-gray-500 dark:text-gray-400">Travel Preferences</dt><dd className="text-gray-700 dark:text-gray-300">Mountain, Forest · Budget ₹2000–4000 · Solo & Couple</dd></div>
            </dl>
          </section>

          <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Recent Activity</h2>
              <Link href="/settings" className="text-emerald-600 text-sm font-medium flex items-center gap-1"><Settings className="h-4 w-4" /> Settings</Link>
            </div>
            <ul className="space-y-3">
              {recentActivity.map((item) => (
                <li key={item.action} className="flex justify-between gap-4 text-sm border-b border-gray-50 pb-3 last:border-0 dark:border-gray-800">
                  <span className="text-gray-700 dark:text-gray-300">{item.action}</span>
                  <span className="text-gray-400 shrink-0">{item.date}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
