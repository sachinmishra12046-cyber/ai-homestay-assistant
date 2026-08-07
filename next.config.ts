import type { NextConfig } from "next";

// NEXTAUTH_URL must come from Vercel's Production environment configuration.
// Do not replace it with VERCEL_URL here: that value can be a deployment URL
// rather than the canonical domain and this `env` block also exposes it to the
// client build.
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
