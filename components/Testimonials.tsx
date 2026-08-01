"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  review: string;
  avatar?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Mumbai, India",
    rating: 5,
    review:
      "The homestay was clean, peaceful, and exactly as shown. Booking was simple and the host was very welcoming. The AI recommendation was spot on!",
  },
  {
    id: 2,
    name: "Arjun Mehta",
    location: "Delhi, India",
    rating: 5,
    review:
      "Great experience from start to finish. The location was perfect and the stay felt authentic and comfortable. Highly recommend StayNest for eco-friendly stays.",
  },
  {
    id: 3,
    name: "Ananya Reddy",
    location: "Bangalore, India",
    rating: 5,
    review:
      "Loved the local experience and friendly host. The AI assistant helped me find the perfect mountain retreat. Would definitely use again!",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={`h-4 w-4 ${index < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}`}
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
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
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-400">Guest stories</p>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
            What Our Guests Say
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Real feedback from travelers who booked through StayNest
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:gap-6">
          {testimonials.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group rounded-2xl border border-gray-100 bg-gradient-to-br from-gray-50 to-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-emerald-200 lg:p-8 dark:border-gray-800 dark:from-gray-900 dark:to-gray-900 dark:hover:border-emerald-900"
            >
              <div className="flex items-center justify-between">
                <StarRating rating={item.rating} />
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Quote className="h-5 w-5 text-emerald-200 dark:text-emerald-800" aria-hidden="true" />
                </motion.div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                &ldquo;{item.review}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="relative h-10 w-10 rounded-full bg-gradient-to-br from-[#16a34a] to-emerald-600 flex items-center justify-center text-white font-semibold text-sm shadow-lg shadow-green-500/30">
                  {item.name.charAt(0)}
                  <div className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3 items-center justify-center rounded-full bg-emerald-500 ring-2 ring-white dark:ring-gray-900">
                    <svg className="h-2 w-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {item.location}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
