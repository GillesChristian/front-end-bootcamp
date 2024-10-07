// contexts/AuthContext.tsx
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useRouter } from "next/router";
import { getToken, removeToken, setToken } from "@/lib/auth";
import jwt from "jsonwebtoken";

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

const JWT_SECRET = "your-secret-key"; // Must match your backend secret

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (token) {
      try {
        const decodedToken = jwt.verify(token, JWT_SECRET) as User;
        setUser(decodedToken);
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
    setLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const res = await fetch("http://127.0.0.1:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (data.token) {
        setToken(data.token);
        const decodedToken = jwt.verify(data.token, JWT_SECRET) as User;
        setUser(decodedToken);
        if (decodedToken.role === "admin") {
          router.push("/admin");
        } else if (decodedToken.role === "teacher") {
          router.push("/teachers");
        } else {
          router.push("/students");
        }
      } else {
        console.error("Login failed:", data.message);
      }
    } catch (error) {
      console.error("Error logging in", error);
    }
  };

  const logout = () => {
    removeToken();
    setUser(null);
    router.push("/login");
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
