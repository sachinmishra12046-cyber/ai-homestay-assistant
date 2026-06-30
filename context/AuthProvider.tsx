"use client";

import { STORAGE_KEYS } from "@/lib/constants";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
} from "react";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isHydrated: boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser, isHydrated] = useLocalStorage<User | null>(
    STORAGE_KEYS.auth,
    null
  );

  const login = useCallback(
    async (email: string, password: string) => {
      // Simulate API call with local authentication
      // In production, this would call your backend API
      const mockUser: User = {
        id: "1",
        name: email.split("@")[0],
        email,
        avatar: email[0].toUpperCase(),
      };
      setUser(mockUser);
    },
    [setUser]
  );

  const signup = useCallback(
    async (name: string, email: string, password: string) => {
      // Simulate API call with local authentication
      const mockUser: User = {
        id: Date.now().toString(),
        name,
        email,
        avatar: name[0].toUpperCase(),
      };
      setUser(mockUser);
    },
    [setUser]
  );

  const logout = useCallback(() => {
    setUser(null);
  }, [setUser]);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      login,
      signup,
      logout,
      isHydrated,
    }),
    [user, login, signup, logout, isHydrated]
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
