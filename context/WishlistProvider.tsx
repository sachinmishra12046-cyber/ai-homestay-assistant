"use client";

import { STORAGE_KEYS } from "@/lib/constants";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
} from "react";

interface WishlistContextValue {
  wishlist: number[];
  toggleWishlist: (id: number) => void;
  isWishlisted: (id: number) => boolean;
  count: number;
  isHydrated: boolean;
}

const WishlistContext = createContext<WishlistContextValue | undefined>(
  undefined
);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist, isHydrated] = useLocalStorage<number[]>(
    STORAGE_KEYS.wishlist,
    []
  );

  const toggleWishlist = useCallback(
    (id: number) => {
      setWishlist((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    },
    [setWishlist]
  );

  const isWishlisted = useCallback(
    (id: number) => wishlist.includes(id),
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
