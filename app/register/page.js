"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { UserPlus, User, Lock, Store, Phone, Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);
    router.push("/dashboard");
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="rounded-2xl shadow-sm border p-8 w-full max-w-md" style={{ background: "var(--bg-card)", borderColor: "var(--border-color)" }}>
        <h1 className="text-2xl font-bold text-center mb-6" style={{ color: "var(--text-primary)" }}>ثبت‌نام فروشنده</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 flex items-center gap-1" style={{ color: "var(--text-primary)" }}>
              <Store size={14} />
              نام فروشگاه
            </label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-all" style={{ borderColor: "var(--border-color)", background: "var(--bg-secondary)", color: "var(--text-primary)" }} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 flex items-center gap-1" style={{ color: "var(--text-primary)" }}>
              <Phone size={14} />
              شماره موبایل
            </label>
            <input type="text" className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-all" style={{ borderColor: "var(--border-color)", background: "var(--bg-secondary)", color: "var(--text-primary)" }} placeholder="0913xxxxxxx" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 flex items-center gap-1" style={{ color: "var(--text-primary)" }}>
              <User size={14} />
              نام کاربری
            </label>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-all" style={{ borderColor: "var(--border-color)", background: "var(--bg-secondary)", color: "var(--text-primary)" }} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 flex items-center gap-1" style={{ color: "var(--text-primary)" }}>
              <Lock size={14} />
              رمز عبور
            </label>
            <div className="relative">
              <input type={showPass ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-all" style={{ borderColor: "var(--border-color)", background: "var(--bg-secondary)", color: "var(--text-primary)" }} required />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-secondary)" }}>
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          <button type="submit" className="w-full text-white py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2" style={{ background: "var(--accent-color)" }}>
            <UserPlus size={16} />
            ثبت‌نام و ورود
          </button>
        </form>
        <p className="text-xs text-center mt-4" style={{ color: "var(--text-secondary)" }}>
          قبلاً ثبت‌نام کرده‌اید؟ <Link href="/login" className="hover:underline" style={{ color: "var(--accent-color)" }}>ورود</Link>
        </p>
      </div>
    </div>
  );
}
