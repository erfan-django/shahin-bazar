"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { Search, Menu, X, LogOut, User } from "lucide-react";

export default function Header() {
  const { user, logout, setShowLoginModal } = useAuth();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) router.push(`/search?q=${encodeURIComponent(search.trim())}`);
  };

  return (
    <header className="sticky top-0 z-50 border-b" style={{ background: "var(--bg-card)", borderColor: "var(--border-color)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          <Link href="/" className="text-xl font-bold shrink-0" style={{ color: "var(--accent-color)" }}>
            بازار شاهین شهر
          </Link>

          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="جستجوی کالا..."
              className="w-full border rounded-r-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-all"
              style={{ borderColor: "var(--border-color)", background: "var(--bg-secondary)", color: "var(--text-primary)", "--tw-ring-color": "var(--accent-color)" }}
            />
            <button type="submit" className="text-white px-4 py-2 rounded-l-lg text-sm transition-colors" style={{ background: "var(--accent-color)" }}>
              <Search size={16} />
            </button>
          </form>

          <nav className="hidden lg:flex items-center gap-4 text-sm font-medium">
            {[
              { href: "/category/electronics", label: "الکترونیک" },
              { href: "/category/clothing", label: "پوشاک" },
              { href: "/category/home", label: "خانه" },
              { href: "/category/agriculture", label: "کشاورزی" },
              { href: "/category/beauty", label: "زیبایی" },
            ].map(link => (
              <Link key={link.href} href={link.href} className="transition-colors" style={{ color: "var(--text-secondary)" }}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3 shrink-0">
            {user ? (
              <div className="hidden sm:flex items-center gap-3">
                <Link href="/dashboard" className="text-sm transition-colors" style={{ color: "var(--text-secondary)" }}>پنل مدیریت</Link>
                <span className="text-sm flex items-center gap-1" style={{ color: "var(--text-secondary)" }}>
                  <User size={14} />
                  {user.name}
                </span>
                <button onClick={logout} className="text-sm transition-colors flex items-center gap-1" style={{ color: "#ef4444" }}>
                  <LogOut size={14} />
                  خروج
                </button>
              </div>
            ) : (
              <button onClick={() => setShowLoginModal(true)} className="text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap" style={{ background: "var(--accent-color)" }}>
                ورود / ثبت‌نام
              </button>
            )}
            <button className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)} style={{ color: "var(--text-primary)" }}>
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="lg:hidden pb-4 border-t pt-4" style={{ borderColor: "var(--border-color)" }}>
            <form onSubmit={handleSearch} className="flex mb-3">
              <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="جستجوی کالا..." className="w-full border rounded-r-lg px-3 py-2 text-sm focus:outline-none focus:ring-2" style={{ borderColor: "var(--border-color)", background: "var(--bg-secondary)", color: "var(--text-primary)" }} />
              <button type="submit" className="text-white px-4 py-2 rounded-l-lg text-sm" style={{ background: "var(--accent-color)" }}><Search size={16} /></button>
            </form>
            <div className="flex flex-col gap-2 text-sm">
              {[
                { href: "/category/electronics", label: "الکترونیک" },
                { href: "/category/clothing", label: "پوشاک" },
                { href: "/category/home", label: "خانه و آشپزخانه" },
                { href: "/category/agriculture", label: "کشاورزی" },
                { href: "/category/beauty", label: "زیبایی و سلامت" },
              ].map(link => (
                <Link key={link.href} href={link.href} className="py-1 transition-colors" style={{ color: "var(--text-secondary)" }} onClick={() => setMenuOpen(false)}>
                  {link.label}
                </Link>
              ))}
              {user ? (
                <>
                  <Link href="/dashboard" className="py-1" style={{ color: "var(--text-secondary)" }} onClick={() => setMenuOpen(false)}>پنل مدیریت</Link>
                  <button onClick={() => { logout(); setMenuOpen(false); }} className="text-right py-1" style={{ color: "#ef4444" }}>خروج</button>
                </>
              ) : (
                <button onClick={() => { setShowLoginModal(true); setMenuOpen(false); }} className="text-right py-1 font-medium" style={{ color: "var(--accent-color)" }}>ورود / ثبت‌نام</button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
