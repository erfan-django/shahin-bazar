import { notFound } from "next/navigation";
import Link from "next/link";
import shops from "@/data/shops";
import { getItemsByShop } from "@/data/items";
import ItemCard from "@/components/ItemCard";
import { Store, Phone, MapPin, Calendar, ShoppingBag, ChevronLeft } from "lucide-react";

export function generateStaticParams() {
  return shops.map(s => ({ id: String(s.id) }));
}

export default async function ShopPage({ params }) {
  const { id } = await params;
  const shop = shops.find(s => s.id === Number(id));
  if (!shop) notFound();

  const shopItems = getItemsByShop(shop.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="text-sm mb-6 flex items-center gap-1" style={{ color: "var(--text-secondary)" }}>
        <Link href="/" className="hover:underline">خانه</Link>
        <ChevronLeft size={14} />
        <span style={{ color: "var(--text-primary)" }}>{shop.name}</span>
      </nav>
      <div className="rounded-2xl shadow-sm border p-6 mb-8" style={{ background: "var(--bg-card)", borderColor: "var(--border-color)" }}>
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl shrink-0" style={{ background: "rgba(var(--accent-color), 0.1)", color: "var(--accent-color)" }}>
            {shop.name[0]}
          </div>
          <div>
            <h1 className="text-2xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>{shop.name}</h1>
            <p className="mb-3" style={{ color: "var(--text-secondary)" }}>{shop.description}</p>
            <div className="flex flex-wrap gap-4 text-sm" style={{ color: "var(--text-secondary)" }}>
              <span className="flex items-center gap-1"><MapPin size={14} />{shop.address}</span>
              <span className="flex items-center gap-1"><Phone size={14} />{shop.phone}</span>
              <span className="flex items-center gap-1"><Calendar size={14} />عضویت: {shop.joinedAt}</span>
              <span className="flex items-center gap-1"><ShoppingBag size={14} />{shopItems.length} کالا</span>
            </div>
          </div>
        </div>
      </div>
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
        <Store size={20} style={{ color: "var(--accent-color)" }} />
        کالاهای فروشگاه
      </h2>
      {shopItems.length === 0 ? (
        <p className="text-center py-12" style={{ color: "var(--text-secondary)" }}>هیچ کالایی یافت نشد.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {shopItems.map(item => <ItemCard key={item.id} item={item} />)}
        </div>
      )}
    </div>
  );
}
