"use client";
import { createContext, useContext, useState, useEffect, useCallback } from "react";

const AuthContext = createContext(null);

const INITIAL_USERS = [
  { id: 1, username: "reza", password: "1234", name: "رضا محمدی", role: "seller", shopId: 1, phone: "09131112233" },
  { id: 2, username: "saman", password: "1234", name: "سامان احمدی", role: "seller", shopId: 2, phone: "09132223344" },
  { id: 3, username: "niloufar", password: "1234", name: "نیلوفر کریمی", role: "seller", shopId: 3, phone: "09133334455" },
  { id: 4, username: "ali", password: "1234", name: "علی رضایی", role: "seller", shopId: 4, phone: "09134445566" },
  { id: 5, username: "maryam", password: "1234", name: "مریم حسینی", role: "seller", shopId: 5, phone: "09135556677" },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("sb_current_user");
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch { localStorage.removeItem("sb_current_user"); }
    }
    if (!localStorage.getItem("sb_users")) {
      localStorage.setItem("sb_users", JSON.stringify(INITIAL_USERS));
    }
  }, []);

  const persistUser = useCallback((u) => {
    setUser(u);
    localStorage.setItem("sb_current_user", JSON.stringify(u));
  }, []);

  const login = useCallback((username, password) => {
    if (!username || !password) return false;
    const users = JSON.parse(localStorage.getItem("sb_users") || "[]");
    const found = users.find((u) => u.username === username && u.password === password);
    if (found) { persistUser(found); return true; }
    return false;
  }, [persistUser]);

  const loginAsTest = useCallback((role) => {
    const users = JSON.parse(localStorage.getItem("sb_users") || "[]");
    if (role === "seller") {
      const seller = users.find((u) => u.role === "seller" && u.username === "reza");
      if (seller) { persistUser(seller); return; }
    }
    if (role === "customer") {
      let customer = users.find((u) => u.role === "customer" && u.username === "test_customer");
      if (!customer) {
        customer = { id: Date.now(), username: "test_customer", password: "", name: "مشتری آزمایشی", role: "customer", phone: "09120000000" };
        users.push(customer);
        localStorage.setItem("sb_users", JSON.stringify(users));
      }
      persistUser(customer);
    }
  }, [persistUser]);

  const register = useCallback((username, password, name, role = "customer") => {
    if (!username || !password || !name) return null;
    const users = JSON.parse(localStorage.getItem("sb_users") || "[]");
    if (users.find((u) => u.username === username)) return null;
    const newUser = { id: Date.now(), username, password, name, role, phone: "" };
    users.push(newUser);
    localStorage.setItem("sb_users", JSON.stringify(users));
    persistUser(newUser);
    return newUser;
  }, [persistUser]);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("sb_current_user");
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, loginAsTest, register, logout, requireAuth: (cb) => { if (user) { cb?.(); } else { setShowLoginModal(true); } }, showLoginModal, setShowLoginModal }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
