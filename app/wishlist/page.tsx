"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StayGrid from "@/components/explore/StayGrid";
import LoadingSkeleton from "@/components/explore/LoadingSkeleton";
import { API_BASE, enrichStay } from "@/components/explore/constants";
import { ApiStay, Stay } from "@/components/explore/types";
import { useWishlist } from "@/context/WishlistProvider";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export default function WishlistPage() {
  const { wishlist, toggleWishlist, count, isHydrated } = useWishlist();
  const [stays, setStays] = useState<Stay[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/api/homestays`)
      .then((r) => r.json())
      .then((json) => {
        if (json.success) setStays(json.data.map((s: ApiStay) => enrichStay(s)));
      })
      .catch(() => setStays([]))
      .finally(() => setLoading(false));
  }, []);

  const wishlistedStays = useMemo(
    () => stays.filter((s) => wishlist.includes(s.id)),
    [stays, wishlist]
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center gap-3 mb-8">
          <motion.span animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 0.6 }}>
            <Heart className="h-8 w-8 fill-red-500 text-red-500" strokeWidth={2} />
          </motion.span>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Wishlist</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">{count} saved {count === 1 ? "stay" : "stays"}</p>
          </div>
        </div>

        {!isHydrated || loading ? (
          <LoadingSkeleton />
        ) : wishlistedStays.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="h-16 w-16 text-gray-200 dark:text-gray-700 mx-auto mb-4" strokeWidth={1.5} />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Your wishlist is empty</h2>
            <p className="mt-2 text-gray-500 dark:text-gray-400">Save stays you love by tapping the heart icon.</p>
            <Link href="/explore" className="mt-6 inline-block rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-700">Explore Stays</Link>
          </div>
        ) : (
          <StayGrid stays={wishlistedStays} wishlist={wishlist} onToggleWishlist={toggleWishlist} />
        )}
      </main>
      <Footer />
    </div>
  );
}
