"use client";

import RecommendationBadge from "@/components/RecommendationBadge";
import { getAiRecommendationReasons } from "@/lib/mockAi";
import { Car, Coffee, Heart, MapPin, Star, Wifi } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Stay } from "./types";

const amenityIcons: Record<string, typeof Wifi> = {
  wifi: Wifi,
  parking: Car,
  breakfast: Coffee,
};

interface StayCardProps {
  stay: Stay;
  isWishlisted: boolean;
  onToggleWishlist: (id: number) => void;
  showAiBadge?: boolean;
  index?: number;
}

export default function StayCard({
  stay,
  isWishlisted,
  onToggleWishlist,
  showAiBadge = true,
  index = 0,
}: StayCardProps) {
  const aiReasons = getAiRecommendationReasons(stay);

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-emerald-900/10 dark:border-gray-800 dark:bg-gray-900"
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={stay.image}
          alt={stay.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {showAiBadge && (
          <div className="absolute left-3 top-3">
            <RecommendationBadge compact />
          </div>
        )}

        <motion.button
          type="button"
          whileTap={{ scale: 0.85 }}
          onClick={() => onToggleWishlist(stay.id)}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur dark:bg-gray-900/90"
        >
          <Heart
            className={[
              "h-4 w-4 transition-colors duration-200",
              isWishlisted ? "fill-red-500 text-red-500" : "text-gray-500",
            ].join(" ")}
            strokeWidth={2}
          />
        </motion.button>

        <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-emerald-700 backdrop-blur dark:bg-gray-900/90 dark:text-emerald-400">
          {stay.category}
        </span>

        <span className="absolute bottom-3 right-3 rounded-full bg-gray-900/80 px-3 py-1 text-xs font-bold text-white backdrop-blur">
          ₹{stay.price.toLocaleString("en-IN")}/night
        </span>
      </div>

      <div className="space-y-3 p-5">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-gray-900 leading-snug transition-colors group-hover:text-emerald-700 dark:text-white dark:group-hover:text-emerald-400">
              {stay.title}
            </h3>
            <span className="shrink-0 inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-xs font-bold text-amber-700 dark:bg-amber-950/40 dark:text-amber-400">
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              {stay.rating}
            </span>
          </div>
          <p className="mt-1.5 flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
            <MapPin className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
            {stay.location}
          </p>
        </div>

        {showAiBadge && <RecommendationBadge reasons={aiReasons} />}

        <div className="flex flex-wrap gap-2">
          {stay.amenities.map((amenity) => {
            const Icon = amenityIcons[amenity];
            if (!Icon) return null;
            return (
              <span key={amenity} className="inline-flex items-center gap-1 rounded-lg bg-gray-50 px-2.5 py-1 text-xs font-medium capitalize text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                <Icon className="h-3.5 w-3.5" strokeWidth={2} />
                {amenity}
              </span>
            );
          })}
        </div>

        <Link
          href={`/explore?stay=${stay.id}`}
          className="block w-full rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 py-2.5 text-center text-sm font-bold text-white shadow-md transition-all duration-300 hover:shadow-lg hover:scale-[1.01]"
        >
          Book Now
        </Link>
      </div>
    </motion.article>
  );
}
