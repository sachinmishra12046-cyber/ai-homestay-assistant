"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  ChevronDown,
  Heart,
  LogOut,
  Settings,
  User,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/context/AuthProvider";

export default function ProfileDropdown() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/profile", label: "Profile", icon: User },
    { href: "/bookings", label: "My Bookings", icon: Calendar },
    { href: "/wishlist", label: "Wishlist", icon: Heart },
    { href: "/settings", label: "Settings", icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    setOpen(false);
    router.push("/login");
  };

  return (
    <div className="relative">
      <motion.button
        type="button"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white py-1 pl-1 pr-3 transition-colors hover:border-emerald-200 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-emerald-800"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-sm font-semibold text-white">
          {user?.avatar || "U"}
        </div>
        <span className="hidden text-sm font-medium text-gray-700 dark:text-gray-200 sm:inline">
          {user?.name || "User"}
        </span>
        <ChevronDown className="h-4 w-4 text-gray-400" strokeWidth={2} />
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <button
              type="button"
              aria-label="Close menu"
              className="fixed inset-0 z-40"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-900"
            >
              <div className="border-b border-gray-100 px-4 py-3 dark:border-gray-800">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {user?.name || "User"}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {user?.email || "user@example.com"}
                </p>
              </div>
              <nav className="py-1">
                {links.map(({ href, label, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 transition-colors hover:bg-gray-50 hover:text-emerald-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-emerald-400"
                  >
                    <Icon className="h-4 w-4" strokeWidth={2} />
                    {label}
                  </Link>
                ))}
              </nav>
              <div className="border-t border-gray-100 py-1 dark:border-gray-800">
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-600 transition-colors hover:bg-red-50 dark:hover:bg-red-950/30"
                >
                  <LogOut className="h-4 w-4" strokeWidth={2} />
                  Logout
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
