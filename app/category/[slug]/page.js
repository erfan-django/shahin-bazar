import { notFound } from "next/navigation";
import Link from "next/link";
import categories from "@/data/categories";
import { getItemsByCategory } from "@/data/items";
import ItemCard from "@/components/ItemCard";
import { Smartphone, Shirt, Home, Sprout, Sparkles, ChevronLeft } from "lucide-react";

export function generateStaticParams() {
  return categories.map(c => ({ slug: c.slug }));
}

const catIcons = { electronics: Smartphone, clothing: Shirt, home: Home, agriculture: Sprout, beauty: Sparkles };

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const category = categories.find(c => c.slug === slug);
  if (!category) notFound();

  const Icon = catIcons[slug] || Sparkles;
  const categoryItems = getItemsByCategory(category.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="text-sm mb-6 flex items-center gap-1" style={{ color: "var(--text-secondary)" }}>
        <Link href="/" className="hover:underline">خانه</Link>
        <ChevronLeft size={14} />
        <span style={{ color: "var(--text-primary)" }}>{category.name}</span>
      </nav>
      <div className="flex items-center gap-3 mb-8">
        <Icon size={28} style={{ color: "var(--accent-color)" }} />
        <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>{category.name}</h1>
        <span className="text-sm px-2 py-1 rounded-full" style={{ background: "var(--bg-secondary)", color: "var(--text-secondary)" }}>{categoryItems.length} کالا</span>
      </div>
      {categoryItems.length === 0 ? (
        <p className="text-center py-12" style={{ color: "var(--text-secondary)" }}>هیچ کالایی در این دسته‌بندی یافت نشد.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {categoryItems.map(item => <ItemCard key={item.id} item={item} />)}
        </div>
      )}
    </div>
  );
}
