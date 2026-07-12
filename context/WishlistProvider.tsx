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
    setIsHydrated(true);
  }, []);

  const toggleWishlist = useCallback(
    (id: string) => {
      if (wishlist.includes(id)) {
        setWishlist(wishlist.filter((item: string) => item !== id));
      } else {
        setWishlist([...wishlist, id]);
      }
    },
    [wishlist, setWishlist]
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
