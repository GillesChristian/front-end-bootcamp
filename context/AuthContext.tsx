"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { decode } from "jsonwebtoken";
import { getToken, removeToken, setToken } from "@/lib/auth";

interface User {
  username: string;
  role: string;
}
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const getRoute = (tokenRole: string) => {
    // Get route based on role.
    tokenRole === "teacher"
      ? router.push("/teachers")
      : router.push("/students");
  };

  const validateToken = () => {
    // Check for a token and validate on mount
    const token = getToken();
    if (token) {
      try {
        const decodedToken = decode(token) as User;
        setUser(decodedToken);
      } catch (error) {
        console.error("Invalid or expired token", error);
        removeToken();
        setUser(null);
        router.push("/login");
      }
    } else {
      router.push("/login");
    }

    setLoading(false);
  };

  useEffect(() => {
    // Call validateToken on component mount
    validateToken();
  }, [router]);

  const login = async (username: string, password: string) => {
    // Login Provider.
    try {
      const response = await fetch("http://127.0.0.1:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response?.ok) {
        throw new Error("Failed to login");
      }

      const data = await response?.json();
      const token = data?.token;
      if (token) {
        setToken(token);
        const decodedToken = decode(token) as User;
        setUser(decodedToken);
        getRoute(decodedToken?.role);
      } else {
        console.error("Login failed:", data?.message);
      }
    } catch (error) {
      console.error("Error logging in", error);
    }
  };

  const logout = () => {
    // Logout Provider.
    removeToken();
    setUser(null);
    setTimeout(() => {
      router.push("/login");
    }, 100);
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
