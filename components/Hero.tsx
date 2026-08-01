"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, Leaf, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-b-[2.5rem] bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-emerald-950/50 dark:via-gray-950 dark:to-gray-950">
      {/* Animated background blobs */}
      <motion.div 
        className="pointer-events-none absolute -left-28 top-12 h-64 w-64 rounded-full bg-emerald-200/40 blur-3xl dark:bg-emerald-500/10"
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div 
        className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-lime-100/70 blur-3xl dark:bg-lime-400/5"
        animate={{
          x: [0, -20, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              className="inline-flex items-center gap-2 rounded-full border border-emerald-200/50 bg-white/80 px-4 py-2 text-xs font-semibold text-emerald-700 shadow-lg shadow-emerald-500/10 backdrop-blur-sm transition-all duration-300 hover:bg-white hover:shadow-xl dark:border-emerald-800/50 dark:bg-emerald-950/60 dark:text-emerald-300 dark:hover:bg-emerald-950/80"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Leaf className="h-3.5 w-3.5" aria-hidden="true" />
              </motion.div>
              Thoughtful stays, lighter footprints
            </motion.div>
            <motion.h1
              className="mt-6 text-4xl sm:text-5xl lg:text-[4rem] font-bold text-gray-900 leading-[1.1] tracking-tight dark:text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Discover Your
              <span className="block bg-gradient-to-r from-[#16a34a] to-emerald-600 bg-clip-text text-transparent">Perfect Eco Escape</span>
            </motion.h1>

            <motion.p
              className="mt-6 text-base sm:text-lg text-gray-600 leading-relaxed max-w-lg dark:text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Experience sustainable luxury across India. AI-powered recommendations
              for verified eco homestays with authentic local experiences.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/explore"
                    className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#16a34a] to-emerald-600 px-8 py-4 text-sm font-semibold text-white shadow-xl shadow-green-500/30 transition-all duration-300 hover:shadow-green-500/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-950"
                  >
                    Explore stays
                    <motion.span
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </motion.span>
                  </Link>
                </motion.div>
                <motion.span 
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 dark:text-gray-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <BadgeCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                  Verified local hosts
                </motion.span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right — hero image */}
          <motion.div
            className="relative overflow-hidden rounded-3xl shadow-2xl shadow-emerald-950/15 ring-1 ring-black/5 dark:ring-white/10"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80"
                alt="Scenic eco homestay surrounded by nature"
                className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <motion.div 
                className="absolute bottom-4 left-4 right-4 flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 p-4 text-white backdrop-blur-xl shadow-xl sm:right-auto sm:min-w-72"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                whileHover={{ y: -2 }}
              >
                <motion.span 
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Sparkles className="h-5 w-5" aria-hidden="true" />
                </motion.span>
                <span>
                  <span className="block text-sm font-semibold">Stay closer to nature</span>
                  <span className="block text-xs text-white/90">Handpicked eco escapes across India</span>
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
