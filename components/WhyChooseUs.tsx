"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Sparkles, Lock, Leaf, HeadphonesIcon } from "lucide-react";

interface Feature {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const features: Feature[] = [
  {
    id: 1,
    title: "Verified Hosts",
    description:
      "Every host is verified for safety, cleanliness, and reliable hospitality.",
    icon: <ShieldCheck className="h-6 w-6" />,
  },
  {
    id: 2,
    title: "AI Recommendations",
    description:
      "Get stay suggestions based on your destination, budget, and travel preferences.",
    icon: <Sparkles className="h-6 w-6" />,
  },
  {
    id: 3,
    title: "Secure Payments",
    description:
      "Book with confidence through a simple and secure booking experience.",
    icon: <Lock className="h-6 w-6" />,
  },
  {
    id: 4,
    title: "Eco Friendly",
    description:
      "Stay at homestays that follow sustainable and eco-conscious practices.",
    icon: <Leaf className="h-6 w-6" />,
  },
  {
    id: 5,
    title: "24/7 Support",
    description:
      "Our dedicated team is available round the clock to assist you.",
    icon: <HeadphonesIcon className="h-6 w-6" />,
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-24 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-12 max-w-2xl text-center"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-400">The StayNest difference</p>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
            Why Choose StayNest
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Everything you need for a seamless homestay booking experience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:gap-6">
          {features.map((feature, index) => (
            <motion.article
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group rounded-2xl border border-gray-100 bg-gradient-to-br from-gray-50 to-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl dark:border-gray-800 dark:from-gray-900 dark:to-gray-900 dark:hover:border-emerald-900"
            >
              <motion.div 
                className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-green-50 to-emerald-100 text-[#16a34a] shadow-sm ring-1 ring-emerald-100 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg dark:from-emerald-950 dark:to-emerald-900 dark:text-emerald-300 dark:ring-emerald-800"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
