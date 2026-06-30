"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Leaf } from "lucide-react";
import { ReactNode } from "react";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  footerText: string;
  footerLink: string;
  footerLinkHref: string;
}

export default function AuthLayout({
  title,
  subtitle,
  children,
  footerText,
  footerLink,
  footerLinkHref,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white dark:bg-gray-950 transition-colors duration-300">
      <div className="relative lg:w-1/2 min-h-[280px] lg:min-h-screen overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/80 via-green-900/70 to-teal-900/60" />
        <div className="relative z-10 flex h-full flex-col justify-between p-8 lg:p-14 text-white">
          <Link href="/" className="inline-flex items-center gap-2">
            <Leaf className="h-6 w-6 text-emerald-300" strokeWidth={2} />
            <span className="text-xl font-bold">StayNest</span>
          </Link>
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold leading-tight">{title}</h1>
            <p className="mt-3 text-emerald-100/90 max-w-md">{subtitle}</p>
          </div>
          <p className="text-sm text-white/50 hidden lg:block">
            AI-powered eco homestay recommendations
          </p>
        </div>
      </div>

      <div className="flex lg:w-1/2 items-center justify-center px-6 py-12 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md"
        >
          {children}
          <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
            {footerText}{" "}
            <Link
              href={footerLinkHref}
              className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400"
            >
              {footerLink}
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
