"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { Search, Menu, X, LogOut, User, Store, ShoppingBag, ChevronDown, LayoutDashboard } from "lucide-react";

export default function Header() {
  const { user, logout, setShowLoginModal } = useAuth();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) router.push(`/search?q=${encodeURIComponent(search.trim())}`);
  };

  return (
    <header className="sticky top-0 z-50 border-b" style={{ background: "var(--bg-card)", borderColor: "var(--border-color)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          <Link href="/" className="text-xl font-bold shrink-0 whitespace-nowrap" style={{ color: "var(--accent-color)" }}>
            بازار شاهین شهر
          </Link>

          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md">
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="جستجوی کالا..." className="w-full border rounded-r-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-all" style={{ borderColor: "var(--border-color)", background: "var(--bg-secondary)", color: "var(--text-primary)", "--tw-ring-color": "var(--accent-color)" }} />
            <button type="submit" className="text-white px-4 py-2 rounded-l-lg text-sm transition-colors shrink-0 cursor-pointer" style={{ background: "var(--accent-color)" }}>
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
              <Link key={link.href} href={link.href} className="transition-colors hover:opacity-80" style={{ color: "var(--text-secondary)" }}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all cursor-pointer" style={{ background: "rgba(var(--accent-rgb), 0.1)", color: "var(--accent-color)" }}>
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: "var(--accent-color)", color: "white" }}>
                    {user.name[0]}
                  </div>
                  <span className="text-sm font-medium hidden sm:block">{user.name}</span>
                  <ChevronDown size={14} className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                </button>
                {dropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-52 rounded-xl border shadow-xl overflow-hidden z-50" style={{ background: "var(--bg-card)", borderColor: "var(--border-color)" }}>
                    {user.role === "seller" ? (
                      <>
                        <Link href="/dashboard" onClick={() => setDropdownOpen(false)} className="flex items-center gap-2.5 px-4 py-3 text-sm transition-colors hover:bg-[var(--bg-secondary)]" style={{ color: "var(--text-primary)" }}>
                          <LayoutDashboard size={16} style={{ color: "var(--accent-color)" }} />
                          پنل مدیریت فروشگاه
                        </Link>
                        <Link href="/dashboard/items/new" onClick={() => setDropdownOpen(false)} className="flex items-center gap-2.5 px-4 py-3 text-sm transition-colors hover:bg-[var(--bg-secondary)]" style={{ color: "var(--text-primary)" }}>
                          <Store size={16} style={{ color: "var(--accent-color)" }} />
                          ثبت کالای جدید
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link href="/dashboard/customer" onClick={() => setDropdownOpen(false)} className="flex items-center gap-2.5 px-4 py-3 text-sm transition-colors hover:bg-[var(--bg-secondary)]" style={{ color: "var(--text-primary)" }}>
                          <User size={16} style={{ color: "var(--accent-color)" }} />
                          پنل کاربری
                        </Link>
                        <Link href="/dashboard/customer/orders" onClick={() => setDropdownOpen(false)} className="flex items-center gap-2.5 px-4 py-3 text-sm transition-colors hover:bg-[var(--bg-secondary)]" style={{ color: "var(--text-primary)" }}>
                          <ShoppingBag size={16} style={{ color: "var(--accent-color)" }} />
                          سفارشات من
                        </Link>
                      </>
                    )}
                    <div className="border-t" style={{ borderColor: "var(--border-color)" }}>
                      <button onClick={() => { logout(); setDropdownOpen(false); }} className="flex items-center gap-2.5 px-4 py-3 text-sm transition-colors hover:bg-[var(--bg-secondary)] w-full text-right cursor-pointer" style={{ color: "#ef4444" }}>
                        <LogOut size={16} />
                        خروج
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button onClick={() => setShowLoginModal(true)} className="text-white px-4 py-2 rounded-lg text-sm font-medium transition-all hover:opacity-90 whitespace-nowrap cursor-pointer" style={{ background: "var(--accent-color)" }}>
                ورود / ثبت‌نام
              </button>
            )}
            <button className="lg:hidden p-2 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors cursor-pointer" onClick={() => setMenuOpen(!menuOpen)} style={{ color: "var(--text-primary)" }}>
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="lg:hidden pb-4 border-t pt-4" style={{ borderColor: "var(--border-color)" }}>
            <form onSubmit={handleSearch} className="flex mb-3">
              <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="جستجوی کالا..." className="w-full border rounded-r-lg px-3 py-2 text-sm focus:outline-none focus:ring-2" style={{ borderColor: "var(--border-color)", background: "var(--bg-secondary)", color: "var(--text-primary)" }} />
              <button type="submit" className="text-white px-4 py-2 rounded-l-lg text-sm shrink-0 cursor-pointer" style={{ background: "var(--accent-color)" }}><Search size={16} /></button>
            </form>
            <div className="flex flex-col gap-2 text-sm">
              {[
                { href: "/category/electronics", label: "الکترونیک" },
                { href: "/category/clothing", label: "پوشاک" },
                { href: "/category/home", label: "خانه و آشپزخانه" },
                { href: "/category/agriculture", label: "کشاورزی" },
                { href: "/category/beauty", label: "زیبایی و سلامت" },
              ].map(link => (
                <Link key={link.href} href={link.href} className="py-1.5 transition-colors hover:opacity-80" style={{ color: "var(--text-secondary)" }} onClick={() => setMenuOpen(false)}>
                  {link.label}
                </Link>
              ))}
              {user ? (
                <div className="border-t pt-3 mt-2 space-y-2" style={{ borderColor: "var(--border-color)" }}>
                  {user.role === "seller" ? (
                    <>
                      <Link href="/dashboard" className="flex items-center gap-2 py-1.5" style={{ color: "var(--text-primary)" }} onClick={() => setMenuOpen(false)}>
                        <LayoutDashboard size={16} style={{ color: "var(--accent-color)" }} /> پنل مدیریت
                      </Link>
                      <Link href="/dashboard/items/new" className="flex items-center gap-2 py-1.5" style={{ color: "var(--text-primary)" }} onClick={() => setMenuOpen(false)}>
                        <Store size={16} style={{ color: "var(--accent-color)" }} /> ثبت کالای جدید
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link href="/dashboard/customer" className="flex items-center gap-2 py-1.5" style={{ color: "var(--text-primary)" }} onClick={() => setMenuOpen(false)}>
                        <User size={16} style={{ color: "var(--accent-color)" }} /> پنل کاربری
                      </Link>
                      <Link href="/dashboard/customer/orders" className="flex items-center gap-2 py-1.5" style={{ color: "var(--text-primary)" }} onClick={() => setMenuOpen(false)}>
                        <ShoppingBag size={16} style={{ color: "var(--accent-color)" }} /> سفارشات من
                      </Link>
                    </>
                  )}
                  <button onClick={() => { logout(); setMenuOpen(false); }} className="flex items-center gap-2 py-1.5 w-full text-right cursor-pointer" style={{ color: "#ef4444" }}>
                    <LogOut size={16} /> خروج
                  </button>
                </div>
              ) : (
                <button onClick={() => { setShowLoginModal(true); setMenuOpen(false); }} className="text-right py-1.5 font-medium cursor-pointer" style={{ color: "var(--accent-color)" }}>ورود / ثبت‌نام</button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
