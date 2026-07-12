"use client";
import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { X, Eye, EyeOff, User, Lock, Store, ShoppingBag, LogIn } from "lucide-react";

export default function LoginModal() {
  const { showLoginModal, setShowLoginModal, login, loginAsTest, register } = useAuth();
  const router = useRouter();
  const [tab, setTab] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  if (!showLoginModal) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    if (!login(username, password)) {
      setError("نام کاربری یا رمز عبور اشتباه است");
    } else {
      setShowLoginModal(false);
      setUsername("");
      setPassword("");
      const user = JSON.parse(localStorage.getItem("sb_current_user") || "null");
      if (user?.role === "seller") router.push("/dashboard");
      else router.push("/dashboard/customer");
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");
    const result = register(username, password, name);
    if (!result) {
      setError("این نام کاربری قبلاً ثبت شده است");
    } else {
      setShowLoginModal(false);
      setUsername("");
      setPassword("");
      setName("");
    }
  };

  const handleTestLogin = (role) => {
    loginAsTest(role);
    setShowLoginModal(false);
    if (role === "seller") router.push("/dashboard");
    if (role === "customer") router.push("/dashboard/customer");
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowLoginModal(false)}>
      <div className="rounded-2xl p-6 w-full max-w-md shadow-2xl animate-fade-in" onClick={e => e.stopPropagation()} style={{ background: "var(--bg-card)" }}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
            {tab === "login" ? "ورود به حساب" : "ثبت‌نام"}
          </h2>
          <button onClick={() => setShowLoginModal(false)} style={{ color: "var(--text-secondary)" }} className="hover:opacity-70 transition-opacity cursor-pointer">
            <X size={20} />
          </button>
        </div>

        <div className="flex mb-6 border-b" style={{ borderColor: "var(--border-color)" }}>
          <button onClick={() => { setTab("login"); setError(""); }} className={`flex-1 pb-3 text-sm font-medium transition-colors cursor-pointer ${tab === "login" ? "border-b-2" : "opacity-60 hover:opacity-100"}`} style={{ color: "var(--text-primary)", borderColor: tab === "login" ? "var(--accent-color)" : "transparent" }}>
            ورود
          </button>
          <button onClick={() => { setTab("register"); setError(""); }} className={`flex-1 pb-3 text-sm font-medium transition-colors cursor-pointer ${tab === "register" ? "border-b-2" : "opacity-60 hover:opacity-100"}`} style={{ color: "var(--text-primary)", borderColor: tab === "register" ? "var(--accent-color)" : "transparent" }}>
            ثبت‌نام
          </button>
        </div>

        {tab === "login" && (
          <>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 flex items-center gap-1" style={{ color: "var(--text-primary)" }}>
                  <User size={14} /> نام کاربری
                </label>
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} className="w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 transition-all" style={{ borderColor: "var(--border-color)", background: "var(--bg-secondary)", color: "var(--text-primary)" }} placeholder="..." required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 flex items-center gap-1" style={{ color: "var(--text-primary)" }}>
                  <Lock size={14} /> رمز عبور
                </label>
                <div className="relative">
                  <input type={showPass ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} className="w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 transition-all" style={{ borderColor: "var(--border-color)", background: "var(--bg-secondary)", color: "var(--text-primary)" }} placeholder="..." required />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer" style={{ color: "var(--text-secondary)" }}>
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              {error && <p className="text-red-400 text-xs text-center">{error}</p>}
              <button type="submit" className="w-full text-white py-2.5 rounded-lg text-sm font-medium transition-all hover:opacity-90 flex items-center justify-center gap-2 cursor-pointer" style={{ background: "var(--accent-color)" }}>
                <LogIn size={16} /> ورود
              </button>
            </form>

            <div className="mt-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 h-px" style={{ background: "var(--border-color)" }}></div>
                <span className="text-xs" style={{ color: "var(--text-secondary)" }}>ورود سریع با حساب تستی</span>
                <div className="flex-1 h-px" style={{ background: "var(--border-color)" }}></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => handleTestLogin("customer")} className="flex flex-col items-center gap-1.5 py-3 px-4 rounded-xl border-2 transition-all hover:scale-[1.02] cursor-pointer" style={{ borderColor: "rgba(245,158,11,0.3)", background: "rgba(245,158,11,0.08)" }}>
                  <ShoppingBag size={22} style={{ color: "#f59e0b" }} />
                  <span className="text-xs font-medium" style={{ color: "#f59e0b" }}>تست مشتری</span>
                </button>
                <button onClick={() => handleTestLogin("seller")} className="flex flex-col items-center gap-1.5 py-3 px-4 rounded-xl border-2 transition-all hover:scale-[1.02] cursor-pointer" style={{ borderColor: "rgba(5,150,105,0.3)", background: "rgba(5,150,105,0.08)" }}>
                  <Store size={22} style={{ color: "var(--accent-color)" }} />
                  <span className="text-xs font-medium" style={{ color: "var(--accent-color)" }}>تست فروشنده</span>
                </button>
              </div>
            </div>
          </>
        )}

        {tab === "register" && (
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "var(--text-primary)" }}>نام و نام خانوادگی</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 transition-all" style={{ borderColor: "var(--border-color)", background: "var(--bg-secondary)", color: "var(--text-primary)" }} placeholder="..." required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "var(--text-primary)" }}>نام کاربری</label>
              <input type="text" value={username} onChange={e => setUsername(e.target.value)} className="w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 transition-all" style={{ borderColor: "var(--border-color)", background: "var(--bg-secondary)", color: "var(--text-primary)" }} placeholder="..." required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "var(--text-primary)" }}>رمز عبور</label>
              <div className="relative">
                <input type={showPass ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} className="w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 transition-all" style={{ borderColor: "var(--border-color)", background: "var(--bg-secondary)", color: "var(--text-primary)" }} placeholder="..." required />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer" style={{ color: "var(--text-secondary)" }}>
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            {error && <p className="text-red-400 text-xs text-center">{error}</p>}
            <button type="submit" className="w-full text-white py-2.5 rounded-lg text-sm font-medium transition-all hover:opacity-90 cursor-pointer" style={{ background: "var(--accent-color)" }}>
              ثبت‌نام و ورود
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
