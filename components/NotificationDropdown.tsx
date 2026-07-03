"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  Calendar,
  Heart,
  Sparkles,
  Tag,
  Check,
  X,
  AlertCircle,
  Info,
  AlertTriangle,
} from "lucide-react";
import { useState } from "react";
import { useNotifications } from "@/context/NotificationProvider";
import Badge from "@/components/ui/Badge";

const notificationIcons = {
  success: Check,
  error: X,
  warning: AlertTriangle,
  info: Info,
  booking: Calendar,
  ai: Sparkles,
  offer: Tag,
  wishlist: Heart,
};

export default function NotificationDropdown() {
  const [open, setOpen] = useState(false);
  const { notifications, markAsRead, markAllAsRead, unreadCount } = useNotifications();

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div className="relative">
      <motion.button
        type="button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Notifications"
        className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-card text-foreground transition-colors hover:border-primary/50"
      >
        <Bell className="h-4 w-4" strokeWidth={2} />
        {unreadCount > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-primary text-[10px] font-bold text-white shadow-lg shadow-emerald-500/30">
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
              className="absolute right-0 z-50 mt-2 w-80 overflow-hidden rounded-2xl border border-border glass-strong shadow-2xl sm:w-96"
            >
              <div className="flex items-center justify-between border-b border-border px-4 py-3">
                <h3 className="text-sm font-bold text-foreground">
                  Notifications
                </h3>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-xs text-primary hover:underline"
                  >
                    Mark all as read
                  </button>
                )}
              </div>

              <ul className="max-h-80 overflow-y-auto custom-scrollbar">
                {notifications.length === 0 ? (
                  <li className="px-4 py-8 text-center text-sm text-muted-foreground">
                    No notifications yet
                  </li>
                ) : (
                  notifications.map((item) => {
                    const Icon = notificationIcons[item.type as keyof typeof notificationIcons] || Info;
                    return (
                      <li
                        key={item.id}
                        onClick={() => !item.read && markAsRead(item.id)}
                        className={[
                          "flex gap-3 border-b border-border px-4 py-3 transition-colors hover:bg-secondary/30 cursor-pointer",
                          !item.read ? "bg-primary/5" : "",
                        ].join(" ")}
                      >
                        <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                          item.type === "success"
                            ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400"
                            : item.type === "error"
                            ? "bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400"
                            : item.type === "warning"
                            ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/40 dark:text-yellow-400"
                            : "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400"
                        }`}>
                          <Icon className="h-4 w-4" strokeWidth={2} />
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-sm font-semibold text-foreground">
                              {item.title}
                            </p>
                            {!item.read && (
                              <span className="h-2 w-2 rounded-full bg-primary mt-1.5 shrink-0" />
                            )}
                          </div>
                          <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">
                            {item.message}
                          </p>
                          <p className="mt-1 text-[10px] text-muted-foreground/60">
                            {formatTime(item.timestamp)}
                          </p>
                        </div>
                      </li>
                    );
                  })
                )}
              </ul>

              <div className="border-t border-border px-4 py-3">
                <Link
                  href="/notifications"
                  onClick={() => setOpen(false)}
                  className="block text-center text-xs font-semibold text-primary hover:underline"
                >
                  View all notifications
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
