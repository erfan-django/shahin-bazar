"use client";
import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ShoppingBag, ChevronRight, Package, Clock, Truck, CheckCircle, XCircle, Plus } from "lucide-react";
import items from "@/data/items";

const TEST_ORDERS = [
  { itemId: 101, amount: 18500000, date: "1403/04/10", status: "delivered", quantity: 1 },
  { itemId: 202, amount: 2800000, date: "1403/04/05", status: "shipped", quantity: 2 },
  { itemId: 301, amount: 3800000, date: "1403/03/28", status: "processing", quantity: 1 },
  { itemId: 502, amount: 8500000, date: "1403/04/12", status: "processing", quantity: 1 },
  { itemId: 105, amount: 890000, date: "1403/04/01", status: "delivered", quantity: 3 },
];

const STATUS_MAP = {
  delivered: { label: "تحویل شده", icon: CheckCircle, color: "text-green-400", bg: "bg-green-500/15" },
  shipped: { label: "ارسال شده", icon: Truck, color: "text-blue-400", bg: "bg-blue-500/15" },
  processing: { label: "در انتظار", icon: Clock, color: "text-amber-400", bg: "bg-amber-500/15" },
  cancelled: { label: "لغو شده", icon: XCircle, color: "text-red-400", bg: "bg-red-500/15" },
};

export default function CustomerOrders() {
  const { user } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (!user) { router.push("/"); return; }
    const saved = JSON.parse(localStorage.getItem("sb_orders") || "[]").filter(o => o.userId === user.id);
    setOrders(saved);
  }, [user, router]);

  const seedTestOrders = () => {
    const existing = JSON.parse(localStorage.getItem("sb_orders") || "[]");
    const newOrders = TEST_ORDERS.map((o, i) => ({
      id: Date.now() + i,
      userId: user.id,
      ...o,
    }));
    const merged = [...newOrders, ...existing];
    localStorage.setItem("sb_orders", JSON.stringify(merged));
    setOrders(merged.filter(o => o.userId === user.id));
  };

  const cancelOrder = (orderId) => {
    const updated = orders.map(o => o.id === orderId ? { ...o, status: "cancelled" } : o);
    const all = JSON.parse(localStorage.getItem("sb_orders") || "[]").map(o => o.id === orderId ? { ...o, status: "cancelled" } : o);
    localStorage.setItem("sb_orders", JSON.stringify(all));
    setOrders(updated);
  };

  if (!user) return null;

  const filtered = filter === "all" ? orders : orders.filter(o => o.status === filter);
  const counts = { all: orders.length, ...Object.keys(STATUS_MAP).reduce((a, k) => ({ ...a, [k]: orders.filter(o => o.status === k).length }), {}) };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/dashboard/customer" className="p-2 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors" style={{ color: "var(--text-secondary)" }}>
          <ChevronRight size={20} />
        </Link>
        <ShoppingBag size={22} style={{ color: "var(--accent-color)" }} />
        <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>سفارشات من</h1>
      </div>

      <div className="flex items-center gap-2 mb-6 flex-wrap">
        {[{ key: "all", label: "همه", count: orders.length }, ...Object.entries(STATUS_MAP).map(([k, v]) => ({ key: k, label: v.label, count: counts[k] || 0 }))].map(tab => (
          <button key={tab.key} onClick={() => setFilter(tab.key)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${filter === tab.key ? "text-white" : "opacity-70 hover:opacity-100"}`} style={{ background: filter === tab.key ? "var(--accent-color)" : "var(--bg-secondary)", color: filter === tab.key ? "white" : "var(--text-primary)" }}>
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {orders.length === 0 && (
        <div className="text-center py-16">
          <Package size={48} className="mx-auto mb-4" style={{ color: "var(--text-secondary)" }} />
          <p className="font-medium mb-2" style={{ color: "var(--text-primary)" }}>هنوز سفارشی ثبت نکرده‌اید</p>
          <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>برای مشاهده سفارشات تستی، دکمه زیر را بزنید</p>
          <button onClick={seedTestOrders} className="inline-flex items-center gap-2 text-white px-6 py-3 rounded-xl text-sm font-medium transition-all hover:opacity-90 cursor-pointer" style={{ background: "var(--accent-color)" }}>
            <Plus size={16} />
            ثبت سفارشات تستی
          </button>
        </div>
      )}

      {orders.length > 0 && (
        <div className="space-y-4">
          {filtered.length === 0 && (
            <p className="text-center py-8 text-sm" style={{ color: "var(--text-secondary)" }}>هیچ سفارشی با این وضعیت وجود ندارد</p>
          )}
          {filtered.map(order => {
            const item = items.find(i => i.id === order.itemId);
            const st = STATUS_MAP[order.status] || STATUS_MAP.processing;
            const Icon = st.icon;
            return (
              <div key={order.id} className="rounded-xl shadow-sm border overflow-hidden" style={{ background: "var(--bg-card)", borderColor: "var(--border-color)" }}>
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0" style={{ background: "var(--bg-secondary)" }}>
                      {item && <img src={item.image} alt={item.name} className="w-full h-full object-cover" />}
                    </div>
                    <div>
                      <p className="font-medium text-sm" style={{ color: "var(--text-primary)" }}>{item?.name || "محصول حذف شده"}</p>
                      <p className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>تعداد: {order.quantity} عدد</p>
                      <p className="text-xs" style={{ color: "var(--text-secondary)" }}>تاریخ سفارش: {order.date}</p>
                    </div>
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold" style={{ color: "var(--accent-color)" }}>{(order.amount * (order.quantity || 1)).toLocaleString()} تومان</p>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium mt-1 ${st.bg} ${st.color}`}>
                      <Icon size={12} />
                      {st.label}
                    </span>
                  </div>
                </div>
                {(order.status === "processing" || order.status === "shipped") && (
                  <div className="px-4 py-2 border-t flex justify-end" style={{ borderColor: "var(--border-color)" }}>
                    <button onClick={() => cancelOrder(order.id)} className="text-xs font-medium flex items-center gap-1 px-3 py-1.5 rounded-lg transition-colors cursor-pointer" style={{ color: "#ef4444", background: "rgba(239,68,68,0.1)" }}>
                      <XCircle size={12} />
                      لغو سفارش
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {orders.length > 0 && (
        <div className="mt-6 text-center">
          <button onClick={seedTestOrders} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:opacity-80 cursor-pointer border" style={{ borderColor: "var(--border-color)", color: "var(--text-secondary)" }}>
            <Plus size={14} />
            افزودن سفارشات تستی بیشتر
          </button>
        </div>
      )}
    </div>
  );
}
