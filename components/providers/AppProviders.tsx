"use client";

import { ThemeProvider } from "@/context/ThemeProvider";
import { WishlistProvider } from "@/context/WishlistProvider";
import { AuthProvider } from "@/context/AuthProvider";
import ChatWidget from "@/components/ChatWidget";

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <WishlistProvider>
          {children}
          <ChatWidget />
        </WishlistProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
