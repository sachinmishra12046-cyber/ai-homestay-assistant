"use client";

import { STORAGE_KEYS } from "@/lib/constants";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface WishlistContextValue {
  wishlist: string[];
  toggleWishlist: (id: string) => void;
  isWishlisted: (id: string) => boolean;
  count: number;
  isHydrated: boolean;
}

const WishlistContext = createContext<WishlistContextValue | undefined>(
  undefined
);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useLocalStorage<string[]>(
    STORAGE_KEYS.wishlist,
    []
  );
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Migrate old number-based wishlist to string-based
    const item = window.localStorage.getItem(STORAGE_KEYS.wishlist);
    if (item) {
      try {
        const parsed = JSON.parse(item);
        if (Array.isArray(parsed) && parsed.length > 0 && typeof parsed[0] === 'number') {
          // Convert numbers to strings
          const migrated = parsed.map(String);
          window.localStorage.setItem(STORAGE_KEYS.wishlist, JSON.stringify(migrated));
          setWishlist(migrated);
        }
      } catch (error) {
        console.log('Error migrating wishlist:', error);
      }
    }
    setIsHydrated(true);
  }, [setWishlist]);

  const toggleWishlist = useCallback(
    (id: string) => {
      setWishlist((prev) => {
        if (prev.includes(id)) {
          return prev.filter((item: string) => item !== id);
        } else {
          return [...prev, id];
        }
      });
    },
    [setWishlist]
  );

  const isWishlisted = useCallback(
    (id: string) => wishlist.includes(id),
    [wishlist]
  );

  const value = useMemo(
    () => ({
      wishlist,
      toggleWishlist,
      isWishlisted,
      count: wishlist.length,
      isHydrated,
    }),
    [wishlist, toggleWishlist, isWishlisted, isHydrated]
  );

  return (
    <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within WishlistProvider");
  }
  return context;
}
