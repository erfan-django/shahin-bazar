import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getItemById } from "@/data/items";
import items from "@/data/items";
import shops from "@/data/shops";
import categories from "@/data/categories";
import PurchaseButton from "./PurchaseButton";
import { Package, ChevronLeft, Store, Tag, ShoppingBag } from "lucide-react";

export function generateStaticParams() {
  return items.map(item => ({ id: String(item.id) }));
}

export default async function ItemPage({ params }) {
  const { id } = await params;
  const item = getItemById(id);
  if (!item) notFound();

  const shop = shops.find(s => s.id === item.shopId);
  const category = categories.find(c => c.id === item.categoryId);
  const discount = item.oldPrice ? Math.round((1 - item.price / item.oldPrice) * 100) : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="text-sm mb-6 flex items-center gap-1 flex-wrap" style={{ color: "var(--text-secondary)" }}>
        <Link href="/" className="hover:underline">خانه</Link>
        <ChevronLeft size={14} />
        {category && <Link href={`/category/${category.slug}`} className="hover:underline">{category.name}</Link>}
        <ChevronLeft size={14} />
        <span style={{ color: "var(--text-primary)" }}>{item.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div className="rounded-2xl overflow-hidden" style={{ background: "var(--bg-secondary)" }}>
          <Image
            src={item.image}
            alt={item.name}
            width={600}
            height={600}
            className="w-full aspect-square object-cover hover:scale-105 transition-transform duration-500"
            priority
            unoptimized
          />
        </div>

        <div>
          {item.isPreOrder && (
            <span className="inline-flex items-center gap-1 bg-amber-500 text-white text-xs px-3 py-1 rounded-full mb-3">
              <Package size={12} />
              پیش‌فروش
            </span>
          )}
          <h1 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>{item.name}</h1>

          <div className="flex items-baseline gap-3 mb-6 flex-wrap">
            <span className="text-3xl font-bold" style={{ color: "var(--accent-color)" }}>{item.price.toLocaleString()}</span>
            <span style={{ color: "var(--text-secondary)" }}>تومان</span>
            {item.oldPrice && <span className="text-lg line-through" style={{ color: "var(--text-secondary)" }}>{item.oldPrice.toLocaleString()} تومان</span>}
            {discount > 0 && <span className="flex items-center gap-1 bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full"><Tag size={12} />{discount}% تخفیف</span>}
          </div>

          {item.isPreOrder && item.preOrderDate && (
            <div className="border rounded-lg p-3 mb-4 text-sm flex items-center gap-2" style={{ background: "rgba(245,158,11,0.1)", borderColor: "rgba(245,158,11,0.3)", color: "#d97706" }}>
              <ShoppingBag size={16} />
              تاریخ تحویل پیش‌فروش: {item.preOrderDate}
            </div>
          )}

          <p className="leading-relaxed mb-6" style={{ color: "var(--text-secondary)" }}>{item.description}</p>

          <div className="flex items-center gap-2 mb-6">
            <Package size={16} style={{ color: "var(--text-secondary)" }} />
            <span className="text-sm" style={{ color: "var(--text-secondary)" }}>موجودی:</span>
            {item.inStock > 0 ? <span className="text-sm font-medium" style={{ color: "var(--accent-color)" }}>{item.inStock} عدد</span> : <span className="text-sm font-medium" style={{ color: "#d97706" }}>پیش‌فروش</span>}
          </div>

          <PurchaseButton item={item} />

          {shop && (
            <div className="mt-8 pt-6 border-t" style={{ borderColor: "var(--border-color)" }}>
              <p className="text-sm mb-2 flex items-center gap-1" style={{ color: "var(--text-secondary)" }}>
                <Store size={14} />
                فروشنده:
              </p>
              <Link href={`/shops/${shop.id}`} className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg" style={{ background: "rgba(var(--accent-rgb), 0.1)", color: "var(--accent-color)" }}>
                  {shop.name[0]}
                </div>
                <div>
                  <p className="font-medium group-hover:underline" style={{ color: "var(--text-primary)" }}>{shop.name}</p>
                  <p className="text-xs" style={{ color: "var(--text-secondary)" }}>{shop.address}</p>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
