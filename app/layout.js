import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LoginModal from "@/components/LoginModal";
import ThemeToggle from "@/components/ThemeToggle";
import { AuthProvider } from "@/lib/auth";
import { ThemeProvider } from "@/lib/theme";

export const metadata = {
  title: "بازار شاهین شهر | خرید و فروش آنلاین",
  description: "نخستین بازار آنلاین تخصصی شهر شاهین شهر - خرید و پیش‌خرید کالا از مغازه‌های محلی",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl" className="dark">
      <body className="min-h-screen flex flex-col" style={{ background: "var(--bg-primary)", color: "var(--text-primary)" }}>
        <ThemeProvider>
          <AuthProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <ThemeToggle />
            <Footer />
            <LoginModal />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
