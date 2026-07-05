import Link from "next/link";
import { Smartphone, Shirt, Home, Sprout, Sparkles, ShoppingBag, Tag } from "lucide-react";

const catIcons = {
  1: Smartphone,
  2: Shirt,
  3: Home,
  4: Sprout,
  5: Sparkles,
};

export default function ItemCard({ item }) {
  const Icon = catIcons[item.categoryId] || ShoppingBag;
  const discount = item.oldPrice ? Math.round((1 - item.price / item.oldPrice) * 100) : 0;

  return (
    <Link href={`/items/${item.id}`} className="group bg-[var(--bg-card)] rounded-xl shadow-sm border border-[var(--border-color)] overflow-hidden hover:shadow-md transition-all duration-200 hover:-translate-y-1 flex flex-col">
      <div className="aspect-[4/3] relative flex items-center justify-center overflow-hidden" style={{ background: "var(--bg-secondary)" }}>
        <Icon size={48} className="opacity-20 group-hover:scale-110 transition-transform duration-300" style={{ color: "var(--accent-color)" }} />
        {item.isPreOrder && (
          <span className="absolute top-2 right-2 bg-amber-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
            <ShoppingBag size={12} />
            پیش‌فروش
          </span>
        )}
        {discount > 0 && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
            <Tag size={12} />
            {discount}%-
          </span>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
          {item.name}
        </h3>
        <div className="mt-auto pt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold" style={{ color: "var(--accent-color)" }}>
              {item.price.toLocaleString()}
            </span>
            <span className="text-xs" style={{ color: "var(--text-secondary)" }}>تومان</span>
            {item.oldPrice && (
              <span className="text-xs line-through" style={{ color: "var(--text-secondary)" }}>
                {item.oldPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
