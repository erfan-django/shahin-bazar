"use client";
import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getItemsByShop } from "@/data/items";
import shops from "@/data/shops";
import { Package, TrendingUp, ShoppingCart, Store, Plus } from "lucide-react";

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("/login");
  }, [user, router]);

  if (!user) return null;

  const shop = shops.find(s => s.id === user.shopId);
  const shopItems = getItemsByShop(user.shopId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
          <Store size={24} style={{ color: "var(--accent-color)" }} />
          پنل مدیریت فروشگاه
        </h1>
        <Link href="/dashboard/items/new" className="text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1" style={{ background: "var(--accent-color)" }}>
          <Plus size={16} />
          ثبت کالای جدید
        </Link>
      </div>
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <div className="rounded-xl shadow-sm border p-5" style={{ background: "var(--bg-card)", borderColor: "var(--border-color)" }}>
          <div className="flex items-center gap-2 mb-2">
            <Package size={18} style={{ color: "var(--accent-color)" }} />
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>تعداد کالاها</p>
          </div>
          <p className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>{shopItems.length}</p>
        </div>
        <div className="rounded-xl shadow-sm border p-5" style={{ background: "var(--bg-card)", borderColor: "var(--border-color)" }}>
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={18} style={{ color: "var(--accent-color)" }} />
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>فروش امروز</p>
          </div>
          <p className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>۰</p>
        </div>
        <div className="rounded-xl shadow-sm border p-5" style={{ background: "var(--bg-card)", borderColor: "var(--border-color)" }}>
          <div className="flex items-center gap-2 mb-2">
            <ShoppingCart size={18} style={{ color: "var(--accent-color)" }} />
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>سفارشات فعال</p>
          </div>
          <p className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>۰</p>
        </div>
      </div>
      {shop && (
        <div className="rounded-xl shadow-sm border p-5 mb-8" style={{ background: "var(--bg-card)", borderColor: "var(--border-color)" }}>
          <h2 className="font-medium mb-2 flex items-center gap-1" style={{ color: "var(--text-primary)" }}>
            <Store size={16} style={{ color: "var(--accent-color)" }} />
            اطلاعات فروشگاه
          </h2>
          <p className="text-sm mb-1" style={{ color: "var(--text-secondary)" }}>نام: {shop.name}</p>
          <p className="text-sm mb-1" style={{ color: "var(--text-secondary)" }}>آدرس: {shop.address}</p>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>تلفن: {shop.phone}</p>
        </div>
      )}
      <h2 className="text-lg font-bold mb-4" style={{ color: "var(--text-primary)" }}>کالاهای من</h2>
      <div className="rounded-xl shadow-sm border overflow-hidden" style={{ background: "var(--bg-card)", borderColor: "var(--border-color)" }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b" style={{ background: "var(--bg-secondary)", borderColor: "var(--border-color)" }}>
                <th className="text-right p-3 font-medium" style={{ color: "var(--text-secondary)" }}>نام کالا</th>
                <th className="text-right p-3 font-medium" style={{ color: "var(--text-secondary)" }}>قیمت</th>
                <th className="text-right p-3 font-medium" style={{ color: "var(--text-secondary)" }}>موجودی</th>
                <th className="text-right p-3 font-medium" style={{ color: "var(--text-secondary)" }}>وضعیت</th>
              </tr>
            </thead>
            <tbody>
              {shopItems.map(item => (
                <tr key={item.id} className="border-b" style={{ borderColor: "var(--border-color)" }}>
                  <td className="p-3 font-medium" style={{ color: "var(--text-primary)" }}>{item.name}</td>
                  <td className="p-3" style={{ color: "var(--text-secondary)" }}>{item.price.toLocaleString()} تومان</td>
                  <td className="p-3">{item.inStock > 0 ? <span style={{ color: "var(--accent-color)" }}>{item.inStock} عدد</span> : <span style={{ color: "#d97706" }}>پیش‌فروش</span>}</td>
                  <td className="p-3"><span className="px-2 py-1 rounded-full text-xs" style={{ background: item.isPreOrder ? "rgba(245,158,11,0.15)" : "rgba(5,150,105,0.15)", color: item.isPreOrder ? "#d97706" : "var(--accent-color)" }}>{item.isPreOrder ? 'پیش‌فروش' : 'فروش عادی'}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
