"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface Destination {
  id: number;
  name: string;
  description: string;
  image: string;
}

const destinations: Destination[] = [
  {
    id: 1,
    name: "Uttarakhand",
    description: "Serene Himalayan retreats with spiritual vibes",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Himachal",
    description: "Mountain adventures and apple orchards",
    image: "https://images.unsplash.com/photo-1582540003520-4b8f4f8e8c8e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Goa",
    description: "Coastal bliss with Portuguese charm",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Kerala",
    description: "Backwaters, tea gardens and houseboats",
    image: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    name: "Kashmir",
    description: "Paradise on Earth with stunning valleys",
    image: "https://images.unsplash.com/photo-1602351447937-745cb720612f?auto=format&fit=crop&w=800&q=80",
  },
];

interface DestinationCardProps {
  destination: Destination;
  index: number;
}

function DestinationCard({ destination, index }: DestinationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group"
    >
      <div className="relative h-64 overflow-hidden rounded-2xl shadow-xl shadow-gray-900/15 ring-1 ring-black/5 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-900/20 sm:h-72 dark:ring-white/10">
        <motion.img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover transition-transform duration-700"
          whileHover={{ scale: 1.1 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
            {destination.name}
          </h3>
          <p className="text-sm text-gray-200 line-clamp-2 mb-4">
            {destination.description}
          </p>
          <motion.div whileHover={{ x: 4 }}>
            <Link
              href="/explore"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-emerald-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-950"
            >
              Explore
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default function FeaturedDestinations() {
  return (
    <section className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8 lg:py-24 dark:bg-gray-900/60">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-12 max-w-2xl text-center"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-400">Go where nature leads</p>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
            Featured Destinations
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            Discover India&apos;s most breathtaking eco-friendly destinations
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:gap-6">
          {destinations.map((destination, index) => (
            <DestinationCard
              key={destination.id}
              destination={destination}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
