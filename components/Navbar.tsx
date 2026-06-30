"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle";
import ProfileDropdown from "@/components/ProfileDropdown";
import NotificationDropdown from "@/components/NotificationDropdown";
import { useWishlist } from "@/context/WishlistProvider";
import { useAuth } from "@/context/AuthProvider";
import { Heart, Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Explore", href: "/explore" },
  { label: "About", href: "/about" },
  { label: "Bookings", href: "/bookings" },
];

export default function Navbar() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const { count } = useWishlist();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 shadow-sm backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/90 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 shrink-0 group">
            <span className="text-xl" aria-hidden="true">🌿</span>
            <span className="text-lg font-semibold text-gray-900 dark:text-white tracking-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
              StayNest
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/wishlist"
              className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 hover:border-emerald-200 hover:text-emerald-600 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="h-4 w-4" strokeWidth={2} />
              {count > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                  {count}
                </span>
              )}
            </Link>
            <ThemeToggle />
            <NotificationDropdown />
            {isAuthenticated ? (
              <ProfileDropdown />
            ) : (
              <Link
                href="/login"
                className="ml-1 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 transition-colors"
              >
                Login
              </Link>
            )}
            {isAuthenticated && (
              <Link
                href="/explore"
                className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 transition-colors"
              >
                Book Now
              </Link>
            )}
          </div>

          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              className="inline-flex items-center justify-center rounded-lg p-2 text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-gray-100 dark:border-gray-800"
          >
            <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/wishlist" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-300">
                Wishlist {count > 0 && `(${count})`}
              </Link>
              {isAuthenticated ? (
                <>
                  <Link href="/profile" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-300">Profile</Link>
                  <Link href="/settings" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-300">Settings</Link>
                  <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="mt-2 rounded-lg bg-red-600 px-4 py-2.5 text-center text-sm font-medium text-white">Logout</button>
                </>
              ) : (
                <Link href="/login" onClick={() => setMenuOpen(false)} className="mt-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-center text-sm font-medium text-white">Login</Link>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
