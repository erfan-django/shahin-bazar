"use client";
import { useState } from "react";
import { useAuth } from "@/lib/auth";
import Link from "next/link";
import { X, Eye, EyeOff } from "lucide-react";

export default function LoginModal() {
  const { showLoginModal, setShowLoginModal, login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  if (!showLoginModal) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);
    setShowLoginModal(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowLoginModal(false)}>
      <div className="rounded-2xl p-6 w-full max-w-md shadow-xl" onClick={e => e.stopPropagation()} style={{ background: "var(--bg-card)" }}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>ورود به حساب</h2>
          <button onClick={() => setShowLoginModal(false)} style={{ color: "var(--text-secondary)" }}><X size={20} /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: "var(--text-primary)" }}>نام کاربری</label>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-all" style={{ borderColor: "var(--border-color)", background: "var(--bg-secondary)", color: "var(--text-primary)" }} placeholder="نام کاربری خود را وارد کنید" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: "var(--text-primary)" }}>رمز عبور</label>
            <div className="relative">
              <input type={showPass ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-all" style={{ borderColor: "var(--border-color)", background: "var(--bg-secondary)", color: "var(--text-primary)" }} placeholder="رمز عبور خود را وارد کنید" required />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-secondary)" }}>
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          <button type="submit" className="w-full text-white py-2.5 rounded-lg text-sm font-medium transition-colors" style={{ background: "var(--accent-color)" }}>ورود</button>
        </form>
        <p className="text-xs text-center mt-4" style={{ color: "var(--text-secondary)" }}>
          حساب ندارید؟ <Link href="/register" onClick={() => setShowLoginModal(false)} className="hover:underline" style={{ color: "var(--accent-color)" }}>ثبت‌نام کنید</Link>
        </p>
      </div>
    </div>
  );
}
