"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

type User = {
  userName: string;
};

type AuthContextType = {
  isLoggedIn: boolean;
  user: User | null;
  isLoading: boolean;
  checkAuth: () => Promise<void>; // ✅ expose this so login page can trigger a re-check
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  user: null,
  isLoading: true,
  checkAuth: async () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true); 
  // ✅ prevent flash of "logged out" state

  const checkAuth = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/auth");
      const data = await res.json();

      if (data.ok && data.user) {
        setIsLoggedIn(true);
        setUser(data.user);
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    } catch {
      setIsLoggedIn(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    // Clear cookie and reset state
    document.cookie = "token=; Max-Age=0; path=/";
    setIsLoggedIn(false);
    setUser(null);
  }, []);

  useEffect(() => {
    checkAuth(); // run once on mount
  }, [checkAuth]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, isLoading, checkAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);