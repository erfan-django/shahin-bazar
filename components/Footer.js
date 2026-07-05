import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto" style={{ background: "#0f172a", color: "#94a3b8" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4" style={{ color: "var(--accent-color)" }}>بازار شاهین شهر</h3>
            <p className="text-sm leading-relaxed" style={{ color: "#94a3b8" }}>
              نخستین بازار آنلاین تخصصی شهر شاهین شهر. مغازه‌داران محلی می‌توانند اجناس خود را برای فروش یا پیش‌فروش ثبت کنند و مشتریان به راحتی خرید نمایند.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-3" style={{ color: "#f1f5f9" }}>دسته‌بندی‌ها</h4>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/category/electronics", label: "الکترونیک" },
                { href: "/category/clothing", label: "پوشاک" },
                { href: "/category/home", label: "خانه و آشپزخانه" },
                { href: "/category/agriculture", label: "کشاورزی و مواد غذایی" },
                { href: "/category/beauty", label: "زیبایی و سلامت" },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors" style={{ color: "#94a3b8" }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-3" style={{ color: "#f1f5f9" }}>ارتباط با ما</h4>
            <ul className="space-y-2 text-sm" style={{ color: "#94a3b8" }}>
              <li>شاهین شهر، بلوار اصلی</li>
              <li>تلفن: 0913-111-2233</li>
              <li>ایمیل: info@shahinbazaar.ir</li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-8 pt-6 text-center text-sm" style={{ borderColor: "#1e293b", color: "#64748b" }}>
          <p>تمامی حقوق برای بازار شاهین شهر محفوظ است &copy; ۱۴۰۳</p>
        </div>
      </div>
    </footer>
  );
}
