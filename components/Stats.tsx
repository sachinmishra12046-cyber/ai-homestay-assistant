"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Home, Users, MapPin, Star } from "lucide-react";

interface StatCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  delay: number;
}

function StatCard({ icon, value, label, delay }: StatCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  const targetNumber = parseInt(value.replace(/[^0-9]/g, ''));

  useEffect(() => {
    if (isInView) {
      let current = 0;
      const increment = targetNumber / 50;
      const timer = setInterval(() => {
        current += increment;
        if (current >= targetNumber) {
          setCount(targetNumber);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, 30);
      return () => clearInterval(timer);
    }
  }, [isInView, targetNumber]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay }}
      className="group rounded-2xl px-3 py-4 text-center transition-all duration-300 hover:bg-white/70 hover:shadow-lg dark:hover:bg-gray-800/70"
    >
      <motion.div 
        className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-green-50 to-emerald-100 text-[#16a34a] shadow-sm ring-1 ring-emerald-100 transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl dark:from-emerald-950 dark:to-emerald-900 dark:text-emerald-300 dark:ring-emerald-800"
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.6 }}
      >
        {icon}
      </motion.div>
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.5, delay: delay + 0.2, type: "spring" }}
        className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white"
      >
        {value.includes('+') ? `${count.toLocaleString()}+` : value}
      </motion.div>
      <p className="mt-2 text-sm font-medium text-gray-600 dark:text-gray-400">{label}</p>
    </motion.div>
  );
}

export default function Stats() {
  return (
    <section className="border-y border-emerald-100/70 bg-gradient-to-b from-white to-gray-50 px-4 py-14 sm:px-6 lg:px-8 lg:py-16 dark:border-gray-800 dark:from-gray-950 dark:to-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 gap-y-6 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8">
          <StatCard
            icon={<Home className="h-8 w-8" />}
            value="500+"
            label="Verified Homestays"
            delay={0}
          />
          <StatCard
            icon={<Users className="h-8 w-8" />}
            value="15,000+"
            label="Happy Travelers"
            delay={0.1}
          />
          <StatCard
            icon={<MapPin className="h-8 w-8" />}
            value="120+"
            label="Cities"
            delay={0.2}
          />
          <StatCard
            icon={<Star className="h-8 w-8" />}
            value="4.9★"
            label="Average Rating"
            delay={0.3}
          />
        </div>
      </div>
    </section>
  );
}
