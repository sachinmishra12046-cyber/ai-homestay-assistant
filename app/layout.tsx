import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AppProviders from "@/components/providers/AppProviders";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "StayNest — AI Homestay Recommendations",
    template: "%s | StayNest",
  },
  description:
    "Discover and book eco-friendly homestays across India with AI-powered recommendations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('staynest-theme');var d=t==='dark'||(t!=='light'&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.add(d?'dark':'light');document.documentElement.style.colorScheme=d?'dark':'light';}catch(e){document.documentElement.classList.add('light');}})();`,
          }}
        />
      </head>
      <body className="min-h-full font-sans antialiased bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
