"use client";

import { useCallback, useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) setStoredValue(JSON.parse(item) as T);
    } catch {
      setStoredValue(initialValue);
    } finally {
      setIsHydrated(true);
    }
  }, [key, initialValue]);

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStoredValue((prev) => {
        const next = value instanceof Function ? value(prev) : value;
        try {
          window.localStorage.setItem(key, JSON.stringify(next));
        } catch {
          /* ignore */
        }
        return next;
      });
    },
    [key]
  );

  return [storedValue, setValue, isHydrated] as const;
}
