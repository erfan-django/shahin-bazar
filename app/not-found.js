import Link from "next/link";
import { Frown } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <Frown size={64} className="mb-4" style={{ color: "var(--accent-color)" }} />
      <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>صفحه مورد نظر یافت نشد</h1>
      <p className="mb-6" style={{ color: "var(--text-secondary)" }}>صفحه‌ای که به دنبال آن هستید وجود ندارد یا حذف شده است.</p>
      <Link href="/" className="text-white px-6 py-3 rounded-lg font-medium transition-colors" style={{ background: "var(--accent-color)" }}>
        بازگشت به خانه
      </Link>
    </div>
  );
}
