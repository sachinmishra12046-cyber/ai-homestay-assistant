"use client";

import { ThemeProvider } from "@/context/ThemeProvider";
import { WishlistProvider } from "@/context/WishlistProvider";
import { AuthProvider } from "@/context/AuthProvider";
import { NotificationProvider } from "@/context/NotificationProvider";
import ChatWidget from "@/components/ChatWidget";

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <NotificationProvider>
          <WishlistProvider>
            {children}
            <ChatWidget />
          </WishlistProvider>
        </NotificationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
