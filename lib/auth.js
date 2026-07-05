"use client";
import { createContext, useContext, useState, useCallback } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const login = useCallback((username, password) => {
    const mockUser = { id: 1, username, name: "رضا محمدی", shopId: 1, role: "seller" };
    setUser(mockUser);
    localStorage.setItem("user", JSON.stringify(mockUser));
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("user");
  }, []);

  const requireAuth = useCallback((callback) => {
    if (user) {
      callback();
    } else {
      setShowLoginModal(true);
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, logout, requireAuth, showLoginModal, setShowLoginModal }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
