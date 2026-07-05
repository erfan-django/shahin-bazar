"use client";
import { useAuth } from "@/lib/auth";
import { ShoppingCart, Package } from "lucide-react";

export default function PurchaseButton({ item }) {
  const { requireAuth } = useAuth();

  const handlePurchase = () => {
    requireAuth(() => {
      alert(`${item.isPreOrder ? "پیش‌خرید" : "خرید"} "${item.name}" با موفقیت ثبت شد!`);
    });
  };

  return (
    <button onClick={handlePurchase} className="w-full text-white py-3 rounded-xl text-base font-medium transition-colors active:scale-[0.98] flex items-center justify-center gap-2" style={{ background: "var(--accent-color)" }}>
      {item.isPreOrder ? <Package size={18} /> : <ShoppingCart size={18} />}
      {item.isPreOrder ? "پیش‌خرید کالا" : "خرید کالا"}
    </button>
  );
}
