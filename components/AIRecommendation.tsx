"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Bot } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AIRecommendation() {
  const router = useRouter();
  const [prompt, setPrompt] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [placeholderText, setPlaceholderText] = useState("");
  const fullPlaceholderRef = useRef("e.g., I want a peaceful mountain retreat in Himachal with a view, good for 2 people, budget around ₹5000/night...");

  useEffect(() => {
    if (!prompt) {
      let index = 0;
      setIsTyping(true);
      const timer = setInterval(() => {
        if (index < fullPlaceholderRef.current.length) {
          setPlaceholderText(fullPlaceholderRef.current.slice(0, index + 1));
          index++;
        } else {
          clearInterval(timer);
          setIsTyping(false);
        }
      }, 50);
      return () => clearInterval(timer);
    }
  }, [prompt]);

  const handleGenerate = () => {
    // Navigate to AI assistant page with the prompt
    if (prompt.trim()) {
      router.push(`/ai-assistant?prompt=${encodeURIComponent(prompt.trim())}`);
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-green-50 px-4 py-16 sm:px-6 lg:px-8 lg:py-24 dark:from-emerald-950/40 dark:via-gray-950 dark:to-gray-950">
      {/* AI Glow Effect */}
      <motion.div 
        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-emerald-400/20 blur-3xl dark:bg-emerald-500/10"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <div className="max-w-7xl mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#16a34a] to-emerald-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold mb-6 shadow-lg shadow-green-500/30"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="h-4 w-4" />
              </motion.div>
              AI-Powered
            </motion.div>

            <h2 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-4xl lg:text-5xl dark:text-white">
              <span className="bg-gradient-to-r from-[#16a34a] to-emerald-600 bg-clip-text text-transparent">AI Travel Assistant</span>
            </h2>

            <p className="mt-6 text-lg leading-relaxed text-gray-600 dark:text-gray-300">
              Describe your dream trip and let AI recommend the perfect eco homestay.
              Our intelligent system understands your preferences and finds the best matches.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-[#16a34a]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Sparkles className="h-3 w-3 text-[#16a34a]" />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Personalized recommendations based on your travel style
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-[#16a34a]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Sparkles className="h-3 w-3 text-[#16a34a]" />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Instant matching with verified eco-friendly homestays
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-[#16a34a]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Sparkles className="h-3 w-3 text-[#16a34a]" />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Smart itinerary suggestions and local experiences
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right - AI Input Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{ y: -4 }}
          >
            <div className="relative rounded-3xl border border-gray-200/50 bg-white/80 p-6 shadow-2xl shadow-emerald-950/10 backdrop-blur-xl ring-1 ring-black/5 sm:p-8 dark:border-gray-800/50 dark:bg-gray-900/80 dark:ring-white/10">
              {/* Glow effect behind card */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#16a34a]/20 to-emerald-600/20 blur-xl opacity-50" />
              <div className="relative flex items-center gap-3 mb-6">
                <motion.div 
                  className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[#16a34a] to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/30"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Bot className="h-6 w-6 text-white" />
                </motion.div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Start Your Journey
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Tell us about your perfect trip
                  </p>
                </div>
              </div>

              <div className="relative space-y-4">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder={placeholderText}
                  aria-label="Describe your ideal trip"
                  className="relative h-32 w-full resize-none rounded-xl border border-gray-200 bg-white/50 px-4 py-3 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-[#16a34a] focus:bg-white focus:ring-2 focus:ring-[#16a34a]/20 dark:border-gray-700 dark:bg-gray-800/50 dark:text-white dark:placeholder:text-gray-500 dark:focus:bg-gray-800"
                />
                {isTyping && (
                  <motion.span 
                    className="absolute right-4 bottom-4 text-xs text-gray-400"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    AI typing...
                  </motion.span>
                )}

                <motion.button
                  onClick={handleGenerate}
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#16a34a] to-emerald-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-green-500/30 transition-all duration-300 hover:shadow-green-500/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900"
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="h-4 w-4" />
                  </motion.div>
                  Generate Recommendation
                  <motion.span
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </motion.span>
                </motion.button>

                <Link
                  href="/ai-assistant"
                  className="block text-center text-sm text-gray-500 transition-colors hover:text-[#16a34a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:text-gray-400"
                >
                  Learn more about AI features →
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
