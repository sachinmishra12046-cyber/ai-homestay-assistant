"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setEmail("");
      // Reset after 3 seconds
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#16a34a] to-emerald-700 px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      {/* Animated background pattern */}
      <motion.div 
        className="pointer-events-none absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
        animate={{
          backgroundPosition: ['0 0', '32px 32px'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <div className="max-w-4xl mx-auto text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm mb-6 shadow-lg"
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <Mail className="h-7 w-7 text-white" />
          </motion.div>

          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
            Get Travel Inspiration
          </h2>

          <p className="text-lg text-emerald-100 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for exclusive deals, travel tips, and AI-curated destination recommendations.
          </p>

          <motion.form
            onSubmit={handleSubscribe}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
          >
            <motion.input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              aria-label="Email address"
              required
              whileFocus={{ scale: 1.02 }}
              className="flex-1 rounded-xl px-5 py-3.5 text-sm text-gray-900 shadow-xl outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-white/50 transition-all"
              disabled={isSubscribed}
            />

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubscribed}
              className="rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-[#16a34a] shadow-xl hover:bg-emerald-50 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubscribed ? (
                <>
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex items-center gap-2"
                  >
                    <svg className="h-4 w-4 text-[#16a34a]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Subscribed!
                  </motion.span>
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Subscribe
                </>
              )}
            </motion.button>
          </motion.form>

          <p className="mt-4 text-xs text-emerald-200" aria-live="polite">
            No spam, unsubscribe anytime. Read our Privacy Policy.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
