import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import AppProviders from "@/components/providers/AppProviders";
import AIAssistant from "@/components/AIAssistant";
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
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('staynest-theme');var d=t==='dark'||(t!=='light'&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.add(d?'dark':'light');document.documentElement.style.colorScheme=d?'dark':'light';}catch(e){document.documentElement.classList.add('light');}})();`,
          }}
        />
      </head>
      <body className="min-h-full font-sans antialiased bg-background text-foreground">
        <AppProviders>
          {children}
          <AIAssistant />
        </AppProviders>
      </body>
    </html>
  );
}
