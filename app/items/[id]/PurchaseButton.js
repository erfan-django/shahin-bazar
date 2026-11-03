"use client";
import { useAuth } from "@/lib/auth";
import { ShoppingCart, Package } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function PurchaseButton({ item }) {
  const { requireAuth, user } = useAuth();
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const handlePurchase = () => {
    requireAuth(() => {
      try {
        const orders = JSON.parse(localStorage.getItem("sb_orders") || "[]");
        orders.unshift({
          id: `${Date.now()}-${item.id}`,
          userId: user.id,
          itemId: item.id,
          amount: item.price,
          quantity: 1,
          date: new Date().toLocaleDateString("fa-IR-u-ca-persian"),
          status: "processing",
          isPreOrder: item.isPreOrder,
        });
        localStorage.setItem("sb_orders", JSON.stringify(orders));
        setError("");
        setSaved(true);
      } catch {
        setError("ذخیره سفارش در این مرورگر ممکن نشد. فضای ذخیره‌سازی را بررسی کنید.");
      }
    });
  };

  return saved ? (
    <div role="status" className="space-y-3 rounded-xl border border-green-500/30 bg-green-500/10 p-4 text-center text-sm text-green-700 dark:text-green-300">
      <p>{item.isPreOrder ? "پیش‌خرید" : "سفارش نمایشی"} در همین مرورگر ذخیره شد.</p>
      <Link href="/dashboard/customer/orders" className="inline-block underline underline-offset-4">مشاهده سفارش‌ها</Link>
    </div>
  ) : (
    <div>
    <button onClick={handlePurchase} className="w-full text-white py-3 rounded-xl text-base font-medium transition-colors active:scale-[0.98] flex items-center justify-center gap-2" style={{ background: "var(--accent-color)" }}>
      {item.isPreOrder ? <Package size={18} /> : <ShoppingCart size={18} />}
      {item.isPreOrder ? "پیش‌خرید کالا" : "خرید کالا"}
    </button>
    {error && <p role="alert" className="mt-2 text-center text-sm text-red-500">{error}</p>}
    </div>
  );
}
