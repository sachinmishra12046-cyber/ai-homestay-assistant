import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Automatically set NEXTAUTH_URL for Vercel deployments
  env: {
    NEXTAUTH_URL: process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : process.env.NEXTAUTH_URL || "http://localhost:3000",
  },
};

export default nextConfig;
