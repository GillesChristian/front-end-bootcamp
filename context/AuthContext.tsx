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

  const login = async (email: string, password: string) => {
    // Login Provider.
    try {
      const response = await fetch("http://127.0.0.1:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          username: email,
          password: password,
        }),
      });

      if (!response?.ok) {
        const errorData = await response.json();
        const errorMessage =
          errorData?.detail || "Login failed for an unknown reason.";
        throw new Error(errorMessage);
      }

      const data = await response?.json();
      const token = data?.access_token;

      if (token) {
        setToken(token);
        try {
          const decodedToken = decode(token) as User;
          setUser(decodedToken);
          getRoute(decodedToken?.role);
        } catch (error) {
          console.error("Error decoding token:", error);
        }
      } else {
        console.log("Login failed: No access token provided");
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
