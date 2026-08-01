"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ExternalLink } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Explore", href: "/explore" },
  { label: "About", href: "/about" },
  { label: "Wishlist", href: "/wishlist" },
  { label: "Bookings", href: "/bookings" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Cookie Policy", href: "/cookies" },
];

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com",
    icon: <ExternalLink className="h-5 w-5" />,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: <ExternalLink className="h-5 w-5" />,
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-gradient-to-b from-gray-50 to-white dark:border-gray-800 dark:from-gray-900 dark:to-gray-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 group">
              <motion.span 
                className="text-2xl" 
                aria-hidden="true"
                whileHover={{ rotate: 20 }}
                transition={{ duration: 0.3 }}
              >🌿</motion.span>
              <span className="text-xl font-semibold text-gray-900 dark:text-white tracking-tight">
                StayNest
              </span>
            </Link>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 leading-relaxed max-w-xs">
              AI-powered eco homestay recommendations across India. Discover sustainable stays with verified hosts.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wide">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <motion.div whileHover={{ x: 4 }} className="group">
                    <Link
                      href={link.href}
                      className="text-sm text-gray-600 hover:text-[#16a34a] dark:text-gray-400 dark:hover:text-emerald-400 transition-colors inline-flex items-center gap-1"
                    >
                      {link.label}
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wide">
              Legal
            </h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <motion.div whileHover={{ x: 4 }} className="group">
                    <Link
                      href={link.href}
                      className="text-sm text-gray-600 hover:text-[#16a34a] dark:text-gray-400 dark:hover:text-emerald-400 transition-colors inline-flex items-center gap-1"
                    >
                      {link.label}
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wide">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
                <Mail className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>support@staynest.com</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
                <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Bangalore, India</span>
              </li>
            </ul>

            {/* Social Links */}
            <div className="flex gap-3 mt-6">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 hover:border-[#16a34a] hover:text-[#16a34a] transition-all hover:scale-110 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:border-emerald-400 dark:hover:text-emerald-400"
                  aria-label={social.name}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <hr className="my-10 border-gray-200 dark:border-gray-800" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-center sm:text-left text-sm text-gray-500 dark:text-gray-500">
            © {new Date().getFullYear()} StayNest. All rights reserved.
          </p>
          <p className="text-center sm:text-right text-xs text-gray-400 dark:text-gray-500">
            Made with ❤️ for sustainable travel
          </p>
        </div>
      </div>
    </footer>
  );
}
