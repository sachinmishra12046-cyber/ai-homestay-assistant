"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  Calendar,
  Heart,
  Sparkles,
  Tag,
} from "lucide-react";
import { useState } from "react";

const notifications = [
  {
    id: 1,
    type: "booking",
    title: "Booking Confirmed",
    message: "Your stay at Himalayan Pine Retreat is confirmed for Apr 12.",
    time: "2h ago",
    icon: Calendar,
    unread: true,
  },
  {
    id: 2,
    type: "ai",
    title: "AI Recommendation",
    message: "3 new mountain stays match your preferences under ₹3000.",
    time: "5h ago",
    icon: Sparkles,
    unread: true,
  },
  {
    id: 3,
    type: "offer",
    title: "Weekend Offer",
    message: "Get 15% off eco-stays in Kerala this weekend.",
    time: "1d ago",
    icon: Tag,
    unread: false,
  },
  {
    id: 4,
    type: "wishlist",
    title: "Wishlist Update",
    message: "Coastal Bamboo Villa is now available for your dates.",
    time: "2d ago",
    icon: Heart,
    unread: false,
  },
];

export default function NotificationDropdown() {
  const [open, setOpen] = useState(false);
  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <div className="relative">
      <motion.button
        type="button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Notifications"
        className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition-colors hover:border-emerald-200 hover:text-emerald-600 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-emerald-800"
      >
        <Bell className="h-4 w-4" strokeWidth={2} />
        {unreadCount > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
            {unreadCount}
          </span>
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <button
              type="button"
              aria-label="Close notifications"
              className="fixed inset-0 z-40"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 z-50 mt-2 w-80 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-900 sm:w-96"
            >
              <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3 dark:border-gray-800">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                  Notifications
                </h3>
                <span className="text-xs text-emerald-600">{unreadCount} new</span>
              </div>
              <ul className="max-h-80 overflow-y-auto">
                {notifications.map((item) => (
                  <li
                    key={item.id}
                    className={[
                      "flex gap-3 border-b border-gray-50 px-4 py-3 transition-colors hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800/50",
                      item.unread ? "bg-emerald-50/50 dark:bg-emerald-950/20" : "",
                    ].join(" ")}
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400">
                      <item.icon className="h-4 w-4" strokeWidth={2} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {item.title}
                      </p>
                      <p className="mt-0.5 text-xs text-gray-500 line-clamp-2 dark:text-gray-400">
                        {item.message}
                      </p>
                      <p className="mt-1 text-[10px] text-gray-400">{item.time}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <Link
                href="/bookings"
                onClick={() => setOpen(false)}
                className="block px-4 py-3 text-center text-xs font-semibold text-emerald-600 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                View all notifications
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
