import Link from "next/link";
import ItemCard from "@/components/ItemCard";
import categories from "@/data/categories";
import { getLatestItems, getPreOrderItems } from "@/data/items";
import shops from "@/data/shops";
import { Sparkles, Store } from "lucide-react";

export default function HomePage() {
  const latestItems = getLatestItems(8);
  const preOrderItems = getPreOrderItems();

  return (
    <div>
      <section className="text-white" style={{ background: "linear-gradient(135deg, var(--accent-color), #0d9488)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">به بازار شاهین شهر خوش آمدید</h1>
            <p className="text-emerald-100 text-lg md:text-xl max-w-2xl mx-auto mb-8">
              نخستین بازار آنلاین تخصصی شهر شاهین شهر - از مغازه‌های محلی خرید کنید یا اجناس خود را برای فروش بگذارید
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a href="#categories" className="bg-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2" style={{ color: "var(--accent-color)" }}>
                <Store size={18} />
                دسته‌بندی کالاها
              </a>
              <a href="#preorder" className="bg-emerald-500 text-white px-6 py-3 rounded-lg font-medium border border-emerald-400 transition-colors flex items-center gap-2">
                <Sparkles size={18} />
                پیش‌فروش‌ها
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold mb-8" style={{ color: "var(--text-primary)" }}>دسته‌بندی کالاها</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {categories.map(cat => {
            const icons = [Smartphone, Shirt, Home, Sprout, Sparkles];
            const Icon = icons[cat.id - 1] || Sparkles;
            return (
              <Link key={cat.id} href={`/category/${cat.slug}`} className="rounded-xl shadow-sm border p-6 text-center hover:shadow-md hover:-translate-y-1 transition-all duration-200 group" style={{ background: "var(--bg-card)", borderColor: "var(--border-color)" }}>
                <Icon size={32} className="mx-auto mb-3 group-hover:scale-110 transition-transform" style={{ color: "var(--accent-color)" }} />
                <span className="text-sm font-medium block" style={{ color: "var(--text-primary)" }}>{cat.name}</span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>جدیدترین کالاها</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {latestItems.map(item => <ItemCard key={item.id} item={item} />)}
        </div>
      </section>

      {preOrderItems.length > 0 && (
        <section id="preorder" className="border-t border-b" style={{ background: "var(--bg-secondary)", borderColor: "var(--border-color)" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>پیش‌فروش ویژه</h2>
              <span className="text-sm flex items-center gap-1 px-3 py-1 rounded-full" style={{ background: "rgba(245,158,11,0.15)", color: "#f59e0b" }}>
                <Sparkles size={14} />
                محصولات پیش از عرضه
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {preOrderItems.map(item => <ItemCard key={item.id} item={item} />)}
            </div>
          </div>
        </section>
      )}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold mb-8" style={{ color: "var(--text-primary)" }}>مغازه‌های شاهین شهر</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {shops.map(shop => (
            <Link key={shop.id} href={`/shops/${shop.id}`} className="rounded-xl shadow-sm border p-5 hover:shadow-md transition-all duration-200" style={{ background: "var(--bg-card)", borderColor: "var(--border-color)" }}>
              <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg mb-3" style={{ background: "rgba(var(--accent-color), 0.1)", color: "var(--accent-color)" }}>
                {shop.name[0]}
              </div>
              <h3 className="font-medium text-sm mb-1" style={{ color: "var(--text-primary)" }}>{shop.name}</h3>
              <p className="text-xs line-clamp-2" style={{ color: "var(--text-secondary)" }}>{shop.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function Smartphone(props) { return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><line x1="12" x2="12.01" y1="18" y2="18"/></svg>; }
function Shirt(props) { return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.15l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/></svg>; }
function Home(props) { return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>; }
function Sprout(props) { return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M7 20h10"/><path d="M10 20c0-2.5-1.5-5-5-5"/><path d="M14 20c0-2.5 1.5-5 5-5"/><path d="M12 10V2"/><path d="M8 6c2 0 4 1.5 4 4 0-2.5 2-4 4-4"/></svg>; }
