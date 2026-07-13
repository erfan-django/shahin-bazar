"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import categories from "@/data/categories";
import { Package, DollarSign, Save, X, FileText, FolderOpen } from "lucide-react";

export default function NewItemPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ name: "", price: "", description: "", categoryId: "1", stock: "", isPreOrder: false });

  useEffect(() => {
    if (!user) {
      const stored = localStorage.getItem("sb_current_user");
      if (stored) return;
      router.push("/login");
    }
  }, [user, router]);

  if (!user) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`کالای "${form.name}" با موفقیت ثبت شد!`);
    router.push("/dashboard");
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
        <Package size={24} style={{ color: "var(--accent-color)" }} />
        ثبت کالای جدید
      </h1>
      <form onSubmit={handleSubmit} className="rounded-2xl shadow-sm border p-6 space-y-4" style={{ background: "var(--bg-card)", borderColor: "var(--border-color)" }}>
        <div>
          <label className="block text-sm font-medium mb-1 flex items-center gap-1" style={{ color: "var(--text-primary)" }}>
            <FileText size={14} />
            نام کالا
          </label>
          <input type="text" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-all" style={{ borderColor: "var(--border-color)", background: "var(--bg-secondary)", color: "var(--text-primary)" }} required />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 flex items-center gap-1" style={{ color: "var(--text-primary)" }}>
              <DollarSign size={14} />
              قیمت (تومان)
            </label>
            <input type="number" value={form.price} onChange={e => setForm(p => ({ ...p, price: e.target.value }))} className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-all" style={{ borderColor: "var(--border-color)", background: "var(--bg-secondary)", color: "var(--text-primary)" }} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 flex items-center gap-1" style={{ color: "var(--text-primary)" }}>
              <FolderOpen size={14} />
              دسته‌بندی
            </label>
            <select value={form.categoryId} onChange={e => setForm(p => ({ ...p, categoryId: e.target.value }))} className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-all" style={{ borderColor: "var(--border-color)", background: "var(--bg-secondary)", color: "var(--text-primary)" }}>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: "var(--text-primary)" }}>توضیحات</label>
          <textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} rows={4} className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-all" style={{ borderColor: "var(--border-color)", background: "var(--bg-secondary)", color: "var(--text-primary)" }} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 flex items-center gap-1" style={{ color: "var(--text-primary)" }}>
              <Package size={14} />
              موجودی
            </label>
            <input type="number" value={form.stock} onChange={e => setForm(p => ({ ...p, stock: e.target.value }))} className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-all" style={{ borderColor: "var(--border-color)", background: "var(--bg-secondary)", color: "var(--text-primary)" }} />
          </div>
          <div className="flex items-end pb-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.isPreOrder} onChange={e => setForm(p => ({ ...p, isPreOrder: e.target.checked }))} className="w-4 h-4 rounded" style={{ accentColor: "var(--accent-color)" }} />
              <span className="text-sm" style={{ color: "var(--text-primary)" }}>پیش‌فروش باشد</span>
            </label>
          </div>
        </div>
        <div className="flex gap-3 pt-2">
          <button type="submit" className="text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2" style={{ background: "var(--accent-color)" }}>
            <Save size={16} />
            ثبت کالا
          </button>
          <button type="button" onClick={() => router.push("/dashboard")} className="px-6 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2" style={{ background: "var(--bg-secondary)", color: "var(--text-secondary)" }}>
            <X size={16} />
            انصراف
          </button>
        </div>
      </form>
    </div>
  );
}
