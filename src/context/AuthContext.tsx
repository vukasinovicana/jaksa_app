// src/context/AuthContext.tsx
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("token")
  );
  const navigate = useNavigate();

  useEffect(() => {
    // Optional: Token expiration check
    const tokenData = localStorage.getItem("token");
    const expiry = localStorage.getItem("tokenExpiry");

    if (tokenData && expiry) {
      const now = new Date();
      if (now.getTime() > Number(expiry)) {
        logout();
      }
    }
  }, []);

  const login = (newToken: string) => {
    const expiry = new Date().getTime() + 60 * 60 * 1000; // 1 hour
    localStorage.setItem("token", newToken);
    localStorage.setItem("tokenExpiry", expiry.toString());
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiry");
    setToken(null);
    navigate("/prijava");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated: !!token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
