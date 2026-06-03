"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type User = {
  username: string;
  role: string;
};

type AuthContextType = {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;

  setAuthUser: (user: User | null) => void;

  logout: () => void;
};

const AuthContext =
  createContext<AuthContextType | null>(null);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] =
    useState<User | null>(null);

  const [isLoading, setIsLoading] =
    useState(true);

  useEffect(() => {
    const restoreSession = async () => {

      try {

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
          {
            credentials: "include",
          }
        );

        if (!response.ok) {
          setUser(null);
          return;
        }

        const user = await response.json();

        setUser(user);

      } catch {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    restoreSession();
  }, []);

  const setAuthUser = (
    user: User | null
  ) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        isLoading,

        setAuthUser,

        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}