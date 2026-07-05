import Link from "next/link";
import items from "@/data/items";
import ItemCard from "@/components/ItemCard";
import { Search as SearchIcon, ChevronLeft, Frown } from "lucide-react";

export default function SearchPage({ searchParams }) {
  const q = (searchParams.q || "").trim().toLowerCase();
  const results = q ? items.filter(item => item.name.includes(q) || item.description.includes(q)) : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="text-sm mb-6 flex items-center gap-1" style={{ color: "var(--text-secondary)" }}>
        <Link href="/" className="hover:underline">خانه</Link>
        <ChevronLeft size={14} />
        <span style={{ color: "var(--text-primary)" }}>جستجو: {q}</span>
      </nav>
      <h1 className="text-2xl font-bold mb-2 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
        <SearchIcon size={24} style={{ color: "var(--accent-color)" }} />
        نتایج جستجو برای "{q}"
      </h1>
      <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>{results.length} کالا یافت شد</p>
      {results.length === 0 ? (
        <div className="text-center py-12">
          <Frown size={48} className="mx-auto mb-4" style={{ color: "var(--text-secondary)" }} />
          <p style={{ color: "var(--text-secondary)" }}>هیچ کالایی با این عبارت یافت نشد.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {results.map(item => <ItemCard key={item.id} item={item} />)}
        </div>
      )}
    </div>
  );
}
