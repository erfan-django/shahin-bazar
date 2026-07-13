"use client";
import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { User, ShoppingBag, Heart, MapPin, Clock, Package, ChevronLeft, Mail, Phone, Edit3, Save, LogOut } from "lucide-react";

const FAKE_PROFILE = {
  email: "maryam.hosseini@gmail.com",
  phone: "09135556677",
  address: "شاهین شهر، بلوار اصلی، کوچه گلستان ۵، پلاک ۱۲",
  birthDate: "1370/05/22",
  nationalId: "۴۴۲-۱۲۳۴۵۶۷-۸",
  memberSince: "1402/12/01",
  totalSpent: 42890000,
  orderCount: 8,
  wishlistCount: 5,
};

export default function CustomerDashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({ ...FAKE_PROFILE });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!user) {
      const stored = localStorage.getItem("sb_current_user");
      if (stored) return;
      router.push("/");
      return;
    }
    const savedOrders = JSON.parse(localStorage.getItem("sb_orders") || "[]").filter(o => o.userId === user.id);
    setOrders(savedOrders);
    const savedWishlist = JSON.parse(localStorage.getItem("sb_wishlist") || "[]").filter(w => w.userId === user.id);
    setWishlist(savedWishlist);
  }, [user, router]);

  if (!user) return null;

  const handleSave = () => {
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const statCards = [
    { icon: ShoppingBag, label: "سفارشات", value: orders.length, color: "var(--accent-color)", href: "/dashboard/customer/orders" },
    { icon: Heart, label: "علاقه‌مندی‌ها", value: wishlist.length, color: "#ef4444" },
    { icon: Package, label: "در حال پیگیری", value: orders.filter(o => o.status !== "delivered").length, color: "var(--accent-color)" },
    { icon: Clock, label: "تحویل شده", value: orders.filter(o => o.status === "delivered").length, color: "#22c55e" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg" style={{ background: "linear-gradient(135deg, var(--accent-color), #059669)", color: "white" }}>
          {user.name[0]}
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>{user.name}</h1>
          <p className="text-sm flex items-center gap-1" style={{ color: "var(--text-secondary)" }}>
            <User size={14} /> کاربر عادی
          </p>
        </div>
        <Link href="/dashboard/customer/orders" className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg transition-all hover:opacity-80" style={{ background: "rgba(var(--accent-rgb), 0.1)", color: "var(--accent-color)" }}>
          مشاهده سفارشات
          <ChevronLeft size={16} />
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((card, i) => (
          <div key={i} className="rounded-xl shadow-sm border p-5 transition-all hover:shadow-md" style={{ background: "var(--bg-card)", borderColor: "var(--border-color)" }}>
            <div className="flex items-center gap-2 mb-2">
              <card.icon size={18} style={{ color: card.color }} />
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{card.label}</p>
            </div>
            <p className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>{card.value}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="rounded-xl shadow-sm border" style={{ background: "var(--bg-card)", borderColor: "var(--border-color)" }}>
          <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: "var(--border-color)" }}>
            <div className="flex items-center gap-2">
              <User size={16} style={{ color: "var(--accent-color)" }} />
              <h2 className="font-medium" style={{ color: "var(--text-primary)" }}>پروفایل کاربری</h2>
            </div>
            <button onClick={() => editing ? handleSave() : setEditing(true)} className="flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors cursor-pointer" style={{ background: editing ? "rgba(34,197,94,0.15)" : "rgba(var(--accent-rgb), 0.1)", color: editing ? "#22c55e" : "var(--accent-color)" }}>
              {editing ? <><Save size={14} /> ذخیره</> : <><Edit3 size={14} /> ویرایش</>}
            </button>
          </div>
          <div className="p-5 space-y-4 text-sm">
            {[
              { icon: User, label: "نام کاربری", value: user.username, key: "username" },
              { icon: Mail, label: "ایمیل", value: profile.email, key: "email" },
              { icon: Phone, label: "تلفن", value: profile.phone, key: "phone" },
              { icon: MapPin, label: "آدرس", value: profile.address, key: "address" },
              { icon: Clock, label: "تاریخ تولد", value: profile.birthDate, key: "birthDate" },
              { icon: Clock, label: "عضویت از", value: profile.memberSince, key: "memberSince" },
            ].map((field, i) => (
              <div key={i} className="flex items-center gap-2 pb-3" style={{ borderBottom: i < 5 ? "1px solid var(--border-color)" : "none" }}>
                <field.icon size={14} style={{ color: "var(--accent-color)" }} />
                <span style={{ color: "var(--text-secondary)", minWidth: 70 }}>{field.label}:</span>
                {editing && field.key !== "username" && field.key !== "memberSince" ? (
                  <input type="text" value={profile[field.key]} onChange={e => setProfile({ ...profile, [field.key]: e.target.value })} className="flex-1 px-2 py-1 rounded-lg text-sm border focus:outline-none focus:ring-2" style={{ borderColor: "var(--border-color)", background: "var(--bg-secondary)", color: "var(--text-primary)" }} />
                ) : (
                  <span style={{ color: "var(--text-primary)" }}>{field.value}</span>
                )}
              </div>
            ))}
          </div>
          {saved && <p className="text-xs text-center pb-4" style={{ color: "#22c55e" }}>تغییرات با موفقیت ذخیره شد</p>}
        </div>

        <div>
          <div className="rounded-xl shadow-sm border mb-6" style={{ background: "var(--bg-card)", borderColor: "var(--border-color)" }}>
            <div className="px-5 py-4 border-b flex items-center gap-2" style={{ borderColor: "var(--border-color)" }}>
              <ShoppingBag size={16} style={{ color: "var(--accent-color)" }} />
              <h2 className="font-medium" style={{ color: "var(--text-primary)" }}>آخرین سفارشات</h2>
            </div>
            <div className="p-5">
              {orders.length === 0 ? (
                <p className="text-sm text-center py-4" style={{ color: "var(--text-secondary)" }}>
                  هنوز سفارشی ثبت نکرده‌اید
                </p>
              ) : (
                <div className="space-y-3">
                  {orders.slice(0, 3).map(order => (
                    <div key={order.id} className="flex items-center justify-between py-2">
                      <div>
                        <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{order.amount.toLocaleString()} تومان</p>
                        <p className="text-xs" style={{ color: "var(--text-secondary)" }}>{order.date}</p>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${order.status === "delivered" ? "bg-green-500/15 text-green-400" : order.status === "shipped" ? "bg-blue-500/15 text-blue-400" : "bg-amber-500/15 text-amber-400"}`}>
                        {order.status === "delivered" ? "تحویل شده" : order.status === "shipped" ? "ارسال شده" : "در انتظار"}
                      </span>
                    </div>
                  ))}
                  {orders.length > 3 && (
                    <Link href="/dashboard/customer/orders" className="block text-center text-xs font-medium pt-2 hover:underline" style={{ color: "var(--accent-color)" }}>
                      مشاهده همه {orders.length} سفارش
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="rounded-xl shadow-sm border" style={{ background: "var(--bg-card)", borderColor: "var(--border-color)" }}>
            <div className="px-5 py-4 border-b flex items-center gap-2" style={{ borderColor: "var(--border-color)" }}>
              <Heart size={16} style={{ color: "#ef4444" }} />
              <h2 className="font-medium" style={{ color: "var(--text-primary)" }}>علاقه‌مندی‌ها</h2>
            </div>
            <div className="p-5">
              <p className="text-center text-sm py-4" style={{ color: "var(--text-secondary)" }}>
                {wishlist.length > 0 ? `${wishlist.length} کالا در لیست علاقه‌مندی‌ها` : "هنوز کالایی به علاقه‌مندی‌ها اضافه نکرده‌اید"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center pt-4 border-t" style={{ borderColor: "var(--border-color)" }}>
        <button onClick={() => { logout(); router.push("/"); }} className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all hover:opacity-80 cursor-pointer" style={{ color: "#ef4444", background: "rgba(239,68,68,0.1)" }}>
          <LogOut size={16} />
          خروج از حساب
        </button>
      </div>
    </div>
  );
}
